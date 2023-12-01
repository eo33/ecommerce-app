import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Accordion from "react-bootstrap/Accordion";
import ReactPaginate from "react-paginate";

import "./Product.css";

function Products() {
  //Main product variables
  const [products, setProducts] = useState([]);
  const [filterState, setFilterState] = useState("Most relevant");

  // Price filter variables to filter change after user exits input field
  const [priceCategory, setPriceCategory] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");

  // State variables to show immediate change
  const [minPriceFilterTemp, setMinPriceFilterTemp] = useState("");
  const [maxPriceFilterTemp, setMaxPriceFilterTemp] = useState("");

  // Sold filter variables
  const [soldFilter, setSoldFilter] = useState(0);

  // Page variable
  const [page, setPage] = useState(1);

  // Fetch the list of Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Primary filter (top right): Sort product using useMemo to cache it
  const [sortedProducts, priceCategoriesNumbers, soldCountCategoriesNumbers] =
    useMemo(() => {
      // Advance filters: Price + Sold count accordion)
      let FilteredProducts = [...products];
      // Advance filter: price
      if (minPriceFilter !== "" || maxPriceFilter !== "") {
        const max = maxPriceFilter === "" ? Infinity : maxPriceFilter;
        FilteredProducts = FilteredProducts.filter(
          (item) => item.price >= minPriceFilter && item.price <= max
        );
      }
      // Advance filter: sold
      FilteredProducts = FilteredProducts.filter(
        (item) => item.soldCount >= soldFilter
      );

      // Primary filter
      const copyOfProducts = [...FilteredProducts];
      if (filterState === "Highest price") {
        copyOfProducts.sort((a, b) => b.price - a.price);
      } else if (filterState === "Lowest price") {
        copyOfProducts.sort((a, b) => a.price - b.price);
      } else if (filterState === "Most sold") {
        copyOfProducts.sort((a, b) => b.soldCount - a.soldCount);
      }
      // Sort by price (Handle scenario when data is not yet available)
      const sortByPrice = [...products].sort((a, b) => b.price - a.price);
      const highestPrice = sortByPrice.length ? sortByPrice[0].price : 0;
      const lowestPrice = sortByPrice.length
        ? sortByPrice[sortByPrice.length - 1].price
        : 0;
      const midPrice1 = Math.floor(
        (highestPrice - lowestPrice) / 3 + lowestPrice
      );
      const midPrice2 = Math.floor(
        (highestPrice - lowestPrice) / 3 + midPrice1
      );

      // Sort by Sold count
      const sortBySoldCount = [...products].sort(
        (a, b) => b.soldCount - a.soldCount
      );
      const highestSoldCount = sortBySoldCount.length
        ? sortBySoldCount[0].soldCount
        : 0;
      const lowestSoldCount = sortBySoldCount.length
        ? sortBySoldCount[sortBySoldCount.length - 1].soldCount
        : 0;
      const midSoldCount1 = Math.floor(
        (highestSoldCount - lowestSoldCount) / 3 + lowestSoldCount
      );
      const midSoldCount2 = Math.floor(
        (highestSoldCount - lowestSoldCount) / 3 + midSoldCount1
      );

      return [
        copyOfProducts,
        { highestPrice, lowestPrice, midPrice1, midPrice2 },
        {
          highestSoldCount,
          lowestSoldCount,
          midSoldCount1,
          midSoldCount2,
        },
      ];
    }, [filterState, products, minPriceFilter, maxPriceFilter, soldFilter]);

  // Pagination feature
  const ordersPerPage = 6;
  const paginate = ({ selected }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="row mt-3">
      {/**FILTERS*/}
      <div className="col-12 col-md-2 border-0 mx-0 py-0">
        <div className="row">
          <div className="col">
            <p className="display-6">Filters</p>
          </div>
          {/**PRICE ACCORDION (INPUT FIELD + CATEGORIES*/}
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h5>Price</h5>
              </Accordion.Header>
              <Accordion.Body>
                <div className="row">
                  <div className="col mx-0 px-0">
                    <label htmlFor="min-price">Max price</label>
                    <input
                      id="max-price"
                      type="text"
                      className="w-100 "
                      value={maxPriceFilterTemp}
                      placeholder="Enter max price"
                      onChange={(e) => {
                        if (!isNaN(e.target.value) || e.target.value === "") {
                          setMaxPriceFilterTemp(e.target.value);
                        }
                        setPriceCategory("");
                        setPage(1);
                      }}
                      onBlur={(e) => {
                        setMaxPriceFilter(e.target.value);
                        setPage(1);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col mx-0 px-0">
                    <label htmlFor="min-price">Min price</label>
                    <input
                      id="min-price"
                      type="text"
                      className="w-100"
                      value={minPriceFilterTemp}
                      placeholder="Enter min price"
                      onChange={(e) => {
                        if (!isNaN(e.target.value) || e.target.value === "") {
                          setMinPriceFilterTemp(e.target.value);
                        }
                        setPriceCategory("");
                        setPage(1);
                      }}
                      onBlur={(e) => {
                        setMinPriceFilter(e.target.value);
                        setPage(1);
                      }}
                    />
                  </div>
                </div>
                {/*PRICE CATEGORIES*/}
                <div className="row mt-3">
                  <div className="col mx-0 px-0">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btn-check"
                      checked={priceCategory === "high"}
                      onClick={() => {
                        if (priceCategory === "high") {
                          setPriceCategory("");
                          setMinPriceFilter("");
                          setMaxPriceFilter("");
                          setMinPriceFilterTemp("");
                          setMaxPriceFilterTemp("");
                        } else {
                          setPriceCategory("high");
                          setMinPriceFilter(priceCategoriesNumbers.midPrice2);
                          setMaxPriceFilter(
                            priceCategoriesNumbers.highestPrice
                          );
                          setMinPriceFilterTemp(
                            priceCategoriesNumbers.midPrice2
                          );
                          setMaxPriceFilterTemp(
                            priceCategoriesNumbers.highestPrice
                          );
                        }
                        setPage(1);
                      }}
                    />
                    <label class="btn btn-primary checked" for="btn-check">
                      ${priceCategoriesNumbers.midPrice2}-$
                      {priceCategoriesNumbers.highestPrice}
                    </label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col mx-0 px-0">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btn-check2"
                      checked={priceCategory === "med"}
                      onClick={() => {
                        if (priceCategory === "med") {
                          setPriceCategory("");
                          setMinPriceFilter("");
                          setMaxPriceFilter("");
                          setMinPriceFilterTemp("");
                          setMaxPriceFilterTemp("");
                        } else {
                          setPriceCategory("med");
                          setMinPriceFilter(priceCategoriesNumbers.midPrice1);
                          setMaxPriceFilter(
                            priceCategoriesNumbers.midPrice2 - 1
                          );
                          setMinPriceFilterTemp(
                            priceCategoriesNumbers.midPrice1
                          );
                          setMaxPriceFilterTemp(
                            priceCategoriesNumbers.midPrice2 - 1
                          );
                        }
                        setPage(1);
                      }}
                    />
                    <label class="btn btn-primary" for="btn-check2">
                      ${priceCategoriesNumbers.midPrice1}-$
                      {priceCategoriesNumbers.midPrice2 - 1}
                    </label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col mx-0 px-0">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btn-check3"
                      checked={priceCategory === "low"}
                      onClick={() => {
                        if (priceCategory === "low") {
                          setPriceCategory("");
                          setMinPriceFilter("");
                          setMaxPriceFilter("");
                          setMinPriceFilterTemp("");
                          setMaxPriceFilterTemp("");
                        } else {
                          setPriceCategory("low");
                          setMinPriceFilter(0);
                          setMaxPriceFilter(
                            priceCategoriesNumbers.midPrice1 - 1
                          );
                          setMinPriceFilterTemp(0);
                          setMaxPriceFilterTemp(
                            priceCategoriesNumbers.midPrice1 - 1
                          );
                        }
                        setPage(1);
                      }}
                    />
                    <label class="btn btn-primary" for="btn-check3">
                      $0-${priceCategoriesNumbers.midPrice1 - 1}
                    </label>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            {/**SOLD ACCORDION (CHECKBOX)*/}
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h5>Sold Count</h5>
              </Accordion.Header>
              <Accordion.Body>
                {/*Sold count*/}
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="sold-filter-radio1"
                    onClick={() => {
                      setSoldFilter(
                        soldCountCategoriesNumbers.highestSoldCount
                      );
                      setPage(1);
                    }}
                    checked={
                      soldFilter === soldCountCategoriesNumbers.highestSoldCount
                    }
                  />
                  <label class="form-check-label" for="sold-filter-radio1">
                    {soldCountCategoriesNumbers.highestSoldCount} +
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="sold-filter-radio2"
                    onClick={() => {
                      setSoldFilter(soldCountCategoriesNumbers.midSoldCount2);
                      setPage(1);
                    }}
                    checked={
                      soldFilter === soldCountCategoriesNumbers.midSoldCount2
                    }
                  />
                  <label class="form-check-label" for="sold-filter-radio2">
                    {soldCountCategoriesNumbers.midSoldCount2} +
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="sold-filter-radio3"
                    onClick={() => {
                      setSoldFilter(soldCountCategoriesNumbers.midSoldCount1);
                      setPage(1);
                    }}
                    checked={
                      soldFilter === soldCountCategoriesNumbers.midSoldCount1
                    }
                  />
                  <label class="form-check-label" for="sold-filter-radio3">
                    {soldCountCategoriesNumbers.midSoldCount1} +
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="sold-filter-radio4"
                    onClick={() => {
                      setSoldFilter(0);
                      setPage(1);
                    }}
                    checked={soldFilter === 0}
                  />
                  <label class="form-check-label" for="sold-filter-radio4">
                    0 +
                  </label>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>

      {/**PRODUCT LISTING*/}
      <div className="col">
        {/**SEARCH BAR && FILTERS*/}
        <div className="row">
          {/*SEARCH BAR*/}
          <div className="col-12 col-md-9 d-flex align-items-center">
            <input
              type="text"
              className="text w-100"
              disabled
              placeholder="Search item"
            ></input>
          </div>
          {/*FILTERS*/}
          <div className="col-md-1 d-flex align-items-center">Sort by:</div>
          <div className="col-2">
            <DropdownButton
              id="dropdown-basic-button"
              as={ButtonGroup}
              key={"secondary"}
              variant={"secondary"}
              title={filterState}
              onSelect={(e) => {
                setFilterState(e);
                setPage(1);
              }}
            >
              <Dropdown.Item
                eventKey="Most relevant"
                className={filterState === "Most relevant" ? "active" : ""}
              >
                Most relevant
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="Lowest price"
                className={filterState === "Lowest price" ? "active" : ""}
              >
                Lowest price
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="Highest price"
                className={filterState === "Highest price" ? "active" : ""}
              >
                Highest price
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="Most sold"
                className={filterState === "Most sold" ? "active" : ""}
              >
                Most sold
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        {/**CREATE A 2 by 4 grid*/}
        <div className="container">
          <div className="row mb-5">
            {/**MAP EACH PRODUCT*/}
            {sortedProducts
              .slice((page - 1) * ordersPerPage, page * ordersPerPage)
              .map((product) => (
                <div className="col-md-4 mt-3 d-flex justify-content-center">
                  <div className="card ">
                    <div className="col d-flex justify-content-center align-items-center">
                      <Link to={`/shop/${product.image}`}>
                        <div className="col d-flex justify-content-center p-0">
                          <img
                            className="card-img-top w-75 "
                            style={{
                              maxWidth: "250px",
                            }}
                            src={`/products/${product.image}`}
                            alt={`${product.name}`}
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="card-body">
                      <div className="col d-flex justify-content-center ">
                        <h5 className="card-title m-0">{product.name}</h5>
                      </div>
                    </div>
                    <ul class="list-group list-group-flush d-flex align-items-center">
                      <li class="list-group-item w-100">
                        <p className="d-flex justify-content-center mb-0 text-bold fw-bold">
                          ${product.price}.00
                        </p>
                      </li>
                      <li class="list-group-item ">
                        Sold count: {product.soldCount}
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center mt-3">
              <ReactPaginate
                nextLabel="Next"
                onPageChange={paginate}
                pageCount={Math.ceil(sortedProducts.length / ordersPerPage)}
                previousLabel="Prev"
                breakLabel="..."
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={page - 1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Products;

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Accordion from "react-bootstrap/Accordion";
import "./Product.css";

function Products() {
  //Main product variables
  const [products, setProducts] = useState([]);
  const [filterState, setFilterState] = useState("Most relevant");

  // Price filter variables
  const [priceCategory, setPriceCategory] = useState("");

  // Sold filter variables
  const [soldFilter, setSoldFilter] = useState(0);

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
      // Primary filter
      const copyOfProducts = [...products];
      if (filterState === "Highest price") {
        copyOfProducts.sort((a, b) => b.price - a.price);
      } else if (filterState === "Lowest price") {
        copyOfProducts.sort((a, b) => a.price - b.price);
      } else if (filterState === "Most sold") {
        copyOfProducts.sort((a, b) => b.soldCount - a.soldCount);
      }
      // Price filter (Handle scenario when data is not yet available)
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

      // Sold filter
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
    }, [filterState, products]);

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
                  <div className="col">
                    <label htmlFor="min-price">Min price</label>
                    <input id="min-price" type="number" className="w-100" />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="min-price">Max price</label>
                    <input id="min-price" type="number" className="w-100" />
                  </div>
                </div>
                {/*PRICE CATEGORIES*/}

                <div className="row mt-3">
                  <div className="col">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btn-check"
                      checked={priceCategory === "high"}
                      onClick={() =>
                        setPriceCategory(priceCategory === "high" ? "" : "high")
                      }
                    />
                    <label class="btn btn-primary checked" for="btn-check">
                      ${priceCategoriesNumbers.midPrice2}-$
                      {priceCategoriesNumbers.highestPrice}
                    </label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btn-check2"
                      checked={priceCategory === "med"}
                      onClick={() =>
                        setPriceCategory(priceCategory === "med" ? "" : "med")
                      }
                    />
                    <label class="btn btn-primary" for="btn-check2">
                      ${priceCategoriesNumbers.midPrice1}-$
                      {priceCategoriesNumbers.midPrice2 - 1}
                    </label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btn-check3"
                      checked={priceCategory === "low"}
                      onClick={() =>
                        setPriceCategory(priceCategory === "low" ? "" : "low")
                      }
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
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    {soldCountCategoriesNumbers.highestSoldCount} +
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    {soldCountCategoriesNumbers.midSoldCount2} +
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    {soldCountCategoriesNumbers.midSoldCount1} +
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
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
            <input type="text" className="text w-100"></input>
          </div>
          {/*FILTERS*/}
          <div className="col-md-1 d-flex align-items-center">Filters</div>
          <div className="col-2">
            <DropdownButton
              id="dropdown-basic-button"
              as={ButtonGroup}
              key={"secondary"}
              variant={"secondary"}
              title={filterState}
              onSelect={(e) => {
                setFilterState(e);
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
          <div className="row">
            {/**MAP EACH PRODUCT*/}
            {sortedProducts.map((product) => (
              <div className="col-md-4 mt-4 d-flex justify-content-center">
                <div className="card ">
                  <div className="col d-flex justify-content-center">
                    <img
                      className="card-img-top w-100"
                      src={`products/${product.image}`}
                      alt={`${product.name}`}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title m-0">{product.name}</h5>
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
        </div>
      </div>
    </div>
  );
}
export default Products;

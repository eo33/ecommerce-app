import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./Product.css";

function Products() {
  //
  const [products, setProducts] = useState([]);
  const [filterState, setFilterState] = useState("Most relevant");

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

  // Sort product using useMemo to cache it
  const sortedProducts = useMemo(() => {
    const copyOfProducts = [...products];
    if (filterState === "Highest price") {
      copyOfProducts.sort((a, b) => b.price - a.price);
    } else if (filterState === "Lowest price") {
      copyOfProducts.sort((a, b) => a.price - b.price);
    }
    return copyOfProducts;
  }, [filterState, products]);

  return (
    <div className="row mt-3">
      {/**FILTERS*/}
      <div className="col-12 col-md-2 border-0">
        <div className="row">
          <div className="col">Filter</div>
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
                    <li class="list-group-item ">Sold count: 40</li>
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

import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import "./Orders.css";

function Orders() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  // State variable for data fetching
  const [data, setData] = useState([]);
  // State variable for data processing
  const [filteredData, setFilteredData] = useState(data);

  // Fetch data from Express during initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.get("/orders/get_all", { ...config });
        // Set variable for data fetching
        setData(response.data);
        // Set variable for data processing
        setFilteredData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Event handlers
  // Handle filter only
  const handleFilter = (type) => {
    setFilter(type);
    if (type !== "all") {
      setFilteredData(data.filter((item) => item.status === type));
    } else {
      setFilteredData(data);
    }
  };
  const handleBuy = async (e, productId) => {
    e.preventDefault();
    // Add item to cart
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
      const body = {
        productId,
        quantity: 1,
      };

      await axios.post(`/cart/add`, body, config);
      navigate(`/cart`);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Pagination feature
  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col">
          <h1>Orders</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-10">
          <div className="row p-3 border-secondary border-3">
            <div className="col">
              <div className="row d-flex align-items-center">
                <div className="col-12 col-md-2 col-lg-1 ">
                  <h3>Status:</h3>
                </div>
                <div className="col-12 col-md-9 col-lg-6 mx-lg-4 d-flex justify-content-between m-0 p-0 px-md-2">
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleFilter("all")}
                    className={filter === "all" ? "active-button" : ""}
                  >
                    {"Show all"}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleFilter("pending")}
                    className={filter === "pending" ? "active-button" : ""}
                  >
                    Pending
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleFilter("delivery")}
                    className={filter === "delivery" ? "active-button" : ""}
                  >
                    Delivery
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleFilter("completed")}
                    className={filter === "completed" ? "active-button" : ""}
                  >
                    Completed
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/**Map over the data*/}
          {filteredData.slice((page - 1) * 6, page * 6).map((item) => (
            <div className="row border mt-3">
              <div className="col-12 col-md-10 ">
                {/**Date + order number */}
                <div className="row py-2 px-1 align-items-center">
                  <div className="col-8 col-md-7 col-lg-5 col-xl-4">
                    Date order: {item.createdAt}
                  </div>
                  <div className="col-4">
                    Order: #{item.orderNum.toString().padStart(6, "0")}
                  </div>
                </div>
                {/**item + total payment */}
                <div className="row my-2">
                  <div className="col-3 col-md-2 d-flex justify-content-center align-items-center">
                    <img
                      src={`/products/${item.image}`}
                      alt="a meaningful text"
                      className="img-thumbnail w-100"
                    />
                  </div>
                  <div className="col-5 col-md-6 col-lg-7 d-flex flex-column justify-content-center">
                    <div className="row">
                      <div className="col">{item.name}</div>
                    </div>
                    <div className="row">
                      <div className="col">
                        {item.quantity} items x ${item.price}
                      </div>
                    </div>
                  </div>
                  <div className="col-4 col-lg-3 border-start  d-flex flex-column justify-content-center">
                    <div className="row">
                      <div className="col">Total payment</div>
                    </div>
                    <div className="row">
                      <div className="col">${item.quantity * item.price}</div>
                    </div>
                  </div>
                </div>
                {/**Status + buy again payment */}
                <div className="row py-2 px-1 align-items-center mb-md-2">
                  <div className="col-8 col-md-4">Status: {item.status}</div>
                  <div className="col-4 offset-md-4 d-flex justify-content-center">
                    <Button
                      variant="outline-secondary"
                      className="py-0"
                      onClick={(e) => {
                        handleBuy(e, item.productId);
                      }}
                    >
                      Buy again
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col d-flex justify-content-center mt-2">{`<`}1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Orders;

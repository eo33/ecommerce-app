import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");

  // Fetch cart data of user from MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        };
        const response = await axios.get("/cart/items", config);
        setData(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container">
      {/**SELECT ALL + DELETE ALL*/}
      <div className="row px-4 mt-4">
        <div className=" col form-check">
          <input
            className="form-check-input border border-2"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Select all
          </label>
        </div>
      </div>
      {/**Items at cart + Checkout*/}
      {/*              
        {item.product.name}
        {item.quantity}
        {item.product.image}
        {item.product.price} 
      */}
      <div className="row mt-4">
        {/**Items at cart */}
        <div className="col-9">
          {/**Render out each item */}
          {data.items.map((item) => (
            <div className="row px-4 py-3 border mt-3">
              {/**Checkbox*/}
              <div className="col-1 form-check d-flex align-items-center">
                <input
                  className="form-check-input border border-2"
                  type="checkbox"
                />
              </div>
              {/**Image*/}
              <img
                src={`/products/${item.product.image}`}
                alt="a meaningful text"
                className="img-thumbnail col-3 border-2"
              />
              <div className="col-4 d-flex flex-column justify-content-center">
                <div className="row">
                  <h3 className="col">{item.product.name}</h3>
                </div>
                <div className="row mt-4">
                  <h4 className="col">{item.product.price}</h4>
                </div>
              </div>
              <div className="col d-flex align-items-end justify-content-end">
                <div
                  class="btn-group mt-5"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    class="btn btn-secondary "
                    onClick={() => {}}
                  >
                    -
                  </button>
                  <div className="px-3 px-lg-5 pt-2 quantity">
                    <h5>{item.quantity}</h5>
                  </div>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => {}}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/**Checkout summary*/}
        <div className="col-3">
          <div className="row p-3">Hello</div>
        </div>
      </div>
    </div>
  );
}
export default Cart;

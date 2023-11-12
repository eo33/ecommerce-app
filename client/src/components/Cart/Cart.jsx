import { useEffect, useState } from "react";
import "./Cart.css";
import axios from "axios";

function Cart() {
  const [data, setData] = useState({ items: [] });
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
  }, [token]);

  // Event handler for (-), (+), and edit
  const handleQuantity = (productImage, newValue, productId) => {
    // Modify value in the front-end
    setData((prev) => {
      // Look for item that has the product image
      const newItemsArray = prev.items.map((item) =>
        item.product.image === productImage
          ? { ...item, quantity: newValue }
          : item
      );

      return { ...prev, items: newItemsArray };
    });

    // Modify value in the back-end
    const modifyData = async (productId, newValue) => {
      try {
        const config = {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        };
        const body = {
          productId: productId,
          quantity: newValue,
        };
        const response = await axios.put(
          "/cart/edit",
          JSON.stringify(body),
          config
        );
        console.log(response);
      } catch (err) {
        console.error(err.message);
      }
    };

    modifyData(productId, newValue);
  };

  // Calculate total items and total price
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
        <div className="col-12 col-md-9">
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
                  <h4 className="col">${item.product.price}</h4>
                </div>
              </div>
              <div className="col d-flex align-items-end justify-content-end">
                <div
                  className="btn-group mt-5"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-secondary "
                    onClick={() =>
                      handleQuantity(
                        item.product.image,
                        item.quantity - 1,
                        item.product._id
                      )
                    }
                    disabled={item.quantity === 1 ? true : false}
                  >
                    -
                  </button>
                  <div className="px-3 px-lg-5 pt-2 quantity">
                    <h5>{item.quantity}</h5>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      handleQuantity(
                        item.product.image,
                        item.quantity + 1,
                        item.product._id
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/**Checkout summary*/}
        <div className="col-12 col-md-3">
          <div className="row p-md-3 border mt-3 mx-md-1">
            <div className="col">
              <div className="row">
                <h5 className="col d-flex align-items-center bold">Summary</h5>
              </div>
              <div className="row border-top border-bottom my-md-2 py-md-3">
                <div className="col-12 col-lg-9">Total items ({30} items):</div>
                <div className="col-2 d-flex align-items-center">$400</div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-9 ">
                  <h5 className="bold">Total Price:</h5>
                </div>
                <h5 className="col-2 d-flex bold">$400</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;

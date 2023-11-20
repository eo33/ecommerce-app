import { useContext, useEffect, useState, useRef } from "react";
import { CartContext } from "../Context/CartContext";
import axios from "axios";
import AddressModal from "./AddressModal";
import { Link } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import "./Checkout.css";

function Checkout() {
  // Import context
  const { cartItems, setCartItems } = useContext(CartContext);

  // State variables
  const [data, setData] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const [showModal, setShowModal] = useState(false);
  const [shipping, setShipping] = useState(
    cartItems.map((item) => ({ ...item.product, shipping: "Regular" }))
  );

  // Ref for user name to persist across renders
  const userNameRef = useRef("--");

  // Fetch data
  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      try {
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const res = await axios.get("/address/list", config);
        setData(res.data);

        // Set user name using ref to avoid re-renders
        if (res.data && res.data.user && res.data.user.name) {
          userNameRef.current = res.data.user.name;
        }

        // change selected addresses
        setSelectedAddress(
          () => res.data.addresses.filter((item) => item.main)[0].address
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetch();
  }, [showModal]);

  // Calculate the price
  const totalItemsPrice = cartItems.reduce(
    (acc, elem) => acc + elem.quantity * elem.product.price,
    0
  );
  const totalItemsCount = cartItems.reduce(
    (acc, elem) => acc + elem.quantity,
    0
  );
  const deliveryCount = { "Next day": 0, Regular: 0, Budget: 0 };
  const deliveryPrice = [15, 10, 0];
  const deliveryFee = [0, 0, 0];
  for (let i = 0; i < shipping.length; i++) {
    // calculate shipping price
    const currMethod = shipping[i].shipping;
    if (currMethod === "Next day") {
      deliveryCount["Next day"]++;
      deliveryFee[0] += deliveryPrice[0];
    } else if (currMethod === "Regular") {
      deliveryCount["Regular"]++;
      deliveryFee[1] += deliveryPrice[1];
    } else {
      deliveryCount["Budget"]++;
      deliveryFee[2] += deliveryPrice[2];
    }
  }
  console.log(deliveryCount);
  console.log(deliveryFee);

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col">
          <h1>Checkout</h1>
        </div>
      </div>
      <div className="row">
        {data ? (
          <AddressModal
            showModal={showModal}
            setShowModal={setShowModal}
            data={data}
            setData={setData}
            setSelectedAddress={setSelectedAddress}
          />
        ) : null}
        <div className="col-8">
          <div className="row p-3 border-secondary border-3 border-bottom">
            <div className="col">
              <div className="row">
                <div className="col">
                  <h3>Address</h3>
                </div>
              </div>
              <div className="row">
                <div className="col d-flex flex-column border border-secondary border-2 border-start-0 border-end-0 py-3">
                  {data ? (
                    <>
                      <h5>{userNameRef.current}</h5>
                      <h5>{selectedAddress}</h5>
                    </>
                  ) : (
                    <>
                      <h5>--</h5>
                      <h5>--</h5>
                    </>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <button
                    type="button"
                    class="btn btn-light mt-3 border border-dark"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    {data ? "Change address" : "Add address"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/**Map over checked out items*/}
          {cartItems.map((item, index) => (
            <div className="row px-4 py-3 border mt-3">
              <div className="col-3">
                <div className="row">
                  <div className="col">
                    <h6 className="bold">Order #{index + 1}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <img
                      src={`/products/${item.product.image}`}
                      alt="a meaningful text"
                      className="img-thumbnail w-75"
                    />
                  </div>
                </div>
              </div>
              <div className="col-5 d-flex flex-column justify-content-center">
                <div className="row">
                  <div className="col">
                    <h5>{item.product.name}</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col">{item.quantity} item(s)</div>
                </div>
                <div className="row">
                  <div className="col">
                    ${item.quantity * item.product.price}
                  </div>
                </div>
              </div>
              <div className="col-4 d-flex flex-column justify-content-center">
                <div className="row">
                  <div className="col">Pick shipment</div>
                </div>
                <div className="row">
                  <div className="col-10">
                    <Dropdown
                      onSelect={(eventKey) => {
                        const currentId = item.product._id;
                        setShipping((prev) =>
                          prev.map((item) =>
                            item._id === currentId
                              ? { ...item, shipping: eventKey }
                              : item
                          )
                        );
                      }}
                    >
                      <Dropdown.Toggle variant="secondary" className="mt-2">
                        {
                          shipping.filter(
                            (product) => product._id === item.product._id
                          )[0].shipping
                        }
                      </Dropdown.Toggle>
                      <Dropdown.Menu id={`dropdown-menu-${item.product._id}`}>
                        <Dropdown.Item eventKey="Next day">
                          Next day (0-2 days)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Regular">
                          Regular (3-5 days)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Budget">
                          Budget (6-10 days)
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/**Checkout summary*/}
        <div className="col-4">
          <div className="row p-md-3 border mt-3 mx-md-1">
            <div className="col">
              <div className="row">
                <h5 className="col d-flex align-items-center bold">Summary</h5>
              </div>
              <div className="row border-top mt-md-2 pt-md-3">
                <div className="col-12 col-lg-9">
                  Total items ({totalItemsCount} items):
                </div>
                <div className="col-2 d-flex align-items-center">
                  ${totalItemsPrice}
                </div>
              </div>
              <div className="row ">
                <div className="col-12 col-lg-9 bold">Delivery fee(s):</div>
              </div>
              {Object.keys(deliveryCount).map((key, index) => {
                if (deliveryCount[key] !== 0) {
                  return (
                    <div className="row">
                      <div className="col-12 col-lg-9">
                        {key} ({deliveryCount[key]} orders X $
                        {deliveryPrice[index]})
                      </div>
                      <div className="col-2 d-flex align-items-center">
                        ${deliveryFee[index]}
                      </div>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
              <div className="row ">
                <div className="col-12 col-lg-9 bold">Tax:</div>
              </div>
              <div className="row border-bottom mb-md-2 pb-md-3">
                <div className="col-12 col-lg-9">GST @ 10%</div>
                <div className="col-2 d-flex align-items-center">
                  ${0.1 * totalItemsPrice}
                </div>
              </div>
              <div className="row ">
                <div className="col-12 col-lg-9 ">
                  <h5 className="bold">Total Price:</h5>
                </div>
                <h5 className="col-2 d-flex bold">
                  $
                  {totalItemsPrice +
                    deliveryFee.reduce((acc, elem) => acc + elem, 0) +
                    0.1 * totalItemsPrice}
                </h5>
              </div>
              <Link class="btn btn-secondary w-100 mt-4" to="/orders">
                Proceed
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;

import { useContext, useEffect, useState, useRef } from "react";
import { CartContext } from "../Context/CartContext";
import axios from "axios";
import AddressModal from "./AddressModal";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
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

  // Empty cart items when unmount

  return (
    <div className="container">
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
        <div className="row mt-4">
          <div className="col">
            <h2>Checkout</h2>
          </div>
        </div>
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
                <div className="col">${item.quantity * item.product.price}</div>
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
    </div>
  );
}
export default Checkout;

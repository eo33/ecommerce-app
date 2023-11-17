import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import axios from "axios";
import AddressModal from "./AddressModal";
import "./Checkout.css";

function Checkout() {
  // Import context
  const { cartItems, setCartItems } = useContext(CartContext);

  // State variables
  const [data, setData] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    return () => {
      setCartItems([]);
    };
  }, [setCartItems]);

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
                    <h5>{data.user.name}</h5>
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
      </div>
    </div>
  );
}
export default Checkout;

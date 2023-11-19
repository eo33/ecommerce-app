import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import GooglePlacesApi from "./GooglePlacesApi";
import axios from "axios";
import "./Checkout.css";

function AddressModal(props) {
  const { showModal, setShowModal, data, setData, setSelectedAddress } = props;
  const [showGoogleModal, setGoogleModal] = useState(false);

  const handleDelete = async (e, addressId, main) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      // Send a delete request
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
      const body = {
        addressId: addressId,
      };
      const res = await axios.delete("/address/delete", {
        ...config,
        data: JSON.stringify(body),
      });

      // If selected address is a main address, pick the next address to be main
      if (main) {
        const nextAddress = data.addresses.filter(
          (address) => address._id !== addressId
        )[0];
        const res2 = await axios.put(
          "/address/select",
          JSON.stringify({ addressId: nextAddress._id }),
          config
        );
        setData(res2.data);
        setSelectedAddress(nextAddress.address);
      } else {
        setData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (e, addressId) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      // Send a delete request
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
      const body = {
        addressId: addressId,
      };
      const res = await axios.put(
        "/address/select",
        JSON.stringify(body),
        config
      );
      setData(res.data);
      //Change the selected address in the frontend
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <GooglePlacesApi
        showGoogleModal={showGoogleModal}
        setGoogleModal={setGoogleModal}
        setSelectedAddress={setSelectedAddress}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Choose an address</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            {/**Add an address button */}
            <button
              type="button"
              class="btn btn-light border border-dark w-100"
              onClick={() => {
                setShowModal(false);
                setGoogleModal(true);
              }}
            >
              Add address
            </button>
            {/**Show current addresses. Reverse it to show the latest added address*/}
            {data.addresses.map((address) => (
              <div
                className={`border row rounded border-radius m-1 p-2 ${
                  address.main ? "alert alert-success" : null
                }`}
              >
                <div className="col-8 p-0">
                  <div className="row">
                    <div className="col">{address.address}</div>
                  </div>
                  <div className="row mt-1">
                    {/**Edit button 
                    <div className="col-6 col-md-4">
                      <button type="button" class="btn btn-link p-0">
                        Edit
                      </button>
                    </div>*/}
                    {
                      // If theres only 1 address, don't show delete button
                      data.addresses.length === 1 ? null : (
                        <>
                          <div className="col-6 col-md-4">
                            <button
                              type="button"
                              class="btn btn-link p-0"
                              onClick={(e) => {
                                handleDelete(e, address._id, address.main);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )
                    }
                  </div>
                </div>
                {
                  // If theres only 1 address, don't show edit button
                  data.addresses.length === 1 ? null : (
                    <div className="col-4 d-flex align-items-center justify-content-end">
                      <button
                        className="btn btn-success p-1"
                        onClick={(e) => {
                          handleEdit(e, address._id);
                        }}
                      >
                        Select
                      </button>
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddressModal;

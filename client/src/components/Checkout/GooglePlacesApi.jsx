import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Autocomplete from "react-google-autocomplete";
import axios from "axios";
import "./Checkout.css";

function GooglePlacesApi(props) {
  const { showGoogleModal, setGoogleModal, setSelectedAddress } = props;
  const [address, setAddress] = useState("");
  const [apiKey, setApiKey] = useState("12");

  useEffect(() => {
    const getKey = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        };
        const res = await axios.get("/address/api_key", config);
        setApiKey(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getKey();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
      const body = {
        address,
      };

      await axios.post("/address/add", JSON.stringify(body), config);
      setGoogleModal(false);
      setSelectedAddress(address);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={showGoogleModal} onHide={() => setGoogleModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Find address</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Autocomplete
          apiKey={apiKey}
          onPlaceSelected={(place) => {
            setAddress(place.formatted_address);
          }}
          options={{
            types: ["address"],
            componentRestrictions: { country: "AU" }, // Restrict to Australia
          }}
          placeholder="Search for address"
          className="w-100 border px-2 rounded"
        />
        <div className="col d-flex justify-content-end align-items-end ">
          <button
            type="button"
            class="btn btn-success mt-2 border "
            onClick={(e) => {
              handleSave(e);
            }}
          >
            Save
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default GooglePlacesApi;

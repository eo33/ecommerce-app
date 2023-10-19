import { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./Product.css";

function AdminProductsEdit() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [render, setRender] = useState(0);

  // For modal dialog
  const [show, setShow] = useState(false);

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
  }, [render]);

  // Handlers
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await axios.delete(`/products/${selectedProduct}`, config);
      setShow(false);
      setRender((e) => e + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete item?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>This will delete Item name</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="row mt-4">
        <div className="col-2 offset-6 d-flex justify-content-center">
          <h4>Price</h4>
        </div>
        <div className="col-2 d-flex justify-content-center">
          <h4>Sold count</h4>
        </div>
        <div className="col-2 d-flex justify-content-center">
          <h4>Modify</h4>
        </div>
      </div>
      {products.map((product, index) => (
        <div className="row border py-4 mt-4" id={`product-${index}`}>
          <div className="col-3 d-flex align-items-center justify-content-center">
            <img
              className="card-img-top card-images w-100"
              src={`../../products/${product.image}`}
              alt={`${product.name}`}
            />
          </div>
          <div className="col-3 d-flex flex-column justify-content-center">
            <h5 className="fw-bold">{product.name}</h5>
            <textarea
              name=""
              id=""
              value={product.description}
              disabled
            ></textarea>
          </div>
          <div className="col-2 d-flex align-items-center justify-content-center">
            <div class="input-group px-2">
              <div class="input-group-text">$</div>
              <input
                type="number"
                class="form-control"
                id="inlineFormInputGroupUsername"
                value={product.price}
                disabled
              />
            </div>
          </div>
          <div className="col-2 p-4 d-flex align-items-center justify-content-center">
            <input
              type="number"
              class="form-control"
              id="inlineFormInputGroupUsername"
              value={product.soldCount}
              disabled
            />
          </div>
          <div className="col-2 p-4 d-flex align-items-center justify-content-center">
            <DropdownButton
              id="dropdown-basic-button"
              key={"secondary"}
              variant={"secondary"}
              title={"Modify"}
            >
              <Dropdown.Item id={`edit-item-${index}`} onClick={() => {}}>
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                id={`edit-item-${index}`}
                onClick={() => {
                  setShow(true);
                  setSelectedProduct(product.image);
                }}
              >
                Delete
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      ))}
    </div>
  );
}
export default AdminProductsEdit;

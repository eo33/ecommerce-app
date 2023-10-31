import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import ReactImageMagnify from "react-image-magnify";
import "./Product.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { name, price, description, soldCount } = product;
  const [quantity, setQuantity] = useState(1);

  // For modal dialog
  const [show, setShow] = useState(false);

  // For login ID
  const token = localStorage.getItem("token");

  // Fetch data of product
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/products/details/${id}`);
        // Set the product data to state
        setProduct(response.data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [id]);

  // Handle add to cart event
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log("added item");
    // Add item to cart
    try {
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
      const body = {
        productId: product._id,
        quantity: quantity,
      };
      console.log(config, body);
      await axios.post(`/cart/add`, body, config);
      setShow(true);
      setQuantity(0);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="container">
      {product ? (
        <>
          <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
          >
            <Modal show={show} onHide={() => setShow(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Added to cart</Modal.Title>
              </Modal.Header>

              <Modal.Footer>
                <Link to="/cart" className="btn btn-success">
                  View cart
                </Link>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="row mt-3">
            <div className="col">
              <Link to="/shop" className="w-25">
                Go back
              </Link>
            </div>
          </div>

          <div className="row mt-2 pt-2">
            {/*COLUMN 1: PRODUCT IMAGE*/}
            <div className="col-md-4">
              <div className="img-thumbnail border-2 w-100">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: `/products/${id}`,
                    },
                    largeImage: {
                      src: `/products/${id}`,
                      width: 2000,
                      height: 2000,
                    },
                    isHintEnabled: true,
                    shouldHideHintAfterFirstActivation: true,
                  }}
                />
              </div>
            </div>
            {/*COLUMN 2: PRODUCT HEADERS*/}
            <div className="col-md-4 px-3">
              <div className="row border-2 border-bottom">
                <div className="col">
                  <h2 className="display-5">{name}</h2>
                  <h3 className="mt-4">Sold: {soldCount}</h3>
                  <h2 className="my-4">$ {price}</h2>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">{description}</div>
              </div>
            </div>
            {/*COLUMN 3: PRODUCT DESC*/}
            <div className="col-md-3 border border-2 px-4 offset-md-1 mt-5 mt-md-0">
              <h5 className="py-3 mb-0">Add to product</h5>
              <div className="row border-2 border-top border-bottom py-3">
                <div className="col-4">
                  <img
                    src={`/products/${id}`}
                    alt="a meaningful text"
                    className="img-thumbnail border-2"
                  />
                </div>
                <h3 className="col-8 d-flex align-items-center overflow-hidden">
                  {name}
                </h3>
              </div>
              {/**ADD QUANTITY */}
              <div
                class="btn-group mt-5"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  class="btn btn-secondary "
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  disabled={quantity > 1 ? false : true}
                >
                  -
                </button>
                <div className="px-3 px-lg-5 pt-2 quantity">
                  <h5>{quantity}</h5>
                </div>
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              {/**SUBTOTAL*/}
              <div className="row mt-5">
                <h4 className="col">Subtotal: ${price * quantity}</h4>
              </div>
              {/*Add to cart*/}

              {token ? (
                <button
                  type="button"
                  class="btn btn-light w-100 mt-3 border mt-5 mb-5 mb-md-3"
                  onClick={handleAdd}
                >
                  Add to cart
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-light w-100 mt-3 border mt-5 mb-5 mb-md-3"
                >
                  Login to add item
                </Link>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
export default ProductDetails;

import { useEffect, useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import axios from "axios";

import { CartContext } from "../Context/CartContext";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Cart() {
  // Cart context
  const { setCartItems } = useContext(CartContext);

  // States for data
  const [data, setData] = useState({ items: [] });
  const [selectAll, setSelectAll] = useState(false);
  const [deleteOption, setDeleteOption] = useState(false);
  const token = localStorage.getItem("token");

  // For modal dialog
  const [showModal, setShowModal] = useState(false);

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

        // Add "selection" key to items
        const newItems = response.data.items.map((item) => ({
          ...item,
          selected: false,
        }));

        setData({ ...response.data, items: newItems });
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

  // Event handler for selecting items
  const handleSelection = (index) => {
    // Toggle the selected item to opposite state
    const newItems = data.items.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );

    // Update state of data
    setData(() => ({
      ...data,
      items: newItems,
    }));

    // Update selected all based on whether all of the items are selected or not
    const selectedCount = newItems.reduce(
      (acc, elem) => acc + elem.selected,
      0
    );
    setSelectAll(selectedCount === data.items.length ? true : false);
    // If at least one item is selected, enable delete button
    setDeleteOption(selectedCount > 0 ? true : false);
  };

  // Event handler for selecting all items
  const handleSelectAll = (e) => {
    setSelectAll((prev) => !prev);
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => ({
        ...item,
        selected: e.target.checked,
      })),
    }));

    // enable delete option

    setDeleteOption(e.target.checked ? true : false);
  };

  // Event handler for deleting item(s)
  const handleDelete = () => {
    // Delete items in the frontend
    setData(() => ({
      ...data,
      items: data.items.filter((item) => !item.selected),
    }));
    // Delete items in the backend
    const itemsToDelete = data.items.filter((item) => item.selected);
    const deleteItems = async () => {
      try {
        const config = {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        };
        const body = { items: itemsToDelete.map((item) => item._id) };
        const response = await axios.delete("/cart/delete", {
          ...config,
          data: JSON.stringify(body),
        });
        console.log(response);
      } catch (err) {
        console.error(err.message);
      }
    };
    deleteItems();
    setShowModal(false);
    setDeleteOption(false);
  };

  // Calculate total items and total price
  const { totalItems, totalPrice } = useMemo(() => {
    const selectedItems = data.items.filter((item) => item.selected);
    const totalItems = selectedItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const totalPrice = selectedItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );
    return { totalItems, totalPrice };
  }, [data.items]);

  return (
    <div className="container">
      {/**Show Modal dialog*/}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete item(s)?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>This will delete the selected items</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/**SELECT ALL + DELETE ALL*/}
      <div className="row px-4 mt-4">
        <div className="col form-check d-flex align-items-center">
          <input
            className="form-check-input border border-2 p-3"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={(e) => handleSelectAll(e)}
            checked={selectAll}
          />
          <label className="form-check-label px-3" htmlFor="flexCheckDefault">
            <h5 className="m-0">Select all</h5>
          </label>
        </div>
        {deleteOption ? (
          <div className=" col offset-4 d-flex align-items-center">
            <button
              type="button"
              class="btn btn-link"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Delete
            </button>
          </div>
        ) : null}
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
          {data.items.map((item, index) => (
            <div className="row px-4 py-3 border mt-3">
              {/**Checkbox*/}
              <div className="col-1 form-check d-flex align-items-center">
                <input
                  className="form-check-input border border-2 p-3"
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => handleSelection(index)}
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
              <div className="col d-flex">
                <div className="row align-items-end justify-content-end">
                  <div className="btn-group ">
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
                    <input
                      type="text"
                      className="form-control rounded-0 w-50 input-group"
                      value={item.quantity}
                      onChange={(e) => {
                        e.preventDefault();
                        const inputValue = parseInt(e.target.value);
                        if (!isNaN(inputValue)) {
                          handleQuantity(
                            item.product.image,
                            inputValue,
                            item.product._id
                          );
                        }
                      }}
                    ></input>
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
            </div>
          ))}
        </div>
        {/**Checkout summary*/}
        <div className="col-12 col-md-3 px-2">
          <div className="row p-md-3 border mt-3 mx-md-1">
            <div className="col">
              <div className="row">
                <h5 className="col d-flex align-items-center bold">Summary</h5>
              </div>
              <div className="row border-top border-bottom my-md-2 py-md-3">
                <div className="col-12 col-lg-9">
                  Total items ({totalItems || "-"} items):
                </div>
                <div className="col-2 d-flex align-items-center">
                  ${totalPrice || "-"}
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-9 ">
                  <h5 className="bold">Total Price:</h5>
                </div>
                <h5 className="col-2 d-flex bold">${totalPrice || "-"}</h5>
              </div>
              {/**only show button when user has at least 1 item */}
              {totalItems !== 0 && (
                <Link
                  class="btn btn-secondary w-100 mt-4"
                  to="/checkout"
                  onClick={() => {
                    setCartItems(data.items);
                  }}
                >
                  Checkout ({totalItems})
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;

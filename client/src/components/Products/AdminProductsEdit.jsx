import { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactPaginate from "react-paginate";

import "./Product.css";
import AdminProductsAdd from "./AdminProductsAdd";

function AdminProductsEdit() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [render, setRender] = useState(0);
  const [page, setPage] = useState(1);

  // For modal dialog
  const [show, setShow] = useState(false);
  // For edit mode
  const [showEdit, setShowEdit] = useState(false);

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
  }, [render, show, showEdit]);

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
      await axios.delete(`/products/${selectedProduct.image}`, config);
      setShow(false);
      setRender((e) => e + 1);
    } catch (error) {
      console.error(error);
    }
  };

  // Pagination feature

  const ordersPerPage = 4;
  const paginate = ({ selected }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showEdit === false ? (
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
          <div className="row mt-2">
            <div className="col-2 offset-6 d-flex justify-content-center">
              <h4>Price</h4>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <h4>Sold</h4>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <h4>Modify</h4>
            </div>
          </div>
          {products.slice((page - 1) * 4, page * 4).map((product, index) => (
            <div
              className="row border py-1 py-md-0 mt-1"
              id={`product-${index}`}
            >
              <div className="col-3 d-flex align-items-center justify-content-center">
                <img
                  className="card-img-top card-images w-75"
                  src={`../../products/${product.image}`}
                  alt={`${product.name}`}
                />
              </div>
              <div className="col-3 d-flex flex-column justify-content-center">
                <h5 className="fw-bold">{product.name}</h5>
                <textarea value={product.description} disabled></textarea>
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                <div class="input-group">
                  <div class="input-group-text px-2">$</div>
                  <input
                    class="form-control px-2"
                    id="inlineFormInputGroupUsername"
                    value={product.price}
                    disabled
                  />
                </div>
              </div>
              <div className="col-2 p-2 d-flex align-items-center justify-content-center">
                <input
                  class="form-control"
                  id="inlineFormInputGroupUsername"
                  value={product.soldCount}
                  disabled
                />
              </div>
              <div className="col-2 p-2 d-flex align-items-center justify-content-center">
                <DropdownButton
                  id="dropdown-basic-button"
                  key={"secondary"}
                  variant={"secondary"}
                  title={"Modify"}
                  onClick={() => setSelectedProduct(product)}
                >
                  <Dropdown.Item
                    id={`edit-item-${index}`}
                    onClick={() => setShowEdit(true)}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`edit-item-${index}`}
                    onClick={() => setShow(true)}
                  >
                    Delete
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col d-flex justify-content-center mt-3">
              <ReactPaginate
                nextLabel="Next"
                onPageChange={paginate}
                pageCount={Math.ceil(products.length / ordersPerPage)}
                previousLabel="Prev"
                breakLabel="..."
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={page - 1}
              />
            </div>
          </div>
        </div>
      ) : (
        <AdminProductsAdd
          data={selectedProduct}
          editMode={showEdit}
          setShowEdit={setShowEdit}
        />
      )}
    </>
  );
}
export default AdminProductsEdit;

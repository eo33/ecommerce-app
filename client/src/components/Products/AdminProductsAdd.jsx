import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function AdminProductsAdd() {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    soldCount: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("image", image);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("soldCount", formData.soldCount);

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      };
      await axios.post("/products/upload", data, config);
      navigate("/admin/products");
    } catch (err) {
      console.log("error occured");
      console.error(err);
    }
  };
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div className="container">
      <div className="col">
        <h4 className="mt-3 pt-3">Add a product</h4>
        <form onSubmit={handleSubmit} className="border px-4">
          <div className="row d-flex justify-content-center">
            <div className="col-md-8 mt-3">
              <label for="name" class="form-label">
                Product's name
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Enter product's name"
                onBlur={handleFormData}
              />
              <div class="invalid-feedback">Valid name is required.</div>
            </div>
            <div className="col-md-8 mt-3">
              <label for="price" class="form-label">
                Image
              </label>
              <input
                type="file"
                class="form-control"
                id="image"
                placeholder="Enter product's price"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
              <div class="invalid-feedback">Valid file is required.</div>
            </div>
            <div className="col-md-8 mt-3">
              <label for="price" class="form-label">
                Price
              </label>
              <input
                type="number"
                class="form-control"
                id="price"
                placeholder="Enter product's price"
                onBlur={handleFormData}
                required
              />
              <div class="invalid-feedback">Valid price is required.</div>
            </div>

            <div className="col-md-8 mt-3">
              <label for="description" class="form-label">
                Description
              </label>
              <textarea
                type="textarea"
                class="form-control"
                id="description"
                placeholder="Enter product's description"
                onBlur={handleFormData}
                required
              />
              <div class="invalid-feedback">Valid description is required.</div>
            </div>

            <div className="col-md-8 mt-3">
              <label for="soldCount" class="form-label">
                Sold count
              </label>
              <input
                type="number"
                class="form-control"
                id="soldCount"
                placeholder="Enter product's sold count"
                onBlur={handleFormData}
                required
              />
              <div class="invalid-feedback">Valid number is required.</div>
            </div>
            <button type="submit" class="btn btn-light my-5 col-8 border">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AdminProductsAdd;

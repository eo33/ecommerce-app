import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function AdminProductsAdd({
  data = {},
  editMode = false,
  setShowEdit = () => {},
}) {
  let { name, price, image, description, soldCount } = data;
  let oldImage = data.image;

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(image);
  const [formData, setFormData] = useState({
    name,
    price,
    description,
    soldCount,
  });

  // Preview images
  const [previewImage, setPreviewImage] = useState(null);
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  // Handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("image", selectedImage);
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

      if (editMode === true) {
        // Edit mode
        await axios.put(`/products/${oldImage}`, data, config);
        setShowEdit(false);
      } else {
        // add mode
        await axios.post("/products/upload", data, config);
        navigate("/admin/products");
      }
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
        <h4 className="mt-3 pt-3">
          {editMode === true ? "Edit" : "Add"} a product
        </h4>
        <form onSubmit={handleSubmit} className="border px-4">
          <div className="row d-flex justify-content-center">
            {editMode ? (
              <div className="col-2">
                <button
                  className="btn btn-light border mt-2"
                  onClick={() => setShowEdit(false)}
                >
                  Back
                </button>
              </div>
            ) : null}
            <div className="col-md-8 mt-3">
              <label for="name" class="form-label">
                Product's name
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Enter product's name"
                value={formData.name}
                onChange={handleFormData}
              />
              <div class="invalid-feedback">Valid name is required.</div>
            </div>
            {editMode ? <div className="col-2"></div> : null}
            <div className="col-md-8 mt-3">
              <label for="image" class="form-label">
                {editMode === true ? "New image file" : "Image"}
              </label>

              <input
                type="file"
                class="form-control"
                id="image"
                placeholder="Enter product's price"
                onChange={handleImageChange}
              />
              {(previewImage || editMode === true) && (
                <img
                  src={previewImage || `/products/${data.image}`}
                  alt="Product Preview"
                  style={{ maxWidth: "200px" }}
                />
              )}
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
                value={formData.price}
                onChange={handleFormData}
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
                value={formData.description}
                onChange={handleFormData}
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
                value={formData.soldCount}
                onChange={handleFormData}
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

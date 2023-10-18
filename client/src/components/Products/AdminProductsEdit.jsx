import { useEffect, useState } from "react";
import axios from "axios";

function AdminProductsEdit() {
  const [products, setProducts] = useState([]);
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
  }, []);

  return (
    <div className="container">
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
            Image
          </div>
          <div className="col-3 d-flex flex-column">
            <h5 className="fw-bold">{product.name}</h5>
            <textarea name="" id="" disabled></textarea>
          </div>
          <div className="col-2 d-flex align-items-center justify-content-center">
            <div class="input-group">
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
          <div className="col-2 p-4 d-flex align-items-center justify-content-center"></div>
        </div>
      ))}
    </div>
  );
}
export default AdminProductsEdit;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/products/details/${id}`);
        const productData = response.data;
        // Set the product data to state
        setProduct(productData);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container">
      {product ? (
        <div className="row">
          <div className="col-md-6">{product.name}</div>
          <div className="col-md-3">Title</div>
          <div className="col-md-3">Add to cart</div>
        </div>
      ) : null}
    </div>
  );
}
export default ProductDetails;

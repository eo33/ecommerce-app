import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { name, image, price, description, soldCount } = product;

  useEffect(() => {
    console.log("run");
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
        <div className="row mt-5 pt-2">
          <div className="col-md-4">
            <img
              src={`/products/${image}`}
              alt="a meaningful text"
              className="img-thumbnail border-2"
            />
          </div>
          <div className="col-md-4">
            {/*PRODUCT HEADERS*/}
            <div className="row border-2 border-bottom">
              <div className="col">
                <h2 className="display-5">{name}</h2>
                <h3 className="mt-4">Sold: {soldCount}</h3>
                <h2 className="my-4">$ {price}</h2>
              </div>
            </div>
            {/*PRODUCT DESCRIPTION*/}
            <div className="row">
              <div className="col mt-3">{description}</div>
            </div>
          </div>
          <div className="col-md-4">
            <h5 className="border-2 border-bottom">Add to product</h5>
            <img
              src={`/products/${image}`}
              alt="a meaningful text"
              className="img-thumbnail border-2 w-25 mt-3"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default ProductDetails;

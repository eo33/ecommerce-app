import { useEffect } from "react";
import axios from "axios";

function Products() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/products");
        console.log(res.data.files);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  });
  return (
    <>
      {/**FILTERS*/}
      <div className="col">
        <div className="row">
          <div className="col">Filter</div>
        </div>
      </div>

      {/**PRODUCT LISTING*/}
      <div className="col">
        {/**SEARCH BAR && FILTERS*/}
        <div className="row">
          {/*SEARCH BAR*/}
          <div className="col"></div>
          {/*FILTERS*/}
          <div className="col"></div>
        </div>

        {/**CREATE A 2 by 4 grid*/}
      </div>
    </>
  );
}
export default Products;

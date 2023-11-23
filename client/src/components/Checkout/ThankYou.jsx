import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col d-flex justify-content-center">
          <h1 class="cover-heading">Thank you</h1>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col d-flex justify-content-center align-items-center">
          <p className="lead text-center">
            Your order has now been placed. You can now exit this page.
          </p>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-4 col-md-2 offset-2 offset-md-4 d-flex justify-content-center">
          <Link to="/shop" className="btn btn-secondary mt-4 w-100">
            Shop
          </Link>
        </div>
        <div className="col-4 col-md-2 d-flex justify-content-center">
          <Link to="/orders" className="btn btn-secondary mt-4 w-100">
            Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ThankYou;

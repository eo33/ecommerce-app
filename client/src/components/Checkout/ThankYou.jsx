function ThankYou() {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col d-flex justify-content-center">
          <h1 class="cover-heading">Thank you</h1>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col d-flex justify-content-center">
          <p className="lead">
            Your order has now been placed. You can now go back to the homepage.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-4 offset-4 d-flex justify-content-center">
          <button className="btn btn-secondary mt-4">Go back</button>
        </div>
      </div>
    </div>
  );
}
export default ThankYou;

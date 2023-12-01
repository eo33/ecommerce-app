import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "./LandingPage.css";

function LandingPage() {
  // Data to store carousel and recommended
  const [carouselData, setCarouselData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carousel data
        const result1 = await axios.get(`/products/random/4`);
        const carouselDataArray = result1.data;
        // Organize carouselDataArray into a 2 by 2 array
        const carouselDataGrid = [];
        for (let i = 0; i < carouselDataArray.length; i += 2) {
          const row = carouselDataArray.slice(i, i + 2);
          carouselDataGrid.push(row);
        }
        setCarouselData(carouselDataGrid);
        // Recommended data
        const result2 = await axios.get(`/products/random/3`);
        setRecommendedData(result2.data);
      } catch (err) {
        console.error(err);
      }
    };
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <div className="container">
      {/**Discover something new */}
      <div className="row mt-4">
        <div className="col">
          <h2 className="display-5">Discover something new</h2>
          <p>Low prices everyday</p>
        </div>
      </div>
      {/**Carousel */}
      <div className="row mt-3 justify-content-center">
        <div className="col-12 border rounded">
          <Carousel data-bs-theme="dark" indicators={false}>
            {carouselData.map((data) => (
              <Carousel.Item interval={5000}>
                <div className="bg-white">
                  <div className="row w-100 p-0 m-0 ">
                    <div className="col d-md-flex flex-column align-items-end px-lg-5">
                      <div className="row d-flex flex-column">
                        <Link
                          to={`/shop/${data[0].image}`}
                          className="text-decoration-none"
                        >
                          <div className="col d-flex justify-content-center p-0 m-0">
                            <img
                              className="p-3"
                              src={`/products/${data[0].image}`}
                              alt="Second slide"
                              style={{
                                maxWidth: "250px",
                              }}
                            />
                          </div>
                          <div className="col d-flex justify-content-center pb-5 m-0">
                            <h5 className="text-dark">
                              {`${data[0].name}`} - ${`${data[0].price}`}
                            </h5>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col d-md-flex flex-column align-items-start px-lg-5">
                      <div className="row d-flex flex-column">
                        <Link
                          to={`/shop/${data[1].image}`}
                          className="text-decoration-none"
                        >
                          <div className="col d-flex justify-content-center p-0 m-0">
                            <img
                              className="p-3 "
                              src={`/products/${data[1].image}`}
                              alt="Second slide"
                              style={{
                                maxWidth: "250px",
                              }}
                            />
                          </div>
                          <div className="col d-flex justify-content-center pb-5 m-0">
                            <h5 className="text-dark">
                              {`${data[1].name}`} - ${`${data[1].price}`}
                            </h5>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
      {/**Recommended for you */}
      <div className="row mt-4">
        <div className="col">
          <h2 className="display-5">Recommended for you</h2>
          <p>Check these items out</p>
        </div>
      </div>
      {/**Recommended for you cards */}
      <div className="row mb-5">
        {/**Map cards */}
        {recommendedData.map((data) => (
          <div className="col-md-4 d-flex justify-content-center ">
            <div className="card ">
              <div className="col d-flex justify-content-center align-items-center">
                <Link to={`/shop/${data.image}`}>
                  <div className="col d-flex justify-content-center p-0">
                    <img
                      className="card-img-top w-75 "
                      style={{
                        maxWidth: "250px",
                      }}
                      src={`/products/${data.image}`}
                      alt={`${data.name}`}
                    />
                  </div>
                </Link>
              </div>
              <div className="card-body">
                <div className="col d-flex justify-content-center ">
                  <h5 className="card-title m-0">{`${data.name}`}</h5>
                </div>
              </div>
              <ul class="list-group list-group-flush d-flex align-items-center">
                <li class="list-group-item w-100">
                  <p className="d-flex justify-content-center mb-0 text-bold fw-bold">
                    ${data.price}.00
                  </p>
                </li>
                <li class="list-group-item ">Sold count: {data.soldCount}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default LandingPage;

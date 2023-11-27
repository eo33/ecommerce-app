import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import ReactPaginate from "react-paginate";

function AdminHomepage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const res = await axios.get("/stats/dashboard", config);
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  // Pagination feature
  let allProducts =
    stats.length > 0
      ? stats.filter((stat) => stat.text === "Total products")[0].count
      : 0;
  const ordersPerPage = 7;
  const paginate = ({ selected }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/**Dashboard stats */}
      <div className="row my-3 border-bottom">
        <div className="col">
          <h2>Statistics</h2>
        </div>
      </div>
      <div className="row row-cols-4 g-4 ">
        {/**Map cards */}
        {stats.map((stat) => (
          <div className="col">
            <div
              className="card hover-effect"
              onClick={() => {
                navigate(stat.link);
              }}
            >
              <div className="card-body p-2 mb-5">
                <div className="card-title">{stat.text}</div>
                <h4 className="card-text fw-bold">{stat.count}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/**Table stats */}
      <div className="row my-3 border-bottom">
        <div className="col">
          <h2>Product statistics</h2>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Sold count</th>
            <th scope="col">In cart</th>
            <th scope="col">Pending</th>
            <th scope="col">Delivery</th>
            <th scope="col">Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>de</td>
            <td>de</td>
            <td>de</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>de</td>
            <td>de</td>
            <td>de</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td>de</td>
            <td>de</td>
            <td>de</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td>de</td>
            <td>de</td>
            <td>de</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td>de</td>
            <td>de</td>
            <td>de</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td>de</td>
            <td>de</td>
            <td>de</td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td>de</td>
            <td>de</td>
            <td>de</td>
          </tr>
        </tbody>
      </table>
      <div className="row">
        <div className="col d-flex justify-content-center mt-3">
          <ReactPaginate
            nextLabel="Next"
            onPageChange={paginate}
            pageCount={Math.ceil(allProducts / ordersPerPage)}
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
    </>
  );
}
export default AdminHomepage;

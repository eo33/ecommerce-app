import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

function AdminOrders() {
  const { orderStatus } = useParams();

  // State variables
  const [totalOrders, setTotalOrders] = useState(1);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  // Fetch table data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const res = await axios.get(
          `/stats/orders/${orderStatus || "all"}/${page}`,
          config
        );
        setData(res.data.orders);
        setTotalOrders(res.data.totalOrders);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [page, orderStatus]);

  // Pagination feature
  const ordersPerPage = 15;
  const paginate = ({ selected }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      {/**Table stats */}
      <div className="row my-3 border-bottom">
        <div className="col">
          <h2>Orders table{orderStatus ? `: ${orderStatus}` : null}</h2>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Date</th>
            <th scope="col">Products</th>
            <th scope="col">Status</th>
            <th scope="col">User</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{order.createdAt}</td>
              <td>
                {order.items.map((item) => (
                  <div className="row">
                    <div className="col">
                      {item.product.name} x {item.quantity} @ $
                      {item.product.price}
                    </div>
                  </div>
                ))}
              </td>
              <td>{order.status}</td>
              <td>{order.user.email}</td>
              <td>{order.address.split(",")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row">
        <div className="col d-flex justify-content-center mt-3">
          <ReactPaginate
            nextLabel="Next"
            onPageChange={paginate}
            pageCount={Math.ceil(totalOrders / ordersPerPage)}
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
    </div>
  );
}
export default AdminOrders;

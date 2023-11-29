import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function AdminOrders() {
  const { orderStatus } = useParams();

  // State variables
  const [totalOrders, setTotalOrders] = useState(1);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshData, setRefreshData] = useState(false); // to refresh data

  // Reset page to 1 when user change order status
  useEffect(() => {
    setPage(1);
  }, [orderStatus]);

  // Fetch data
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
        // format data so that it incldues the "selected" key for user
        const newData = res.data.orders.map((order) => ({
          ...order,
          selected: false,
        }));
        setData(newData);
        setTotalOrders(res.data.totalOrders);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [page, orderStatus, refreshData]);

  // useMemo
  // Logic to decide whether to show "Update status" and "Delete" button
  const showButtons = useMemo(() => {
    return data.filter((item) => item.selected).length > 0;
  }, [data]);

  // Event handler
  // Handle select event
  const handleSelect = (e, orderId) => {
    setData((prev) => {
      let result = prev.map((order) =>
        order._id === orderId ? { ...order, selected: !order.selected } : order
      );
      return result;
    });
  };
  // Handle update status
  const handleUpdateStatus = async (status) => {
    // Update in the frontend: change status and reverse select
    setData((prev) => {
      let result = prev.map((order) =>
        order.selected ? { ...order, status, selected: false } : order
      );
      return result;
    });
    // Update in the backend
    try {
      const token = localStorage.getItem("token");
      // config
      const config = {
        headers: {
          Authorization: token,
        },
      };
      // body data
      const items = data
        .map((order) =>
          order.selected ? { orderId: order._id, status } : null
        )
        .filter((order) => order);
      const body = {
        items,
      };
      // axios request
      const response = await axios.post("/orders/change-status", body, config);
      console.log(response);
      // If state is not all, refresh
      if (orderStatus) {
        setRefreshData(!refreshData);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  // Handle delete
  const handleDelete = async () => {
    // Delete from backend
    try {
      const token = localStorage.getItem("token");
      // config
      const config = {
        headers: {
          Authorization: token,
        },
      };
      // body data
      const orderId = [];
      data
        .filter((order) => order.selected)
        .forEach((data) => {
          orderId.push(data._id);
        });
      const body = {
        orderId,
      };
      const response = await axios.post("/orders/delete", body, config);

      console.log(response.data);
    } catch (err) {
      console.error(err.message);
    }
    // refresh data
    setRefreshData(!refreshData);
  };
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
        {showButtons ? (
          <div className="col d-flex justify-content-end align-items-center">
            <DropdownButton
              id="dropdown-basic-button"
              key={"secondary"}
              variant={"secondary"}
              title={"Update status"}
              onSelect={(eventKey) => {
                handleUpdateStatus(eventKey);
              }}
            >
              <Dropdown.Item id={`edit-order-pending`} eventKey="pending">
                Pending
              </Dropdown.Item>
              <Dropdown.Item id={`edit-order-delivery`} eventKey="delivery">
                Delivery
              </Dropdown.Item>
              <Dropdown.Item id={`edit-order-completed`} eventKey="completed">
                Completed
              </Dropdown.Item>
            </DropdownButton>
            <button
              type="button"
              className="btn btn-link ml-2 offset-1"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Select</th>
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
              <td>
                <input
                  className="form-check-input border border-2 p-3"
                  type="checkbox"
                  checked={order.selected}
                  onChange={(e) => handleSelect(e, order._id)}
                />
              </td>
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

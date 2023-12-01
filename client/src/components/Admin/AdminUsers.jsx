import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function AdminUsers() {
  // State variables
  const [data, setData] = useState({ users: [] });
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [page, setPage] = useState(1);

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
        const res = await axios.get(`/users/get_all/${page}`, config);

        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [page]);

  // Event handler
  // Handle select
  const handleSelect = (e, user) => {
    // Selected user information. This will later be used for form submission
    setSelectedUser(() => ({
      userId: user._id,
      newName: user.name,
      newEmail: user.email,
      newAdminStatus: user.admin,
    }));
    setShowModal(true);
  };
  // Handle form submission
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: token,
        },
      };

      await axios.post(`/users/edit`, selectedUser, config);

      // Also update the frontend
      setData((prev) => {
        const { users } = prev;
        const newUsers = users.map((user) =>
          user._id === selectedUser.userId
            ? {
                ...user,
                name: selectedUser.newName,
                email: selectedUser.newEmail,
                admin: selectedUser.newAdminStatus,
              }
            : user
        );
        return { ...prev, users: newUsers };
      });
    } catch (err) {
      console.error(err);
    }

    setShowModal(false);
  };

  // Pagination feature
  const ordersPerPage = 15;
  const paginate = ({ selected }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {showModal ? (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update fields</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmitForm}>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter new name"
                    value={selectedUser.newName}
                    onChange={(e) =>
                      setSelectedUser((prev) => ({
                        ...prev,
                        newName: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-group row py-3">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter new email"
                    value={selectedUser.newEmail}
                    onChange={(e) =>
                      setSelectedUser((prev) => ({
                        ...prev,
                        newEmail: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-2">Admin</div>
                <div className="col-sm-10">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        setSelectedUser((prev) => ({
                          ...prev,
                          newAdminStatus: !prev.newAdminStatus,
                        }));
                      }}
                      checked={selectedUser.newAdminStatus}
                    />
                    <label className="form-check-label">
                      Enable admin status
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row pt-3 mt-2 border-top">
                <div className="col d-flex justify-content-end">
                  <button type="submit" className="btn btn-success ">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      ) : null}
      <div className="row my-3 border-bottom">
        <div className="col">
          <h2>User stats</h2>
        </div>
      </div>
      {/**Users stats*/}
      <div className="row row-cols-4 g-4 ">
        {/**Total user */}
        <div className="col">
          <div className="card ">
            <div className="card-body p-2 mb-5">
              <div className="card-title">Total users</div>
              <h4 className="card-text fw-bold">{data.totalUsers}</h4>
            </div>
          </div>
        </div>
        {/**Admin user */}
        <div className="col">
          <div className="card hover-effect">
            <div className="card-body p-2 mb-5">
              <div className="card-title">Admin users</div>
              <h4 className="card-text fw-bold">{data.adminUsers}</h4>
            </div>
          </div>
        </div>
        {/**Regular user */}
        <div className="col">
          <div className="card hover-effect">
            <div className="card-body p-2 mb-5">
              <div className="card-title">Regular users</div>
              <h4 className="card-text fw-bold">{data.regularUsers}</h4>
            </div>
          </div>
        </div>
      </div>
      {/**Table stats */}
      <div className="row my-3 border-bottom">
        <div className="col">
          <h2>Users table</h2>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">Admin</th>
            <th scope="col">Modify</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((user, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.admin ? "Yes" : "No"}</td>
              <td>
                <DropdownButton
                  id="dropdown-basic-button"
                  key={"secondary"}
                  variant={"secondary"}
                  title={"Modify"}
                  onSelect={(e) => handleSelect(e, user)}
                >
                  <Dropdown.Item eventKey="edit">Edit</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row">
        <div className="col d-flex justify-content-center mt-3">
          <ReactPaginate
            nextLabel="Next"
            onPageChange={paginate}
            pageCount={Math.ceil(data.totalUsers / ordersPerPage)}
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
export default AdminUsers;

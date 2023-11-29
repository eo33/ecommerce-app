import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./Admin.css";
import { Outlet } from "react-router-dom";

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isOpen = activeEventKey === eventKey;

  return (
    <button
      type="button"
      class="btn px-1 py-0 text-start border-0 text-dark fw-normal sidebar-button w-100 d-flex justify-content-between align-items-center"
      onClick={decoratedOnClick}
    >
      {children}
      <i
        className={`fas fa-chevron-down ${
          isOpen ? "rotate-down" : "rotate-right"
        }`}
      ></i>
    </button>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="row">
      <div className="px-1 bg-white border-end col-3 col-md-2 sidebar ">
        <p className="fs-5 fw-semibold border-bottom py-2 mb-2">Admin pages</p>

        <Card className="border-0">
          <Card.Header className="border-0 bg-white p-0 m-0 w-100 sidebar-button">
            <button
              type="button"
              class="btn px-1 py-0 text-start border-0 text-dark fw-normal sidebar-button w-100"
              onClick={() => navigate("/admin")}
            >
              Home
            </button>
          </Card.Header>
        </Card>
        <Accordion defaultActiveKey="null">
          <Card className="border-0">
            <Card.Header className="border-0 bg-white p-0 m-0">
              <ContextAwareToggle eventKey="0">Products</ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body style={{ margin: "0", padding: "0" }}>
                <ul
                  className="btn-toggle-nav list-unstyled fw-normal pb-1 small m-0 px-3"
                  style={{ margin: "0" }}
                >
                  <li>
                    <button
                      type="button"
                      class="btn btn-sm px-1 py-0 text-start border-0 sidebar-button w-100"
                      onClick={() => navigate("products/add")}
                    >
                      Add
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="btn btn-sm px-1 py-0 text-start border-0 sidebar-button w-100"
                      onClick={() => navigate("products")}
                    >
                      Manage
                    </button>
                  </li>
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion defaultActiveKey="null">
          <Card className="border-0">
            <Card.Header className="border-0 bg-white p-0 m-0">
              <ContextAwareToggle eventKey="1">Orders</ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body style={{ margin: "0", padding: "0" }}>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small m-0 px-3">
                  <li>
                    <button
                      type="button"
                      class="btn btn-sm px-1 py-0 text-start border-0 sidebar-button w-100"
                      onClick={() => navigate("orders")}
                    >
                      All
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="btn btn-sm px-1 py-0 text-start border-0 sidebar-button w-100"
                      onClick={() => navigate("orders/pending")}
                    >
                      Pending
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="btn btn-sm px-1 py-0 text-start border-0 sidebar-button w-100"
                      onClick={() => navigate("orders/delivery")}
                    >
                      Delivery
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="btn btn-sm px-1 py-0 text-start border-0 sidebar-button w-100"
                      onClick={() => navigate("orders/completed")}
                    >
                      Completed
                    </button>
                  </li>
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion defaultActiveKey="null" className="mb-2">
          <Card className="border-0">
            <Card.Header className="border-0 bg-white p-0 m-0">
              <ContextAwareToggle eventKey="1">Users</ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body style={{ margin: "0", padding: "0" }}>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small m-0 px-3">
                  <li>
                    <button
                      type="button"
                      class="btn btn-sm px-1 py-0 text-start border-0 sidebar-button w-100"
                      onClick={() => navigate("users")}
                    >
                      Manage
                    </button>
                  </li>
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
      <div className="col-9 col-md-10 border-left sidebar-border">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Sidebar;

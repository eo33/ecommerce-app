import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";

const PINK = "rgba(255, 192, 203, 0.6)";
const BLUE = "rgba(255, 192, 203, 0.6)";

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <div type="button" onClick={decoratedOnClick}>
      {children}
    </div>
  );
}
function AdminHomepage() {
  return (
    <div
      className="flex-shrink-0 p-3 bg-white border"
      style={{ width: "280px" }}
    >
      <a
        href="/"
        className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
      >
        <svg className="bi me-2" width="30" height="24"></svg>
        <span className="fs-5 fw-semibold">Collapsible</span>
      </a>
      <Accordion defaultActiveKey="0">
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
                  <a href="#" className="link-dark rounded">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#" className="link-dark rounded">
                    Updates
                  </a>
                </li>
                <li>
                  <a href="#" className="link-dark rounded">
                    Reports
                  </a>
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* Add similar Card components for other sections */}
      </Accordion>
      <Accordion defaultActiveKey="1">
        <Card className="border-0">
          <Card.Header className="border-0 bg-white p-0 m-0">
            <ContextAwareToggle eventKey="1">Orders</ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body style={{ margin: "0", padding: "0" }}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small m-0 px-3">
                <li>
                  <a href="#" className="link-dark rounded">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#" className="link-dark rounded">
                    Updates
                  </a>
                </li>
                <li>
                  <a href="#" className="link-dark rounded">
                    Reports
                  </a>
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* Add similar Card components for other sections */}
      </Accordion>
    </div>
  );
}
export default AdminHomepage;

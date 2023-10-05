import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <>Logged in - show dashboard {token}</>;
}
export default Dashboard;

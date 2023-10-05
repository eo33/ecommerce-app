import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../Context/LoginContext";
import axios from "axios";

function LoginForm({ setSignUpMode }) {
  // Login context
  const { setLoggedIn } = useContext(LoginContext);
  // To route to dashboard after signing up
  const navigate = useNavigate();

  // States for login form and server-side validation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send request to API
      const body = JSON.stringify({ email, password });
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const res = await axios.post("/auth/login", body, config);
      // Store token in local storage
      localStorage.setItem("token", res.data.token);
      // Set log in to true in the context api
      setLoggedIn(true);
      // Go to dashboard
      navigate("/dashboard");
    } catch (err) {
      setIsValid(false);
      console.error(err);
    }
    //
  };

  return (
    <div className="col-12 offset-lg-2 mt-4 col-md-6 col-lg-4 mt-md-4 pt-md-4">
      <form onSubmit={handleSubmit}>
        {/*TITLE*/}
        <div className="row mb-md-4">
          <h5 className="col-md-7 extra-bold">Login here:</h5>
        </div>
        {/*EMAIL INPUT*/}
        <div className="form-group">
          <label htmlFor="login-email" className="mt-4">
            Email
          </label>
          <input
            type="email"
            class={`form-control form-control-lg ${
              isValid ? "valid" : "is-invalid"
            }`}
            id="login-email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsValid(true);
            }}
          />
          <div class="invalid-feedback">Email or password invalid</div>
        </div>
        {/*PASSWORD INPUT*/}
        <div className="form-group">
          <label htmlFor="login-pw" className="mt-2">
            Password
          </label>
          <input
            type="password"
            class={`form-control form-control-lg ${
              isValid ? "valid" : "is-invalid"
            }`}
            id="login-password"
            aria-describedby="passwordHelp"
            placeholder=""
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsValid(true);
            }}
          />
          <div class="invalid-feedback">Email or password invalid</div>
        </div>
        {/*LOGIN BUTTON + SIGNUP BUTTON*/}
        <div className="form-group mt-5">
          <button type="submit" class="btn btn-dark w-100">
            Submit
          </button>
          <button
            type="button"
            class="btn btn-light w-100 mt-3 border border-dark"
            onClick={() => setSignUpMode(true)}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
export default LoginForm;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../Context/LoginContext";
import axios from "axios";

function SignupForm() {
  // Login Context
  const { setAuthenticated } = useContext(LoginContext);
  // To route to dashboard after signing up
  const navigate = useNavigate();

  // States for signup form and validation
  const [accountForm, setAccountForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });
  // Password validation for signup form (Client side)
  const [matchPassword, setMatchPassword] = useState(true);
  // Form validation from server
  const [isValid, setIsValid] = useState(true);

  const handleForm = (e) => {
    setAccountForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { first_name, last_name, email, password, password2 } = accountForm;
    if (password !== password2) {
      setMatchPassword(false);
    } else {
      setMatchPassword(true);
      let name = first_name + " " + last_name;
      const newUser = {
        name,
        email,
        password,
        admin: false,
      };
      try {
        // Send request to API
        var body = JSON.stringify(newUser);
        var config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await axios.post("/auth/register", body, config);

        // Store token (API response) in local storage
        localStorage.setItem("token", res.data.token);
        // Set log in to true in the context api
        setAuthenticated(true);
        // Go to dashboard
        navigate("/");
      } catch (err) {
        setIsValid(false);
        console.error(err);
      }
    }
  };

  return (
    <div className="col-12 offset-lg-2 mt-4 col-md-6 col-lg-4 mt-md-4 pt-md-4">
      <form onSubmit={handleSubmit} novalidate>
        {/*TITLE*/}
        <div className="row mb-md-4">
          <h5 className="col-md-7 bold">Create your account for free</h5>
        </div>
        {/*FIRST NAME INPUT*/}
        <div className="form-group">
          <label htmlFor="first_name" className="mt-4">
            First name
          </label>
          <input
            type="text"
            class="form-control form-control-lg"
            id="first_name"
            aria-describedby="firstnamelHelp"
            placeholder="Enter first name"
            required
            value={accountForm.first_name}
            onChange={(e) => handleForm(e)}
          />
        </div>
        {/*LAST NAME INPUT*/}
        <div className="form-group">
          <label htmlFor="last_name" className="mt-4">
            Last name
          </label>
          <input
            type="text"
            class="form-control form-control-lg"
            id="last_name"
            aria-describedby="firstnamelHelp"
            placeholder="Enter last name"
            required
            value={accountForm.last_name}
            onChange={(e) => handleForm(e)}
          />
        </div>
        {/*EMAIL INPUT*/}
        <div className="form-group">
          <label htmlFor="email" className="mt-4">
            Email
          </label>
          <input
            type="text"
            class={`form-control form-control-lg ${
              isValid ? "-valid" : "is-invalid"
            }`}
            id="email"
            aria-describedby="firstnamelHelp"
            placeholder="Enter your email"
            required
            value={accountForm.email}
            onChange={(e) => {
              handleForm(e);
              setIsValid(true);
            }}
          />
          <div class="invalid-feedback">
            An account with this email already exist
          </div>
        </div>
        {/*PASSWORD INPUT*/}
        <div className="form-group">
          <label htmlFor="password" className="mt-2">
            Password
          </label>
          <input
            type="password"
            class={`form-control form-control-lg ${
              matchPassword ? "valid" : "is-invalid"
            }`}
            id="password"
            aria-describedby="passwordHelp"
            placeholder=""
            required
            value={accountForm.password}
            onChange={(e) => {
              handleForm(e);
              setMatchPassword(true);
            }}
          />
        </div>
        {/*SECOND PASSWORD INPUT*/}
        <div className="form-group">
          <label htmlFor="second_password" className="mt-2">
            Re-type Password
          </label>
          <input
            type="password"
            class={`form-control form-control-lg ${
              matchPassword ? "valid" : "is-invalid"
            }`}
            id="password2"
            aria-describedby="passwordHelp"
            placeholder=""
            required
            value={accountForm.password2}
            onChange={(e) => {
              handleForm(e);
              setMatchPassword(true);
            }}
          />
          <div class="invalid-feedback">Passwords do not match</div>
        </div>
        {/*SUBMIT BUTTON*/}
        <div className="form-group mt-5">
          <button
            type="submit"
            class={`btn btn-dark w-100 ${
              matchPassword && isValid ? "enabled" : "disabled"
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default SignupForm;

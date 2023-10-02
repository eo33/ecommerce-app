import "./Login.css";
import { useState } from "react";

function LoginForm({ setSignUpMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <div className="col-12 offset-lg-2 mt-4 col-md-6 col-lg-4 mt-md-4 pt-md-4">
      <form onSubmit={handleSubmit}>
        {/*TITLE*/}
        <div className="row mb-md-4">
          <h5 className="col-md-7 bold">Login here:</h5>
        </div>
        {/*EMAIL INPUT*/}
        <div className="form-group">
          <label htmlFor="login-email" className="mt-4">
            Email
          </label>
          <input
            type="email"
            class="form-control form-control-lg"
            id="login-email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {/*PASSWORD INPUT*/}
        <div className="form-group">
          <label htmlFor="login-pw" className="mt-2">
            Password
          </label>
          <input
            type="password"
            class="form-control form-control-lg"
            id="login-password"
            aria-describedby="passwordHelp"
            placeholder=""
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
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

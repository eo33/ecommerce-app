import { useState } from "react";
import axios from "axios";

function SignupForm() {
  const [accountForm, setAccountForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleForm = (e) => {
    setAccountForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("yes");
    let { first_name, last_name, email, password, password2 } = accountForm;
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      let name = first_name + " " + last_name;
      const newUser = {
        name,
        email,
        password,
        admin: false,
      };
      try {
        var body = JSON.stringify(newUser);
        var config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await axios.post("/register", body, config);
        console.log(res);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <div className="col-12 offset-lg-2 mt-4 col-md-6 col-lg-4 mt-md-4 pt-md-4">
      <form onSubmit={handleSubmit}>
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
            class="form-control form-control-lg"
            id="email"
            aria-describedby="firstnamelHelp"
            placeholder="Enter your email"
            required
            value={accountForm.email}
            onChange={(e) => handleForm(e)}
          />
        </div>
        {/*PASSWORD INPUT*/}
        <div className="form-group">
          <label htmlFor="password" className="mt-2">
            Password
          </label>
          <input
            type="password"
            class="form-control form-control-lg"
            id="password"
            aria-describedby="passwordHelp"
            placeholder=""
            required
            value={accountForm.password}
            onChange={(e) => handleForm(e)}
          />
        </div>
        {/*SECOND PASSWORD INPUT*/}
        <div className="form-group">
          <label htmlFor="second_password" className="mt-2">
            Re-type Password
          </label>
          <input
            type="password"
            class="form-control form-control-lg"
            id="password2"
            aria-describedby="passwordHelp"
            placeholder=""
            required
            value={accountForm.password2}
            onChange={(e) => handleForm(e)}
          />
        </div>
        {/*SUBMIT BUTTON*/}
        <div className="form-group mt-5">
          <button type="submit" class="btn btn-dark w-100">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default SignupForm;

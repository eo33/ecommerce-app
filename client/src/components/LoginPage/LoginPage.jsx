import LoginText from "./LoginText";
import LoginForm from "./LoginForm";
import { useState } from "react";
import SignupForm from "./SignupForm";

function LoginPage() {
  const [signUpMode, setSignUpMode] = useState(false);

  return (
    <div className="container">
      <div className="row mt-3 pt-3 mt-md-5 pt-md-5">
        <LoginText signUpMode={signUpMode} setSignUpMode={setSignUpMode} />
        {signUpMode === true ? (
          <SignupForm />
        ) : (
          <LoginForm setSignUpMode={setSignUpMode} />
        )}
      </div>
    </div>
  );
}
export default LoginPage;

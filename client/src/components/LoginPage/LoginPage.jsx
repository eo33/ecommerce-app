import LoginText from "./LoginText";
import LoginForm from "./LoginForm";
import { useState } from "react";
import SignupForm from "./SignupForm";

function LoginPage() {
  const [signUpMode, setSignUpMode] = useState(false);

  return (
    <div className="container">
      <div className="row mt-3 pt-3 mt-md-5 pt-md-5">
        {/**LEFT CONTAINER FOR TEXT*/}
        <LoginText signUpMode={signUpMode} setSignUpMode={setSignUpMode} />
        {/**RIGHT CONTAINER FOR FORMS*/}
        {signUpMode ? (
          <SignupForm />
        ) : (
          <LoginForm setSignUpMode={setSignUpMode} />
        )}
      </div>
    </div>
  );
}
export default LoginPage;

import LoginText from "./LoginText";
import LoginForm from "./LoginForm";
import { useState } from "react";
import SignupForm from "./SignupForm";

function LoginPage({ isLoggedIn, setIsLoggedIn }) {
  const [signUpMode, setSignUpMode] = useState(false);

  return (
    <div className="container">
      <div className="row mt-3 pt-3 mt-md-5 pt-md-5">
        <LoginText signUpMode={signUpMode} setSignUpMode={setSignUpMode} />
        {signUpMode === true ? (
          <SignupForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm
            setSignUpMode={setSignUpMode}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </div>
    </div>
  );
}
export default LoginPage;

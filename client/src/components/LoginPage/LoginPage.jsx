import LoginText from "./LoginText";
import LoginForm from "./LoginForm";
import { useState } from "react";

function LoginPage() {
  const [signUpMode, setSignUpMode] = useState(false);

  return (
    <div className="container">
      <div className="row">
        <LoginText signUpMode={signUpMode} />
        <LoginForm />
      </div>
    </div>
  );
}
export default LoginPage;

function LoginText({ signUpMode }) {
  return (
    <div className="col-6 col-md-6 mt-md-4 pt-md-4">
      <div className="row">
        <div className="col-md-7 display-5">
          {signUpMode === true
            ? "Create an account today"
            : "Login in to your account"}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-5">
          {signUpMode === true
            ? "Already have an account? Log in here"
            : "Get a personalized experience by logging in to your account"}
        </div>
      </div>
    </div>
  );
}
export default LoginText;

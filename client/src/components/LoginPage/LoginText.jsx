function LoginText({ signUpMode, setSignUpMode }) {
  return (
    <div className="col-12 col-md-6 mt-4 mt-md-4 pt-md-4">
      <div className="row">
        <div className="col-md-10 display-5">
          {signUpMode === true
            ? "Create an account today"
            : "Login in to your account"}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-10">
          {signUpMode === true ? (
            <>
              Already have an account?
              <button
                class="btn-link bg-white border-0"
                href="/#"
                onClick={() => {
                  setSignUpMode(false);
                }}
              >
                Login here
              </button>
            </>
          ) : (
            "Get a personalized experience by logging in to your account"
          )}
        </div>
      </div>
    </div>
  );
}
export default LoginText;

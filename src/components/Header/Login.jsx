import styles from "./Header.module.scss";

function Login() {
  // console.log(styles);
  return (
    <div className="opaque">
      <div className="sign-in-form">
        <form action="/login" method="POST" className="form-container">
          <i className="fa-solid fa-xmark fa-xl"></i>
          <h1>HELLO!</h1>
          <p>Sign in with your email here.</p>
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <p className="register-link-text">
            Don't have an account?{" "}
            <a className="sign-up-link" href="#">
              Sign up
            </a>
          </p>
          <button type="submit" className="btn">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

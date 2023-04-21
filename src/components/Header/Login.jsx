import Button from "../Button";
import styles from "./Header.module.scss";

function Login({ login, setShowLogin }) {
  const loginUser = () => {
    login();
    setShowLogin(false);
  };
  return (
    <div className={styles.opaque} onClick={() => setShowLogin(false)}>
      <div className={styles["sign-in-form"]}>
        <form
          action="/api/login"
          method="POST"
          className={styles["form-container"]}
        >
          <h2>HELLO!</h2>
          <p>Sign in with your email here.</p>
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <p className={styles["register-link-text"]}>
            Don't have an account?{" "}
            <a className={styles["sign-up-link"]} href="#">
              Sign up
            </a>
          </p>
          <Button btnText="Sign in" custom="sign-in-popup" onClick={loginUser} />
        </form>
      </div>
    </div>
  );
}

export default Login;

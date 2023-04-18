import Button from "@component/components/Button";
import styles from "./Test.module.scss";

export default function Test() {
  return (
    <>
      <div id={styles["test-users-container"]}>
        <div id={styles["test-users"]}>
          <h3>Would you like to test this application?</h3>
          <p id={styles["test-users-subtext"]}>
            Use one of the logins below if you would like to continue without
            creating your own account.
          </p>
          <Button btnText="Login" />
        </div>
        <section id={styles["test-user-info"]}>
          <div>
            <p>User 1</p>
            <p>Email: janedoe@doe.com</p>
            <p>Password: password</p>
          </div>

          <div>
            <p>User 2</p>
            <p>Email: johndoe@doe.com</p>
            <p>Password: password</p>
          </div>
        </section>
      </div>
    </>
  );
}

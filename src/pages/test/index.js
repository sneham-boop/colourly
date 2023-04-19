import Button from "@component/components/Button";
import styles from "./Test.module.scss";
import TestUser from "@component/components/TestUser";

export default function Test() {
  return (
    <>
      <div className={styles["test-users-container"]}>
        <div className={styles["test-users"]}>
          <h3>Testing</h3>
          <p className={styles["test-users-subtext"]}>
            Would you like to test this application? Use one of the logins below
            if you would like to continue without creating your own account.
          </p>
          <Button btnText="Login" custom="sign-in"/>
        </div>
        <section className={styles["test-user-info"]}>
          <TestUser
            user="HUGS BUNNY"
            email="hugs@hugs.com"
            password="password"
          />
          <TestUser
            user="BELLY BURTADO"
            email="belly@belly.com"
            password="password"
          />
        </section>
      </div>
    </>
  );
}

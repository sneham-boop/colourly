import Button from "../Button";
import Logo from "./Logo";
import Link from "next/link";
import styles from "./Header.module.scss";
import useUser from "../../hooks/useUser";
import { useState, useEffect } from "react";
import useLocalStorage from "@component/hooks/useLocalStorage";
import Login from "./Login";

export default function Header({ user, login, logout }) {
  const [showLogin, setShowLogin] = useState(false);
  const loginLogout = () => {
    if (!user) {
      return (
        <Button
          btnText={"Sign In"}
          custom="sign-in"
          onClick={() => setShowLogin(true)}
        />
      );
    } else {
      return <Button btnText={"Sign Out"} custom="sign-in" onClick={logout} />;
    }
  };

  return (
    <>
      <nav id="navbar" className={styles.nav}>
        <Link href="/">
          <Logo />
        </Link>
        <div className={styles["nav-right-group"]}>
          <Link href="/explore">Explore Trends</Link>
          {/* <Link href="/test">Test Users</Link> */}
          {/* <Link href="/saved">Saved Palettes</Link> */}
          <Link href="/created">Your Palettes</Link>
          <Link href="/create">Create</Link>
          <Link href="/faqs">FAQs</Link>
          {loginLogout()}
        </div>
        {showLogin && <Login login={login} setShowLogin={setShowLogin} />}
      </nav>
    </>
  );
}

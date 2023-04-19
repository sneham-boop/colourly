import Footer from "../Footer";
import Header from "../Header";
import styles from "./Main.module.scss";
import { useState, useEffect } from "react";
import useLocalStorage from "@component/hooks/useLocalStorage";

export default function MainLayout({ children }) {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [user, setUser] = useState(null || getLocalStorage("colourlyAppUser"));

  function login() {
    setUser("643d9048adff9ee815ca93db");
  }

  function logout() {
    setUser(null);
  }

  useEffect(() => {
    setLocalStorage("colourlyAppUser", user);
  }, [user]);

  return (
    <>
      <div className={styles.main}>
        <Header user={user} login={login} logout={logout}/>
        {children}
        <Footer />
      </div>
    </>
  );
}

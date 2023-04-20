import Footer from "../Footer";
import Header from "../Header";
import styles from "./Main.module.scss";
import { useState, useEffect } from "react";
import useLocalStorage from "@component/hooks/useLocalStorage";
import axios from "axios";

export default function MainLayout({ children }) {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [user, setUser] = useState(null);

  async function login() {
    setUser("643d9048adff9ee815ca93db");
    setLocalStorage("colourlyAppUser", "643d9048adff9ee815ca93db");
    // axios.defaults.withCredentials = true;
    document.cookie = "user=643d9048adff9ee815ca93db";
    try {
      const { data, status } = await axios({
        method: "post",
        url: `/api/login`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    document.cookie = "user=null";
    setUser(null);
    setLocalStorage("colourlyAppUser", null);
    try {
      const { data, status } = await axios({
        method: "post",
        url: `/api/logout`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const user = getLocalStorage("colourlyAppUser");
    setUser(user);
  }, []);

  return (
    <>
      <div className={styles.main}>
        <Header user={user} login={login} logout={logout} />
        {children}
        <Footer />
      </div>
    </>
  );
}

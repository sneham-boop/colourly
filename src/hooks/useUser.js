import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useUser() {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [user, setUser] = useState(getLocalStorage("colourlyAppUser"));

  function login(email, password) {
    // return axios
    //   .post("https://werun-server.herokuapp.com/api/login", { email, password })
    //   .then((response) => {
    //     const { user } = response.data;
    //     setUser(user);
    //     return true;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setUser("643d9048adff9ee815ca93db");
  }

  function logout() {
    // return axios
    //   .post("https://werun-server.herokuapp.com/api/logout")
    //   .then(() => {
    //     setUser(null);
    //     setRunnerRuns(null);
    //     setPlannerRuns(null);
    //     return null;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setUser(null);
    // setLocalStorage("colourlyAppUser", null );
  }

  // useEffect(() => {
  //   const currentUser = getLocalStorage("colourlyAppUser");
  //   setUser(currentUser);
  // }, []);

  useEffect(() => {
    setLocalStorage("colourlyAppUser", user );
  }, [user]);

  return {
    user,
    login,
    logout,
  };
}

export default function useLocalStorage() {
  function setLocalStorage(key, value) {
    try {
      if (window) window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.log(
        `ERROR: While setting local storage for key value pair: ${key} & ${value}`,
        err
      );
    }
  }

  function getLocalStorage(key, initialValue) {
    try {
      if (window !== undefined) {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : initialValue;
      } else {
        console.log("Running on server.")
      }
    } catch (err) {
      console.log(
        `ERROR: While setting local storage for key value pair: ${key} & ${initialValue}`
      );
      return initialValue;
    }
  }

  return { setLocalStorage, getLocalStorage };
}

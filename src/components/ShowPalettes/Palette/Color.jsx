import styles from "../ShowPalettes.module.scss";
import { useState, useEffect } from "react";

export default function Color({ color }) {
  const [copy, setCopy] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const handleClick = (e) => {
    const colourValue = e.target.innerHTML;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(colourValue).then(() => {
        setShowCheck(true);
        console.log("I copied!!!", colourValue);
      });
    } else {
      console.log("Browser Not compatible");
    }
  };

  useEffect(() => {
    const resetColorTimer = setTimeout(() => {
      setShowCheck(false);
    }, 1000);
    return () => {
      clearTimeout(resetColorTimer);
    };
  }, [handleClick, showCheck]);

  return (
    <>
      <span
        className={styles.colour}
        style={{ backgroundColor: `${color}` }}
        onClick={(e) => handleClick(e)}
      >
        {!showCheck && color}
        {showCheck && <span className="material-symbols-rounded">done</span>}
      </span>
    </>
  );
}

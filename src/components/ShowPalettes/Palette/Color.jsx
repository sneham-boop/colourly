import styles from "../ShowPalettes.module.scss";
import { useState, useEffect } from "react";

export default function Color({ color }) {
  const [showCheckmark, setShowCheckmark] = useState(false);

  const handleClick = (e) => {
    const colourValue = e.target.innerHTML;
    navigator.clipboard.writeText(colourValue).then(() => {
      setShowCheckmark(true);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCheckmark(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [handleClick, showCheckmark]);

  return (
    <>
      <span
        className={styles.colour}
        style={{ backgroundColor: `${color}` }}
        onClick={(e) => handleClick(e)}
      >
        {!showCheckmark && color.toUpperCase()}
        {showCheckmark && (
          <span className="material-symbols-rounded">done</span>
        )}
      </span>
    </>
  );
}

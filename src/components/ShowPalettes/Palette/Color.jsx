import styles from "../ShowPalettes.module.scss";
import { useState, useEffect } from "react";
import checkDarkness from "../../../../helpers/checkDarkness";

export default function Color({ color }) {
  const [showColor, setShowColor] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [textColour, setTextColour] = useState("#FFF");

  const handleClick = (e) => {
    const colourValue = e.target.innerHTML;
    navigator.clipboard.writeText(colourValue).then(() => {
      setShowCheck(true);
      setShowColor(false);
    });
  };

  const handleMouseEnter = () => {
    setShowColor(true);
  };

  const handleMouseLeave = () => {
    setShowColor(false);
    setShowCheck(false);
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowCheck(false);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [handleClick, showColor]);

  useEffect(() => {
    const isDark = checkDarkness(color);
    isDark ? setTextColour("#FFF") : setTextColour("#000");
  }, [textColour]);

  return (
    <>
      <span
        className={styles.colour}
        style={{ backgroundColor: `${color}`, color: `${textColour}` }}
        onClick={(e) => handleClick(e)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showColor && !showCheck && color.toUpperCase()}
        {!showColor && showCheck && (
          <span className="material-symbols-rounded">done</span>
        )}
      </span>
    </>
  );
}

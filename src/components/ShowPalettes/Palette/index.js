import Color from "./Color";
import styles from "../ShowPalettes.module.scss";
import { useState } from "react";

function Menu() {
  return (
    <ul>
      <li>
        <span className="material-symbols-rounded">open_in_full</span>
        <p>View fullscreen</p>
      </li>
      <li>
        <span className="material-symbols-rounded">favorite</span>
        <span>Unsave</span>
      </li>
      <li>
        <span className="material-symbols-rounded">delete</span>
        <span>Delete</span>
      </li>
    </ul>
  );
}

export default function Palette({ palette }) {
  const [showMenu, setShowMenu] = useState(false);
  const showColours = (palette) => {
    return palette.map((colour, id) => {
      return <Color key={id} color={`#${colour}`} />;
    });
  };
  const handleClick = (e) => {
    setShowMenu(true);
  };
  const handleMouseDown = (e) => {
    setShowMenu(false);
  };
  return (
    <>
      <div className={styles["single-combination"]}>
        <section className={styles.combination}>{showColours(palette)}</section>
        <div className={styles["combination-info"]}>
          <span className="material-symbols-rounded">favorite</span>
          <p className={styles["likes"]}>6786</p>
          <span
            className="material-symbols-rounded"
            onClick={(e) => handleClick(e)}
            onMouseDown={(e) => handleMouseDown(e)}
          >
            more_horiz
          </span>
          {showMenu && <Menu />}
        </div>
      </div>
    </>
  );
}

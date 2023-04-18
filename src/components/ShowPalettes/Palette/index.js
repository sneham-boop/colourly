import Color from "./Color";
import styles from "../ShowPalettes.module.scss";
import { useState } from "react";
import Menu from "./Menu";
import Favourite from "./Favourite";

export default function Palette({ palette, setPalette, openFullScreen }) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: "", y: "" });
  const showColours = (palette) => {
    return palette.map((colour, id) => {
      return <Color key={id} color={`#${colour}`} />;
    });
  };
  const handleClick = (e) => {
    setShowMenu(true);
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };
  const handleMouseDown = (selection) => {
    if (selection === "full") {
      setPalette(palette);
      openFullScreen();
    }
    setShowMenu(false);
  };
  return (
    <>
      <div className={styles["single-combination"]}>
        <section className={styles.combination}>{showColours(palette)}</section>
        <div className={styles["combination-info"]}>
          <Favourite />
          <p className={styles["likes"]}>6786</p>
          <span
            className="material-symbols-rounded"
            onClick={(e) => handleClick(e)}
          >
            more_horiz
          </span>
          {showMenu && (
            <Menu onSelect={handleMouseDown} position={menuPosition} />
          )}
        </div>
      </div>
    </>
  );
}

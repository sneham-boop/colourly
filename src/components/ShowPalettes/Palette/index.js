import Color from "./Color";
import styles from "../ShowPalettes.module.scss";
import { useState } from "react";
import Menu from "./Menu";
import Favourite from "./Favourite";
import axios from "axios";
import { useRouter } from 'next/router';

export default function Palette({
  id,
  palette,
  setPalette,
  openFullScreen,
  likes,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: "", y: "" });
  const router = useRouter();
  
  const showColours = (palette) => {
    return palette.map((colour, id) => {
      return <Color key={id} color={`#${colour}`} />;
    });
  };
  const handleClick = (e) => {
    setShowMenu(true);
    setMenuPosition({ x: e.pageX, y: e.pageY });
  };
  const handleMouseDown = (selection) => {
    if (selection === "full") {
      setPalette(palette);
      openFullScreen();
    }

    if (selection === "delete") {
      deletePalette();
    }
    setShowMenu(false);
  };

  const deletePalette = async () => {
    console.log("Request to delete palette id: ", id);
    try {
      const { data, status } = await axios({
        method: "delete",
        url: `/api/palettes/${id}`,
      });

      const { success } = data;
      if (success) console.log("Palette deleted!!!");

      // // Unsuccessful
      // if (status !== 200 || !userArray || error) return false;

      // Success
      router.push("/explore");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles["single-combination"]}>
        <section className={styles.combination}>{showColours(palette)}</section>
        <div className={styles["combination-info"]}>
          <Favourite />
          <p className={styles["likes"]}>{likes}</p>
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

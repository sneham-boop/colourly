import styles from "./FullScreenPalette.module.scss";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useEffect } from "react";

export default function FullScreenPalette({ palette, closeFullScreen }) {
  useEffect(() => {
    console.log("You are displaying this palette on your full screen", palette);
  }, []);
  return (
    <div className={styles["palette-fullscreen"]}>
      <CancelRoundedIcon
        id={styles["palette-fullscreen-cancel"]}
        onClick={closeFullScreen}
      />
      <div className={styles["palette-fullscreen-palette"]}>
        {palette &&
          palette.map((colour, id) => {
            return <span key={id} style={{ backgroundColor: `#${colour}` }} />;
          })}
      </div>
    </div>
  );
}

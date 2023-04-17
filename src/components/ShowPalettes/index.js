import Palette from "./Palette";
import styles from "./ShowPalettes.module.scss";

export default function ShowPalettes({ palettes }) {
  return (
    <>
      <div id={styles["combinations-container"]}>
        {palettes &&
          palettes.map((palette, id) => {
            return <Palette key={id} palette={palette.colours} />;
          })}
      </div>
    </>
  );
}

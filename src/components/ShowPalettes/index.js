import Palette from "./Palette";
import styles from "./ShowPalettes.module.scss";

export default function ShowPalettes({ palettes, setPalette, openFullScreen }) {
  return (
    <>
      <div id={styles["combinations-container"]}>
        {palettes &&
          palettes.map((palette, id) => {
            return (
              <Palette
                key={id}
                palette={palette.colours}
                setPalette={setPalette}
                openFullScreen={openFullScreen}
              />
            );
          })}
      </div>
    </>
  );
}

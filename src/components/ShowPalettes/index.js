import Intro from "./Intro";
import Palette from "./Palette";
import styles from "./ShowPalettes.module.scss";

export default function ShowPalettes({ palettes, setPalette, openFullScreen, heading, description }) {
  const displayPalettes = (palettes) => {
    return (
      // palettes &&
      palettes.map((palette, id) => {
        return (
          <Palette
            key={id}
            id={palette._id}
            palette={palette.colours}
            likes={palette.likes}
            setPalette={setPalette}
            openFullScreen={openFullScreen}
          />
        );
      })
    );
  };
  return (
    <>
      <div className={styles["show-palettes"]}>
        <Intro heading={heading} description={description}/>
        <div id={styles["palettes-container"]}>{displayPalettes(palettes)}</div>
      </div>
    </>
  );
}

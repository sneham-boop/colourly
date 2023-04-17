import Color from "./Color";
import styles from "../ShowPalettes.module.scss";

export default function Palette({ palette }) {
  const showColours = (palette) => {
    return palette.map((colour, id) => {
      return <Color key={id} color={`#${colour}`} />;
    });
  };
  return (
    <>
      <div className={styles["single-combination"]}>
        <section className={styles.combination}>{showColours(palette)}</section>
        <div className={styles["combination-info"]}>
          <span className="material-symbols-rounded">favorite</span>
          <p className={styles["likes"]}>6786</p>
          <span className="material-symbols-rounded">more_horiz</span>
        </div>
      </div>
    </>
  );
}

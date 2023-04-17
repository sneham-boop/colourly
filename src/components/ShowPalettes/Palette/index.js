import Color from "./Color";
import styles from "../ShowPalettes.module.scss";

export default function Palette({}) {
  return (
    <>
      <div className={styles["single-combination"]}>
        <section className={styles.combination}>
          <Color color="Red" />
          <Color color="Green" />
          <Color color="Yellow" />
          <Color color="Black" />
        </section>
        <div className={styles["combination-info"]}>
          <span className="material-symbols-rounded">favorite</span>
          <p className={styles["likes"]}>6786</p>
          <span className="material-symbols-rounded">more_horiz</span>
        </div>
      </div>
    </>
  );
}

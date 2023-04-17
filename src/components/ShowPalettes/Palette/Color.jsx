import styles from "../ShowPalettes.module.scss";

export default function Color({ color }) {
  return (
    <>
      <span className={styles.colour} style={{ backgroundColor: `${color}` }}>
        {color}
      </span>
    </>
  );
}

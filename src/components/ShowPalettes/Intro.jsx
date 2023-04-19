import styles from "./ShowPalettes.module.scss";

export default function Intro() {
  return (
    <>
      <section className={styles.intro}>
        <h3>
          EXPLORE
        </h3>
        <p>Check out the palettes created by other awesome people like you. Hover on a color to see its value and click on it to copy.</p>
      </section>
    </>
  );
}

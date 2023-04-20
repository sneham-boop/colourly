import styles from "./ShowPalettes.module.scss";

export default function Intro({ heading, description }) {
  return (
    <>
      <section className={styles.intro}>
        <h3>
          {heading}
        </h3>
        <p>
          {description}
        </p>
      </section>
    </>
  );
}

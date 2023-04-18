import styles from "./Homepage.module.scss";

export default function Homepage() {
  return (
    <section className={styles.home}>
      <div id="heading-container" className={styles.intro}>
        <h3 id="heading">Welcome to Colourly!</h3>
        <p id="sub-heading">
          Create your own palette or find inspiration for your next creative
          project.
        </p>
      </div>
      <div className={styles.base}>
        <span style={{ backgroundColor: "#ff595e" }} />
        <span style={{ backgroundColor: "#ffca3a" }} />
        <span style={{ backgroundColor: "#124559" }} />
        <span style={{ backgroundColor: "#f9c74f" }} />
        <span style={{ backgroundColor: "#b56576" }} />
        <span style={{ backgroundColor: "#f26419" }} />
      </div>
    </section>
  );
}

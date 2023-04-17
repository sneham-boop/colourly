import ShowPalettes from "../ShowPalettes";
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
        <ShowPalettes />
      </div>
    </section>
  );
}

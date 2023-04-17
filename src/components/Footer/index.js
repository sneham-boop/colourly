import Button from "../Button";
import styles from "./Footer.module.scss";

export default function Footer() {
  const btnText = "GO UP";
  const handleScroll = () => {
    const element = document.getElementsByClassName("nav");
    if (element) {
      element[0].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <Button btnText={btnText} onClick={() => handleScroll()} />
    </footer>
  );
}

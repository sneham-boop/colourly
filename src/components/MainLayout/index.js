import Footer from "../Footer";
import Header from "../Header";
import styles from "./Main.module.scss";

export default function MainLayout({ children }) {
  return (
    <>
      <div className={styles.main}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}

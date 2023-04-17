import Button from "../Button";
import Logo from "./Logo";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header(props) {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Logo />
      </Link>
      <div className={styles['nav-right-group']}>
        <Link href="/">
          <Button btnText={"Home"} />
        </Link>
        <Link href="/places">
          <Button btnText={"Places"} />
        </Link>
        {/* <Button btnText={btnText} onClick={handleClick} /> */}
      </div>
    </nav>
  );
}

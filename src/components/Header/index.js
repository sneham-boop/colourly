import Button from "../Button";
import Logo from "./Logo";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header(props) {
  return (
    <nav id="navbar" className={styles.nav}>
      <Link href="/">
        <Logo />
      </Link>
      <div className={styles["nav-right-group"]}>
        <Link href="/explore">Explore Trends</Link>
        <Link href="/test">Test Users</Link>
        <Link href="/saved">Saved Palettes</Link>
        <Link href="/created">Your Creations</Link>
        <Link href="/create">Create</Link>
        {/* <Link href="/sign-in"> */}
          <Button btnText={"Sign In"} custom="sign-in"/>
        {/* </Link> */}
      </div>
    </nav>
  );
}

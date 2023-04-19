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
      <div className={styles['nav-right-group']}>
        <Link href="/explore">
          <Button btnText={"Explore Trends"} />
        </Link>
        <Link href="/test">
          <Button btnText={"Test Users"} />
        </Link>
        <Link href="/saved">
          <Button btnText={"Saved Palettes"} />
        </Link>
        <Link href="/created">
          <Button btnText={"Palettes You Created"} />
        </Link>
        <Link href="/create">
          <Button btnText={"Create"} />
        </Link>
        <Link href="/sign-in">
          <Button btnText={"Sign In"} />
        </Link>
        {/* <Button btnText={btnText} onClick={handleClick} /> */}
      </div>
    </nav>
  );
}

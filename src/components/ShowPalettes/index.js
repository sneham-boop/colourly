import Palette from "./Palette";
import styles from "./ShowPalettes.module.scss";

export default function ShowPalettes({}) {
  return (
    <>
      <div id="combinations-container">
        <Palette />
        <Palette />
      </div>
    </>
  );
}

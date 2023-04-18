// import clientPromise from "../../../lib/mongodb";
import { useState } from "react";
import styles from "./Create.module.scss";
import Button from "@component/components/Button";
import { SketchPicker } from "react-color";

export default function Create({}) {
  const [background, setBackground] = useState("#FFF");
  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };
  return (
    <>
      <div className={styles.newPaletteContainer}>
        <div className={styles.selections}>
          <h4>Create your own palette</h4>
          <div className={styles["color-selections-container"]}>
            <section className={styles["selected-colors"]}>
              <div>+</div>
              <div>+</div>
              <div>+</div>
              <div>+</div>
              <div>+</div>
              <div>+</div>
              <div>+</div>
              <div>+</div>
              <div>+</div>
              <div>+</div>
            </section>
            <section className={styles["current-color"]}>
              <h6>Selection</h6>
              <div className={styles["colour-value"]}></div>
            </section>
          </div>
        </div>
        <div className={styles.picker}>
          <SketchPicker
            color={background}
            onChangeComplete={handleChangeComplete}
            width={500}
            disableAlpha={false}
          />
          <div className={styles.instructions}>
            <h3>Instructions:</h3>
            <ol>
              <li>Move the selectors to adjust colour.</li>
              <li>Click on the "+" button to select.</li>
              <li>
                Colours can be overwritten by adjusting a new one and clicking
                on "+" again.
              </li>
              <li>Up to 10 colours may be added to each palette.</li>
              <li>
                Click on "Save to library" to add palette to your library.
              </li>
            </ol>
            <Button btnText="Save To Library" />
          </div>
        </div>
      </div>
    </>
  );
}

// export async function getServerSideProps() {
//   try {
//     return {
//       props: {},
//     };
//   } catch (e) {
//     console.error("We couldn't connect to the database.", e);
//   }
// }

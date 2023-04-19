// import clientPromise from "../../../lib/mongodb";
import { useState, useEffect } from "react";
import styles from "./Create.module.scss";
import Button from "@component/components/Button";
import { SketchPicker, BlockPicker, AlphaPicker } from "react-color";
import SelectedColor from "@component/components/SelectedColor";
import axios from "axios";
import { useRouter } from 'next/router';

export default function Create({}) {
  const [background, setBackground] = useState("#F9684F");
  const [colors, setColors] = useState(new Array(10).fill("000"));
  const router = useRouter();

  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };

  const selectColors = () => {
    return new Array(10).fill(1).map((el, id) => {
      const newColor = background.slice(1);
      return (
        <SelectedColor
          key={id}
          id={id}
          newColor={newColor}
          color={colors[id]}
          updatePalette={setColors}
        />
      );
    });
  };

  const savePalette = async () => {
    const nonBlackColors = colors.filter((el) => el !== "000");
    console.log(nonBlackColors);
    try {
      const { data, status } = await axios({
        method: "post",
        url: "/api/palettes",
        data: {
          colors: nonBlackColors,
        },
      });

      const { success } = data;
      if (success) console.log("Palette added!!!");

      // // Unsuccessful
      // if (status !== 200 || !userArray || error) return false;

      // Success
      router.push("/explore");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.newPaletteContainer}>
        <div className={styles.selections}>
          <h4>CREATE</h4>
          <div className={styles["color-selections-container"]}>
            <section className={styles["selected-colors"]}>
              {selectColors()}
            </section>
            <section className={styles["current-color"]}>

               <BlockPicker triangle="hide" color={background} onChangeComplete={handleChangeComplete}/>
            </section>
          </div>
        </div>
        <div className={styles.picker}>
          <SketchPicker
            color={background}
            onChangeComplete={handleChangeComplete}
            width={350}
            disableAlpha={true}
          />
          <div className={styles.instructions}>
            <h3>Instructions</h3>
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
            <Button btnText="Save To Library" onClick={savePalette} custom="save-to-lib"/>
          </div>
        </div>
      </div>
    </>
  );
}

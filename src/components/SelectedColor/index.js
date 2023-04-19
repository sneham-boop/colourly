import styles from "./SelectedColor.module.scss";

export default function SelectedColor({ newColor, color, updatePalette, id }) {
  const handleClick = () => {
    updatePalette((prev) => {
      let oldColors = [...prev];
      oldColors[id] = newColor;
      return [...oldColors];
    });
  };

  return (
    <>
      <div
        className={styles.add}
        onClick={handleClick}
        style={{ backgroundColor: `#${color}` }}
      ></div>
    </>
  );
}

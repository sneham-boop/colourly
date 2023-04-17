import styles from "../ShowPalettes.module.scss";

export default function Color({ color }) {
  const handleClick = (e) => {
    const colourValue = e.target.innerHTML;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(colourValue).then(() => {
        console.log("I copied!!!");
      });
    } else {
      console.log("Browser Not compatible");
    }
  };
  return (
    <>
      <span
        className={styles.colour}
        style={{ backgroundColor: `${color}` }}
        onClick={(e) => handleClick(e)}
      >
        {color}
      </span>
    </>
  );
}

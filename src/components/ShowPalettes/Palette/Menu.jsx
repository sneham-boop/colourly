import styles from "./Palette.module.scss";

export default function Menu({ onSelect, position }) {
  return (
    <ul
      className={styles["float-menu"]}
      style={{ top: position.y, left: position.x }}
    >
      <li onMouseDown={(e) => onSelect(e)}>
        <span className="material-symbols-rounded">open_in_full</span>
        <p>View fullscreen</p>
      </li>
      <li onMouseDown={(e) => onSelect(e)}>
        <span className="material-symbols-rounded">favorite</span>
        <span>Unsave</span>
      </li>
      <li onMouseDown={(e) => onSelect(e)}>
        <span className="material-symbols-rounded">delete</span>
        <span>Delete</span>
      </li>
    </ul>
  );
}

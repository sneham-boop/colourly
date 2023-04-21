import React from "react";
import styles from "./Button.module.scss";

function Button(props) {
  const { btnText, onClick, custom, icon, type } = props;
  return (
    <>
      <button
        className={`${styles["button-default"]} ${styles[custom]}`}
        type={type ? type : "button"}
        onClick={onClick}
      >
        <span>{btnText}</span>
        {icon && <i className={styles[`${icon}`]} />}
      </button>
    </>
  );
}

export default Button;

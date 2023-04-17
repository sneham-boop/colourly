import React from "react";
import styles from "./Button.module.scss";

function Button(props) {
  const { btnText, onClick, custom, icon } = props;
  return (
    <>
      <button
        className={`${styles["button-default"]} ${styles[custom]}]`}
        type="button"
        onClick={onClick}
      >
        <span>{btnText}</span>
        {icon && <i className={styles[`${icon}`]} />}
      </button>
    </>
  );
}

export default Button;

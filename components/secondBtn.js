import React from "react";
import styles from "./secondBtn.module.css";

export default function SecondBtn({ type, text, onClick }) {
  return (
    <>
      <button className={styles.sbtn} type={type} onClick={onClick}>
        {text}
      </button>
    </>
  );
}

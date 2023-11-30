import React from "react";
import styles from "./mainBtn.module.css";

export default function MainBtn({ type, text, onClick }) {
  return (
    <>
      <button className={styles.mbtn} type={type} onClick={onClick}>
        {text}
      </button>
    </>
  );
}

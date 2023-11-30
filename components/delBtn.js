import React from "react";
import styles from "./delBtn.module.css";

export default function DelBtn({ deleteHandler = () => {} }) {
  return (
    <>
      <div className={styles.delBtn} onClick={deleteHandler}></div>
    </>
  );
}

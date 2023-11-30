import React from "react";
import styles from "./input.module.css";

export default function Input({ type, value, placeholder, addTodoHamdler = () => {}, changeHandler = () => {} }) {
  return (
    <>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onKeyUp={addTodoHamdler}
        onChange={changeHandler}
        className={styles.input}
      />
    </>
  );
}

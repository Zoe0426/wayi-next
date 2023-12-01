import React, { useState, useEffect } from "react";
import styles from "./item.module.css";

export default function Item({ id, name, status, des, time, checkedItems, setCheckedItems }) {
  const [isChecked, setIsChecked] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setIsChecked(checkedItems.includes(id));
  }, [checkedItems]);

  const onCheckboxClick = (itemId) => (e) => {
    if (e.target.checked) {
      setCheckedItems([...checkedItems, itemId]);
    } else {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    }
    setIsChecked(e.target.checked);
  };

  const showReviewContent = () => {
    setShow(!show);
  };
  return (
    <>
      <div
        className={styles.item}
        style={{
          textDecoration: status === 1 ? "line-through" : "",
        }}
      >
        <div className={styles.check}>
          <input type='checkbox' checked={isChecked} onChange={onCheckboxClick(id)} className={styles.checkbox} />
        </div>
        <div className={styles.name}>{name}</div>
        <div className={styles.status}>{status === 1 ? "已完成" : "未完成"}</div>
        <div className={styles.plus} onClick={showReviewContent}>
          +
        </div>
        <div className={styles.des}>{des}</div>
        <div className={styles.time}>{time}</div>
      </div>
      {show && (
        <div className={styles.moreContent}>
          <div className={styles.desTitle}>任務描述</div>
          <div className={styles.des}>{des}</div>
          <div className={styles.timeTitle}>更新時間</div>
          <div className={styles.time}>{time}</div>
        </div>
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import Head from "next/head";
import MainBtn from "@/components/mainBtn";
import SecondBtn from "@/components/secondBtn";
import styles from "@/styles/todoList.module.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [render, setRender] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    console.log("render");
    setAllChecked(false);
    fetch(`${process.env.API_SERVER}/get-task`)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, [render]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName.trim()) {
      setError("＊任務名稱為必填");
      return;
    }

    fetch(`${process.env.API_SERVER}/add-task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskName, description }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setTaskName("");
        setDescription("");
        setError("");
        setRender(!render);
      });
  };

  const handleDelete = () => {
    if (checkedItems.length === 0) {
      return;
    }
    fetch(`${process.env.API_SERVER}/delete-task`, {
      method: "DELETE", // Change from "POST" to "DELETE"
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: checkedItems }),
    })
      .then((r) => r.json())
      .then(() => {
        setData(data.filter((item) => !checkedItems.includes(item.id)));
        setCheckedItems([]);
      });
  };

  const handleComplete = () => {
    if (checkedItems.length === 0) {
      return;
    }
    fetch(`${process.env.API_SERVER}/complete-task`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: checkedItems }),
    })
      .then((r) => r.json())
      .then(() => {
        setCheckedItems([]);
        setRender(!render);
      });
  };

  const handleUnComplete = () => {
    if (checkedItems.length === 0) {
      return;
    }
    fetch(`${process.env.API_SERVER}/uncomplete-task`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: checkedItems }),
    })
      .then((r) => r.json())
      .then(() => {
        setCheckedItems([]);
        setRender(!render);
      });
  };

  return (
    <>
      <Head>
        <title>wayi TODO</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className={styles.title}>TODO</h1>
      <div className={styles.container}>
        <div className={styles.filter}>
          <input type='checkbox' className={styles.checkbox} onChange={(e) => setHideCompleted(e.target.checked)} />
          隱藏已完成選項
        </div>
        <div className={styles.taskTitle}>
          <div className={styles.check}>
            <input
              type='checkbox'
              className={styles.checkbox}
              checked={allChecked}
              onChange={(e) => {
                setAllChecked(e.target.checked);
                if (e.target.checked) {
                  setCheckedItems(data.map((d) => d.id));
                } else {
                  setCheckedItems([]);
                }
              }}
            />
            全選
          </div>
          <div className={styles.name}>任務名稱</div>
          <div className={styles.des}>任務描述</div>
          <div className={styles.status}>狀態</div>
          <div className={styles.time}>更新時間</div>
        </div>
        <div className={styles.wrap}>
          {data
            .filter((item) => !hideCompleted || item.is_completed !== 1)
            .map((data, i) => {
              return (
                <div
                  className={styles.item}
                  key={data.id}
                  style={{
                    textDecoration: data.is_completed === 1 ? "line-through" : "",
                  }}
                >
                  <div className={styles.check}>
                    <input
                      type='checkbox'
                      className={styles.checkbox}
                      checked={checkedItems.includes(data.id)}
                      onChange={(e) => {
                        const itemId = data.id;
                        if (e.target.checked) {
                          setCheckedItems([...checkedItems, itemId]);
                        } else {
                          setCheckedItems(checkedItems.filter((id) => id !== itemId));
                        }
                      }}
                    />
                  </div>
                  <div className={styles.name}>{data.name}</div>
                  <div className={styles.des}>{data.description}</div>
                  <div className={styles.status}>{data.is_completed === 1 ? "已完成" : "未完成"}</div>
                  <div className={styles.time}>{data.updated_at}</div>
                </div>
              );
            })}
        </div>
        <div className={styles.btns}>
          <MainBtn type={"button"} text={"已完成"} onClick={handleComplete} />
          <MainBtn type={"button"} text={"未完成"} onClick={handleUnComplete} />
          <SecondBtn type={"button"} text={"刪除"} onClick={handleDelete} />
        </div>
      </div>
      <div className={styles.count}>( 共 {data.length} 項 )</div>

      <div className={styles.addTask}>
        <h1 className={styles.title}>新增任務</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.addItem}>
            <input
              type='text'
              name='taskName'
              maxLength={10}
              className={styles.input}
              placeholder='輸入任務名稱 (限10字)'
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <div className={styles.error}>{error}</div>
          </div>
          <div className={styles.addItem}>
            <textarea
              name='description'
              cols='30'
              rows='10'
              maxLength={30}
              className={styles.textarea}
              placeholder='輸入任務描述 (限30字)'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.btns}>
            <SecondBtn type={"reset"} text={"重填"} />
            <MainBtn type={"submit"} text={"新增"} />
          </div>
        </form>
      </div>
    </>
  );
}

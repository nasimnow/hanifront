import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import Select from "react-select";
import styles from "../css/add_ledger.module.scss";

import supabase from "../../supabase";
import axios from "axios";
import { useHistory } from "react-router";

const AddAccount = () => {
  const [emoji, setEmoji] = useState("");
  const [type, setType] = useState({ value: "EXPENSE", label: "EXPENSE" });
  const [name, setName] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const history = useHistory();

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 60,
      width: 200,
      borderRadius: 10,
      minHeight: 50,
    }),
  };

  let accountTypes = ["INCOME", "EXPENSE"].map((item) => ({
    value: item,
    label: item,
  }));
  //handle add transfer
  const handleAddTransfer = async () => {
    // const addTransfer = await db.collection("coins").add(transferObject);
    const { addTransfer, error } = await supabase
      .from("account")
      .insert([{ name: name.toLowerCase(), type: type.value, emoji }]);

    setIsButtonActive(true);
    setTimeout(() => {
      setName("");
      setType("EXPENSE");
      setEmoji("");
      setIsButtonActive(false);
    }, 2000);
  };

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.form_container}>
          <div className={styles.title_group}>
            <div
              onClick={() => history.push("/add")}
              className={`${styles.title_main}`}
            >
              Transaction
            </div>
            <div className={`${styles.title_main} ${styles.active}`}>
              Account
            </div>
          </div>

          <div className={styles.input_container}>
            <div className={styles.input_container_small}>
              <h1 className={styles.input_label}>Account Name</h1>
              <input
                className={styles.input_name}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.input_container_small}>
              <h1 className={styles.input_label}>Emoji</h1>
              <input
                className={styles.input_name}
                type="text"
                placeholder="Emoji"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
              />
            </div>
            <div className={styles.input_container_small}>
              <h1 className={styles.input_label}>Type</h1>
              <Select
                className={styles.select_account}
                options={accountTypes}
                styles={customStyles}
                value={type}
                onChange={(value) => setType(value)}
              />
            </div>
          </div>
          {!isButtonActive ? (
            <button
              className={styles.submit_button}
              onClick={handleAddTransfer}
            >
              Add To Portfolio
            </button>
          ) : (
            <button
              className={styles.submit_button_active}
              onClick={handleAddTransfer}
            >
              Successfully Added👌
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default AddAccount;

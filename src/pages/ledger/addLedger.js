import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import Select from "react-select";
import styles from "../css/add_ledger.module.scss";

import firebase from "../../firebase";
import { useHistory } from "react-router";
import supabase from "../../supabase";

const AddLedger = () => {
  const db = firebase.firestore();

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSeletcedAccount] = useState(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const history = useHistory();

  //get all saved accounts
  useEffect(() => {
    const fetchData = async () => {
      // const accountResponse = await db.collection("account").get();
      // const accountsParse = accountResponse.docs.map((account) =>
      //   account.data()
      // );
      let { data: accountsParse, error } = await supabase
        .from("account")
        .select("*");
      console.log(accountsParse);
      const accountsFiltered = accountsParse.map((account) => ({
        value: account.id,
        label: account.full_name,
      }));
      setAccounts(accountsFiltered);
    };
    fetchData();

    //useffect cleanup
    return () => {
      setAccounts({});
    };
  }, []);

  //handle account change
  const handleAccountChange = (selectedOption) => {
    setSeletcedAccount(selectedOption);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 60,
      width: 300,
      borderRadius: 10,
      minHeight: 50,
    }),
  };

  //handle add transfer
  const handleAddTransfer = async () => {
    console.log({ amount: transferAmount, to: selectedAccount.value });
    const transferObject = {
      date: new Date(),
      amount: transferAmount,
      to: selectedAccount.value,
      to_name: selectedAccount.label,
    };
    const { data, error } = await supabase
      .from("ledger")
      .insert([transferObject]);
    console.log(error);
    // const addTransfer = await db.collection("ledger").add(transferObject);
    setIsButtonActive(true);
    setTimeout(() => {
      setSeletcedAccount(null);
      setTransferAmount("");
      setIsButtonActive(false);
    }, 2000);
  };

  return (
    <>
      <div className={styles.container}>
        <Header />

        <div className={styles.form_container}>
          <div className={styles.title_group}>
            <div className={`${styles.title_main} ${styles.active}`}>
              Transaction
            </div>
            <div
              onClick={() => history.push("/addcoin")}
              className={styles.title_main}
            >
              Coin
            </div>
          </div>
          <div className={styles.input_container}>
            <h1 className={styles.input_label}>To</h1>
            <Select
              className={styles.select_account}
              value={selectedAccount}
              options={accounts}
              styles={customStyles}
              onChange={handleAccountChange}
            />
          </div>
          <div className={styles.input_container}>
            <h1 className={styles.input_label}>Amount</h1>
            <input
              className={styles.input_amount}
              type="number"
              placeholder="0.0"
              value={transferAmount}
              onChange={(e) => setTransferAmount(parseFloat(e.target.value))}
            />
          </div>
          {!isButtonActive ? (
            <button
              className={styles.submit_button}
              onClick={handleAddTransfer}
            >
              Add Transaction
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
export default AddLedger;

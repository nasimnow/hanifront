import React, { useEffect, useState } from "react";
import Header from "../components/Header"

import Select from "react-select";
import styles from "../css/add_ledger.module.scss";

import firebase from "../../firebase";

const AddLedger = () => {
  const db = firebase.firestore();

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSeletcedAccount] = useState(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [isButtonActive,setIsButtonActive] = useState(false)

  //get all saved accounts
  useEffect(() => {
    const fetchData = async () => {
      const accountResponse = await db.collection("account").get();
      const accountsParse = accountResponse.docs.map((account) =>
        account.data()
      );
      const accountsFiltered = accountsParse.map((account) => ({
        value: account.name,
        label: account.full_name,
      }));
      setAccounts(accountsFiltered);
    };
    fetchData();
  }, []);

  //handle account change
  const handleAccountChange = (selectedOption) => {
    setSeletcedAccount(selectedOption);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 60,
      width:300,
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
    };
    const addTransfer = await db.collection("ledger").add(transferObject);
    setIsButtonActive(true)
    setTimeout(()=>{
      setSeletcedAccount(null)
      setTransferAmount("")
      setIsButtonActive(false)
    },2000)
    console.log(addTransfer);
  };

  return (
    <>
    <div className={styles.container}>
    <Header/>
      <div className={styles.form_container}>
        <div className={styles.title_main}>Transaction</div>
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
       {!isButtonActive ?(<button className={styles.submit_button} onClick={handleAddTransfer}>
          Add Transaction
        </button>):(
        <button className={styles.submit_button_active} onClick={handleAddTransfer}>
          Transaction Completed
        </button>)}
      </div>
      </div>
    </>
  );
};
export default AddLedger;

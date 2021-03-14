import React, { useEffect, useState } from "react";
import Header from "../components/Header"

import Select from "react-select";
import styles from "../css/add_ledger.module.scss";

const AddLedger = () => {

  const [accounts, setAccounts] = useState([]);
  const [payeeName,setPayeeName]  = useState("")
  const [payeeUpi, setPayeeUpi] = useState(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [isButtonActive,setIsButtonActive] = useState(false)


  //handle account change
  const handleAccountChange = (selectedOption) => {
    setPayeeUpi(selectedOption);
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
    console.log({ amount: transferAmount, to: payeeUpi.value });
  };

  return (
    <>
    <div className={styles.container}>
    <Header/>
      <div className={styles.form_container}>
        <div className={styles.title_main}>UPI Payment Link </div>
        <div className={styles.input_container}>
        <h1 className={styles.input_label}>To</h1>
        <div className={styles.input_container}>
        <h1 className={styles.input_label}>Account Name</h1>
        <input
            className={styles.input_name}
            type="text"
            placeholder="Name"
            value={payeeName}
            onChange={(e) => setPayeeName(e.target.value)}
          />
          </div>
          <div className={styles.input_container}>
        <h1 className={styles.input_label}>UPI Id</h1>
          <input
            className={styles.input_upi}
            type="text"
            placeholder="yourshop@upi"
            value={payeeUpi}
            onChange={(e) => setPayeeUpi(parseInt(e.target.value))}
          />
          </div>
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
          Create Link
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

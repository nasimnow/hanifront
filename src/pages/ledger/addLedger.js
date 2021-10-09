import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import Select from "react-select";
import styles from "../css/add_ledger.module.scss";

import { useHistory } from "react-router";
import supabase from "../../supabase";

const AddLedger = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSeletcedAccount] = useState(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const history = useHistory();

  //get all saved accounts
  useEffect(() => {
    const fetchData = async () => {
      let { data: accountsParse, error } = await supabase
        .from("account")
        .select("*");
      const accountsFiltered = accountsParse.map((account) => ({
        value: account.id,
        label: account.emoji + " " + account.name,
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
    option: (provided) => ({
      ...provided,
      textTransform: "capitalize",
    }),
    control: (base) => ({
      ...base,
      height: 60,
      width: 250,
      borderRadius: 10,
      minHeight: 50,
    }),
  };

  //handle add transfer
  const handleAddTransfer = async () => {
    console.log({ amount: transferAmount, to: selectedAccount.value });
    const transferObject = {
      amount: transferAmount,
      to: selectedAccount.value,
    };
    const { data, error } = await supabase
      .from("ledger")
      .insert([transferObject]);

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
              onClick={() => history.push("/add-account")}
              className={styles.title_main}
            >
              Account
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

import React, { useEffect, useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import Select from "react-select";
import styles from "../css/add_ledger.module.scss";

import firebase from "../../firebase";

const AddLedger = () => {
  const db = firebase.firestore();

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSeletcedAccount] = useState("null");
  const [transferAmount, setTransferAmount] = useState("");

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
    console.log(addTransfer);
  };

  return (
    <>
      <div className={styles.form_container}>
        <div className={styles.input_container}>
          To
          <Select
            className={styles.select_account}
            value={selectedAccount}
            options={accounts}
            styles={customStyles}
            onChange={handleAccountChange}
          />
        </div>
        <div className={styles.input_container}>
          <input
            className={styles.input_amount}
            type="number"
            placeholder="0.0"
            value={transferAmount}
            onChange={(e) => setTransferAmount(parseFloat(e.target.value))}
          />
        </div>
        <Button onClick={handleAddTransfer} colorScheme="teal">
          Add
        </Button>
      </div>
    </>
  );
};
export default AddLedger;

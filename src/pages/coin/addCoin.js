import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import Select from "react-select";
import styles from "../css/add_ledger.module.scss";

import supabase from "../../supabase";
import axios from "axios";
import { useHistory } from "react-router";

const AddCoin = () => {
  // const db = firebase.firestore();

  const [coinsAvailable, setCoinsAvaialable] = useState([]);
  const [selectedCoin, setSeletcedCoin] = useState(null);
  const [coinPrice, setCoinPrice] = useState("");
  const [coinQuantity, setCoinQuantity] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const history = useHistory();

  //get all saved accounts
  useEffect(() => {
    const fetchData = async () => {
      const stocksResponse = await axios.get(
        "https://nitinr-cors.herokuapp.com/https://api.wazirx.com/api/v2/tickers"
      );
      const coinsArray = Object.getOwnPropertyNames(stocksResponse.data);
      const coinsModified = coinsArray.map((coin) => ({
        value: coin,
        label: coin,
      }));
      setCoinsAvaialable(coinsModified);
    };
    fetchData();

    //useffect cleanup
    return () => {
      setCoinsAvaialable({});
    };
  }, []);

  //handle account change
  const handleAccountChange = (selectedOption) => {
    setSeletcedCoin(selectedOption);
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
    const transferObject = {
      date: new Date(),
      coin: selectedCoin.value,
      price: coinPrice,
      quantity: coinQuantity,
    };
    // const addTransfer = await db.collection("coins").add(transferObject);
    const { addTransfer, error } = await supabase
      .from("coins")
      .insert([transferObject]);

    setIsButtonActive(true);
    setTimeout(() => {
      setSeletcedCoin(null);
      setCoinPrice("");
      setCoinQuantity("");
      setIsButtonActive(false);
    }, 2000);
    console.log(addTransfer);
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
            <div className={`${styles.title_main} ${styles.active}`}>Coin</div>
          </div>
          <div className={styles.input_container}>
            <h1 className={styles.input_label}>Coin Name</h1>
            <Select
              className={styles.select_account}
              value={selectedCoin}
              options={coinsAvailable}
              styles={customStyles}
              onChange={handleAccountChange}
            />
          </div>
          <div className={styles.input_container}>
            <div className={styles.input_container_small}>
              <h1 className={styles.input_label}>Quantity</h1>
              <input
                className={styles.input_name}
                type="number"
                placeholder="0.0"
                value={coinQuantity}
                onChange={(e) => setCoinQuantity(parseFloat(e.target.value))}
              />
            </div>
            <div className={styles.input_container_small}>
              <h1 className={styles.input_label}>Price</h1>
              <input
                className={styles.input_name}
                type="number"
                placeholder="0.0"
                value={coinPrice}
                onChange={(e) => setCoinPrice(parseFloat(e.target.value))}
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
export default AddCoin;

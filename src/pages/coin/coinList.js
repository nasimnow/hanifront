import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

import styles from "../css/transfer_list.module.scss";
import Header from "../components/Header"
import axios from "axios"

const CoinList = () => {
  const db = firebase.firestore();

  const [coins, setCoins] = useState([]);
  const [coinsLive, setCoinsLive] = useState({});
  const [gotCoins,setGotCoins] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
     
      const coinsResponse = await db
        .collection("coins")
        .orderBy("date", "desc")
        .limit(10)
        .get();
      const coinParse = coinsResponse.docs.map((account) =>
        account.data()
      );
      setCoins(coinParse);

      //get coins price from wazirx api
      const coinsLivePriceResponse = await axios.get("https://cors-anywhere.herokuapp.com/https://api.wazirx.com/api/v2/tickers");
      setCoinsLive(coinsLivePriceResponse.data)
      console.log(coinsLivePriceResponse)
      setGotCoins(true)
    };
    fetchData();
  }, []);


  return (
    <div className={styles.container}>
      <Header/>
      {coins.map((coin) => (
        
          <div className={styles.transfer_row} key={coin.date}>
            {coin.coin && (
              <div className={styles.coin_profile}>
                <img
                  src={`https://avatars.dicebear.com/api/gridy/${coin.coin}.svg`}
                  width="30px"
                />
              </div>
            )}
            <div className={styles.transfer_name_group}>
              <h1 className={styles.transfer_name}>{coin.coin}</h1>
              <h1 className={styles.transfer_date}>
                {coin.date.toDate().toDateString()}
              </h1>
            </div>
       {Object.keys(coinsLive).length !== 0 && console.log(coinsLive[coin.coin])}
            {Object.keys(coinsLive).length !== 0 && 
              (<>
               {coinsLive[coin.coin].sell *coin.quantity - coin.price*coin.quantity <0 ?
               (<h1 className={styles.transfer_amount_debit}>
                {coinsLive[coin.coin].quote_unit==="inr" ?(coinsLive[coin.coin].sell *coin.quantity - coin.price*coin.quantity).toFixed(2):((coinsLive[coin.coin].sell *coin.quantity - coin.price*coin.quantity)*coinsLive.usdtinr.sell).toFixed(2)}
              </h1>):(<h1 className={styles.transfer_amount_credit}>
                {(coinsLive[coin.coin].sell *coin.quantity - coin.price*coin.quantity).toFixed(2)}
              </h1>)}
              </>)}
            
          </div>
        
      ))}
    </div>
  );
};

export default CoinList;

import React, { useEffect, useState } from "react";
import supabase from "../../supabase";

import styles from "../css/transfer_list.module.scss";
import Header from "../components/Header";
import axios from "axios";

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [coinsLive, setCoinsLive] = useState({});
  const [totalPl, setTotalPl] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: coinParse, error } = await supabase
        .from("coins")
        .select("*")
        .order("id", { ascending: false });
      setCoins(coinParse);

      //get coins price from wazirx api
      const coinsLivePriceResponse = await axios.get(
        "https://nitinr-cors.herokuapp.com/https://api.wazirx.com/api/v2/tickers"
      );
      setCoinsLive(coinsLivePriceResponse.data);
    };
    fetchData();
  }, []);

  const handleCoinDelete = async (id) => {
    const { data, error } = await supabase.from("coins").delete().eq("id", id);
    const coinsNew = coins.filter((coin) => coin.id !== id);
    setCoins(coinsNew);
  };

  return (
    <div className={styles.container}>
      <Header />
      {/* <div className={styles.pl_header}>
        <div className={styles.title}>Total P/L</div>
        {totalPl}
      </div> */}
      {coins.map((coin) => (
        <div
          className={styles.transfer_row}
          key={coin.id}
          onDoubleClick={() => {
            const isTrue = window.confirm(
              `Are you sure deleting ${coin.coin} ?`
            );
            isTrue && handleCoinDelete(coin.id);
          }}
        >
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
            <h1 className={styles.transfer_date}>{coin.date}</h1>
          </div>

          {Object.keys(coinsLive).length !== 0 && (
            <>
              {coinsLive[coin.coin].sell * coin.quantity -
                coin.price * coin.quantity <
              0 ? (
                <h1 className={styles.transfer_amount_debit}>
                  {coinsLive[coin.coin].quote_unit === "inr"
                    ? (
                        coinsLive[coin.coin].sell * coin.quantity -
                        coin.price * coin.quantity
                      ).toFixed(2)
                    : (
                        (coinsLive[coin.coin].sell * coin.quantity -
                          coin.price * coin.quantity) *
                        coinsLive.usdtinr.sell
                      ).toFixed(2)}
                </h1>
              ) : (
                <h1 className={styles.transfer_amount_credit}>
                  {(
                    coinsLive[coin.coin].sell * coin.quantity -
                    coin.price * coin.quantity
                  ).toFixed(2)}
                </h1>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CoinList;

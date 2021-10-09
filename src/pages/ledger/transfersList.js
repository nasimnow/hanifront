import React, { useEffect, useState } from "react";

import styles from "../css/transfer_list.module.scss";
import Header from "../components/Header";
import supabase from "../../supabase";

const TransferList = () => {
  const [transfers, setTransfers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let { data: transferParse, error } = await supabase
        .from("ledger")
        .select(`*, account(name,emoji,type)`)
        .order("id", { ascending: false });
      console.log(transferParse);
      setTransfers(transferParse);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      {transfers?.map((transfer) => (
        <div className={styles.transfer_row} key={transfer.id}>
          <div className={styles.coin_profile}>{transfer.account.emoji}</div>

          <div className={styles.transfer_name_group}>
            <h1 className={styles.transfer_name}>{transfer.account.name}</h1>
            <h1 className={styles.transfer_date}>
              {new Date(transfer.date).toLocaleDateString()}
            </h1>
          </div>

          {transfer.account.type === "EXPENSE" ? (
            <h1 className={styles.transfer_amount_debit}>-{transfer.amount}</h1>
          ) : (
            <h1 className={styles.transfer_amount_credit}>
              +{transfer.amount}
            </h1>
          )}
        </div>
      ))}
    </div>
  );
};

export default TransferList;

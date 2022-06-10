import React from "react";
import styles from "./style.module.scss";

const Searchable = ({ query, setquery, placeholder }: any) => {
  return (
    <div className={styles["searchable-container"]}>
      <div className={styles["search-input-container"]}>
        <input placeholder={placeholder ? placeholder : "search"} />
      </div>
    </div>
  );
};

export default Searchable;

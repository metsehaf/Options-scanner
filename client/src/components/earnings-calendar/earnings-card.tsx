import React from "react";
import styles from "./earnings-calendar.module.scss";

interface EarningsCardProps {
  companyName: string;
  symbol: string;
  earningsDate: string;
  logoUrl?: string;
}

export const EarningsCard: React.FC<EarningsCardProps> = ({
  companyName,
  symbol,
  earningsDate,
  logoUrl,
}) => {
  return (
    <a
      className={styles.card}
      href={`/main/watchlist/${symbol}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={styles.info}>
        <h4>
          {companyName} <span className={styles.symbol}>({symbol})</span>
        </h4>
        <p className={styles.date}>Earnings Date: {earningsDate}</p>
      </div>
      {logoUrl && (
        <div className={styles.logo}>
          <img src={logoUrl} alt={`${companyName} logo`} />
        </div>
      )}
    </a>
  );
};

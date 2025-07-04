// components/portfolio/portfolio-highlights/PortfolioHighlights.tsx
import React from "react";
import {PortfolioHighlightsProps} from '@types/portfolio';
import styles from "./portfolio-highlights.module.scss";

const PortfolioHighlights: React.FC<PortfolioHighlightsProps> = ({
  dayGain,
  dayGainPercentage,
  totalGain,
  totalGainPercentage,
  assetBreakdown,
  companySizeBreakdown,
  dividendBreakdown,
  peRatioBreakdown,
}) => {
  return (
    <div className={styles.highlightsCard}>
      <h2 className={styles.cardTitle}>Portfolio highlights</h2>
      <div className={styles.gainSection}>
        <div className={styles.dayGain}>
          <p className={styles.gainLabel}>DAY GAIN</p>
          <p
            className={`${styles.gainAmount} ${dayGain >= 0 ? styles.positive : styles.negative}`}
          >
            ${dayGain.toFixed(2)}
          </p>
          <p
            className={`${styles.gainPercentage} ${dayGainPercentage >= 0 ? "+" : ""}{dayGainPercentage.toFixed(2)}%`}
          >
            {dayGainPercentage >= 0 ? "+" : ""}
            {dayGainPercentage.toFixed(2)}%
          </p>
        </div>
        <div className={styles.totalGain}>
          <p className={styles.gainLabel}>TOTAL GAIN</p>
          <p
            className={`${styles.gainAmount} ${totalGain >= 0 ? styles.positive : styles.negative}`}
          >
            ${totalGain.toFixed(2)}
          </p>
          <p
            className={`${styles.gainPercentage} ${totalGainPercentage >= 0 ? "+" : ""}{totalGainPercentage.toFixed(2)}%`}
          >
            {totalGainPercentage >= 0 ? "+" : ""}
            {totalGainPercentage.toFixed(2)}%
          </p>
        </div>
      </div>
      <div className={styles.breakdownSection}>
        <div className={styles.progressBar}>
          {assetBreakdown.map((item, index) => (
            <div
              key={index}
              className={styles.progressBarSegment}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
              }}
            />
          ))}
        </div>
        {assetBreakdown.map((item, index) => (
          <div key={index} className={styles.breakdownItem}>
            <span
              className={styles.indicator}
              style={{ backgroundColor: item.color }}
            ></span>
            <span className={styles.label}>
              {item.percentage}% {item.label}
            </span>
            <span className={styles.value}>${item.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
      {companySizeBreakdown.length > 0 && (
        <div className={styles.breakdownSection}>
          <div className={styles.breakdownItem}>
            <span className={styles.icon}>🏢</span>
            <span className={styles.label}>
              {companySizeBreakdown?.[0]?.percentage}%{" "}
              {companySizeBreakdown?.[0]?.label}
            </span>
          </div>
        </div>
      )}
      {dividendBreakdown.length > 0 && (
        <div className={styles.breakdownSection}>
          <div className={styles.breakdownItem}>
            <span className={styles.icon}>💲</span>
            <span className={styles.label}>
              {dividendBreakdown?.[0]?.percentage}%{" "}
              {dividendBreakdown?.[0]?.label}
            </span>
          </div>
        </div>
      )}
      {peRatioBreakdown.length > 0 && (
        <div className={styles.breakdownSection}>
          <div className={styles.breakdownItem}>
            <span className={styles.icon}>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path d="M22 10v2H2v-2h20zM16 6v2h-4V6h4zm-8 16v-2h4v2H8zm8-8v2h-4v-2h4zm-8-4v2h4v-2H8z" />
              </svg>
            </span>
            <span className={styles.label}>
              {peRatioBreakdown?.[0]?.percentage}%{" "}
              {peRatioBreakdown?.[0]?.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioHighlights;

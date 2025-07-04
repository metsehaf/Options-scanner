"use client";

import { useEffect, useState } from "react";
import styles from "./watchlist.module.scss";
import ScreenerSkeleton from "@components/skeletons/ScreenerSkeleton";
import { IStockData } from "@types/search";
import { watchlistService } from "@lib/services/watchlist.service";
import { searchService } from "@lib/services/searchService";
import StockAreaChart from "@components/stock-chart/stock-chart";
import { formatLargeNumber } from "@utils/format";

export default function StockPreviewClient({ slug }: { slug: string }) {
  const [data, setData] = useState<IStockData | null>(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const handleAddToWatchlist = async () => {
    setAdding(true);
    setError(null);
    setSuccess(false);
    try {
      // Use the post method from your generic apiService
      const onAdded = await watchlistService.addToWatchlist(slug);
      setSuccess(true);
      if (onAdded) {
        // Redirect to the main watchlist page after successful addition
        window.location.href = "/main/watchlist";
      }
      setTimeout(() => setSuccess(false), 3000); // Clear success message after 3 seconds
    } catch (err: any) {
      console.error("Error adding to watchlist:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to add to watchlist"
      );
    } finally {
      setAdding(false);
    }
  };
  const relatedStocks = [
    {
      ticker: "AAPL",
      companyName: "Apple Inc.",
      price: 150.0,
      changes: 1.5,
      changesPercentage: 1.01,
    },
    {
      ticker: "GOOGL",
      companyName: "Alphabet Inc.",
      price: 2800.0,
      changes: -20.0,
      changesPercentage: -0.71,
    },
    {
      ticker: "AMZN",
      companyName: "Amazon.com Inc.",
      price: 3400.0,
      changes: 30.0,
      changesPercentage: 0.89,
    },
    {
      ticker: "MSFT",
      companyName: "Microsoft Corporation",
      price: 299.0,
      changes: 2.0,
      changesPercentage: 0.67,
    },
    {
      ticker: "TSLA",
      companyName: "Tesla Inc.",
      price: 700.0,
      changes: -5.0,
      changesPercentage: -0.71,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await searchService.tickerSearch(slug);
        console.log("Fetched data:", fetchedData);
        if (fetchedData) {
          setData(fetchedData);
        } else {
          console.error("No data found for the given ticker.");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchData();
  }, [slug]);

  if (!data) return <ScreenerSkeleton />;

  return (
    <div className={styles.container}>
      {/* === Header === */}
      <div className={styles.header}>
        <h1>
          {data.symbol} - {data.name}
        </h1>
        <div className={styles.priceBlock}>
          <h2>${data.price.toFixed(2)}</h2>
          <span
            className={
              data.percentChange >= 0 ? styles.changeUp : styles.changeDown
            }
          >
            Today {data.percentChange >= 0 ? "+" : ""}
            {data.percentChange.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* === Chart Placeholder === */}
      <div className={styles.chart}>
        <div className={styles.chartPlaceholder}>
          {/* Replace with Chart.js or D3.js chart later */}
          {data.chart ? (
            <StockAreaChart data={data.chart} />
          ) : (
            // <PortfolioLineChart data={data.chart} label="Stock Price ($)" />
            <div>Loading chart...</div>
          )}
        </div>
      </div>

      {/* === Key Metrics === */}
      <div className={styles.metrics}>
        <h2>Key Metrics</h2>
        <hr></hr>
        <div className={styles.metricGrid}>
          <div className={styles["metricGrid-container"]}>
            <div>
              <label>PREVIOUS CLOSE</label>
              <span>${data.previousClose}</span>
            </div>
            <div>
              <label>OPEN</label>
              <span>${data.open}</span>
            </div>
          </div>
          <hr></hr>
          <div className={styles["metricGrid-container"]}>
            <div>
              <label>DAY RANGE</label>
              <span>{data.dayRange}</span>
            </div>
            <div>
              <label>YEAR RANGE</label>
              <span>{data.yearRange}</span>
            </div>
          </div>
          <hr></hr>
          <div className={styles["metricGrid-container"]}>
            <div>
              <label>MARKET CAP</label>
              <span>{formatLargeNumber(Number(data.marketCap))}</span>
            </div>
            <div>
              <label>VOLUME</label>
              <span>{formatLargeNumber(Number(data.volume))}</span>
            </div>
          </div>
          <hr></hr>
          <div className={styles["metricGrid-container"]}>
            <div>
              <label>AVG. VOLUME (30d)</label>
              <span>{formatLargeNumber(Number(data.avgVolume))}</span>
            </div>
            <div>
              <label>P/E RATIO</label>
              <span>{data.peRatio}</span>
            </div>
          </div>
          <div className={styles["metricGrid-container"]}>
            <div>
              <label>DIVIDEND YIELD</label>
              <span>{data.dividendYield}%</span>
            </div>
            <div>
              <label>Primary exchange</label>
              <span>{data.exchange.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* === Watchlist Button === */}
      <div className={styles.meta}>
        <button className={styles.addBtn} onClick={handleAddToWatchlist}>
          Add to Watchlist
        </button>
      </div>
      <div className={styles["l-related-stocks"]}>
        <h2>Suggested stocks</h2>
        <div>
          <table className={styles["l-related-stocks-table"]}>
            <thead className={styles["l-related-stocks--table__header"]}>
              <tr
                className={styles["l-related-stocks--table__header__contents"]}
              >
                <th>Ticker</th>
                <th>Company Name</th>
                <th>Price</th>
                <th>Change</th>
                <th>Change %</th>
              </tr>
            </thead>
            <tbody className={styles["l-related-stocks--table__body"]}>
              {relatedStocks.map((stock, index) => (
                <tr
                  key={index}
                  className={styles["l-related-stocks--table__body__contents"]}
                >
                  <td
                    className={
                      styles["l-related-Stocks--table__body__contents--column"]
                    }
                  >
                    {stock.ticker}
                  </td>
                  <td
                    className={
                      styles["l-related-stocks--table__body__contents--column"]
                    }
                  >
                    {stock.companyName}
                  </td>
                  <td
                    className={
                      styles["l-related-stocks--table__body__contents--column"]
                    }
                  >
                    ${stock.price.toFixed(2)}
                  </td>
                  <td
                    className={
                      stock.changes >= 0 ? styles.changeUp : styles.changeDown
                    }
                  >
                    {stock.changes >= 0 ? "+" : ""}
                    {stock.changes.toFixed(2)}
                  </td>
                  <td
                    className={
                      stock.changesPercentage >= 0
                        ? styles.changeUp
                        : styles.changeDown
                    }
                  >
                    {stock.changesPercentage >= 0 ? "+" : ""}
                    {stock.changesPercentage.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

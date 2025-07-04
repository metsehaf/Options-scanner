"use client";
import { useEffect, useState } from "react";
import "./portfolio.scss";
import ScreenerSkeleton from "@components/skeletons/ScreenerSkeleton";
import { portfoloioService } from "@lib/services/portfolio.service";
import {
  Portfolio,
  PortfolioChartData,
  PortfolioWithHoldings,
} from "@types/portfolio";
import empty_portfolio from "@public/assets/image/portfolio/empty_portfolio.png";
import investment_green from "@public/assets/image/portfolio/investment_green.png";
import learn_investing from "@public/assets/image/portfolio/learn_investing.png";
import PortfolioLineChart from "@components/chart/chart";
import PortfolioHighlights from "@components/highlight/highlight";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Trash2 } from "lucide-react";
import { Itransactions } from "@types/hodlings";
export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>();
  const [holdings, setHoldings] = useState<PortfolioWithHoldings>(); // Adjust type as needed
  const [transactionsData, setTransactions] = useState<Itransactions[]>();
  const [chartData, setChart] = useState<PortfolioChartData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMountedCleanup = true;
    const fetchPortfolioData = async () => {
      try {
        if (isMountedCleanup) {
          const response = await portfoloioService.getPortfolio();
          const chart = await portfoloioService.getChartData(response[0].id);
          const transactions = await portfoloioService.getTransactions(
            response[0].id
          );
          console.log(transactions);
          console.log("Portfolio response:", chart);
          if (response?.length) {
            setPortfolios(response);
            setChart(chart);
            setTransactions(transactions);
            setSelectedPortfolio(response[0]);
            console.log("Selected Portfolio:", selectedPortfolio);
            const fetchedHoldings =
              await portfoloioService.getPortfolioWithHoldings(response[0].id);
            setHoldings(fetchedHoldings);
            console.log("Fetched Holdings:", fetchedHoldings);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  const addInvestment = () => {
    window.location.href = "/main/portfolio/add";
  };

  const roundUpDecimal = (value: number | undefined, place: number) => {
    if (typeof value !== "number") return 0;
    console.log("Rounding value:", value, "to place:", place);
    return Math.ceil(value * Math.pow(10, place)) / Math.pow(10, place);
  };
  const removeHoldings = async (stockId: string) => {
    try {
      await portfoloioService.removeFromHoldings(stockId);
      // Update holdings after removal
      const updatedHoldings = await portfoloioService.getPortfolioWithHoldings(
        selectedPortfolio?.id || ""
      );
      setHoldings(updatedHoldings);
      // Optionally, you can also update the selected portfolio to reflect changes
      const updatedPortfolio = portfolios.map((portfolio) =>
        portfolio.id === selectedPortfolio?.id
          ? { ...portfolio, holdings: updatedHoldings.holdings }
          : portfolio
      );
      setPortfolios(updatedPortfolio);
      setSelectedPortfolio(updatedPortfolio[0]);
    } catch (error) {
      console.error("Error removing stock from holdings:", error);
    }
  };
  const isPortfolioEmpty = !selectedPortfolio?.holdings.length;

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <h1>Your Portfolio</h1>
        <Button
          className="add-investment-btn"
          variant="outlined"
          sx={{ cursor: "pointer" }}
          onClick={addInvestment}
        >
          Add Investment
        </Button>
      </div>
      <Box sx={{ minWidth: 200, marginRight: 2, marginBottom: "2rem" }}>
        <FormControl fullWidth>
          <InputLabel id="portfolio-select-label">Portfolio</InputLabel>
          <Select
            sx={{ width: 400 }}
            labelId="portfolio-select-label"
            id="portfolio-select"
            value={selectedPortfolio?.id || ""}
            label="Portfolio"
            onChange={(e) =>
              setSelectedPortfolio(
                portfolios.find((p) => p.id === e.target.value) || portfolios[0]
              )
            }
            className="portfolio-dropdown"
          >
            {portfolios.map((portfolio) => (
              <MenuItem key={portfolio.id} value={portfolio.id}>
                {portfolio.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {isLoading ? (
        <ScreenerSkeleton />
      ) : isPortfolioEmpty ? (
        <div className="empty-portfolio">
          <img src={empty_portfolio.src} alt="Empty portfolio" />
          <h2>Your portfolio is currently empty</h2>
          <p>
            Start building your investment portfolio by adding your first
            investment.
          </p>
          <Button className="add-investment-btn" onClick={addInvestment}>
            Add Investment
          </Button>

          <div className="discover-more">
            <h3>Discover More</h3>

            <div className="discover-item">
              <div className="text">
                <h4>Explore Investment Opportunities</h4>
                <p>
                  Discover a wide range of investment options and learn about
                  market trends.
                </p>
                <Button>Browse Investments</Button>
              </div>
              <img src={investment_green.src} alt="Growth chart" />
            </div>

            <div className="discover-item">
              <div className="text">
                <h4>Learn About Investing</h4>
                <p>
                  Access educational resources and guides to enhance your
                  investment knowledge.
                </p>
                <Button>Learn More</Button>
              </div>
              <img src={learn_investing.src} alt="Plants and books" />
            </div>
          </div>
        </div>
      ) : (
        <div className="portfolio-content">
          {/* Summary Boxes */}
          <div className="summary-boxes">
            <div className="box">
              <h3>Total Portfolio Value</h3>
              <p>
                $
                {holdings?.totalValue.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="box">
              <h3>Day’s Gain/Loss</h3>
              <p
                className={
                  Number(holdings?.totalDayLoss) > 0
                    ? "portfolio-content__positive"
                    : Number(holdings?.totalDayLoss) < 0
                      ? "portfolio-content__negative"
                      : ""
                }
              >
                {holdings?.totalDayLoss.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                ({holdings?.dayLossPercent}%)
              </p>
            </div>
            <div className="box">
              <h3>Unrealized Gain/Loss</h3>
              <p
                className={
                  Number(holdings?.totalGainLoss) > 0
                    ? "portfolio-content__positive"
                    : Number(holdings?.totalGainLoss) < 0
                      ? "portfolio-content__negative"
                      : ""
                }
              >
                {holdings?.totalGainLoss.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                ({holdings?.gainLossPercent}%)
              </p>
            </div>
          </div>

          {/* Graph Placeholder */}
          <div className="portfolio-graph">
            <h2>Portfolio Value Over Time</h2>
            <div className="portfolio-graph__container">
              <div className="portfolio-graph__container--graph">
                {chartData ? (
                  <PortfolioLineChart data={chartData} />
                ) : (
                  <div>Loading chart...</div>
                )}
              </div>
              <div className="portfolio-graph__container--insights">
                <PortfolioHighlights
                  dayGain={holdings?.totalDayLoss}
                  dayGainPercentage={holdings?.dayLossPercent}
                  totalGain={holdings?.totalGainLoss}
                  totalGainPercentage={holdings?.gainLossPercent}
                  assetBreakdown={[
                    {
                      label: "Stocks",
                      percentage: 60,
                      value: 12000,
                      color: "#4caf50",
                    },
                    {
                      label: "Bonds",
                      percentage: 25,
                      value: 5000,
                      color: "#2196f3",
                    },
                    {
                      label: "Cash",
                      percentage: 15,
                      value: 3000,
                      color: "#ff9800",
                    },
                  ]}
                  companySizeBreakdown={[
                    { label: "Large Cap", percentage: 55 },
                    { label: "Mid Cap", percentage: 30 },
                    { label: "Small Cap", percentage: 15 },
                  ]}
                  dividendBreakdown={[
                    { label: "Dividend", percentage: 40 },
                    { label: "Non-Dividend", percentage: 60 },
                  ]}
                  peRatioBreakdown={[
                    { label: "Low (<15)", percentage: 35 },
                    { label: "Medium (15-25)", percentage: 45 },
                    { label: "High (>25)", percentage: 20 },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Holdings Table */}
          <div className="portfolio-section">
            <h2>Holdings</h2>
            <div className="l-holdings__populated">
              <div className="l-holdings__populated--table-wrapper">
                <table className="l-holdings__populated--table">
                  <thead className="l-holdings__populated--table__header">
                    {/* Added ACTIONS column */}
                    <tr className="l-holdings__populated--table__header__contents">
                      <th>SYMBOL</th>
                      <th>NAME</th>
                      <th>PRICE</th>
                      <th>QUANTITY</th>
                      <th>GAIN</th>
                      <th>VALUE</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="l-holdings__populated--table__body">
                    {holdings?.holdings.map((stock, index) => (
                      <tr
                        key={stock.id}
                        className="l-holdings__populated--table__body__contents"
                      >
                        <td>{stock.ticker}</td>
                        <td>{stock.companyName}</td>
                        <td>{stock.currentPrice}</td>
                        <td>{stock.quantity}</td>
                        <td>
                          <span
                            className={
                              Number(stock.gainLoss) > 0
                                ? "l-holdings__populated--table__body__contents__positive"
                                : Number(stock.gainLoss) < 0
                                  ? "l-holdings__populated--table__body__contents__negative"
                                  : ""
                            }
                          >
                            {Math.ceil(
                              (stock.gainLoss ?? 0) * Math.pow(10, 2)
                            ) / Math.pow(10, 2)}
                          </span>
                        </td>
                        <td>${stock.totalValue}</td>
                        <td>
                          <Button
                            variant="outlined"
                            sx={{
                              cursor: "pointer",
                            }}
                            onClick={() => removeHoldings(stock.id)}
                          >
                            <Trash2
                              size={18}
                              className="l-holdings__delete-icon"
                              style={{ cursor: "pointer" }}
                            />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="portfolio-section">
            <h2>Recent Transactions</h2>
            <div className="l-holdings__populated">
              <div className="l-holdings__populated--table-wrapper">
                <table className="l-holdings__populated--table">
                  <thead className="l-holdings__populated--table__header">
                    {/* Added ACTIONS column */}
                    <tr className="l-holdings__populated--table__header__contents">
                      <th>Action</th>
                      <th>Shares</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody className="l-holdings__populated--table__body">
                    {transactionsData?.map((tran) => (
                      <tr
                        key={tran.id}
                        className="l-holdings__populated--table__body__contents"
                      >
                        <td>
                          {" "}
                          {tran.type.toUpperCase() === "BUY"
                            ? "Bought"
                            : "Sold"}
                          &nbsp;
                          {tran.ticker}
                        </td>
                        <td>{tran.quantity}</td>
                        <td>{tran.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="portfolio-section">
            <h2>Insights / Analytics</h2>
            <div className="chart-placeholder">[Sector Breakdown Chart]</div>
          </div>
        </div>
      )}
    </div>
  );
}

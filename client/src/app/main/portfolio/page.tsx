"use client";
import { useEffect, useState } from "react";
import "./portfolio.scss";
import ScreenerSkeleton from "@components/skeletons/ScreenerSkeleton";
import { portfoloioService } from "@lib/services/portfolio.service";
import { Portfolio } from "@types/portfolio";
import empty_portfolio from "@public/assets/image/portfolio/empty_portfolio.png";
import investment_green from "@public/assets/image/portfolio/investment_green.png";
import learn_investing from "@public/assets/image/portfolio/learn_investing.png";
export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMountedCleanup = true;
    const fetchPortfolioData = async () => {
      try {
        if (isMountedCleanup) {
          const response = await portfoloioService.getPortfolio();
          if (response?.length) {
            setPortfolios(response);
            setSelectedPortfolio(response[0]);
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

  const isPortfolioEmpty = !selectedPortfolio?.stocks.length;

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <h1>Your Portfolio</h1>
        <select
          className="portfolio-dropdown"
          value={selectedPortfolio?.id || ""}
          onChange={(e) =>
            setSelectedPortfolio(
              portfolios.find((p) => p.id === e.target.value) || portfolios[0]
            )
          }
        >
          {portfolios.map((portfolio) => (
            <option key={portfolio.id} value={portfolio.id}>
              {portfolio.name}
            </option>
          ))}
        </select>
        <button className="add-investment-btn">Add Investment</button>
      </div>

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
          <button className="add-investment-btn">Add Investment</button>

          <div className="discover-more">
            <h3>Discover More</h3>

            <div className="discover-item">
              <div className="text">
                <h4>Explore Investment Opportunities</h4>
                <p>
                  Discover a wide range of investment options and learn about
                  market trends.
                </p>
                <button>Browse Investments</button>
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
                <button>Learn More</button>
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
              <p>$125,480</p>
            </div>
            <div className="box">
              <h3>Day’s Gain/Loss</h3>
              <p>+ $520 (0.4%)</p>
            </div>
            <div className="box">
              <h3>Unrealized Gain/Loss</h3>
              <p>+ $15,000 (12%)</p>
            </div>
            <div className="box">
              <h3>Cash Available</h3>
              <p>$5,000</p>
            </div>
          </div>

          {/* Graph Placeholder */}
          <div className="portfolio-graph">
            <h2>Portfolio Value Over Time</h2>
            <div className="graph-placeholder">[Graph Component Here]</div>
          </div>

          {/* Holdings Table */}
          <div className="portfolio-section">
            <h2>Holdings</h2>
            <div className="table-placeholder">[Holdings Table]</div>
          </div>

          {/* Transactions */}
          <div className="portfolio-section">
            <h2>Recent Transactions</h2>
            <div className="table-placeholder">[Transactions Table]</div>
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

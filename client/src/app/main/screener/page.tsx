'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import './screener.scss';
import ScannerHeader from '@components/scanner-header/header';
import { Activity, CheckCircle, CircleDollarSign, Moon, MoveDownRight, MoveUpRight, Sunrise, TrendingDown, TrendingUp } from 'lucide-react';

const marketMovers = [
    {
      icon: <CheckCircle />,
      title: "Most Active Stocks",
      slug: "most-active",
      description: "Discover the most traded equities in the trading day.",
    },
    {
      icon: <TrendingUp />,
      title: "Day Gainer Stocks",
      slug: "most-gainers",
      description: "Track stocks with the greatest price increases in today’s session.",
    },
    {
      icon: <TrendingDown />,
      title: "Day Loser Stocks",
      slug: "most-losers",
      description: "Track stocks with the steepest price declines in today’s session.",
    },
    {
      icon: <TrendingUp />,
      title: "Day Gainer Stocks by %",
      slug: "top-gainers-by-percent",
      description: "Explore top-performing stocks based on percentage gains.",
    },
    {
      icon: <TrendingDown />,
      title: "Day Loser Stocks by %",
      slug: "top-losers-by-percent",
      description: "Explore the biggest losers by percentage drop during the session.",
    },
  ];
  

const pennyStockScanners = [
    {
        icon: <CircleDollarSign />,
        title: "Most Active Penny Stocks",
        slug: "most-gainers",
        description: "Stocks priced under $5 with the highest volume and volatility.",
    },
]

const signalScanners = [
    {
        icon: <Activity />,
        title: "Unusual Volume Stocks",
        slug: "most-gainers",
        description: "Equities trading with 3× or more volume than their 30-day average.",
    }
]

const breakOutScanners = [
    {
        icon: <MoveUpRight />,
        title: "52-Week High Breakouts",
        slug: "most-gainers",
        description: "Stocks hitting new 52-week highs, indicating strength and momentum.",
    },
    {
        icon: <MoveDownRight />,
        title: "52-Week Low Breakdowns",
        slug: "most-gainers",
        description: "Stocks falling to 52-week lows, suggesting breakdowns or sell pressure.",
    }
]

const preMarketScanners = [
    {
        icon: <Sunrise />,
        title: "Pre-Market Gainers",
        slug: "most-gainers",
        description: "Stocks making major gains before the market opens.",
    },
    {
        icon: <Sunrise />,
        title: "Pre-Market Losers",
        slug: "most-gainers",
        description: "Stocks experiencing losses before the market opens.",
    },
    {
        icon: <Moon />,
        title: "After-Hours Gainers",
        slug: "most-gainers",
        description: "Stocks rallying after the market close.",
    },
    {
        icon: <Moon />,
        title: "After-Hours Losers",
        slug: "most-gainers",
        description: "Stocks dropping after the regular session ends.",
    },

]
export default function MarketScanners() {
    const router = useRouter();

    const handleClick = (slug: string) => {
      router.push(`/main/screener/${slug}`)
    }

    return (
        <div className="dashboardContainer">
            <div className="content">
                <ScannerHeader
                    navigation={[
                        { id: 0, label: "My Screeners", href: "/main/scanner" },
                        { id: 1, label: "Market Data", href: "/dashboard/scanner/analysis" },
                        { id: 2, label: "Industry News", href: "/dashboard/scanner/history" },
                        { id: 3, label: "Real Estate", href: "/dashboard/scanner/history" },
                        { id: 4, label: "Technology", href: "/dashboard/scanner/history" },
                    ]}
                />
                <section className="market-scanners">
                    <h2 className="market-scanners__title">Core Market Movers</h2>
                    <p className="market-scanners__subtitle">
                        These highlight market-wide stock movements with the highest trading activity or percentage changes.
                    </p>
                    <div className="market-scanners__grid">
                        {marketMovers.map((item) => (
                            <a className="market-scanners__card" key={item.title} href={`/main/screener/${item.slug}`}>
                                <div className="market-scanners__icon">{item.icon}</div>
                                <div className="market-scanners__text">
                                    <h3 className="market-scanners__card-title">{item.title}</h3>
                                    <p className="market-scanners__description">{item.description}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
                <section className="market-scanners">
                    <h2 className="market-scanners__title">Penny Stock Scanners</h2>
                    <p className="market-scanners__subtitle">
                        Targets retail-driven, high-volume penny stock opportunities.
                    </p>
                    <div className="market-scanners__grid">
                        {pennyStockScanners.map((item) => (
                            <a className="market-scanners__card" key={item.title} href={`/main/screener/${item.slug}`}>
                                <div className="market-scanners__icon">{item.icon}</div>
                                <div className="market-scanners__text">
                                    <h3 className="market-scanners__card-title">{item.title}</h3>
                                    <p className="market-scanners__description">{item.description}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
                
                {/* Add your widgets/stats here */}
            </div>
        </div>
    );
}

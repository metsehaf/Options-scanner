"use client";
import "./landing.scss";
import Image from "next/image";
import banner from "../../public/assets/image/banner.jpg";
import searchImage from "../../public/assets/image/search.avif";
import predictionImage from "../../public/assets/image/banners/trends.jpg";
import watchlistImage from "../../public/assets/image/banners/paper-trading.jpg";
import bannerImage from "../../public/assets/image/banners/scanner.jpg";
import webull from "../../public/assets/image/brokerages/webull.png";
import interactive from "../../public/assets/image/brokerages/interactivebrokerage.png";
import quest from "../../public/assets/image/brokerages/Questrade.png";
import wealthsimple from "../../public/assets/image/brokerages/wealthsimple.png";
import cibc from "../../public/assets/image/brokerages/cibcinvestoredge.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Button, Typography } from "@mui/material";
import { cardType } from "../../types/dashboard";
import CustomCard from "../../components/card-element/card";
import FeatureCard from "../../components/features-card/features";
import {
  TrendingUp,
  NotificationsActive,
  PlayCircle,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";

const cardElement: cardType[] = [
  {
    title: "Quick Search & Analysis",
    content: "Instantly scan any stock option",
    image: searchImage,
  },
  {
    title: "AI predictions",
    content: "Smart insights based on historical & real-time data",
    image: predictionImage,
  },
  {
    title: "Watchlist & Alerts",
    content: "Save and monitor specific tickers",
    image: watchlistImage,
  },
  {
    title: "Customizable Scanner",
    content: "Filter by probability, expiration, and more",
    image: bannerImage,
  },
];

const brokerages = [
  { title: "Webull", image: webull },
  { title: "Quest Trade", image: quest },
  { title: "Wealthsimple", image: wealthsimple },
  { title: "Cibc Investor Edge", image: cibc },
  { title: "Interactive Brokers", image: interactive },
];

const features = [
  {
    icon: <TrendingUp />,
    title: "Powerful Option Scanner",
    content: `Uncover high-potential trades with our advanced option scanner. Get real-time insights, probability data, and risk-reward metrics, all in an easy-to-use interface. Whether you're searching for the best calls, puts, or spreads, Bullx provides the data you need to make informed decisions.`,
  },
  {
    icon: <NotificationsActive />,
    title: "Smart Watchlist & Alerts",
    content: `Stay ahead of the market with a customizable watchlist. Track your favorite stocks and options, set alerts for key price movements, and monitor unusual options activity. Never miss an opportunity again with Bullx’s intelligent tracking system.`,
  },
  {
    icon: <PlayCircle />,
    title: "Realistic Paper Trading",
    content:
      "Test your strategies risk-free with our paper trading feature. Simulate real trades with live market data, analyze performance, and refine your approach before committing real capital. Perfect for beginners and experienced traders alike.",
  },
  {
    icon: <PlayCircle />,
    title: "Portfolio Management",
    content:
      "Test your strategies risk-free with our paper trading feature. Simulate real trades with live market data, analyze performance, and refine your approach before committing real capital. Perfect for beginners and experienced traders alike.",
  },
];

function LandingPage() {
  const router = useRouter();
  const register = () => {
    router.push("/register");
  };
  return (
    <section className="l-main">
      <section className="l-hero">
        <div className="l-hero-background">
          <CustomCard
            title="Unlock the Power of Trading"
            description="Uncover high-potential trades with our advanced option scanner. Get real-time insights, probability data, and risk-reward metrics, all in an easy-to-use interface. Whether you're searching for the best calls, puts, or spreads, Bullx provides the data you need to make informed decisions."
            image={banner}
            height={500}
            width={"100%"}
          />
        </div>
      </section>
      <section className="l-features 0-grid">
        <div className="l-features-title">
          <h2>Explore our Powerful Features</h2>
          <p>
            Bullx is designed to help you make informed trading decisions with
            powerful tools and features.
          </p>
        </div>
        <div className="l-features-slot">
          {features.map((ele) => (
            <FeatureCard
              key={ele.title}
              title={ele.title}
              content={ele.content}
              icon={ele.icon}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default LandingPage;

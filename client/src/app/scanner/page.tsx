import "./scanner.scss";
import Hero from "../../components/hero/hero";
import Cta from "../../components/cta/cta";
import scannerBg from "../../public/assets/image/banners/scanner.jpg";
import FeatureCard from "../../components/features-card/features";
import {
  SearchOutlined,
  TrendingUpOutlined,
  TuneOutlined,
} from "@mui/icons-material";
import React from "react";
import CustomCard from "@components/card-element/card";

const features = [
  {
    icon: <SearchOutlined />,
    title: "Advanced Option Scanning",
    content: `Instantly filter and identify high-probability options based on volume, open interest, and implied volatility.`,
  },
  {
    icon: <TrendingUpOutlined />,
    title: "Probability-Based Predictions",
    content: `AI-powered scoring system ranks option contracts based on risk/reward potential.`,
  },
  {
    icon: <TuneOutlined />,
    title: "Customizable Filters",
    content:
      "Fine-tune your searches with personalized filters for strikes, expiration dates, and Greeks.",
  },
];

export default function scanner() {
  return (
    <section className="l-main">
      <section className="l-hero">
        <div className="l-hero-background">
          <CustomCard
            title="Unlock the Power of Trading"
            description="Uncover high-potential trades with our advanced option scanner. Get real-time insights, probability data, and risk-reward metrics, all in an easy-to-use interface. Whether you're searching for the best calls, puts, or spreads, Bullx provides the data you need to make informed decisions."
            image={scannerBg}
            height={500}
            width={"100%"}
          />
        </div>
      </section>
    </section>
  );
}

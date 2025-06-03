import React from "react";
import scannerBg from "@public/assets/image/banners/trends.jpg";
import {
  BarChartOutlined,
  InsightsOutlined,
  ShowChartOutlined,
} from "@mui/icons-material";
import "./trends.scss";
import FeatureCard from "@components/features-card/features";
import CustomCard from "@components/card-element/card";

const features = [
  {
    icon: <InsightsOutlined />,
    title: "Trend Analysis & Sentiment Insights",
    content: `Identify bullish, bearish, and neutral trends with AI-powered sentiment analysis.`,
  },
  {
    icon: <ShowChartOutlined />,
    title: "Sector & Industry Heatmaps",
    content: `Visualize the market’s strongest and weakest sectors in real time.`,
  },
  {
    icon: <BarChartOutlined />,
    title: "Unusual Volume & Order Flow",
    content: "Spot institutional activity with real-time volume spikes.",
  },
];

export default function trends() {
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
      <section className="l-features">
        <div className="l-features-title">
          <h2>Gain a competitve advantage</h2>
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

"use client";
import React from "react";
import styles from "./watchlist.module.scss";
import scannerBg from "@public/assets/image/watchlist.jpg";
import {
  FavoriteBorderOutlined,
  FormatListBulletedOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import FeatureCard from "@components/features-card/features";
import CustomCard from "@components/card-element/card";
import { Button } from "@mui/material";

const features = [
  {
    icon: <FavoriteBorderOutlined />,
    title: "Track Your Favorite Stocks & Options",
    content: `Easily monitor multiple tickers and option contracts in one place.`,
  },
  {
    icon: <NotificationsOutlined />,
    title: "Real-Time Alerts",
    content: `Get notified when price levels, volume, or volatility exceed thresholds.`,
  },
  {
    icon: <FormatListBulletedOutlined />,
    title: "Custom Watchlists",
    content:
      "Create multiple lists based on different strategies or trading goals.",
  },
];

export default function watchlist() {
  const handleLogin = () => {
    window.location.href = "/api/auth/custom-login";
  };

  return (
    <section className={styles["l-main"]}>
      <div className={styles["l-watchlist-header"]}>
        <h1 className="">Track Your Investments</h1>
        <p className="">
          Create a watchlist to monitor your favorite stocks and options, and
          receive real-time updates on their performance. Stay informed and make
          smarter investment decisions.
        </p>
      </div>
      <section className={styles["l-hero"]}>
        <div className={styles["l-hero-background"]}>
          <CustomCard image={scannerBg} height={300} width={"100%"} />
        </div>
        <div className={styles["l-hero-content"]}>
          <h2 className={styles["l-hero-title"]}>Your watchlist is empty</h2>
          <p className={styles["l-hero-subtitle"]}>
            Sign up or log in to start tracking your favorite stocks
          </p>
          <Button
            variant="contained"
            sx={{ bgcolor: "primary", color: "#fff", borderRadius: "20px" }}
            onClick={handleLogin}
          >
            Sign Up / Log in
          </Button>
        </div>
      </section>
      <section className={styles["l-features"]}>
        <div className={styles["l-features-title"]}>
          <h2>Why track your investments</h2>
        </div>
        <div className={styles["l-features-slot"]}>
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

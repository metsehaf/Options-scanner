// src/app/dashboard/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.scss"; // SCSS module for styling
import { ClientOnlySearchBar } from "@components/search/search";

// Placeholder for a generic chart component or just a div
const ChartPlaceholder: React.FC = () => (
  <div className={styles.chartPlaceholder}>
    {/* This could be replaced with a real charting library like Recharts, Chart.js, etc. */}
    <p>Portfolio Value Over Time Chart Placeholder</p>
  </div>
);

// Placeholder for a list card
interface ListCardProps {
  title: string;
  description: string;
  iconSrc: string; // Path to an image or an SVG/Emoji
  altText: string;
}

const ListCard: React.FC<ListCardProps> = ({
  title,
  description,
  iconSrc,
  altText,
}) => (
  <div className={styles.listCard}>
    <div className={styles.listCardIcon}>
      <img src={iconSrc} alt={altText} />
    </div>
    <h3 className={styles.listCardTitle}>{title}</h3>
    <p className={styles.listCardDescription}>{description}</p>
  </div>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"gainers" | "losers">("gainers");
  const [market, setMarket] = useState<
    "stocks" | "crypto" | "fx" | "otc" | "indices"
  >("stocks");
  const focusInputRef = useRef<HTMLInputElement>(null);
  const isOpen = true; // Assuming the modal is always open for this example

  // Local state to manage form values
  // const [formData, setFormData] = useState<any>(modalData);

  // Focus on the email field when modal opens
  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);
  // Placeholder data for top movers table
  const topGainers = [
    { name: "Tech Company A", price: 123.45, change: "+10.2%" },
    { name: "Tech Company B", price: 234.56, change: "+8.5%" },
    { name: "Tech Company C", price: 345.87, change: "+7.8%" },
    { name: "Tech Company D", price: 456.78, change: "+6.5%" },
    { name: "Tech Company E", price: 567.89, change: "+5.2%" },
  ];

  const topLosers = [
    { name: "Finance Corp X", price: 98.76, change: "-9.1%" },
    { name: "Retail Co. Y", price: 87.65, change: "-7.3%" },
    { name: "Energy Inc. Z", price: 76.54, change: "-6.0%" },
    { name: "Healthcare Ltd.", price: 65.43, change: "-5.5%" },
    { name: "Logistics Co. W", price: 54.32, change: "-4.8%" },
  ];

  const currentTopMovers = activeTab === "gainers" ? topGainers : topLosers;

  return (
    <div className={styles.dashboardPage}>
      {/* Top Header Section */}
      <header className={styles.header}>
        <div className={styles.headerRight}>
          <div className={styles.searchContainer}>
            <ClientOnlySearchBar isOpen={isOpen} />
          </div>
        </div>
        <div className={styles.headerLeft}>
          <h1 className={styles.greeting}>Good morning, Alex</h1>
        </div>
      </header>

      {/* Portfolio Summary Cards */}
      <section className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <p className={styles.cardLabel}>Portfolio balance</p>
          <h2 className={styles.cardValue}>$12,345.67</h2>
          <p className={`${styles.cardChange} ${styles.positive}`}>+1.23%</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.cardLabel}>24h change</p>
          <h2 className={styles.cardValue}>+$123.45</h2>
          <p className={`${styles.cardChange} ${styles.positive}`}>+1.23%</p>
        </div>
      </section>

      {/* Portfolio Chart Section */}
      <section className={styles.portfolioSection}>
        <h2 className={styles.sectionTitle}>Portfolio</h2>
        <h3 className={styles.portfolioValue}>$12,345.67</h3>
        <p className={`${styles.portfolioChange} ${styles.positive}`}>
          1Y +1.23%
        </p>
        <ChartPlaceholder />
      </section>

      {/* Your Lists Section */}
      <section className={styles.yourListsSection}>
        <h2 className={styles.sectionTitle}>Your lists</h2>
        <div className={styles.listCardsContainer}>
          <ListCard
            title="Tech Titans"
            description="Top tech stocks"
            iconSrc="https://placehold.co/40x40/E0F2F7/2196F3?text=📈" // Placeholder icon
            altText="Tech Titans icon"
          />
          <ListCard
            title="Green Growth"
            description="Sustainable Investments"
            iconSrc="https://placehold.co/40x40/E8F5E9/4CAF50?text=🌱" // Placeholder icon
            altText="Green Growth icon"
          />
          <ListCard
            title="Future Leaders"
            description="Emerging companies"
            iconSrc="https://placehold.co/40x40/FFF3E0/FF9800?text=🚀" // Placeholder icon
            altText="Future Leaders icon"
          />
        </div>
      </section>

      {/* Top Movers Section */}
      <section className={styles.topMoversSection}>
        <h2 className={styles.sectionTitle}>Top movers</h2>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === "gainers" ? styles.active : ""}`}
            onClick={() => setActiveTab("gainers")}
          >
            Top gainers
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "losers" ? styles.active : ""}`}
            onClick={() => setActiveTab("losers")}
          >
            Top losers
          </button>
        </div>
        <table className={styles.moversTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {currentTopMovers.map((mover, index) => (
              <tr key={index}>
                <td>{mover.name}</td>
                <td>${mover.price.toFixed(2)}</td>
                <td
                  className={
                    mover.change.startsWith("+")
                      ? styles.positive
                      : styles.negative
                  }
                >
                  {mover.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Invite Friends Section */}
      <section className={styles.inviteFriendsSection}>
        <span className={styles.inviteIcon}>✉️</span>{" "}
        {/* Envelope emoji as icon */}
        <p className={styles.inviteText}>Invite friends</p>
      </section>
    </div>
  );
}

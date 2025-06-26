"use client";

import React from "react";
import { PortfolioChartData } from "@types/portfolio";
import { LineChart } from "@mui/x-charts/LineChart";
import "./chart.scss";

const PortfolioLineChart = ({ data }: { data: PortfolioChartData }) => {
  const { xAxis, series } = data;

  return (
    <div className="l-chart-wrapper">
      <LineChart
        xAxis={[
          { scaleType: "time", data: xAxis.map((date) => new Date(date)) },
        ]}
        series={[{ data: series, label: "Portfolio Value ($)" }]}
        height={300}
        margin={{ top: 30, bottom: 50, left: 70, right: 30 }}
        grid={{ vertical: true, horizontal: true }}
        colors={["#7e57c2"]}
      />
    </div>
  );
};

export default PortfolioLineChart;

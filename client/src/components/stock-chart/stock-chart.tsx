"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import "./stock-chart.scss";

interface ChartPoint {
  time: string; // ISO string or formatted time (e.g., '09:30')
  price: number;
}

interface StockChartProps {
  data: ChartPoint[];
}

const formatXAxis = (tickItem: number) => {
  return dayjs(tickItem).format("h:mm A");
};

const StockAreaChart: React.FC<StockChartProps> = ({ data }) => {
  // Convert data to use timestamps for the x-axis
  const paddedData = [...data].map((d) => ({
    ...d,
    time: dayjs(d.time).valueOf(), // convert to timestamp
  }));

  // Pad only the start if needed
  if (paddedData.length > 0) {
    const firstTime = dayjs(paddedData[0].time);
    const fullDayStart = dayjs(firstTime).hour(9).minute(30).second(0);

    if (!firstTime.isSame(fullDayStart)) {
      paddedData.unshift({
        time: fullDayStart.valueOf(),
        price: paddedData[0].price,
      });
    }
  }

  // Define the full day range for the x-axis
  const xMin =
    paddedData.length > 0
      ? dayjs(paddedData[0].time).hour(9).minute(30).second(0).valueOf()
      : undefined;
  const xMax =
    paddedData.length > 0
      ? dayjs(paddedData[0].time).hour(16).minute(0).second(0).valueOf()
      : undefined;

  return (
    <div className="stock-chart-wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={paddedData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7e57c2" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#7e57c2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickFormatter={formatXAxis}
            domain={
              xMin !== undefined && xMax !== undefined
                ? [xMin, xMax]
                : undefined
            }
            type="number"
            allowDataOverflow={true}
            tickCount={8}
          />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip
            labelFormatter={(label) => dayjs(label).format("MMM D, h:mm A")}
            formatter={(value) => [`$${value}`, "Price"]}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#7e57c2"
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockAreaChart;

"use client";
import Link from "next/link";
import "./aside.scss";
import {
  Search,
  TrendingUp,
  FileBarChart,
  Bookmark,
  Settings,
  LogOut,
  X,
  MenuIcon,
} from "lucide-react";
import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import clsx from "clsx";

export default function Aside() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { icon: <Search />, label: "Scanner", href: "/main/screener" },
    { icon: <TrendingUp />, label: "Trends", href: "/main/trends" },
    {
      icon: <FileBarChart />,
      label: "Paper Trading",
      href: "/main/paper-trading",
    },
    { icon: <Bookmark />, label: "Watchlist", href: "/main/watchlist" },
    { icon: <FileBarChart />, label: "Portfolio", href: "/main/portfolio" },
    { icon: <Settings />, label: "Settings", href: "/main/settings" },
    { icon: <LogOut />, label: "Log out", href: "/api/auth/logout" },
  ];

  return (
    <aside className={clsx("sidebar", isCollapsed && "collapsed")}>
      <Box className="sidebar-header">
        <IconButton
          onClick={toggleSidebar}
          className="sidebar-toggle"
          color="inherit"
          sx={{ cursor: "pointer" }}
        >
          {isCollapsed ? <MenuIcon /> : <X />}
        </IconButton>
      </Box>

      <nav className="sidebar-nav">
        {navItems.map(({ icon, label, href }) => (
          <Link key={href} href={href} className="sidebar-link">
            {icon}
            {!isCollapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

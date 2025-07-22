"use client";

import { Bell, HelpCircle, Mail, User } from "lucide-react";
import Button from "@mui/material/Button";
import React from "react";
import styles from "./header.module.scss"; // SCSS module import
import { Link } from "@mui/material";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <Link href="/main/dashboard">Bullx</Link>
      </div>
      <div className={styles.actions}>
        <Button variant="text" size="small" aria-label="Help">
          <HelpCircle size={20} />
        </Button>
        <Button variant="text" size="small" aria-label="Notifications">
          <Bell size={20} />
        </Button>
        <Button variant="text" size="small" aria-label="Messages">
          <Mail size={20} />
        </Button>
        <div className={styles.divider} />
        <Button variant="text" size="small" aria-label="User Profile">
          <User size={20} />
        </Button>
      </div>
    </header>
  );
}

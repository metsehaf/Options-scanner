'use client';
import React from 'react';
import styles from './dashboard.module.scss';
import DashboardHeader from '../../../components/scanner-header/header';


export default function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.content}>
                <DashboardHeader
                    navigation={[
                        { id: 0,label: "Overview", href: "/main/scanner" },
                        { id: 1, label: "Analysis", href: "/dashboard/scanner/analysis" },
                        { id: 2, label: "History", href: "/dashboard/scanner/history" },
                    ]}
                />
                <h1>Welcome to your dashboard!</h1>
                <p>Stocks with significan short-tem movement.</p>
                {/* Add your widgets/stats here */}
            </div>
        </div>
    );
}

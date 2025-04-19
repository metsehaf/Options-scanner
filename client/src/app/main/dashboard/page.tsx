'use client';
import React from 'react';
import styles from './dashboard.module.scss';
import Link from 'next/link';
import { Search, TrendingUp, FileBarChart, Bookmark, Settings, LogOut } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.sidebar}>
                <h2 className={styles.logo}>Bullx</h2>
                <nav className={styles.nav}>
                    <div>
                        <Link href="/main/scanner"><Search /><span>Scanner</span></Link>
                    </div>
                    <div>
                        <Link href="/main/trends"><TrendingUp /><span>Trends</span></Link>
                    </div>
                    <div>
                        <Link href="/main/paper-trading"><FileBarChart /><span>Paper Trading</span></Link>
                    </div>
                    <div>
                        <Link href="/main/paper-trading"><Bookmark /><span>Watchlist</span></Link>
                    </div>
                    <div>
                        <Link href="/main/settings"><Settings /><span>Settings</span></Link>
                    </div>
                    <div>
                        <Link href="/api/auth/logout"><LogOut /><span>Log out</span></Link>
                    </div>
                </nav>
            </aside>
            <main className={styles.content}>
                <h1>Welcome to your dashboard!</h1>
                {/* Add your widgets/stats here */}
            </main>
        </div>
    );
}

import Link from 'next/link';
import  './aside.scss';
import { Search, TrendingUp, FileBarChart, Bookmark, Settings, LogOut } from 'lucide-react';
import React from 'react';

export default function Aside() {
    return (
        <aside className="sidebar">
            <h2 className="logo">Bullx</h2>
            <nav className="nav">
                <div>
                    <Link href="/main/screener"><Search /><span>Scanner</span></Link>
                </div>
                <div>
                    <Link href="/main/trends"><TrendingUp /><span>Trends</span></Link>
                </div>
                <div>
                    <Link href="/main/paper-trading"><FileBarChart /><span>Paper Trading</span></Link>
                </div>
                <div>
                    <Link href="/main/watchlist"><Bookmark /><span>Watchlist</span></Link>
                </div>
                <div>
                    <Link href="/main/settings"><Settings /><span>Settings</span></Link>
                </div>
                <div>
                    <Link href="/api/auth/logout"><LogOut /><span>Log out</span></Link>
                </div>
            </nav>
        </aside>
    )
}
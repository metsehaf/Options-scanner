import React from "react";
import Hero from '../../components/hero/hero';
import Cta from '../../components/cta/cta';
import scannerBg from '../../public/assets/image/watchlist.jpg';
import { FavoriteBorderOutlined, FormatListBulletedOutlined, NotificationsOutlined } from '@mui/icons-material';
import FeatureCard from "../../components/features-card/features";

const features = [
    {
        icon: <FavoriteBorderOutlined />,
        title: 'Track Your Favorite Stocks & Options',
        content: `Easily monitor multiple tickers and option contracts in one place.`
    },
    {
        icon: <NotificationsOutlined />,
        title: 'Real-Time Alerts',
        content: `Get notified when price levels, volume, or volatility exceed thresholds.`
    },
    {
        icon: <FormatListBulletedOutlined />,
        title: 'Custom Watchlists',
        content: 'Create multiple lists based on different strategies or trading goals.'
    }
]

export default function watchlist() {
    return (
        <main className="l-main">
            <Hero title="Allow users to track their favorite tickers."
                subtitle="Recive real-time data on the stocks you choose."
                image={scannerBg} />
            <section className='l-features'>
                <h2 className='l-features-title'>Industry Leading Features</h2>
                <section className='l-features-slot'>
                    {features.map((ele) => (
                        <FeatureCard key={ele.title} title={ele.title} content={ele.content} icon={ele.icon} />
                    ))}
                </section>
            </section>
            <Cta ctaText={"Build Your Personalized Watchlist!"}/>
        </main>
    )
}
import React from "react";
import Hero from '../../components/hero/hero';
import Cta from '../../components/cta/cta';
import scannerBg from '../../public/assets/image/banners/trends.jpg';
import { BarChartOutlined, InsightsOutlined,  ShowChartOutlined } from '@mui/icons-material';
import FeatureCard from "../../components/features-card/features";

const features = [
    {
        icon: <InsightsOutlined />,
        title: 'Trend Analysis & Sentiment Insights',
        content: `Identify bullish, bearish, and neutral trends with AI-powered sentiment analysis.`
    },
    {
        icon: <ShowChartOutlined />,
        title: 'Sector & Industry Heatmaps',
        content: `Visualize the market’s strongest and weakest sectors in real time.`
    },
    {
        icon: <BarChartOutlined/>,
        title: 'Unusual Volume & Order Flow',
        content: 'Spot institutional activity with real-time volume spikes.'
    }
]

export default function trends() {
    return (
        <main className="l-main">
            <Hero title="Stay Ahead with Real-Time Market Insights."
                subtitle="Identify trading opportunities instantly as market conditions change."
                image={scannerBg} />
            <section className='l-features'>
                <h2 className='l-features-title'>Industry Leading Features</h2>
                <section className='l-features-slot'>
                    {features.map((ele) => (
                        <FeatureCard key={ele.title} title={ele.title} content={ele.content} icon={ele.icon} />
                    ))}
                </section>
            </section>
            <Cta ctaText={"Unlock Market Trends for Smarter Trades!"}/>
        </main>
    )
}
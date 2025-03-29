import './paper-trading.scss'
import Hero from '../../components/hero/hero';
import Cta from '../../components/cta/cta';
import scannerBg from '../../public/assets/image/banners/paper-trading.jpg'
import React from 'react';
import FeatureCard from '../../components/features-card/features';
import { BarChartOutlined, MonetizationOnOutlined, VisibilityOutlined } from '@mui/icons-material';


const features = [
    {
        icon: <MonetizationOnOutlined />,
        title: 'Risk-Free Trading',
        content: `Practice options trading with virtual funds in real-market conditions.`
    },
    {
        icon: <BarChartOutlined />,
        title: 'Performance Tracking',
        content: `Analyze your trades with detailed P&L reports and gain trading insights.`
    },
    {
        icon: <VisibilityOutlined />,
        title: 'Real-Time Market Data',
        content: 'Get live quotes and option chain data to simulate real execution.'
    }
]

export default function scanner() {

    return (
        <main className="l-main">
            <Hero title="Practice Options Trading Without Risk."
                subtitle="Master the art of trading with out hurting your wallet"
                image={scannerBg} />
            <section className='l-features'>
                <h2 className='l-features-title'>Industry Leading Features</h2>
                <section className='l-features-slot'>
                    {features.map((ele) => (
                        <FeatureCard key={ele.title} title={ele.title} content={ele.content} icon={ele.icon} />
                    ))}
                </section>
            </section>
        <Cta ctaText={"Try Risk-Free Trading Now!"}/>
        </main>
    )
}
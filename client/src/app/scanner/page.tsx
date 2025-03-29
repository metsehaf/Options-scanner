
import './scanner.scss'
import Hero from '../../components/hero/hero';
import Cta from '../../components/cta/cta';
import scannerBg from '../../public/assets/image/banners/scanner.jpg';
import FeatureCard from '../../components/features-card/features';
import { SearchOutlined, TrendingUpOutlined, TuneOutlined } from '@mui/icons-material';

const features = [
    {
        icon: <SearchOutlined />,
        title: 'Advanced Option Scanning',
        content: `Instantly filter and identify high-probability options based on volume, open interest, and implied volatility.`
    },
    {
        icon: <TrendingUpOutlined />,
        title: 'Probability-Based Predictions',
        content: `AI-powered scoring system ranks option contracts based on risk/reward potential.`
    },
    {
        icon: <TuneOutlined />,
        title: 'Customizable Filters',
        content: 'Fine-tune your searches with personalized filters for strikes, expiration dates, and Greeks.'
    }
]

export default function scanner() {

    return (
        <main className="l-main">
            <Hero title="Trade Smarter with Bullx"
                subtitle="Scan the market and leverage real-time data that meet your criteria."
                image={scannerBg} />
            <section className='l-features'>
                <h2 className='l-features-title'>Industry Leading Features</h2>
                <section className='l-features-slot'>
                    {features.map((ele) => (
                        <FeatureCard key={ele.title} title={ele.title} content={ele.content} icon={ele.icon} />
                    ))}
                </section>
            </section>
            <Cta ctaText={'Start Scanning for Free'}/>
        </main>
    )
}
'use client';
import './landing.scss'
import Image from 'next/image'
import banner from '../../public/assets/image/banner.jpg';
import searchImage from '../../public/assets/image/search.avif';
import predictionImage from '../../public/assets/image/banners/trends.jpg';
import watchlistImage from '../../public/assets/image/banners/paper-trading.jpg';
import bannerImage from '../../public/assets/image/banners/scanner.jpg';
import webull from '../../public/assets/image/brokerages/webull.png';
import interactive from '../../public/assets/image/brokerages/interactivebrokerage.png';
import quest from '../../public/assets/image/brokerages/Questrade.png';
import wealthsimple from '../../public/assets/image/brokerages/wealthsimple.png';
import cibc from '../../public/assets/image/brokerages/cibcinvestoredge.png';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Box, Button, Typography } from '@mui/material';
import { cardType } from '../../types/dashboard'
import CustomCard from '../../components/card-element/card';
import FeatureCard from '../../components/features-card/features';
import {TrendingUp, NotificationsActive, PlayCircle} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import React from 'react';

const cardElement: cardType[] = [
    { title: 'Quick Search & Analysis', content: 'Instantly scan any stock option', image: searchImage },
    { title: 'AI predictions', content: 'Smart insights based on historical & real-time data', image: predictionImage },
    { title: 'Watchlist & Alerts', content: 'Save and monitor specific tickers', image: watchlistImage },
    { title: 'Customizable Scanner', content: 'Filter by probability, expiration, and more', image: bannerImage }
]

const brokerages = [
    { title: "Webull", image: webull },
    { title: "Quest Trade", image: quest },
    { title: "Wealthsimple", image: wealthsimple },
    { title: "Cibc Investor Edge", image: cibc },
    { title: "Interactive Brokers", image: interactive },
]

const features = [
    {
        icon: <TrendingUp />,
        title: 'Powerful Option Scanner',
        content: `Uncover high-potential trades with our advanced option scanner. Get real-time insights, probability data, and risk-reward metrics, all in an easy-to-use interface. Whether you're searching for the best calls, puts, or spreads, Bullx provides the data you need to make informed decisions.`
    },
    { 
        icon: <NotificationsActive />, 
        title: 'Smart Watchlist & Alerts', 
        content: `Stay ahead of the market with a customizable watchlist. Track your favorite stocks and options, set alerts for key price movements, and monitor unusual options activity. Never miss an opportunity again with Bullx’s intelligent tracking system.` },
    { 
        icon: <PlayCircle />,
        title: 'Realistic Paper Trading', 
        content: 'Test your strategies risk-free with our paper trading feature. Simulate real trades with live market data, analyze performance, and refine your approach before committing real capital. Perfect for beginners and experienced traders alike.' }
]

function LandingPage() {
    const router = useRouter()
    const register = () => {
        router.push('/register');
    }
    return (
        <main className="l-main">
            <section className=" l-hero" >
                <div className="l-hero-content">
                    <h1 className="l-hero-content-title">Option trading with confidence</h1>
                    <hr className="l-hero-content-divider"></hr>
                    <Box sx={{ flexGrow: 0, justifyContent: 'flex-start', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p className="l-hero-content-sub-header">Search any stock ticker and get real-time probabilities.</p>
                        <Button variant='contained' sx={{ bgcolor: 'primary', color: '#fff', width: '250px', padding: '1.5rem', fontSize: '.75rem', cursor: 'pointer' }} onClick={register}>Create a Stock Scanner  <Box sx={{ marginLeft: '.25rem' }}>
                            <ArrowRightAltIcon />
                        </Box></Button>
                    </Box>
                </div>
                <div className="l-hero-background">
                    <Image src={banner} priority={true} className="l-landing-banner" width={500} height={300} alt="banner image" />
                </div>
            </section>
            <section className="l-section">
                <Typography variant='h2' sx={{ fontWeight: 'bold', fontSize: '24px' }}>Features</Typography>
                <div className="l-services">
                    {cardElement.map((ele) => [
                        <CustomCard key={ele.title} title={ele.title} description={ele.content} image={ele.image} />
                    ])
                    }
                </div>
            </section>
            <section className='l-features'>
                <h2 className='l-features-title'>Industry Leading Features</h2>
                <section className='l-features-slot'>
                    {features.map((ele) => (
                        <FeatureCard key={ele.title} title={ele.title} content={ele.content} icon={ele.icon} />
                    ))}
                </section>
            </section>
            <section className="l-integrations">
                <div className="l-integrations-title">
                    <h2 >Integrate with the software you already use</h2>
                </div>
                <div className='l-integrations-brokerages' >
                    {brokerages.map((ele) => (
                        <div className='l-integrations-brokerages-container' key={ele.title}>
                            <Image src={ele.image} priority={true} className="l-landing-banner" width={500} height={300} alt="banner image" />
                        </div>
                    ))}
                    {/* <SwipperComponent data={brokerages} /> */}

                </div>
            </section>
        </main>
    )
}

export default LandingPage;
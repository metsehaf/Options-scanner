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
import { Box, Button, Typography } from '@mui/material';
import { cardType } from '../../models/dashboard'
import SwipperComponent from '../../components/swipper/swipper';
import CustomCard from '../../components/card-element/card';


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


function LandingPage() {
    return (
        <main className="l-main">
            <section className=" l-hero" >
                <div className="l-hero-content">
                    <h1 className="l-hero-content-title">Option trading with confidence</h1>
                    <hr className="l-hero-content-divider"></hr>
                    <Box sx={{ flexGrow: 0, justifyContent: 'flex-start', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p className="l-hero-content-sub-header">Search any stock ticker and get real-time probabilities.</p>
                        <Button variant='contained' sx={{ bgcolor: 'primary', color: '#fff', width: '250px', padding: '1.5rem' }}>Signup / Login</Button>
                    </Box>
                </div>
                <div className="l-hero-background">
                    <Image src={banner} priority={true} className="l-landing-banner" width={500} height={300} alt="banner image" />
                </div>
            </section>
            <section className="l-section">
                <Typography variant='h2' sx={{fontWeight: 'bold', fontSize: '24px'}}>Features</Typography>
                <div className="l-features">
                    {cardElement.map((ele) => [
                        <CustomCard key={ele.title} title={ele.title} description={ele.content} image={ele.image} />
                    ])
                    }
                </div>
            </section>
            <section className="l-section">
            <Typography variant='h2' sx={{fontWeight: 'bold', fontSize: '24px'}}>Import your portfolio from your broker</Typography>
                <div className='l-brokerages'>
                    <SwipperComponent data={brokerages} />
                </div>
            </section>
        </main>
    )
}

export default LandingPage;
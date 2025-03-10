import { Box, Button } from '@mui/material'
import banner from '../../public/assets/image/banner.jpg';
import Image from 'next/image'
import './scanner.scss'
export default function scanner() {
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
        </main>
    )
}
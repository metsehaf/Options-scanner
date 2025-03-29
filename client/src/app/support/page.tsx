import React from "react";
import Hero from '../../components/hero/hero';
import Cta from '../../components/cta/cta';
import scannerBg from '../../public/assets/image/banners/scanner.jpg'

export default function support(){
    return (
        <main className="l-main">
        <Hero title="Trade Smarter with Bullx"
            subtitle="Master options trading with confidence."
            image={scannerBg} />
             <Cta />
    </main>
    )
}
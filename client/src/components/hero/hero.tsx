import React from "react";
import './hero.scss'
import { StaticImageData } from "next/image";

type HeroProps = {
    title: string;
    subtitle: string;
    image: StaticImageData;
};

export default function Hero({ title, subtitle, image}: HeroProps) {
    return (
        <div className="c-plan-hero">
            <div 
                className="c-plan-hero__image"
                style={{ backgroundImage: `url('${image.src}')` }}
            />
            
            <div className="c-plan-hero__inner">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </div>
    );
}

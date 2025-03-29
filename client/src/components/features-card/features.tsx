import React from "react";
import {  SvgIcon, SvgIconTypeMap } from '@mui/material';

type featureProps = {
    title: string;
    content: string;
    icon: JSX.Element;
};

export default function FeatureCard({ title, content, icon}: featureProps) {
    return (
        <div className='l-features-slot--content'>
            <div className='l-features-slot--content_icon'>
                {icon}
            </div>
            <div className='l-features-slot--content__sub-header'>
                <h4>{title}</h4>
            </div>
            <div className='l-features-slot--content_p'>
                <p>{content}</p>
            </div>
        </div>
    )
}
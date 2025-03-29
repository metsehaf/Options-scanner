import { Box, Button } from "@mui/material";
import React from "react";

export default function Cta({ctaText}: {ctaText: string}) {
    return (
        <Box
            sx={{
                position: 'relative',
                display: "inline-block",
                height: 250,
                borderRadius: 4,
                overflow: 'hidden',
                padding: '5.25rem',
                margin: '3.5rem 0',
                background: '#4B0082',
                textAlign: 'center',
                verticalAlign: 'middle',
                width: '100%',
                boxSizing: 'border-box'
            }}>
            <Button variant='contained'
                sx={{
                    backgroundColor: 'white',
                    color: '#4B0082', // Your theme color
                    border: '2px solid #4B0082',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease-in-out'
                }}>{ctaText}</Button>
        </Box >
    )
}
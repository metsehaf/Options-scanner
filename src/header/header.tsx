
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
    const headerContent: string[] = ["Scanner", "Pricing", "Chart", "Options"];
    const [scanner, pricing, chart, Options] = headerContent;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {scanner}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {pricing}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {chart}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {Options}
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

// function Header(){
//     const headerContent: string[] = ["Scanner", "Pricing", "Chart", "Options"];
//     const [scanner, pricing, chart, Options] = headerContent;
//     console.log(scanner)
//     return (
//         <header>
//             <a href="/">{scanner}</a>
//             <a href="/">{pricing}</a>
//             <a href="/">{chart}</a>
//             <a href="/">{Options}</a>
//         </header>
//     )
// }

// export default Header;
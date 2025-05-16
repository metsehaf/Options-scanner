'use client';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, InputBase, styled } from '@mui/material';
import { useEffect, useState } from 'react';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    border: `1px solid ${alpha(theme.palette.primary.dark, 0.5)}`,
    color: theme.palette.primary.dark,
    '&:hover': {
        backgroundColor: '#fff',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '100%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '30ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export function ClientOnlySearchBar() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const focused = (ev: React.FormEvent) => {
        console.log(ev.target)
    }
    function changed(ev: React.FormEvent) {
        console.log((ev.target as any).value)
    }
    if (!mounted) return null;

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="search name or symbol"
                inputProps={{ 'aria-label': 'search' }}
                onInput={(ev) => changed(ev)}
                onFocus={focused} />
        </Search>
    );
}
'use client';

import SearchIcon from '@mui/icons-material/Search';
import {
  alpha,
  InputBase,
  styled,
  Paper,
  List,
  ListItem,
  CircularProgress,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSearch } from '@hooks/search'; // Make sure path is correct

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff',
  border: `1px solid ${alpha(theme.palette.primary.dark, 0.5)}`,
  color: theme.palette.primary.dark,
  width: '100%',
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '400px',
  },
}));

export function ClientOnlySearchBar() {
  const [query, setQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { results, loading } = useSearch(query);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setDropdownOpen(true);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search stocks or ETFs"
          value={query}
          onChange={handleChange}
          onFocus={() => setDropdownOpen(true)}
        />
      </Search>

      {dropdownOpen && query.length > 0 && (
        <Paper
          style={{ position: 'absolute', top: '100%', left: 0, width: '100%', zIndex: 10 }}
        >
          {loading ? (
            <div style={{ padding: 12, textAlign: 'center' }}>
              <CircularProgress size={20} />
            </div>
          ) : results.length > 0 ? (
            <List dense>
              {results.map((item: any) => (
                <ListItem component="button" key={item.ticker}>
                  <div>
                    <strong>{item.ticker}</strong> — {item.name}
                  </div>
                </ListItem>
              ))}
            </List>
          ) : (
            <div style={{ padding: 12, textAlign: 'center' }}>No results found</div>
          )}
        </Paper>
      )}
    </div>
  );
}

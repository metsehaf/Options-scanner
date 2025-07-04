"use client";

import SearchIcon from "@mui/icons-material/Search";
import {
  alpha,
  InputBase,
  styled,
  Paper,
  List,
  ListItem,
  CircularProgress,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "@hooks/search"; // Make sure path is correct
import React from "react";
import { useRouter } from "next/navigation";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  border: `1px solid ${alpha(theme.palette.primary.dark, 0.5)}`,
  color: theme.palette.primary.dark,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "400px",
  },
}));

export function ClientOnlySearchBar({ isOpen = false }) {
  const router = useRouter();
  const [query, setQuery] = useState("AAPL");
  const [market, setMarket] = useState("stocks");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { results, loading } = useSearch(query, market, isOpen);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const marketList = [
    { label: "stocks", id: 0 },
    { label: "crypto", id: 1 },
    { label: "fx", id: 2 },
    { label: "otc", id: 3 },
    { label: "indices", id: 4 },
  ];
  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setDropdownOpen(true);
  };

  const handleMarketChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setMarket(newValue);
  };

  const handleSelection = (e: string) => {
    console.log("Item clicked:", e);
    const ticker = e;
    console.log("Selected ticker:", ticker);
    if (ticker) {
      // window.location.href = `/main/watchlist/${ticker}`;
      router.push(`/main/watchlist/${ticker}`);
    }
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
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

      {dropdownOpen && (
        <Paper
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            zIndex: 10,
          }}
        >
          {loading ? (
            <div style={{ padding: 12, textAlign: "center" }}>
              <CircularProgress size={20} />
            </div>
          ) : results.length > 0 ? (
            <List dense>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={market}
                  onChange={handleMarketChange}
                  aria-label="basic tabs example"
                  variant="fullWidth"
                >
                  {marketList.map((item, i) => (
                    <Tab
                      key={item.id}
                      label={item.label}
                      value={item.label}
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        backgroundColor: "white",
                        height: 4,
                        minWidth: "50px",
                        width: "100%",
                        color: "#000",
                        "&.Mui-selected": { backgroundColor: "#f0f0f0" },
                      }}
                    />
                  ))}
                </Tabs>
              </Box>
              {results.map((item: any, i: number) => (
                <ListItem
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  component="li"
                  key={i}
                  onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                    handleSelection(item.ticker)
                  }
                >
                  <div>
                    <strong>{item.ticker}</strong> — {item.name}
                  </div>
                </ListItem>
              ))}
            </List>
          ) : (
            <div style={{ padding: 12, textAlign: "center" }}>
              No results found
            </div>
          )}
        </Paper>
      )}
    </div>
  );
}

// @components/search/portfolio-search.tsx

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
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "@hooks/search";
import React from "react";
import { SearchResultAsset } from "@types/search";
import { PortfolioSearchBarProps } from "@types/portfolio";

// Styled Components (no changes needed here)
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  border: `1px solid ${alpha(theme.palette.primary.dark, 0.5)}`,
  color: theme.palette.primary.dark,
  width: "100%",
  marginBottom: theme.spacing(2),
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
    width: "calc(100% - 4em)",
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
  padding: theme.spacing(1.2, 2),
}));

export function PortfolioSearchBar({
  isOpen = false,
  market = "stocks",
  onSelectAsset,
  initialQuery = "",
}: PortfolioSearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { results, loading } = useSearch(query, market, isOpen);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

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
    setDropdownOpen(val.length > 0);
  };

  const handleSelection = (item: SearchResultAsset) => {
    console.log("Selected item:", item);
    onSelectAsset(item);
    setQuery(item.name || item.ticker);
    setDropdownOpen(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      <Search>
        <SearchIconWrapper
          style={{ right: 0, left: "auto", position: "absolute" }}
        >
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={`Search ${market} symbols or names`}
          value={query}
          onChange={handleChange}
          onFocus={() => setDropdownOpen(query.length > 0)}
        />
      </Search>

      {dropdownOpen && query.length > 0 && (
        <Paper
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            zIndex: 10,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            marginTop: "4px",
            borderRadius: "4px",
          }}
        >
          {loading ? (
            <div style={{ padding: 12, textAlign: "center" }}>
              <CircularProgress size={20} />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Searching...
              </Typography>
            </div>
          ) : results && results.length > 0 ? (
            <List dense>
              {/* FIX APPLIED HERE:
                  1. Removed the `component="li"` prop.
                  2. Typed `item` as `SearchResultAsset` instead of `any` for better type safety.
                */}
              {results.map((item: SearchResultAsset) => (
                <StyledListItem
                  key={item.ticker}
                  onClick={() => handleSelection(item)}
                >
                  <Typography variant="body1">
                    <strong>{item.ticker}</strong> — {item.name}
                  </Typography>
                </StyledListItem>
              ))}
            </List>
          ) : (
            <div style={{ padding: 12, textAlign: "center" }}>
              <Typography variant="body2" color="textSecondary">
                No results found
              </Typography>
            </div>
          )}
        </Paper>
      )}
    </div>
  );
}

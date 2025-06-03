"use client";

import React, { useEffect, useState } from "react";
import "./watchlist.scss";
import Button from "@mui/material/Button";
import { Plus, Eye } from "lucide-react";
import { Box, Tab, Tabs } from "@mui/material";
import SearchModal, {
  SearchModalData,
} from "@components/search-modal/search-modal";
import { watchlistService } from "@lib/services/watchlist.service";
import { IWatchlist } from "@types/watchlist";

interface NavItem {
  id: number;
  label: string;
}

export default function Watchlist() {
  const [value, setValue] = useState(0);
  const [isSearchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [watchlistData, setWatchlistData] = useState<IWatchlist[]>([]); // Adjust type as needed
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Example default data (could be fetched from an API)
  const defaultSearchModalData: SearchModalData = {
    email: "",
    digestType: "weekly",
  };

  const [newsletterFormData, setNewsletterFormData] = useState<SearchModalData>(
    defaultSearchModalData
  );

  useEffect(() => {
    let isMountedCleanup = true;

    const fetchData = async () => {
      try {
        if (isMountedCleanup) {
          const fetchedData = await watchlistService.getWatchlist();
          if (isMountedCleanup) {
            setWatchlistData(fetchedData);
            setIsLoading(false); // Set loading to false after data is fetched
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      isMountedCleanup = false; // Cleanup function to prevent state updates on unmounted component
    };
  }, []);

  const handleSubmit = (data: SearchModalData): void => {
    setNewsletterFormData(data); // Store subscription data
    setSearchModalOpen(false); // Close modal
    // Optionally, send updated data to the server or database here
  };

  const handleOpenSearchModal = () => {
    setSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    setSearchModalOpen(false);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navigation: NavItem[] = [
    {
      id: 0,
      label: "All",
    },
    {
      id: 1,
      label: "Gainers",
    },
    {
      id: 2,
      label: "Losers",
    },
  ];
  return (
    <div className="l-watchlist">
      <div className="l-watchlist__header">
        <h1>My Watchlist</h1>
        <p>Keep an eye on stocks you are tracking accros sessions</p>
      </div>
      <div className="l-watchlist__actions">
        <div className="l-watchlist__actions--left">
          <Button
            variant="outlined"
            startIcon={<Plus />}
            onClick={handleOpenSearchModal}
          >
            Add stock
          </Button>
        </div>
        <div className="l-watchlist__actions--middle">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            {navigation.map((item, i) => (
              <Tab
                key={item.id}
                label={item.label}
                value={i}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  backgroundColor: "white",
                  height: 4,
                  minWidth: "150px",
                  width: "100%",
                  color: "#000",
                  "&.Mui-selected": { backgroundColor: "#f0f0f0" },
                }}
              />
            ))}
          </Tabs>
        </div>
        <div className="l-watchlist__actions--right">
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "flex-end",
                marginRight: "1rem",
              },
            }}
          >
            <Button
              variant="contained"
              startIcon={<Plus />}
              onClick={handleOpenSearchModal}
            >
              New Portfolio
            </Button>
          </Box>
        </div>
      </div>
      {isLoading ? (
        <div className="l-watchlist__loading">Loading...</div>
      ) : watchlistData && watchlistData.length > 0 ? (
        <div className="l-watchlist__table">
          {/* Render your watchlist table here */}
          {/* Example: */}
          <ul>
            {watchlistData.map((item) => (
              <li key={item.id}>{item.ticker}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="l-watchlist__no-data">
          <Eye className="l-watchlist__no-data--icon" />
          <h2>Your watchlist is empty</h2>
          <p>You haven't added any stock to your watchlist yet!</p>
          <Button
            variant="contained"
            startIcon={<Plus />}
            onClick={handleOpenSearchModal}
          >
            Add your first stock
          </Button>
        </div>
      )}
      {/* Newsletter Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        modalData={newsletterFormData}
        onClose={handleCloseSearchModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import "./watchlist.scss";
import Button from "@mui/material/Button";
import { Plus, Eye, Trash2 } from "lucide-react";
import { Tab, Tabs } from "@mui/material";
import SearchModal, {
  SearchModalData,
} from "@components/search-modal/search-modal";
import PortfolioModal from "@components/portfolio-modal/portfolio-modal";
import ScreenerSkeleton from "@components/skeletons/ScreenerSkeleton";
import { watchlistService } from "@lib/services/watchlist.service";
import { IWatchlist, IWatchlistNews } from "@types/watchlist";
import { useRouter } from "next/navigation";

interface NavItem {
  id: number;
  label: string;
}

export default function Watchlist() {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [isSearchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [watchlistData, setWatchlistData] = useState<IWatchlist[]>([]); // Initialize with an empty array
  const [isPortfolioModalOpen, setPortfolioModalOpen] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [news, setNews] = useState<IWatchlistNews[]>([]);
  const [more, setMore] = useState<IWatchlist[]>([]);
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
          const relatedStocks = await watchlistService.getRelatedStocks();
          const newsData = await watchlistService.getNews();
          if (isMountedCleanup) {
            setWatchlistData(fetchedData);
            setMore(relatedStocks); // Update the 'more' state with related stocks
            setNews(newsData || []); // Update the 'news' state with fetched news data
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

  const truncateText = (text: string, maxLength = 150) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const viewStock = (ticker: string) => {
    if (ticker) {
      // window.location.href = `/main/watchlist/${ticker}`;
      router.push(`/main/watchlist/${ticker}`);
    }
  };
  const removeFromWatchlist = (id: number) => {
    // Optionally, send a request to the server to remove the stock
    try {
      watchlistService
        .removeFromWatchlist(id)
        .then((updatedWatchlist) => {
          setWatchlistData(updatedWatchlist); // Update the state with the new watchlist data
          console.log("Stock removed successfully");
        })
        .catch((error) => {
          console.error("Error removing stock:", error);
        });
    } catch (error) {
      console.error("Error removing stock:", error);
    }
  };
  const handleSubmit = (data: SearchModalData): void => {
    setNewsletterFormData(data); // Store subscription data
    setSearchModalOpen(false); // Close modal
    // Optionally, send updated data to the server or database here
  };

  const openPortfolioModal = () => {
    // Placeholder function for opening portfolio modal
    setPortfolioModalOpen(true);
  };

  const handleClosePortfolioModal = () => {
    setPortfolioModalOpen(false);
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
        <p>Keep an eye on stocks you are tracking across sessions</p>
      </div>
      <div className="l-watchlist__actions">
        <div className="l-watchlist__actions--left">
          <Button
            variant="outlined"
            startIcon={<Plus size={16} />} // Adjust icon size
            onClick={handleOpenSearchModal}
            className="l-watchlist__add-stock-btn"
          >
            Add stock
          </Button>
        </div>
        <div className="l-watchlist__actions--middle">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="stock filter tabs"
            className="l-watchlist__tabs"
          >
            {navigation.map((item, i) => (
              <Tab
                key={item.id}
                label={item.label}
                value={i}
                className="l-watchlist__tab"
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.875rem", // Smaller font size
                  minHeight: "unset", // Remove min-height
                  padding: "6px 12px", // Adjust padding
                  borderRadius: "5px", // Apply border-radius to tabs
                  "&.Mui-selected": {
                    backgroundColor: "#e0e7ff", // Lighter blue for selected
                    color: "#3f51b5", // Darker blue text for selected
                  },
                  "&:not(.Mui-selected)": {
                    backgroundColor: "transparent", // Transparent background for unselected
                    color: "#6b7280", // Gray text for unselected
                  },
                }}
              />
            ))}
          </Tabs>
        </div>
        <div className="l-watchlist__actions--right">
          <Button
            variant="contained"
            startIcon={<Plus size={16} />} // Adjust icon size
            onClick={openPortfolioModal} // Placeholder function for opening portfolio modal
            className="l-watchlist__new-portfolio-btn"
          >
            New Portfolio
          </Button>
        </div>
      </div>
      {isLoading ? (
        <ScreenerSkeleton />
      ) : watchlistData && watchlistData.length > 0 ? (
        <div className="l-watchlist__populated">
          <div className="l-watchlist__populated--table-wrapper">
            <table className="l-watchlist__populated--table">
              <thead className="l-watchlist__populated--table__header">
                {/* Added ACTIONS column */}
                <tr className="l-watchlist__populated--table__header__contents">
                  <th>SYMBOL</th>
                  <th>LAST PRICE</th>
                  <th>% CHANGE</th>
                  <th>COMPANY NAME</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody className="l-watchlist__populated--table__body">
                {watchlistData.map((stock, index) => (
                  <tr
                    key={stock.id}
                    className="l-watchlist__populated--table__body__contents"
                  >
                    <td>{stock.ticker}</td>
                    <td>{stock.lastPrice}</td>
                    <td>
                      <span
                        className={
                          stock.change > 0
                            ? "l-watchlist__populated--table__body__contents__positive"
                            : stock.change < 0
                              ? "l-watchlist__populated--table__body__contents__negative"
                              : ""
                        }
                      >
                        {stock.change}
                      </span>
                    </td>
                    <td>{stock.name}</td>
                    <td>
                      <Trash2
                        size={18}
                        className="l-watchlist__delete-icon"
                        onClick={() => removeFromWatchlist(stock.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="l-watchlist__populated--news">
            <h2>Your Watchlist in the News</h2>
            <div className="l-watchlist__populated--news_container">
              {news.map((item, index) => (
                <div
                  key={item.id}
                  className="l-watchlist__populated--news_container--item"
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="news-card__image"
                  />
                  <h3>{item.title}</h3>
                  <p>{truncateText(item.description)}</p>
                  <a
                    href={item.article_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="l-watchlist__populated--more">
            <h2>Discover More</h2>
            <p>You may be interested in</p>
            <div className="l-watchlist__populated--more_container">
              {more.map((item, index) => (
                <div
                  key={index}
                  className="l-watchlist__populated--more_container--item"
                >
                  <h3>{item.ticker}</h3>
                  <p>{item.name}</p>
                  <span
                    className={
                      item.change > 0
                        ? "l-watchlist__populated--more__positive"
                        : item.change < 0
                          ? "l-watchlist__populated--more__negative"
                          : ""
                    }
                  >
                    {item.change}
                  </span>
                  <Button
                    variant="contained"
                    onClick={() => viewStock(item.ticker)} // Placeholder action
                    className="l-watchlist__view-stock-btn"
                  >
                    View Stock
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="l-watchlist__no-data">
          <Eye className="l-watchlist__no-data--icon" />
          <h2>Your watchlist is empty</h2>
          <p>You haven't added any stock to your watchlist yet!</p>
          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            onClick={handleOpenSearchModal}
          >
            Add your first stock
          </Button>
        </div>
      )}
      {/* Newsletter Modal */}
      <PortfolioModal
        isOpen={isPortfolioModalOpen}
        modalData={newsletterFormData}
        onClose={handleClosePortfolioModal}
        onSubmit={handleSubmit}
      />
      <SearchModal
        isOpen={isSearchModalOpen}
        modalData={newsletterFormData}
        onClose={handleCloseSearchModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

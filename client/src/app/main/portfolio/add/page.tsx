"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./portfolio-add.module.scss";
// Adjust paths as per your project structure
import {
  FormErrors,
  InvestmentFormData,
  Portfolio,
  SearchResultAsset,
} from "@/types/portfolio";
import { portfoloioService } from "@lib/services/portfolio.service";
import { PortfolioSearchBar } from "@components/search/portfolio-search";

export default function AddInvestmentPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<InvestmentFormData>({
    portfolioId: "",
    transactionType: "",
    searchQuery: "", // This will be managed by PortfolioSearchBar's initialQuery
    symbol: "",
    name: "",
    quantity: "",
    price: "", // This will be user-entered
    date: "", // This will be user-entered
    fees: "", // This will be user-entered
  });
  const [market, setMarket] = useState<
    "stocks" | "crypto" | "fx" | "otc" | "indices"
  >("stocks");
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    // FIX: Add type 'InvestmentFormData' to 'prev'
    setFormData((prev: InvestmentFormData) => ({
      ...prev,
      searchQuery: "", // Clear search query for search bar to re-initialize
      symbol: "", // Clear asset-specific fields
      name: "",
      quantity: "",
      price: "", // Keep price empty for user input
      date: "", // Keep date empty for user input
      fees: "", // Keep fees empty for user input
      transactionType: newValue === 3 ? "deposit" : "buy", // Set default transaction type
    }));
    // Set market for the search bar
    if (newValue === 0) {
      setMarket("stocks");
    } else if (newValue === 1) {
      setMarket("crypto");
    } else {
      setMarket("stocks"); // Default for other tabs if they don't have a specific market
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchPortfolioData = async () => {
      try {
        setIsLoading(true);
        const response = await portfoloioService.getPortfolio();
        if (isMounted && response?.length) {
          setPortfolios(response);
          // FIX: Add type 'InvestmentFormData' to 'prev'
          setFormData((prev: InvestmentFormData) => ({
            ...prev,
            portfolioId: response[0].id, // Auto-select first portfolio
          }));
        }
      } catch (e) {
        console.error("Failed to fetch portfolios:", e);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPortfolioData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;

    if (name === "quantity" || name === "price" || name === "fees") {
      parsedValue = value === "" ? "" : parseFloat(value);
      if (typeof parsedValue === "number" && isNaN(parsedValue)) {
        parsedValue = "";
      }
    }

    // FIX: Add type 'InvestmentFormData' to 'prev'
    setFormData((prev: InvestmentFormData) => ({
      ...prev,
      [name]: parsedValue,
    }));
    // FIX: Add type 'FormErrors' to 'prev'
    setErrors((prev: FormErrors) => ({ ...prev, [name]: undefined }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    // FIX: Add type 'InvestmentFormData' to 'prev'
    setFormData((prev: InvestmentFormData) => ({
      ...prev,
      [name as string]: value,
    }));
    // FIX: Add type 'FormErrors' to 'prev'
    setErrors((prev: FormErrors) => ({ ...prev, [name as string]: undefined }));
  };

  const handleAssetSelected = (asset: SearchResultAsset) => {
    // FIX: Add type 'InvestmentFormData' to 'prev'
    setFormData((prev: InvestmentFormData) => ({
      ...prev,
      symbol: asset.ticker,
      name: asset.name,
    }));
    // FIX: Add type 'FormErrors' to 'prev'
    setErrors((prev: FormErrors) => ({
      ...prev,
      symbol: undefined,
      name: undefined,
    }));
  };

  // ... rest of the component remains the same
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.portfolioId) newErrors.portfolioId = "Portfolio is required";

    if (activeTab === 0 || activeTab === 1 || activeTab === 2) {
      // Stocks/ETFs, Crypto, Bonds
      if (!formData.symbol) newErrors.symbol = "Symbol is required";
      if (!formData.quantity) newErrors.quantity = "Quantity is required";
      if (typeof formData.quantity === "number" && formData.quantity <= 0)
        newErrors.quantity = "Quantity must be positive";

      if (!formData.price) newErrors.price = "Price is required";
      // Allow price to be 0 for some specific cases if needed, but usually positive for purchase.
      if (typeof formData.price === "number" && formData.price < 0)
        newErrors.price = "Price cannot be negative";
      if (!formData.date) newErrors.date = "Transaction date is required";
    } else if (activeTab === 3) {
      // Cash
      if (!formData.price) newErrors.price = "Amount is required"; // For cash, 'price' represents the amount
      if (typeof formData.price === "number" && formData.price <= 0)
        newErrors.price = "Amount must be positive";
      if (!formData.date) newErrors.date = "Transaction date is required";
    } else if (activeTab === 4) {
      // Alternative Assets
      if (!formData.name) newErrors.name = "Asset name is required";
      if (!formData.price) newErrors.price = "Initial value is required";
      if (typeof formData.price === "number" && formData.price <= 0)
        newErrors.price = "Initial value must be positive";
      if (!formData.date) newErrors.date = "Acquisition date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted:", formData);
      // Logic for submitting based on activeTab
      const {
        portfolioId,
        name,
        symbol,
        quantity,
        price,
        transactionType,
        date,
      } = formData; // Destructure to avoid unused variable warning
      try {
        const response = await portfoloioService.addHolding(
          portfolioId,
          symbol,
          quantity,
          price,
          name,
          transactionType,
          date
        );
        if (response) {
          // Redirect to the main watchlist page after successful addition
          window.location.href = "/main/portfolio";
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("Form validation failed", errors);
    }
  };

  const renderTabContent = () => {
    return (
      <Box className={styles.formSection}>
        <FormControl fullWidth margin="normal" error={!!errors.portfolioId}>
          <InputLabel id="portfolio-select-label">Portfolio</InputLabel>
          <Select
            labelId="portfolio-select-label"
            id="portfolio-select"
            value={formData.portfolioId}
            label="Portfolio"
            onChange={handleSelectChange}
            name="portfolioId"
          >
            <MenuItem value="">
              <em>Select Portfolio</em>
            </MenuItem>
            {isLoading ? (
              <MenuItem disabled>Loading portfolios...</MenuItem>
            ) : portfolios.length === 0 ? (
              <MenuItem disabled>No portfolios available</MenuItem>
            ) : (
              portfolios.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))
            )}
          </Select>
          {errors.portfolioId && (
            <FormHelperText>{errors.portfolioId}</FormHelperText>
          )}
        </FormControl>

        {activeTab === 0 && ( // Stocks / ETFs tab
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel id="transaction-type-label">
                Transaction Type
              </InputLabel>
              <Select
                labelId="transaction-type-label"
                id="transaction-type-select"
                value={formData.transactionType}
                label="Transaction Type"
                onChange={handleSelectChange}
                name="transactionType"
              >
                <MenuItem value="BUY">Buy</MenuItem>
                <MenuItem value="SELL">Sell</MenuItem>
              </Select>
            </FormControl>

            <PortfolioSearchBar
              isOpen={true}
              market={market}
              onSelectAsset={handleAssetSelected}
              initialQuery={formData.name || formData.symbol} // Pass currently selected asset name/symbol to search bar
            />

            <TextField
              label="Symbol"
              name="symbol"
              value={formData.symbol}
              onChange={handleInputChange}
              placeholder="e.g., AAPL"
              fullWidth
              margin="normal"
              error={!!errors.symbol}
              helperText={errors.symbol}
              disabled={!!formData.symbol || !!formData.name} // Disable if either symbol or name is populated
            />

            <TextField
              label="Company Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Apple Inc."
              fullWidth
              margin="normal"
              disabled={!!formData.symbol || !!formData.name} // Disable if either symbol or name is populated
            />

            <TextField
              label="Total shares bought / Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="e.g., 10"
              fullWidth
              margin="normal"
              error={!!errors.quantity}
              helperText={errors.quantity}
            />

            <TextField
              label="Price per share"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g., 150.25"
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={
                errors.price || "Enter the actual price you paid or received."
              }
            />

            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              placeholder="MM/DD/YYYY"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!errors.date}
              helperText={errors.date}
            />

            <TextField
              label="Fees"
              name="fees"
              type="number"
              value={formData.fees}
              onChange={handleInputChange}
              placeholder="e.g., 0.00"
              fullWidth
              margin="normal"
            />
          </>
        )}

        {activeTab === 1 && ( // Crypto tab
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel id="transaction-type-label">
                Transaction Type
              </InputLabel>
              <Select
                labelId="transaction-type-label"
                id="transaction-type-select"
                value={formData.transactionType}
                label="Transaction Type"
                onChange={handleSelectChange}
                name="transactionType"
              >
                <MenuItem value="buy">Buy</MenuItem>
                <MenuItem value="sell">Sell</MenuItem>
              </Select>
            </FormControl>

            <PortfolioSearchBar
              isOpen={true}
              market={market}
              onSelectAsset={handleAssetSelected}
              initialQuery={formData.name || formData.symbol}
            />

            <TextField
              label="Symbol"
              name="symbol"
              value={formData.symbol}
              onChange={handleInputChange}
              placeholder="e.g., BTC"
              fullWidth
              margin="normal"
              error={!!errors.symbol}
              helperText={errors.symbol}
              disabled={!!formData.symbol || !!formData.name}
            />

            <TextField
              label="Coin Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Bitcoin"
              fullWidth
              margin="normal"
              disabled={!!formData.symbol || !!formData.name}
            />

            <TextField
              label="Quantity (Units)"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="e.g., 0.05"
              fullWidth
              margin="normal"
              error={!!errors.quantity}
              helperText={errors.quantity}
            />

            <TextField
              label="Price per Unit"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g., 60000.00"
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={
                errors.price || "Enter the actual price you paid or received."
              }
            />

            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              placeholder="MM/DD/YYYY"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!errors.date}
              helperText={errors.date}
            />

            <TextField
              label="Fees"
              name="fees"
              type="number"
              value={formData.fees}
              onChange={handleInputChange}
              placeholder="e.g., 0.00"
              fullWidth
              margin="normal"
            />
          </>
        )}

        {activeTab === 2 && ( // Bonds tab
          <Box className={styles.formSection}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="transaction-type-label">
                Transaction Type
              </InputLabel>
              <Select
                labelId="transaction-type-label"
                id="transaction-type-select"
                value={formData.transactionType}
                label="Transaction Type"
                onChange={handleSelectChange}
                name="transactionType"
              >
                <MenuItem value="buy">Buy</MenuItem>
                <MenuItem value="sell">Sell</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Bond Name"
              name="bondName"
              value={formData.bondName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quantity (Face Value)"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.quantity}
              helperText={errors.quantity}
            />
            <TextField
              label="Purchase Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price}
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!errors.date}
              helperText={errors.date}
            />
            <TextField
              label="Fees"
              name="fees"
              type="number"
              value={formData.fees}
              onChange={handleInputChange}
              placeholder="e.g., 0.00"
              fullWidth
              margin="normal"
            />
          </Box>
        )}

        {activeTab === 3 && ( // Cash tab
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel id="cash-transaction-type-label">
                Transaction Type
              </InputLabel>
              <Select
                labelId="cash-transaction-type-label"
                id="cash-transaction-type-select"
                value={formData.transactionType}
                label="Transaction Type"
                onChange={handleSelectChange}
                name="transactionType"
              >
                <MenuItem value="deposit">Deposit</MenuItem>
                <MenuItem value="withdrawal">Withdrawal</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Amount ($)"
              name="price" // Re-using price field for amount for simplicity
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g., 1000.00"
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price}
            />
            <TextField
              label="Description (Optional)"
              name="name" // Re-using name field for description
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Initial Capital"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Transaction Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!errors.date}
              helperText={errors.date}
            />
          </>
        )}

        {activeTab === 4 && ( // Alternative Assets tab
          <Box className={styles.formSection}>
            {/* Alternative assets should also typically have an "Add" or "Acquire" transaction type implicitly */}
            <TextField
              label="Asset Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Initial Value ($)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price}
            />
            <TextField
              label="Acquisition Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!errors.date}
              helperText={errors.date}
            />
            <TextField
              label="Description (Optional)"
              name="bondName"
              value={formData.bondName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Asset Category (e.g., Real Estate, Collectibles)"
              name="assetCategory"
              value={formData.assetCategory}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.mainContentWrapper}>
        <Box className={styles.header}>
          <Link href="/portfolio" className={styles.backButton}>
            <ArrowLeft size={20} />
            <Typography variant="body1">Back to Portfolio</Typography>
          </Link>
          <Typography variant="h4" className={styles.pageTitle}>
            Add Investment
          </Typography>
        </Box>

        <Box className={styles.tabsContainer}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="investment type tabs"
            className={styles.customTabs}
            TabIndicatorProps={{ style: { display: "none" } }}
          >
            <Tab label="Stocks/ETFs" className={styles.customTab} />
            <Tab label="Crypto" className={styles.customTab} />
            <Tab label="Bonds" className={styles.customTab} />
            <Tab label="Cash" className={styles.customTab} />
            <Tab label="Alternative Assets" className={styles.customTab} />
          </Tabs>
        </Box>

        <form onSubmit={handleSubmit} className={styles.form}>
          {renderTabContent()}

          <Box className={styles.formActions}>
            <Button
              variant="outlined"
              onClick={() => {
                // router.push('/portfolio'); // Example using Next.js router for cancel
              }}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              startIcon={<Plus size={16} />}
              className={styles.submitButton}
            >
              Add Investment
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

import { useEffect } from "react";
import "./portfolio-input.scss";
import { portfoloioService } from "../../lib/services/portfolio.service";
import { Box, Button, InputBase } from "@mui/material";

export function ClientOnlyPortfolio({
  isOpen = false,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  // Fetch portfolios from backend when component mounts

  useEffect(() => {
    // No fetch on mount since portfolios are added via form submission
  }, []);

  async function handleAddPortfolio(portfolioName: string) {
    try {
      const onAdded = await portfoloioService.addToPortfolio(portfolioName);
      if (onAdded) {
        window.location.href = "/main/portfolio"; // Redirect to portfolio page after successful addition
      }
    } catch (error) {
      console.error("Failed to add portfolio:", error);
    }
  }

  const cancel = () => {
    // close the modal
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="l-portfolio-input">
      <form
        className="l-portfolio-input__form"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const portfolio = (
            form.elements.namedItem("portfolio") as HTMLInputElement
          ).value.trim();
          if (portfolio) {
            handleAddPortfolio(portfolio);
            // Optionally reset the form after submission
            (form.elements.namedItem("portfolio") as HTMLInputElement).value =
              "";
          }
          form.reset();
        }}
      >
        <InputBase
          sx={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            backgroundColor: "#f0f0f0",
          }}
          autoFocus
          type="text"
          name="portfolio"
          placeholder="Portfolio name"
          required
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Button type="button" onClick={cancel} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </form>
    </div>
  );
}

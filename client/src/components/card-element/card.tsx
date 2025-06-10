"use client";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import { CustomCardProps } from "../../types/dashboard";

export default function CustomCard({
  image,
  title,
  description,
  height,
  width,
}: CustomCardProps) {
  const handleLogin = () => {
    window.location.href = "/api/auth/custom-login";
  };
  return (
    <Card
      sx={{
        position: "relative",
        height: height || 300,
        width: width,
        minHeight: 250,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${image.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6)", // Dims image for text contrast
        }}
      />

      {/* Overlay Content */}
      <CardContent
        sx={{
          position: "absolute",
          top: "5rem",
          color: "white",
          width: "100%",
          padding: "5rem",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" fontWeight="bolder">
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" mt={1}>
            {description}
          </Typography>
        )}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            gap: "1px",
            marginTop: "2rem",
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "primary",
              color: "black",
              backgroundColor: "white",
              borderRadius: "20px",
            }}
            onClick={handleLogin}
          >
            Sign Up / Log in
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useRouter } from "next/navigation";

const pages = [
  { navTitle: "Scanner", url: "scanner" },
  { navTitle: "Watchlist", url: "watchlist" },
  { navTitle: "Trends", url: "trends" },
  { navTitle: "paper Trading", url: "paper-trading" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const focused = (ev: React.FormEvent) => {
  console.log(ev.target);
};

function changed(ev: React.FormEvent) {
  console.log((ev.target as any).value);
}

function ButtonAppBar() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (url: string) => {
    setAnchorElNav(null);
    router.push(url);
  };

  const handleLogin = () => {
    window.location.href = "/api/auth/custom-login";
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#350d52", height: "70px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          {/* <a href="/">
                        <Image src={bullxLogo} className="logo react" width={100}
                            height={50} alt="React logo" />
                    </a> */}
          <Typography
            variant="h6"
            color="white"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 0,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: ".1rem",
              textDecoration: "none",
            }}
          >
            BULL
          </Typography>
          <Typography
            variant="h6"
            color="white"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: "bolder",
              fontSize: "24px",
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            X
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.navTitle}
                  onClick={() => handleCloseNavMenu(page.url)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.navTitle}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon
            sx={{
              display: { xs: "flex", md: "none", color: "primary" },
              mr: 1,
            }}
          />
          <Typography
            variant="h5"
            color="white"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            Bullx
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "1px",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.navTitle}
                onClick={() => handleCloseNavMenu(page.url)}
                sx={{ my: 2, display: "block" }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {page.navTitle}
                </Typography>
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              width: "15%",
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
              sx={{
                bgcolor: "primary",
                color: "black",
                backgroundColor: "white",
                borderRadius: "20px",
              }}
              onClick={handleLogin}
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "secondary",
                color: "#fff",
                borderRadius: "20px",
                marginLeft: "10px",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ButtonAppBar;

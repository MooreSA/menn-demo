import Head from "next/head";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Head>
        <title>NextJS Features</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: "100vh",
            display: "grid",
            gridTemplateRows: "auto 1fr",
          }}
        >
          <header style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <nav>
              <Button
                id="menu-button"
                variant="contained"
                onClick={handleMenuClick}
              >
                Menu
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link href="/static">Static Rendering</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="/hydration">Static Rendering with Hydration</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="/time-isr">
                    Time-Based Incremental Static Regneration
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="/api-isr">
                    On-Demand Incremental Static Regeneration
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="/server-side">
                    On-Request Server-Side Rendering
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="/add">API POST</Link>
                </MenuItem>
              </Menu>
            </nav>
          </header>
          <main>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {children}
            </Box>
          </main>
        </Box>
      </Container>
    </>
  );
};

export default Layout;

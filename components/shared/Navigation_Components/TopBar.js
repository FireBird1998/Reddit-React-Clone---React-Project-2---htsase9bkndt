"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Button,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  QrCodeScanner as QrCodeScannerIcon,
  OutboundOutlined as OutboundOutlinedIcon,
  TextsmsOutlined as TextsmsOutlinedIcon,
  LoginOutlined as LoginOutlinedIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Logout as LogoutIcon,
  NotificationsOutlined,
  Add as AddIcon,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/navigation";
import { LayoutContext } from "@/context/LayoutContext";
import { AuthContext } from "@/context/AuthContext";
import AuthNavDropDown from "./AuthNavDropDown";
import AvatarEl from "./AvatarEl";
import MessageComponents from "./MessageComponents";
import NotificationComponent from "./NotificationComponent";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius * 5,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "70%", // take 70% of the width on medium screens
  },
  [theme.breakpoints.up("md")]: {
    width: "60%", // take 60% of the width on large screens
  },
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
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%", // input should take the full width of the Search component
  },
}));

const TopBar = ({ themeSwitch }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const theme = useTheme();
  const { isUserAuthenticated, logout, authState } =
    React.useContext(AuthContext);
  const router = useRouter();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { handleDrawerToggle } = React.useContext(LayoutContext);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const goToLogin = () => {
    router.push("/signIn");
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    console.log("Logged out");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      MenuListProps={{
        // Add this prop
        sx: {
          width: "250px",
        },
      }}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <Divider />
      <Typography
        variant="div"
        sx={{
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ display: "flex" }}>
          {theme.palette.mode === "light" ? (
            <LightModeIcon />
          ) : (
            <DarkModeIcon />
          )}
        </span>
        <span>&nbsp;View Options</span>
      </Typography>
      <MenuItem>
        {theme.palette.mode === "light" ? "Light Mode" : "Dark Mode"}
        {themeSwitch()}
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <LogoutIcon />
        &nbsp;Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AvatarEl />
        </IconButton>
        <p>{authState?.userInfo?.name}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* this is for the logo and menu part */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!isUserAuthenticated() && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { lg: "none", md: "block" } }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              reddit
            </Typography>
          </Box>
          {/* this box will show the authouncitated menu */}
          {isUserAuthenticated() && (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AuthNavDropDown />
            </Box>
          )}
          {/* search part */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {/* this is for the notification and profile part and when not authencated shows login in and get app button */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isUserAuthenticated() && (
              <>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Tooltip title="Go to Popular">
                  <IconButton
                    size="large"
                    aria-label="popular"
                    color="inherit"
                    sx={{ borderRadius: 20 / 5 }}
                    onClick={() => router.push("/r/popular")}
                  >
                    <OutboundOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <MessageComponents />
                <NotificationComponent />
                <Tooltip title="Create Post">
                  <IconButton
                    size="large"
                    aria-label="create post"
                    color="inherit"
                    sx={{ borderRadius: 20 / 5 }}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="User Profile">
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    sx={{
                      ml: 2,
                      borderRadius: 20 / 2,
                    }}
                  >
                    <AvatarEl />
                    <span>&nbsp;{authState.userInfo.name}</span>
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <Tooltip title="Show More">
                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
            )}
            {/* This is when user is not logged in */}
            {!isUserAuthenticated() && (
              <Box sx={{}}>
                <Button
                  variant="outlined"
                  sx={{
                    color: theme.palette.typography.color,
                    borderColor: theme.palette.typography.color,
                    mx: 1,
                    borderRadius: "50px",
                    "&:focus": {
                      borderColor: theme.palette.typography.color,
                      color: theme.palette.typography.color,
                    },
                    "&:hover": {
                      borderColor: theme.palette.typography.color,
                      color: theme.palette.typography.color,
                    },
                    display: { xs: "none", lg: "inline-flex" },
                  }}
                >
                  <QrCodeScannerIcon />
                  <span style={{ marginLeft: "5px" }}>Get App</span>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    "&:focus": {
                      backgroundColor: "red",
                      color: "white",
                    },
                    "&:hover": {
                      backgroundColor: "red",
                      color: "white",
                    },
                    mx: 1,
                    borderRadius: "50px",
                  }}
                  onClick={() => goToLogin()}
                >
                  <LoginOutlinedIcon
                    sx={{
                      display: { xs: "inline-flex", lg: "none" },
                    }}
                  />
                  <Typography
                    variant="span"
                    sx={{
                      display: { xs: "none", lg: "inline-flex" },
                    }}
                  >
                    Log In
                  </Typography>
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default TopBar;

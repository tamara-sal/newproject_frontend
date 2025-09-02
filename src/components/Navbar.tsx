import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  user: { name: string; email: string };
  onLogout: () => void;
  onSidebarToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onSidebarToggle }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#6a0dad" }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onSidebarToggle}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <IconButton onClick={handleProfileMenuOpen}>
          <Avatar>{user.name[0].toUpperCase()}</Avatar>
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => handleNavigate("/profile")}>Profile</MenuItem>
          <MenuItem onClick={() => handleNavigate("/contact")}>Contact Us</MenuItem>
          <MenuItem
            onClick={() => {
              onLogout();
              navigate("/login");
              handleMenuClose();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

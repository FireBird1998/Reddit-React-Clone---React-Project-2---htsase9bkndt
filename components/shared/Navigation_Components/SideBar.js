import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";

import { LayoutContext } from "@/context/LayoutContext";
import { Toolbar } from "@mui/material";

import { sidebarLinks1 } from "@/Constants";    

const drawerWidth = 240;

function SideBar() {
  
  const { mobileOpen, handleDrawerClose, handleDrawerTransitionEnd } = React.useContext(LayoutContext);

  const drawer = (
    <div>
      <Divider sx={{display: { lg: "block", xs: "none" }}} />
      <Toolbar sx={{display: { lg: "none", xs: "block" }}}/>
      <List>
      {sidebarLinks1.map((link) => (
          <ListItem key={link.title} disablePadding>
            <ListItemButton sx={{
                color: "white",
            }}>
              <ListItemIcon sx={{
                color: "white",
              }}>
                {<link.icon  />}
              </ListItemIcon>
              <ListItemText primary={link.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {sidebarLinks1.map((link) => (
          <ListItem key={link.title} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {<link.icon />}
              </ListItemIcon>
              <ListItemText primary={link.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
            display: { lg: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { lg: "block", xs: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
            height: "calc(100vh - 64px)", // subtract AppBar's height
            position: "absolute",
            left: 0,
            top: 0, // height of AppBar
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default SideBar;

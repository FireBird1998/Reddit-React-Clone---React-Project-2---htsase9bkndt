"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { Divider, Typography, useMediaQuery } from "@mui/material";

import { usePathname, useRouter } from "next/navigation";

import { sidebarLinks1 } from "@/Constants";

import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

const CustomButton = ({ popupState, children, ...otherProps }) => {
  
  return (
    <Button
      variant="contained"
      {...bindTrigger(popupState)}
      {...otherProps}
      sx={{
        width: "80%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {children}
      <ArrowDropDownIcon />
    </Button>
  );
};
const AuthNavDropDown = () => {
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [icon, setIcon] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (pathname === sidebarLinks1[0].url) {
      const Icon1 = sidebarLinks1[0].icon;
      setIcon(<Icon1 />);
      setName(sidebarLinks1[0].title);
    } else if(pathname === sidebarLinks1[1].url){
      const Icon2 = sidebarLinks1[1].icon;
      setIcon(<Icon2 />);
      setName(sidebarLinks1[1].title);
    } else {
      setIcon(null);
      setName("Other");
    }
  }, [pathname]);

  const handleMenuItemClick = (link) => {
    popupState.close();
    router.push(link.url);
  };

  return (
    <>
      <CustomButton popupState={popupState}>
        {icon}
        {isMobile ? "" : name}
      </CustomButton>
      <Menu
        {...bindMenu(popupState)}
        MenuListProps={{
          sx: {
            width: "180px",
          },
        }}
      >
        <MenuItem onClick={popupState.close}>Cake</MenuItem>
        <Divider />
        <Typography variant="p" sx={{ ml: 2 , pb: 2,  textDecoration: "underline"}}>
          Feeds
        </Typography>
        {sidebarLinks1.map((link) => {
          return (
            <MenuItem
              key={link.title}
              onClick={() => handleMenuItemClick(link)}
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                gap: "10px",
              }}
            >
              <link.icon />
              {link.title}
              
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default AuthNavDropDown;

"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HomeIcon from "@mui/icons-material/Home";

import { usePathname } from 'next/navigation'

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
        backgroundColor: "transparent",
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
  const [icon, setIcon] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (pathname === "/") {
      setIcon(<HomeIcon />);
      setName("Home");
    }  else {
      setIcon(null);
      setName("Other");
    }
  }, [pathname]);

  return (
    <>
      <CustomButton popupState={popupState}>
        {icon}
        {name}
      </CustomButton>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>Cake</MenuItem>
        <MenuItem onClick={popupState.close}>Death</MenuItem>
      </Menu>
    </>
  );
};

export default AuthNavDropDown;

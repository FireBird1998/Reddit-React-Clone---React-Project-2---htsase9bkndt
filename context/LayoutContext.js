"use client";
import React, { createContext, useState } from "react";

// Create the context
export const LayoutContext = createContext();

// Create the provider component
export const LayoutProvider = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <LayoutContext.Provider value={{ 
        mobileOpen,
        isClosing, 
        handleDrawerClose, 
        handleDrawerTransitionEnd, 
        handleDrawerToggle 
        }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

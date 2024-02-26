import { Paper, IconButton, Typography } from "@mui/material";
import React from "react";
import RocketOutlinedIcon from "@mui/icons-material/RocketOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
const FilterBar = () => {
  return (
    <Paper
      sx={{
        padding: "10px",
        marginTop: "10px",
        marginBottom: "10px",
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        size="large"
        sx={{
          borderRadius: "10px",
          marginLeft: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
          "@media (prefers-color-scheme: light)": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          },
          "@media (prefers-color-scheme: dark)": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          },
        }}
      >
        <RocketOutlinedIcon />
        <Typography
          sx={{
            fontFamily: '"IBM Plex Sans", sans-serif', // Use a sans-serif font
            fontWeight: "700", // Make the font semi-bold
            marginLeft: "5px", // Add some space between the icon and the text
          }}
        >
          Best
        </Typography>
      </IconButton>
      <IconButton
        size="large"
        sx={{
          borderRadius: "10px",
          marginLeft: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
          "@media (prefers-color-scheme: light)": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          },
          "@media (prefers-color-scheme: dark)": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          },
        }}
      >
        <LocalFireDepartmentOutlinedIcon />
        <Typography
          sx={{
            fontFamily: '"IBM Plex Sans", sans-serif', // Use a sans-serif font
            fontWeight: "700", // Make the font semi-bold
            marginLeft: "5px", // Add some space between the icon and the text
          }}
        >
          Hot
        </Typography>
      </IconButton>
      <IconButton
        size="large"
        sx={{
          borderRadius: "10px",
          marginLeft: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
          "@media (prefers-color-scheme: light)": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          },
          "@media (prefers-color-scheme: dark)": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          },
        }}
      >
        <NewReleasesOutlinedIcon />
        <Typography
          sx={{
            fontFamily: '"IBM Plex Sans", sans-serif', // Use a sans-serif font
            fontWeight: "700", // Make the font semi-bold
            marginLeft: "5px", // Add some space between the icon and the text
          }}
        >
          New
        </Typography>
      </IconButton>
      <IconButton
        size="large"
        sx={{
          borderRadius: "10px",
          marginLeft: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
          "@media (prefers-color-scheme: light)": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          },
          "@media (prefers-color-scheme: dark)": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          },
        }}
      >
        <ArrowCircleUpOutlinedIcon />
        <Typography
          sx={{
            fontFamily: '"IBM Plex Sans", sans-serif', // Use a sans-serif font
            fontWeight: "700", // Make the font semi-bold
            marginLeft: "5px", // Add some space between the icon and the text
          }}
        >
          Top
        </Typography>
      </IconButton>
    </Paper>
  );
};

export default FilterBar;

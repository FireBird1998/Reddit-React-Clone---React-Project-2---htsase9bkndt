"use client";
import { useState, useRef } from "react";
import {
  Box,
  Stack,
  Skeleton,
  Typography,
  Button,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useQuery } from "react-query";
import axios from "@/utility/axiosConfig.js";
import { keyframes, useTheme } from "@emotion/react";
import { useRouter } from "next/navigation";

const fadeInOut = keyframes`
  0% { opacity: 1; }
  10% { opacity: 0; }
  40% { opacity: 0; }
  100% { opacity: 1; }
`;

const SideBarPopularCommunity = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef(null);
  const theme = useTheme();
  const router = useRouter();
  const fetchPopularCommunities = async () => {
    const { data } = await axios.get("/reddit/channel");
    return data.data;
  };

  const { data, isLoading, isError, error } = useQuery(
    "popularCommunities",
    fetchPopularCommunities
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          backgroundColor: "background.default",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          marginBottom: "1rem",
          minHeight: "100px",
          maxHeight: "390px",
          width: "100%",
          color: "white",
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            lg: "block",
            xl: "block",
          },
        }}
      >
        <Stack spacing={1}>
          <Skeleton
            sx={{ bgcolor: "grey.900", fontSize: "2rem" }}
            variant="text"
          />
          <Skeleton
            sx={{ bgcolor: "grey.900", fontSize: "2rem" }}
            variant="text"
          />
          <Skeleton
            sx={{ bgcolor: "grey.900", fontSize: "2rem" }}
            variant="text"
          />
          <Skeleton
            sx={{ bgcolor: "grey.900", fontSize: "2rem" }}
            variant="text"
          />
          <Skeleton
            sx={{ bgcolor: "grey.900", fontSize: "2rem" }}
            variant="text"
          />
          <Skeleton
            sx={{ bgcolor: "grey.900", fontSize: "2rem" }}
            variant="text"
          />
        </Stack>
      </Box>
    );
  }
  if (isError) {
    return (
      <Box
        sx={{
          backgroundColor: "background.default",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          marginBottom: "1rem",
          minHeight: "100px",
          maxHeight: "390px",
          minWidth: "320px",
          color: "white",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            lg: "block",
            xl: "block",
          },
          position: "absolute",
          top: "0",
          right: "0",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", marginBottom: "1rem" }}>
          Popular Communities
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "white", marginBottom: "0.5rem" }}
        >
          Error fetching data
          {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        marginBottom: "1rem",
        minHeight: "100px",
        maxHeight: isExpanded ? "calc(100vh - 100px)" : "390px",
        width: "100%",
        color: theme.palette.typography.color,
        display: {
          xs: "none",
          sm: "none",
          md: "none",
          lg: "block",
          xl: "block",
        },
        transition: "all 0.7s",
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: theme.palette.typography.color, marginBottom: "1rem" }}
      >
        Popular Communities
      </Typography>

      <Stack
        spacing={1}
        ref={scrollRef}
        sx={{
          maxHeight: "calc(100vh - 210px)",
          overflowY: "auto",
          transition: "all 1s",
          "&::-webkit-scrollbar": {
            width: "0.2em", // Make the scrollbar thinner
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)", // Add a subtle shadow to the track
            borderRadius: "10px", // Add rounded corners to the track
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.5)", // Darken the thumb
            outline: "1px solid slategrey",
            borderRadius: "10px", // Add rounded corners to the thumb
          },
        }}
      >
        {(isExpanded ? data : data.slice(0, 5)).map((community) => (
          <ListItem
            key={community.name}
            sx={{
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: "10px",
              color: theme.palette.typography.color,
              width: "calc(100% - 0.5rem)",
              boxShadow: null,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.3)", // Changed to a lighter color
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                borderRadius: "10px",
              },
            }}
            onClick={() => router.push(`/r/${community._id}`)}
          >
            <ListItemText
              primary={`r/${community.name}`}
              sx={{
                animation: isExpanded ? `${fadeInOut} 0.8s` : "none",
                color: theme.palette.typography.color,
              }}
            />
          </ListItem>
        ))}
      </Stack>
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          color: theme.palette.typography.color,
          fontSize: "0.8rem",
          animation: isExpanded ? `${fadeInOut} 0.8s` : "none",
        }}
      >
        {isExpanded ? "See Less" : "See More"}
      </Button>
    </Box>
  );
};

export default SideBarPopularCommunity;

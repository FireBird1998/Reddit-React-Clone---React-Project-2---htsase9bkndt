import React from "react";
import Paper from "@mui/material/Paper";
import { Box, Divider } from "@mui/material";
import { Typography } from "@mui/material";
import { postingGuidelines } from "@/Constants";

const SideGuid = () => {
  return (
    <Paper sx={{ p: 2, m: 2, borderRadius: 2 }}>
      <Typography variant="h6">Posting Guidelines</Typography>
      <Divider sx={{ mt: 2, mb: 1 }} />
      {postingGuidelines.map((guideline, index) => (
        <>
          <Typography key={guideline.title} variant="body1">
            {index + 1}. {guideline.title}
          </Typography>
          <Divider sx={{ my: 1 }} />
        </>
      ))}
    </Paper>
  );
};

export default SideGuid;
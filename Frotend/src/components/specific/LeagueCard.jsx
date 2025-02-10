import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { format } from "date-fns";
import React from "react";

const LeagueCard = ({ league, onclick }) => {
  const { _id, name, season, format: matchFormat, description, startDate, endDate } = league;
  const theme = useTheme();

  return (
    <Card
      onClick={() => onclick(_id)}
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
        borderRadius: "12px",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {name} ({season})
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Format: {matchFormat}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Start: {format(new Date(startDate), "dd MMM yyyy")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            End: {format(new Date(endDate), "dd MMM yyyy")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LeagueCard;
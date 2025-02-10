import React from "react";
import { Card, CardContent, Typography, CardActions, Button, Box, Avatar, Chip } from "@mui/material";
import { format } from "date-fns";

const MatchCard = ({ match,onclick }) => {
  const { _id,date, startTime, venue, status, scoreboard } = match;
  const [team1Innings, team2Innings] = scoreboard.teamInnings;
  const { team: team1, runs: team1Runs, wickets: team1Wickets, overs: team1Overs } = team1Innings;
  const { team: team2, runs: team2Runs, wickets: team2Wickets, overs: team2Overs } = team2Innings;

  // Format Date & Time
  const formattedDate = format(new Date(date), "dd MMM yyyy");
  // const formattedTime = format(new Date(startTime), "hh:mm a");

  return (
    <Card onClick={()=>onclick(_id)}
    sx={{cursor:"pointer", maxWidth: 400, m: 2, boxShadow: 3, borderLeft: status === "Live" ? "4px solid red" : "none" }}>
      <CardContent>
        {/* Match Status */}
        <Chip
          label={status}
          color={status === "Live" ? "error" : status === "Upcoming" ? "primary" : "default"}
          sx={{ mb: 1 }}
        />

        {/* Teams Info */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Box display="flex" alignItems="center">
            <Avatar src={team1.logo.url} alt={team1.shortName} sx={{ width: 40, height: 40, mr: 1 }} />
            <Typography variant="h6">{team1.shortName}</Typography>
          </Box>
          <Typography variant="h6">vs</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">{team2.shortName}</Typography>
            <Avatar src={team2.logo.url} alt={team2.shortName} sx={{ width: 40, height: 40, ml: 1 }} />
          </Box>
        </Box>

        {/* Scoreboard */}
        {status !== "Upcoming" && (
          <Box textAlign="center" mb={1}>
            <Typography variant="body1">
              {team1.shortName}: {team1Runs}/{team1Wickets} ({team1Overs} ov)
            </Typography>
            <Typography variant="body1">
              {team2.shortName}: {team2Runs}/{team2Wickets} ({team2Overs} ov)
            </Typography>
          </Box>
        )}

        {/* Match Details */}
        <Typography variant="body2" color="text.secondary">
          {formattedDate} | {startTime} | {venue.name}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small" variant="contained" color="primary">
          View Details
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default MatchCard;

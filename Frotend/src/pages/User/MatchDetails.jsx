import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid2 as Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import Loader from "../../components/loaders/Loader";
import { useCustomMutation, useErrors } from "../../hooks/hooks";
import { useDeleteScoreBoardMutation, useGenerateScoreBoardMutation, useGetMatchDetailsQuery, useUpdateMatchResultMutation, useUpdateMOMMutation, useUpdatePlayerStatsMutation } from "../../redux/api/api";

const MatchDetails = () => {
  const params = useParams();
  const {id}= params

  const [match, setMatch] = useState({});
  const [scoreboard, setScoreboard] = useState({});
  
  const { data, isLoading, error, isError } = useGetMatchDetailsQuery(id);
  useErrors([{ isError, error }]);


  useEffect(() => {
    if (data) {
      setMatch(data.match);
      setScoreboard(data.match?.scoreboard); // Use data.match instead of match
    }
  }, [data]);

  return isLoading ? <Loader /> : (
    <div>
      <Paper
        elevation={3}
        sx={{
          padding: "2rem 1rem",
          borderRadius: "12px",
          backgroundColor: "background.paper",
        }}
      >

        {/* <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
          Match Details
        </Typography> */}

        {/* Match Overview */}
        <Card sx={{ marginBottom: "2rem", borderRadius: "12px" }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  <strong>League:</strong> {match?.league?.name || "N/A"}
                </Typography>
                <Typography variant="body1">
                  <strong>Date:</strong> {new Date(match?.date).toDateString()}
                </Typography>
                <Typography variant="body1">
                  <strong>Time:</strong> {match?.startTime} - {match?.endTime}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Venue:</strong> {match?.venue?.name}, {match?.venue?.city} (Capacity:{" "}
                  {match?.venue?.capacity})
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {match?.status}
                </Typography>
                <Typography variant="body1">
                  <strong>Result:</strong> {match?.result || "N/A"}
                </Typography>
                <Typography variant="body1">
                  <strong>Man of the Match:</strong> {scoreboard?.manOfTheMatch || "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Umpires */}
        <Card sx={{ marginBottom: "2rem", borderRadius: "12px" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Umpires
            </Typography>
            <Grid container spacing={2}>
              {match?.umpires?.map((umpire) => (
                <Grid item key={umpire._id} xs={12} sm={6} md={4}>
                  <Typography variant="body1">
                    {umpire.fullName} ({umpire.country})
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Team Innings */}
        {scoreboard?.teamInnings?.map((inning, index) => (
          <Card key={index} sx={{ marginBottom: "2rem", borderRadius: "12px" }}>
            <CardContent>
              {/* ScoreBox */}
              <Box display="flex" flexWrap={"wrap"} gap={"1rem"} alignItems="center" mb={2}>
                <Avatar src={inning.team.logo?.url} sx={{ width: 40, height: 40, mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: "bold", mr: 2 }}>
                  {inning.team.shortName} ({inning.runs}/{inning.wickets} in {inning.overs} overs)
                </Typography>
              </Box>

              {/* Batting Stats */}
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Batting Stats
              </Typography>
              <TableContainer component={Paper} elevation={2} sx={{ borderRadius: "8px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Player</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Runs</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Balls</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Fours</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Sixes</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>SR</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Out</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inning.batsmenStats.map((batsman) => (
                      <TableRow key={batsman._id}>
                        <TableCell>{batsman.player.fullName}</TableCell>
                        <TableCell>{batsman.runs}</TableCell>
                        <TableCell>{batsman.balls}</TableCell>
                        <TableCell>{batsman.fours}</TableCell>
                        <TableCell>{batsman.sixes}</TableCell>
                        <TableCell>{(100*batsman.runs/(batsman.balls || 1)).toFixed(2)}</TableCell>
                        <TableCell>
                          {batsman.outType} {batsman.bowler && <p> ({batsman.bowler})</p>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Bowling Stats */}
              <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: "bold" }}>
                Bowling Stats
              </Typography>
              <TableContainer component={Paper} elevation={2} sx={{ borderRadius: "8px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Bowler</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Overs</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Maidens</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Runs</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Wickets</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Economy</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inning.bowlersStats.map((bowler) => (
                      <TableRow key={bowler._id}>
                        <TableCell>{bowler.player.fullName}</TableCell>
                        <TableCell>{bowler.overs}</TableCell>
                        <TableCell>{bowler.maidens}</TableCell>
                        <TableCell>{bowler.runsConceded}</TableCell>
                        <TableCell>{bowler.wickets}</TableCell>
                        <TableCell>{bowler.runsConceded ? ((bowler.runsConceded/(Math.floor(bowler.overs)*6 + Math.round((bowler.overs - Math.floor(bowler.overs)) * 10))*6).toFixed(2)) :0.00}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Extras */}
              <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: "bold" }}>
                Extras
              </Typography>
              <Typography variant="body1">
                Byes: {inning.extras.byes}, Leg Byes: {inning.extras.legByes}, No Balls:{" "}
                {inning.extras.noBalls}, Wides: {inning.extras.wides}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Paper>
    </div>
  );
};

export default AppLayout(MatchDetails);
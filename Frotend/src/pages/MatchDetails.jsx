import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent,  Avatar, Box } from "@mui/material";
import Grid from "@mui/material/Grid2"

import Header from "../components/layout/Header";
import { useGetMatchDetailsQuery } from "../redux/api/api";
import { useParams } from "react-router-dom";
import Loader from "../components/loaders/Loader";
import { useErrors } from "../hooks/hooks";

const MatchDetailsPage = () => {

  const params=useParams()

  const [matchDetails,setMatchDetails]= useState({})

  const {data,isError,error,isLoading}= useGetMatchDetailsQuery(params.id)


  useErrors([{isError,error}])

  useEffect(()=>{
    if(data){
      setMatchDetails(data.match)
    }
  })

  return (
    <>
        <Header />

        {
          isLoading ? <Loader /> :
          <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {matchDetails?.league?.name} - Match Details
          </Typography>
          <Typography variant="body1" align="center">
            {matchDetails?.venue?.name}, {matchDetails?.venue?.city} | Capacity: {matchDetails?.venue?.capacity}
          </Typography>
        </CardContent>
      </Card>

      {/* Teams Overview */}
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {matchDetails?.scoreboard?.teamInnings?.map((team, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar src={team.team.logo.url} alt={team.team.name} sx={{ width: 60, height: 60 }} />
                  <Typography variant="h6">{team.team.name} ({team.team.shortName})</Typography>
                </Box>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Runs: {team.runs}, Wickets: {team.wickets}, Overs: {team.overs}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Scoreboard Table */}
      {matchDetails?.scoreboard?.teamInnings?.map((team, index) => (
        <Box key={index} sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            {team.team.name} - Batting & Bowling Stats
          </Typography>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Batsman</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Runs</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Balls</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Fours</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Sixes</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Out Type</th>
              </tr>
            </thead>
            <tbody>
              {team.batsmenStats.map((batsman, i) => (
                <tr key={i}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{batsman.player.fullName}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{batsman.runs}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{batsman.balls}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{batsman.fours}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{batsman.sixes}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{batsman.outType}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Typography variant="h6" sx={{ mt: 2 }}>Bowling Stats</Typography>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Bowler</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Overs</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Maidens</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Runs</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Wickets</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Economy</th>
              </tr>
            </thead>
            <tbody>
              {team.bowlersStats.map((bowler, i) => (
                <tr key={i}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{bowler.player.fullName}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{bowler.overs}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{bowler.maidens}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{bowler.runsConceded}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{bowler.wickets}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{bowler.economy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      ))}
    </Container>
        }
        
    </>
    
  );
};

export default MatchDetailsPage;

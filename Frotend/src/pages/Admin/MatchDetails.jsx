import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid2 as Grid,
  Box,
  Divider,
  Skeleton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";

import { useParams } from "react-router-dom";
import { useDeleteScoreBoardMutation, useGenerateScoreBoardMutation, useGetMatchDetailsQuery, useUpdateMatchResultMutation, useUpdateMOMMutation, useUpdatePlayerStatsMutation } from "../../redux/api/api";
import { useCustomMutation, useErrors } from "../../hooks/hooks";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/loaders/Loader";
import EditScore from "../../components/Admin/dialogs/EditScore";
import EditBatsmanStats from "../../components/Admin/dialogs/EditBatmanStats";
import EditBowlerStats from "../../components/Admin/dialogs/EditBowlerStats";
import EditExtraStats from "../../components/Admin/dialogs/EditExtraStats";
import TeamPerformance from "../../components/Admin/dialogs/TeamPerformance";
import PointsTable from "../../components/Admin/dialogs/PointsTable";

const MatchDetails = () => {
  const params = useParams();
  const {id}= params

  const [match, setMatch] = useState({});
  const [scoreboard, setScoreboard] = useState({});
  const [openResultDialog, setOpenResultDialog] = useState(false);
  const [openManOfTheMatchDialog, setOpenManOfTheMatchDialog] = useState(false);
  const [matchResult, setMatchResult] = useState("");
  const [manOfTheMatch, setManOfTheMatch] = useState("");

  const [editScore, setEditScore] = useState(null);
  const [editBatsman, setEditBatsman] = useState(null);
  const [editBowler, setEditBowler] = useState(null);
  const [editExtras, setEditExtras] = useState(null);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [openPerformance, setOpenPerformance] = useState(false);
  const [openPointsTable, setOpenPointsTable] = useState(false);

  const { data, isLoading, error, isError } = useGetMatchDetailsQuery(id);
  const [generateScoreboard] =useCustomMutation(useGenerateScoreBoardMutation,"Generating Scoreboard");
  const [deleteScoreboard] =useCustomMutation(useDeleteScoreBoardMutation,"Deleting ScoreBoard");
  const [updateMatchResult] =useCustomMutation(useUpdateMatchResultMutation);
  const [updateManOfTheMatch] = useCustomMutation(useUpdateMOMMutation);
  const [updatePlayerStats] = useCustomMutation(useUpdatePlayerStatsMutation);
  useErrors([{ isError, error }]);


  useEffect(() => {
    if (data) {
      setMatch(data.match);
      setScoreboard(data.match?.scoreboard); // Use data.match instead of match
    }
  }, [data]);

  const handleGenerateScoreboard = async () => {
    window.alert("Make Sure to Update Teams Before Generate ScoreBoard !")
    if (window.confirm("Are you sure you want to Generate coreboard?")) {
      await generateScoreboard({match:id});
    }
  };

  const handleDeleteScoreboard = async () => {
    if (window.confirm("Are you sure you want to delete the scoreboard?")) {
      await deleteScoreboard(id);
    }
  };

  const handleUpdateMatchResult = async () => {
    await updateMatchResult({ id, body: {result:matchResult} });
    setOpenResultDialog(false);
  };

  const handleUpdateManOfTheMatch = async () => {
    await updateManOfTheMatch({ id:match?.scoreboard?._id, body: {manOfTheMatch} });
    setOpenManOfTheMatchDialog(false);
  };

  const handleOpenPerformance = (teamId) => {
    setSelectedTeam(teamId);
    setOpenPerformance(true);
  };

  const handleOpenPointsTable = (teamId) => {
    setSelectedTeam(teamId);
    setOpenPointsTable(true);
  };

  const handleUpdatePlayerStats= async ()=>{
    if (window.confirm("Are you sure you want to update stats?")) {
      let allBatsmen=[...match?.scoreboard?.teamInnings[0].batsmenStats,...match?.scoreboard?.teamInnings[1].batsmenStats]
      let allBowlers=[...match?.scoreboard?.teamInnings[0].bowlersStats,...match?.scoreboard?.teamInnings[1].bowlersStats]
      await updatePlayerStats({
          leagueId:match?.league?._id, 
          batsmen:allBatsmen, 
          bowlers : allBowlers
      })
    }
  }

  return isLoading ? <Loader /> : (
    <div
    style={{
      height:"100%"
    }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "2rem 1rem",
          borderRadius: "12px",
          backgroundColor: "background.paper",
          minHeight:"100%",
        }}
      >
        <Box display="flex" justifyContent="center" gap={2} mb={3}>
          <Button variant="contained" color="primary" onClick={handleGenerateScoreboard}>
            Generate Scoreboard
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteScoreboard}
            disabled={match?.status !== "Upcoming"}
          >
            Delete Scoreboard
          </Button>
        </Box>

        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
          Match Details
        </Typography>

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
                <Button size="small" variant="contained" color="primary" onClick={() => setEditScore({ scoreId:scoreboard._id,teamId:inning.team._id,runs: inning.runs,
                   wickets: inning.wickets, overs: inning.overs})}>Edit</Button>

          <Button
            variant="contained"
            size="small"
            sx={{ ml: "auto" }}
            disabled={match?.status !== "Completed"}
            onClick={() => handleOpenPerformance(inning.team._id)}
          >
            Performance
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ ml: 1 }}
            disabled={match?.status !== "Completed"}
            onClick={() => handleOpenPointsTable(inning.team._id)}
          >
           Update Points Table
          </Button>
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
                      <TableCell sx={{ fontWeight: "bold" }}>Out By</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
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
                        <TableCell>
                            <Button size="small" variant="contained" color="primary" onClick={() => setEditBatsman({...batsman,scoreId:scoreboard._id, teamId:inning.team._id})}>Edit</Button>
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
                      <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                      
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
                        <TableCell>
                            <Button variant="contained" size="small" color="primary" onClick={() => setEditBowler({...bowler,scoreId:scoreboard._id, teamId:inning.team._id})}>Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Extras */}
              <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: "bold" }}>
                Extras
              </Typography>
              <Button variant="contained" color="primary" size="small"
                sx={{ padding:"0.1rem 0.2rem"}}
              onClick={() => setEditExtras({...inning?.extras,scoreId:scoreboard._id, teamId:inning.team._id})}>Edit</Button>
              <Typography variant="body1">
                Byes: {inning.extras.byes}, Leg Byes: {inning.extras.legByes}, No Balls:{" "}
                {inning.extras.noBalls}, Wides: {inning.extras.wides}
              </Typography>
            </CardContent>
          </Card>
        ))}

        {/* Update Buttons */}
        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Button variant="contained" color="primary" onClick={() => setOpenResultDialog(true)}>
            Match Result
          </Button>
          <Button variant="contained" color="primary" onClick={() => setOpenManOfTheMatchDialog(true)}>
            MOM
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ ml: 1 }}
            disabled={match?.status !== "Completed"}
            onClick={handleUpdatePlayerStats}
          >
            Player Stats
          </Button>
        </Box>

        {/* Update Match Result Dialog */}
        <Dialog open={openResultDialog} onClose={() => setOpenResultDialog(false)}>
          <DialogTitle>Update Match Result</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Match Result" variant="outlined" value={matchResult} onChange={(e) => setMatchResult(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenResultDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateMatchResult} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Update Man of the Match Dialog */}
        <Dialog open={openManOfTheMatchDialog} onClose={() => setOpenManOfTheMatchDialog(false)}>
          <DialogTitle>Update Man of the Match</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Man Of The Match" variant="outlined" value={manOfTheMatch} onChange={(e) => setManOfTheMatch(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenManOfTheMatchDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateManOfTheMatch} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialogs for Updating Data */}
      {editScore && (
        <EditScore
          open={!!editScore}
          onClose={() => setEditScore(null)}
          initialData={editScore}
        />
      )}

      {editBatsman && (
        <EditBatsmanStats
          open={!!editBatsman}
          onClose={() => setEditBatsman(null)}
          initialData={editBatsman}
        />
      )}

      {editBowler && (
        <EditBowlerStats
          open={!!editBowler}
          onClose={() => setEditBowler(null)}
          initialData={editBowler}
        />
      )}

      {editExtras !== null && (
        <EditExtraStats
          open={!!editExtras}
          onClose={() => setEditExtras(null)}
          initialData={editExtras}
        />
      )}

      {openPerformance && (
          <TeamPerformance
            open={openPerformance}
            onClose={() => setOpenPerformance(false)}
            leagueId={match?.league?._id}
            teamId={selectedTeam}
          />
      )}

      {openPointsTable && (
          <PointsTable
          open={openPointsTable}
          onClose={() => setOpenPointsTable(false)}
          leagueId={match?.league?._id}
          teamId={selectedTeam}
        />
      )}


      </Paper>
    </div>
  );
};

export default AdminLayout(MatchDetails);
import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import Loader from "../../components/loaders/Loader";
import { useErrors } from "../../hooks/hooks";
import { useGetLeagueDetailsQuery } from "../../redux/api/api";

const LeagueDetails = () => {
  const { id } = useParams();
  const [league, setLeague] = useState(null);
  const { data, isLoading, error, isError } = useGetLeagueDetailsQuery(id);
  useErrors([{ isError, error }]);

  useEffect(() => {
    if (data) {
      setLeague(data.league);
    }
  }, [data]);

  return isLoading ? (
    <Loader />
  ) : (
    <div
    style={{
      height:"100%"
    }}
    >
      <Paper 
        elevation={3}
        sx={{
          padding: "2rem 1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          minHeight:"100%"
        }}>
        <Typography variant="h4" gutterBottom>
          {league?.name} ({league?.season})
        </Typography>
        <Typography variant="h6">Format: {league?.format}</Typography>
        <Typography variant="h6">Start Date: {new Date(league?.startDate).toDateString()}</Typography>
        <Typography variant="h6">End Date: {new Date(league?.endDate).toDateString()}</Typography>
        <Typography variant="h6">Description: {league?.description}</Typography>

        {/* Teams Table */}
        <Typography variant="h5" sx={{ marginTop: "1.5rem" }}>Teams</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Logo</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Short Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {league?.teams?.map((team) => (
                <TableRow key={team._id}>
                  <TableCell><Avatar src={team.logo?.url} alt={team.name} /></TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.shortName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Points Table */}
        <Typography variant="h5" sx={{ marginTop: "1.5rem" }}>Points Table</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell>Position</TableCell> */}
                <TableCell>Team</TableCell>
                <TableCell>Matches</TableCell>
                <TableCell>Wins</TableCell>
                <TableCell>Losses</TableCell>
                <TableCell>Ties</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>NRR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {league?.pointsTable?.teams?.map((teamStat) => (
                <TableRow key={teamStat._id}>
                  {/* <TableCell>{teamStat.position}</TableCell> */}
                  <TableCell>
                    <Avatar src={teamStat.team?.logo?.url} alt={teamStat.team?.name} sx={{ width: 30, height: 30, marginRight: 1 }} />
                    {teamStat.team?.name}
                  </TableCell>
                  <TableCell>{teamStat.matchesPlayed}</TableCell>
                  <TableCell>{teamStat.wins}</TableCell>
                  <TableCell>{teamStat.losses}</TableCell>
                  <TableCell>{teamStat.ties}</TableCell>
                  <TableCell>{teamStat.points}</TableCell>
                  <TableCell>{(teamStat.netRunRate).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default AppLayout(LeagueDetails);



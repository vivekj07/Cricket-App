import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import Loader from "../../components/loaders/Loader";
import { useErrors } from "../../hooks/hooks";
import { useGetTeamDetailsQuery } from "../../redux/api/api";
import { orangeBorder, violetBorder } from "../../constants/colors";

const TeamDetails = () => {
  const { id } = useParams();
  const [team, setTeam] = useState({});

  const { data, isLoading, error, isError } = useGetTeamDetailsQuery(id);
  useErrors([{ isError, error }]);

  useEffect(() => {
    if (data) {
      setTeam(data.team);
    }
  }, [data]);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <Paper
        elevation={3}
        sx={{
          padding: "2rem 1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {team?.name} ({team?.shortName})
        </Typography>
        <Avatar src={team?.logo?.url} alt={team?.name} sx={{ width: 100, height: 100, border:`3px solid ${violetBorder}` }} />
        <Typography variant="h6">Coach: {team?.coach}</Typography>
        <Typography variant="h6">Captain: {team?.captain?.fullName}</Typography>
        <Typography variant="h6">
          Home Venue: {team?.homeVenue ? <> {team?.homeVenue?.name}, {team?.homeVenue?.city}, {team?.homeVenue?.country}</> :<>None</>}
        </Typography>

        {/* Players Table */}
        <Typography variant="h5" sx={{ marginTop: "1.5rem" }}>Players</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Photo</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Home Town</TableCell>
                <TableCell>J.N</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {team?.players?.map((player) => (
                <TableRow key={player._id}>
                  <TableCell><Avatar src={player.photo?.url} alt={player.fullName} /></TableCell>
                  <TableCell>{player.fullName}</TableCell>
                  <TableCell>{player.country}</TableCell>
                  <TableCell>{player.homeTown}</TableCell>
                  <TableCell>{player.jersyNo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Team Performance Table */}
        <Typography variant="h5" sx={{ marginTop: "1.5rem" }}>Team Performance</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Format</TableCell>
                <TableCell>Matches</TableCell>
                <TableCell>Wins</TableCell>
                <TableCell>Losses</TableCell>
                <TableCell>Ties</TableCell>
                <TableCell>NRR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {team?.performance?.map((stat, index) => (
                <TableRow key={index}>
                  <TableCell>{stat.leagueType}</TableCell>
                  <TableCell>{stat.matchesPlayed}</TableCell>
                  <TableCell>{stat.wins}</TableCell>
                  <TableCell>{stat.losses}</TableCell>
                  <TableCell>{stat.ties}</TableCell>
                  <TableCell>{stat.netRunRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default AppLayout(TeamDetails);

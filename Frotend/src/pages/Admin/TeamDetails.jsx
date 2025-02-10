import { Avatar, Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Delete, Done } from "@mui/icons-material";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/loaders/Loader";
import AddPlayersDialog from "../../components/Admin/dialogs/AddPlayersDialog";
import { useGetTeamDetailsQuery, useMakeCaptainMutation, useRemovePlayerMutation } from "../../redux/api/api";
import { useCustomMutation, useErrors } from "../../hooks/hooks";

const TeamDetails = () => {
  const { id } = useParams();
  const [team, setTeam] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const { data, isLoading, error, isError } = useGetTeamDetailsQuery(id);
  const [removePlayer] =useCustomMutation(useRemovePlayerMutation,"Removing Player From Team...") ;
  const [makeCaptain] =useCustomMutation(useMakeCaptainMutation,"Assigning Captain of Team...") ;
  useErrors([{ isError, error }]);

  useEffect(() => {
    if (data) {
      setTeam(data.team);
    }
  }, [data]);

  const handleRemovePlayer = async (playerId) => {
    await removePlayer({id,playerId})
  };

  const handleMakeCaptain= async (playerId)=>{
    await makeCaptain({id,playerId})
  }

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
        <Avatar src={team?.logo?.url} alt={team?.name} sx={{ width: 100, height: 100 }} />
        <Typography variant="h6">Coach: {team?.coach}</Typography>
        <Typography variant="h6">Captain: {team?.captain?.fullName}</Typography>
        <Typography variant="h6">
          Home Venue: {team?.homeVenue?.name}, {team?.homeVenue?.city}, {team?.homeVenue?.country}
        </Typography>

        <Button variant="contained" sx={{ mt: 2 }} onClick={() => setOpenDialog(true)}>
          Add Players
        </Button>

        {/* Players Table */}
        <Typography variant="h5" sx={{ marginTop: "1.5rem" }}>Players</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Photo</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Home Town</TableCell>
                <TableCell>Jersey No</TableCell>
                <TableCell>Remove</TableCell>
                <TableCell>Captain</TableCell>
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
                  <TableCell>
                    <IconButton color="error" onClick={() => handleRemovePlayer(player._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleMakeCaptain(player._id)}>
                      <Done />
                    </IconButton>
                  </TableCell>
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
                <TableCell>League Type</TableCell>
                <TableCell>Matches Played</TableCell>
                <TableCell>Wins</TableCell>
                <TableCell>Losses</TableCell>
                <TableCell>Ties</TableCell>
                <TableCell>Net Run Rate</TableCell>
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

      {/* Add Players Dialog */}
      <AddPlayersDialog open={openDialog} onClose={() => setOpenDialog(false)} teamPlayers={team?.players || []} teamId={id} />
    </div>
  );
};

export default AdminLayout(TeamDetails);

import { Avatar, Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/loaders/Loader";
import { useGetLeagueDetailsQuery, useRemoveTeamMutation } from "../../redux/api/api";
import { useCustomMutation, useErrors } from "../../hooks/hooks";
import AddTeamsDialog from "../../components/Admin/dialogs/AddTeamsDialog";
import NewMatch from "../../components/Admin/dialogs/NewMatch";
import PointsTable from "../../components/Admin/dialogs/PointsTable";

const LeagueDetails = () => {
  const { id } = useParams();
  const [league, setLeague] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newMatch, setNewMatch] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [openPointsTable, setOpenPointsTable] = useState(false);

  const { data, isLoading, error, isError } = useGetLeagueDetailsQuery(id);
  const [removeTeam] = useCustomMutation(useRemoveTeamMutation, "Removing Team from League...");
  useErrors([{ isError, error }]);

  useEffect(() => {
    if (data) {
      setLeague(data.league);
    }
  }, [data]);

  const handleRemoveTeam = async (teamId) => {
    await removeTeam({ id, team:teamId });
  };

  const handleOpenPointsTable = (teamId) => {
    setSelectedTeam(teamId);
    setOpenPointsTable(true);
  };

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

        {/* Add Teams Button */}
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => setOpenDialog(true)}>
          Add Teams
        </Button>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => setNewMatch(true)}>
          Create New Match
        </Button>

        {/* Teams Table */}
        <Typography variant="h5" sx={{ marginTop: "1.5rem" }}>Teams</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Logo</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Short Name</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {league?.teams?.map((team) => (
                <TableRow key={team._id}>
                  <TableCell><Avatar src={team.logo?.url} alt={team.name} /></TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.shortName}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleRemoveTeam(team._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
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
                <TableCell>Matches Played</TableCell>
                <TableCell>Wins</TableCell>
                <TableCell>Losses</TableCell>
                <TableCell>Ties</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Net Run Rate</TableCell>
                <TableCell>Action</TableCell>
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
                  <TableCell>
                          <Button
                              variant="contained"
                              size="small"
                              sx={{ ml: 1 }}
                              onClick={() => handleOpenPointsTable(teamStat.team?._id)}
                            >
                              Edit
                            </Button>
                  </TableCell>

                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {openPointsTable && (
          <PointsTable
          open={openPointsTable}
          onClose={() => setOpenPointsTable(false)}
          leagueId={league?._id}
          teamId={selectedTeam}
          directUpdate={true}
        />
      )}

      {/* Add Teams Dialog */}
      <AddTeamsDialog open={openDialog} onClose={() => setOpenDialog(false)} leagueTeams={league?.teams || []} leagueId={id} />
      <NewMatch open={newMatch} onClose={() => setNewMatch(false)} leagueTeams={league?.teams || []} leagueId={id} />
    </div>
  );
};

export default AdminLayout(LeagueDetails);



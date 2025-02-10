import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useCustomMutation, useErrors } from "../../../hooks/hooks";
import {  useAddTeamsMutation, useGetAllTeamsQuery } from "../../../redux/api/api";

const AddTeamsDialog = ({ open, onClose, leagueTeams, leagueId }) => {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [availableTeams, setAvailableTeams] = useState([]);

  const [addTeamsToLeague] = useCustomMutation(useAddTeamsMutation, "Adding Teams...");
  const { data: allTeams, isError, error } = useGetAllTeamsQuery();

  useErrors([{ isError, error }]);

  useEffect(() => {
    if (allTeams) {
      const filteredTeams = allTeams.teams.filter((team) =>
        !leagueTeams.some((leagueTeam) => leagueTeam._id === team._id)
      );
      setAvailableTeams(filteredTeams);
    }
  }, [allTeams, leagueTeams]);

  const handleTeamSelect = (teamId) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId) ? prev.filter((id) => id !== teamId) : [...prev, teamId]
    );
  };

  const handleAddTeams = async () => {

    await addTeamsToLeague({ id: leagueId, teams: selectedTeams })
    setSearchQuery("");
    onClose();
  };

  const filteredTeams = availableTeams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Select Teams to Add</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Search Teams"
          variant="outlined"
          margin="dense"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filteredTeams.length > 0 ? (
          <List>
            {filteredTeams.map((team) => (
              <ListItem
                key={team._id}
                secondaryAction={
                  <IconButton
                    color={selectedTeams.includes(team._id) ? "primary" : "default"}
                    onClick={() => handleTeamSelect(team._id)}
                  >
                    <AddIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar src={team.logo?.url} alt={team.name} />
                </ListItemAvatar>
                <ListItemText primary={team.name} secondary={team.shortName} />
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No teams available</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAddTeams} disabled={selectedTeams.length === 0}>
          Add Teams
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTeamsDialog;

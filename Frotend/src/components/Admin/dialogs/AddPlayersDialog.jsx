import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useCustomMutation, useErrors } from "../../../hooks/hooks";
import { useAddPlayersMutation, useGetAllPlayersQuery } from "../../../redux/api/api";
;

const AddPlayersDialog = ({ open, onClose, teamPlayers, teamId }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [availablePlayers, setAvailablePlayers] = useState([]);

  const [addPlayersToTeam] = useCustomMutation(useAddPlayersMutation,"Adding Players...");
  const { data: allPlayers, isError, error } = useGetAllPlayersQuery();

  useErrors([{ isError, error }]);

  useEffect(() => {
    if (allPlayers) {
      const filteredPlayers = allPlayers.players.filter((player) =>
        !teamPlayers.some((teamPlayer) => teamPlayer._id === player._id)
      );
      setAvailablePlayers(filteredPlayers);
    }
  }, [allPlayers, teamPlayers]);

  const handlePlayerSelect = (playerId) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerId) ? prev.filter((id) => id !== playerId) : [...prev, playerId]
    );
  };

  const handleAddPlayers = async () => {
    if (selectedPlayers.length === 0) return;
    try {
      await addPlayersToTeam({ id: teamId, playerIds: selectedPlayers });
      setSearchQuery("")
      onClose();
    } catch (error) {
      console.error("Error adding players:", error);
    }
  };

  const filteredPlayers = availablePlayers.filter((player) =>
    player.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Select Players to Add</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Search Players"
          variant="outlined"
          margin="dense"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filteredPlayers.length > 0 ? (
          <List>
            {filteredPlayers.map((player) => (
              <ListItem key={player._id} secondaryAction={
                <IconButton
                  color={selectedPlayers.includes(player._id) ? "primary" : "default"}
                  onClick={() => handlePlayerSelect(player._id)}
                >
                  <AddIcon />
                </IconButton>
              }>
                <ListItemAvatar>
                  <Avatar src={player.photo?.url} alt={player.fullName} />
                </ListItemAvatar>
                <ListItemText primary={player.fullName} secondary={player.country} />
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No players available</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAddPlayers} disabled={selectedPlayers.length === 0}>
          Add Players
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlayersDialog;

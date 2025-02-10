import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useCustomMutation } from "../../../hooks/hooks";
import { useUpdateTeamPerformanceMutation } from "../../../redux/api/api";

const TeamPerformance = ({ open, onClose,leagueId,teamId}) => {
  const [teamStats, setTeamStats] = useState({
    matchesPlayed: "",
    wins: "",
    losses: "",
    ties: "",
    netRunRate:""
  });

  const [updateTeamPerformance] = useCustomMutation(useUpdateTeamPerformanceMutation, "Updating Team Performance...");

  const handleUpdate = async () => {
    await updateTeamPerformance({
    
      id:teamId,
      body: {
        matchesPlayed:teamStats.matchesPlayed,
        wins:teamStats.wins,
        losses:teamStats.losses,
        ties:teamStats.ties,
        netRunRate:teamStats.netRunRate,
        leagueId
      },
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Team Performance</DialogTitle>
      <DialogContent>
        <TextField
          label="Matches Played"
          type="number"
          fullWidth
          value={teamStats.matchesPlayed}
          onChange={(e) => setTeamStats({ ...teamStats, matchesPlayed: Number(e.target.value) })}
          margin="dense"
        />
        <TextField
          label="Wins"
          type="number"
          fullWidth
          value={teamStats.wins}
          onChange={(e) => setTeamStats({ ...teamStats, wins: Number(e.target.value) })}
          margin="dense"
        />
        <TextField
          label="Losses"
          type="number"
          fullWidth
          value={teamStats.losses}
          onChange={(e) => setTeamStats({ ...teamStats, losses: Number(e.target.value) })}
          margin="dense"
        />
        <TextField
          label="Ties"
          type="number"
          fullWidth
          value={teamStats.ties}
          onChange={(e) => setTeamStats({ ...teamStats, ties: Number(e.target.value) })}
          margin="dense"
        />
        <TextField
          label="Net Run Rate"
          type="number"
          fullWidth
          value={teamStats.netRunRate}
          onChange={(e) => setTeamStats({ ...teamStats, netRunRate: Number(e.target.value) })}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamPerformance;

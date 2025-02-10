import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useCustomMutation } from "../../../hooks/hooks";
import { useUpdatePointsTableDirectlyMutation, useUpdatePointsTableMutation } from "../../../redux/api/api";

const PointsTable = ({ open, onClose, leagueId, teamId, directUpdate=false }) => {
  const [pointsData, setPointsData] = useState({
    matchesPlayed: 0,
    wins: 0,
    losses: 0,
    ties: 0,
    noResults: 0,
    points: 0,
    netRunRate: 0,
    position: 0,
  });

  const [updatePointsTable] = useCustomMutation(useUpdatePointsTableMutation, "Updating Points Table...");
  const [updatePointsTableDirectly] = useCustomMutation(useUpdatePointsTableDirectlyMutation, "Updating Points Table...");

  const handleUpdate = async () => {
    await updatePointsTable({
      id: leagueId,
      body: {
        ...pointsData,
        teamId,
      },
    });
    onClose();
  };

  const handleDirectUpdate = async () => {
    await updatePointsTableDirectly({
      id: leagueId,
      body: {
        ...pointsData,
        teamId,
      },
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Points Table</DialogTitle>
      <DialogContent>
        <TextField label="Matches Played" type="number" fullWidth value={pointsData.matchesPlayed} onChange={(e) => setPointsData({ ...pointsData, matchesPlayed: Number(e.target.value) })} margin="dense" />
        <TextField label="Wins" type="number" fullWidth value={pointsData.wins} onChange={(e) => setPointsData({ ...pointsData, wins: Number(e.target.value) })} margin="dense" />
        <TextField label="Losses" type="number" fullWidth value={pointsData.losses} onChange={(e) => setPointsData({ ...pointsData, losses: Number(e.target.value) })} margin="dense" />
        <TextField label="Ties" type="number" fullWidth value={pointsData.ties} onChange={(e) => setPointsData({ ...pointsData, ties: Number(e.target.value) })} margin="dense" />
        <TextField label="No Results" type="number" fullWidth value={pointsData.noResults} onChange={(e) => setPointsData({ ...pointsData, noResults: Number(e.target.value) })} margin="dense" />
        <TextField label="Points" type="number" fullWidth value={pointsData.points} onChange={(e) => setPointsData({ ...pointsData, points: Number(e.target.value) })} margin="dense" />
        <TextField label="Net Run Rate" type="number" fullWidth value={pointsData.netRunRate} onChange={(e) => setPointsData({ ...pointsData, netRunRate: Number(e.target.value) })} margin="dense" />
        <TextField label="Position" type="number" fullWidth value={pointsData.position} onChange={(e) => setPointsData({ ...pointsData, position: Number(e.target.value) })} margin="dense" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={directUpdate ? handleDirectUpdate : handleUpdate} variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PointsTable;

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useCustomMutation } from "../../../hooks/hooks";
import { useUpdatePlayerPerformanceMutation } from "../../../redux/api/api";

const EditPerformance = ({ open, onClose, initialData}) => {
  const [player, setPlayer] = useState(initialData);
  const [updatePerformance] =useCustomMutation(useUpdatePlayerPerformanceMutation,"Updating Performance...");
    useEffect(()=>{
        setPlayer(initialData)
    },[initialData])

  const handleUpdate = async () => {
    await updatePerformance({id:player.playerId,body:player})
    onClose()
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Batsman Stats</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem" }}>
        <TextField label="League" type="text" fullWidth value={player?.leagueType}
        //  onChange={(e) => setPlayer({ ...player, leagueType: e.target.value })}
        />
        <TextField label="Matches" type="number" fullWidth value={player?.matchesPlayed} onChange={(e) => setPlayer({ ...player, matchesPlayed: e.target.value })} />
        
        <TextField label="Runs" type="number" fullWidth value={player?.runsScored} onChange={(e) => setPlayer({ ...player, runsScored: e.target.value })} />
        <TextField label="Balls" type="number" fullWidth value={player?.noOfBallsFaced} onChange={(e) => setPlayer({ ...player, noOfBallsFaced: e.target.value })} />
        <TextField label="6s" type="number" fullWidth value={player?.noOf6s} onChange={(e) => setPlayer({ ...player, noOf6s: e.target.value })} />
        <TextField label="4s" type="number" fullWidth value={player?.noOf4s} onChange={(e) => setPlayer({ ...player, noOf4s: e.target.value })} />
        <TextField label="Dismissed" type="number" fullWidth value={player?.noOfTimeDismissed} onChange={(e) => setPlayer({ ...player, noOfTimeDismissed: e.target.value })} />
        
        <TextField label="BallsBowled" type="number" fullWidth value={player?.noOfBallsBowled} onChange={(e) => setPlayer({ ...player, noOfBallsBowled: e.target.value })} />
        <TextField label="RunsGiven" type="number" fullWidth value={player?.runsGiven} onChange={(e) => setPlayer({ ...player, runsGiven: e.target.value })} />
        <TextField label="Wickets" type="number" fullWidth value={player?.wicketsTaken} onChange={(e) => setPlayer({ ...player, wicketsTaken: e.target.value })} />

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPerformance;

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useUpdateBowlerStatMutation } from "../../../redux/api/api";
import { useCustomMutation } from "../../../hooks/hooks";

const EditBowlerStats = ({ open, onClose, initialData }) => {
  const [bowler, setBowler] = useState(initialData);
  const [updateStats] =useCustomMutation(useUpdateBowlerStatMutation,"Updating Bowler Stats...");

  const handleUpdate = async () => {
    await updateStats({ id: bowler.scoreId, body :{
        playerId: bowler.player._id,teamId:bowler.teamId, overs: bowler.overs, wickets: bowler.wickets, 
        maidens: bowler.maidens, runsConceded: bowler.runsConceded
     }
    });
    onClose()  
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Bowler Stats</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem" }}>
        <TextField label="Overs" type="number" fullWidth value={bowler.overs} onChange={(e) => setBowler({ ...bowler, overs: e.target.value })} />
        <TextField label="Runs Conceded" type="number" fullWidth value={bowler.runsConceded} onChange={(e) => setBowler({ ...bowler, runsConceded: e.target.value })} />
        <TextField label="Wickets" type="number" fullWidth value={bowler.wickets} onChange={(e) => setBowler({ ...bowler, wickets: e.target.value })} />
        <TextField label="Maidens" type="number" fullWidth value={bowler.maidens} onChange={(e) => setBowler({ ...bowler, maidens: e.target.value })} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBowlerStats;

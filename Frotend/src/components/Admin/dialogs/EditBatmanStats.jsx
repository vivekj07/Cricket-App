import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useCustomMutation } from "../../../hooks/hooks";
import { useUpdateBatsManStatMutation } from "../../../redux/api/api";

const EditBatsmanStats = ({ open, onClose, initialData}) => {
  const [batsman, setBatsman] = useState(initialData);

  const [updateStats] =useCustomMutation(useUpdateBatsManStatMutation,"Updating Batman Stats...");

  const handleUpdate = async () => {
    await updateStats({ id: batsman.scoreId, body :{
        playerId: batsman.player._id,teamId:batsman.teamId, runs: batsman.runs, balls: batsman.balls, 
        fours: batsman.fours, sixes: batsman.sixes,outType:batsman.outType,bowler:batsman.bowler
     }  
    });
    onClose()
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Batsman Stats</DialogTitle>
      <DialogContent>
        <TextField label="Runs" type="number" fullWidth value={batsman.runs} onChange={(e) => setBatsman({ ...batsman, runs: e.target.value })} />
        <TextField label="Balls" type="number" fullWidth value={batsman.balls} onChange={(e) => setBatsman({ ...batsman, balls: e.target.value })} />
        <TextField label="Fours" type="number" fullWidth value={batsman.fours} onChange={(e) => setBatsman({ ...batsman, fours: e.target.value })} />
        <TextField label="Sixes" type="number" fullWidth value={batsman.sixes} onChange={(e) => setBatsman({ ...batsman, sixes: e.target.value })} />
        <TextField label="OutType" type="text" fullWidth value={batsman.outType} onChange={(e) => setBatsman({ ...batsman, outType: e.target.value })} />
        <TextField label="Bowler" type="text" fullWidth value={batsman.bowler} onChange={(e) => setBatsman({ ...batsman, bowler: e.target.value })} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBatsmanStats;

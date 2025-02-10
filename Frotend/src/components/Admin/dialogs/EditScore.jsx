import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useCustomMutation } from "../../../hooks/hooks";
import { useUpdateTeamScoreMutation } from "../../../redux/api/api";

const EditScore = ({ open, onClose, initialData }) => {
  const [score, setScore] = useState(initialData);

  const [updateScore] =useCustomMutation(useUpdateTeamScoreMutation,"Updating Score");
  
  const handleUpdate = async () => {
    await updateScore({ id: score.scoreId, body:{
        teamId: score.teamId, runs: score.runs, wickets: score.wickets, overs: score.overs
    }  });
    onClose()
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Score</DialogTitle>
      <DialogContent>
        <TextField label="Runs" type="number" fullWidth value={score.runs} onChange={(e) => setScore({ ...score, runs: e.target.value })} />
        <TextField label="Wickets" type="number" fullWidth value={score.wickets} onChange={(e) => setScore({ ...score, wickets: e.target.value })} />
        <TextField label="Overs" type="number" fullWidth value={score.overs} onChange={(e) => setScore({ ...score, overs: e.target.value })} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditScore;

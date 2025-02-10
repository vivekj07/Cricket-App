import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useCustomMutation } from "../../../hooks/hooks";
import { useUpdateMatchMutation } from "../../../redux/api/api";


const EditMatch = ({ open, onClose, match }) => {
  const [matchData, setMatchData] = useState(match);

  const [updateMatch] = useCustomMutation(useUpdateMatchMutation, "Updating Match...");

  useEffect(() => {
    if (match) {
      setMatchData(match);
    }
  }, [match]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatchData({ ...matchData, [name]: value });
  };

  const handleSubmit = async () => {
    await updateMatch({ id: match._id, body: matchData });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Match</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem" }}>
        <TextField type="date" label="Match Date" name="date" InputLabelProps={{ shrink: true }} value={matchData?.date} onChange={handleChange} required />
        <TextField type="time" label="Start Time" name="startTime" InputLabelProps={{ shrink: true }} value={matchData?.startTime} onChange={handleChange} />
        <TextField type="time" label="End Time" name="endTime" InputLabelProps={{ shrink: true }} value={matchData?.endTime} onChange={handleChange} />
        <TextField select label="Status" name="status" value={matchData?.status} onChange={handleChange} required>
          <MenuItem value="Upcoming">Upcoming</MenuItem>
          <MenuItem value="Live">Live</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Abandoned">Abandoned</MenuItem>
        </TextField>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMatch;

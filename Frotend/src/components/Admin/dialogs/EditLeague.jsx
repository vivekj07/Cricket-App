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
import { useUpdateLeagueMutation } from "../../../redux/api/api";

const EditLeague = ({ open, onClose, league }) => {
  const [leagueData, setLeagueData] = useState(league);

  const [updateLeague] = useCustomMutation(useUpdateLeagueMutation, "Updating League...");

  useEffect(() => {
    if (league) {
      setLeagueData(league);
    }
  }, [league]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeagueData({ ...leagueData, [name]: value });
  };

  const handleSubmit = async () => {
    await updateLeague({ id: league._id, body:leagueData });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit League</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem" }}>
        <TextField label="League Name" name="name" value={leagueData?.name} onChange={handleChange} required />
        <TextField type="date" label="Start Date" name="startDate" InputLabelProps={{ shrink: true }} value={leagueData?.startDate} onChange={handleChange} required />
        <TextField type="date" label="End Date" name="endDate" InputLabelProps={{ shrink: true }} value={leagueData?.endDate} onChange={handleChange} required />
        <TextField label="Season" name="season" value={leagueData?.season} onChange={handleChange} />
        <TextField select label="Format" name="format" value={leagueData?.format} onChange={handleChange} required>
          <MenuItem value="T20">T20</MenuItem>
          <MenuItem value="ODI">ODI</MenuItem>
          <MenuItem value="Test">Test</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <TextField label="Description" name="description" value={leagueData?.description} onChange={handleChange} multiline rows={3} />

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

export default EditLeague;

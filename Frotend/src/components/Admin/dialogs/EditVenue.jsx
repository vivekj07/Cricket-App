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
import { useUpdateVenueMutation } from "../../../redux/api/api";

const EditVenue = ({ open, onClose, venue }) => {
  const [venueData, setVenueData] = useState(venue);

  const [updateVenue] = useCustomMutation(useUpdateVenueMutation, "Updating Venue...");

  useEffect(() => {
    if (venue) {
      setVenueData(venue);
    }
  }, [venue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData({ ...venueData, [name]: value });
  };

  const handleSubmit = async () => {
    await updateVenue({ id: venue._id, body: venueData });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Venue</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem" }}>
        <TextField label="Venue Name" name="name" value={venueData?.name} onChange={handleChange} required />
        <TextField label="City" name="city" value={venueData?.city} onChange={handleChange} required />
        <TextField label="Country" name="country" value={venueData?.country} onChange={handleChange} required />
        <TextField label="Capacity" type="number" name="capacity" value={venueData?.capacity} onChange={handleChange} required />
        <TextField label="Established Year" type="number" name="establishedYear" value={venueData?.establishedYear} onChange={handleChange} required />
        
        <TextField
          select
          label="Pitch Type"
          name="pitchType"
          value={venueData?.pitchType}
          onChange={handleChange}
        >
          <MenuItem value="Balanced">Balanced</MenuItem>
          <MenuItem value="Batting">Batting</MenuItem>
          <MenuItem value="Bowling">Bowling</MenuItem>
        </TextField>

        <TextField
          select
          label="Floodlights"
          name="floodlights"
          value={venueData?.floodlights}
          onChange={handleChange}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
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

export default EditVenue;

import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useCustomMutation } from "../../../hooks/hooks";
import { useNewVenueMutation } from "../../../redux/api/api";

const NewVenue = ({ open, onClose }) => {
    const [venueData, setVenueData] = useState({
        name: "",
        city: "",
        country: "",
        capacity: "",
        establishedYear: "",
        pitchType: "Balanced",
        floodlights: true,
    });

    const [newVenue] = useCustomMutation(useNewVenueMutation, "Creating New Venue...");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVenueData({ ...venueData, [name]: value });
    };

    const handleSubmit = async () => {
        if (!venueData.name || !venueData.city || !venueData.country || !venueData.capacity || !venueData.establishedYear) {
            alert("Please fill all required fields.");
            return;
        }

        await newVenue(venueData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Venue</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem" }}>
                <TextField label="Venue Name" name="name" value={venueData.name} onChange={handleChange} required />
                <TextField label="City" name="city" value={venueData.city} onChange={handleChange} required />
                <TextField label="Country" name="country" value={venueData.country} onChange={handleChange} required />
                <TextField type="number" label="Capacity" name="capacity" value={venueData.capacity} onChange={handleChange} required />
                <TextField type="number" label="Established Year" name="establishedYear" value={venueData.establishedYear} onChange={handleChange} required />
                <TextField select label="Pitch Type" name="pitchType" value={venueData.pitchType} onChange={handleChange} required>
                    <MenuItem value="Balanced">Balanced</MenuItem>
                    <MenuItem value="Batting">Batting</MenuItem>
                    <MenuItem value="Bowling">Bowling</MenuItem>
                </TextField>
                <TextField select label="Floodlights" name="floodlights" value={venueData.floodlights} onChange={handleChange} required>
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </TextField>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Create
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default NewVenue;

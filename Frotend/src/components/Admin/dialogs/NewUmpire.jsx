import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { useCustomMutation } from "../../../hooks/hooks";
import { useNewUmpireMutation } from "../../../redux/api/api";


const NewUmpire = ({ open, onClose }) => {
    const [avatarSrc, setAvatarSrc] = useState(null);
    
    const [umpireData, setUmpireData] = useState({
        fullName: "",
        dob: "",
        country: "",
        role: "",
        experienceYears: "",
        matchesOfficiated: "",
        photo: null,
    });

    const [newUmpire] = useCustomMutation(useNewUmpireMutation, "Creating New Umpire...");

    const roles = ["On-field", "Third Umpire", "Match Referee"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUmpireData({ ...umpireData, [name]: value });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setUmpireData({ ...umpireData, photo: file });
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setAvatarSrc(reader.result);
            };
        }
    };

    const handleSubmit = async () => {
        if (!umpireData.fullName || !umpireData.dob || !umpireData.country || !umpireData.role) {
            alert("Please fill all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", umpireData.fullName);
        formData.append("dob", umpireData.dob);
        formData.append("country", umpireData.country);
        formData.append("role", umpireData.role);
        formData.append("experienceYears", umpireData.experienceYears);
        formData.append("matchesOfficiated", umpireData.matchesOfficiated);
        formData.append("avatar", umpireData.photo);

        await newUmpire(formData);
        onClose(); // Close dialog after submission
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Umpire</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem" }}>
                <TextField label="Full Name" name="fullName" value={umpireData.fullName} onChange={handleChange} required />
                <TextField label="Date of Birth" type="date" name="dob" value={umpireData.dob} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
                <TextField label="Country" name="country" value={umpireData.country} onChange={handleChange} required />
                <TextField select label="Role" name="role" value={umpireData.role} onChange={handleChange} required>
                    {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField label="Experience (Years)" type="number" name="experienceYears" value={umpireData.experienceYears} onChange={handleChange} />
                <TextField label="Matches Officiated" type="number" name="matchesOfficiated" value={umpireData.matchesOfficiated} onChange={handleChange} />
                <Button variant="contained" component="label">
                    Upload Photo
                    <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                </Button>
                {avatarSrc && <img src={avatarSrc} alt="Umpire Avatar" width="100" height="100" />}

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

export default NewUmpire;

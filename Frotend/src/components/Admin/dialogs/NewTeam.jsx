import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useCustomMutation } from "../../../hooks/hooks";
import { useNewTeamMutation } from "../../../redux/api/api";

const NewTeam = ({ open, onClose }) => {
    const [logoSrc, setLogoSrc] = useState(null);
    
    const [teamData, setTeamData] = useState({
        name: "",
        shortName: "",
        coach: "",
        logo: null,
    });

    const [newTeam] = useCustomMutation(useNewTeamMutation, "Creating New Team...");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeamData({ ...teamData, [name]: value });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setTeamData({ ...teamData, logo: file });
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setLogoSrc(reader.result);
            };
        }
    };

    const handleSubmit = async () => {
        if (!teamData.name || !teamData.shortName || !teamData.logo) {
            alert("Please fill all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("name", teamData.name);
        formData.append("shortName", teamData.shortName);
        formData.append("coach", teamData.coach);
        formData.append("avatar", teamData.logo);

        await newTeam(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Team</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem" }}>
                <TextField label="Team Name" name="name" value={teamData.name} onChange={handleChange} required />
                <TextField label="Short Name" name="shortName" value={teamData.shortName} onChange={handleChange} required />
                <TextField label="Coach" name="coach" value={teamData.coach} onChange={handleChange} />
                
                <Button variant="contained" component="label">
                    Upload Logo
                    <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                </Button>
                {logoSrc && <img src={logoSrc} alt="Team Logo" style={{ width: "170px",height:"auto", marginTop: "10px" }} />}

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

export default NewTeam;

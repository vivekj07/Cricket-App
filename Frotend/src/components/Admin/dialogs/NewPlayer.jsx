import {
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    MenuItem,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useCustomMutation } from "../../../hooks/hooks";
import { useNewPlayerMutation } from "../../../redux/api/api";

const NewPlayer = ({ open, onClose }) => {
  const [avatarSrc, setAvatarSrc] = useState(null);
    
  const [playerData, setPlayerData] = useState({
    fullName: "",
    dob: "",
    country: "",
    homeTown: "",
    jersyNo: 0,
    role: "",
    battingStyle: "",
    bowlingStyle: "None",
    isWicketKeeper: false,
    photo: null,
  });

  const [newPlayer]= useCustomMutation(useNewPlayerMutation,"Creating New Player...")

  const roles = ["Batsman", "Bowler", "All-rounder", "Wicketkeeper"];
  const battingStyles = ["Right", "Left"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({ ...playerData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setPlayerData({ ...playerData, isWicketKeeper: e.target.checked });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPlayerData({ ...playerData, photo: file });
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            setAvatarSrc(reader.result); 
        };
    }
};

  const handleSubmit = async () => {
    if (!playerData.fullName || !playerData.dob || !playerData.country) {
      alert("Please fill all required fields.");
      return;
    }

    const formData=new FormData()
    formData.append("fullName",playerData.fullName)
    formData.append("country",playerData.country)
    formData.append("homeTown",playerData.homeTown)
    formData.append("role",playerData.role)
    formData.append("battingStyle",playerData.battingStyle)
    formData.append("bowlingStyle",playerData.bowlingStyle)
    formData.append("avatar",playerData.photo)
    formData.append("dob",playerData.dob)
    formData.append("isWicketKeeper",playerData.isWicketKeeper)
    formData.append("jersyNo",playerData.jersyNo)


    await newPlayer(formData)

    onClose(); // Close dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Player</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem" }}>
        <TextField label="Full Name" name="fullName" value={playerData.fullName} onChange={handleChange} required />
        <TextField label="Date of Birth" type="date" name="dob" value={playerData.dob} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
        <TextField label="Country" name="country" value={playerData.country} onChange={handleChange} required />
        <TextField label="Home Town" name="homeTown" value={playerData.homeTown} onChange={handleChange} required />
        <TextField label="Jersey Number" type="number" name="jersyNo" value={playerData.jersyNo} onChange={handleChange} />
        <TextField select label="Role" name="role" value={playerData.role} onChange={handleChange} required>
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
        <TextField select label="Batting Style" name="battingStyle" value={playerData.battingStyle} onChange={handleChange} required>
          {battingStyles.map((style) => (
            <MenuItem key={style} value={style}>
              {style}
            </MenuItem>
          ))}
        </TextField>
        <TextField label="Bowling Style" name="bowlingStyle" value={playerData.bowlingStyle} onChange={handleChange} />
        <FormControlLabel control={<Checkbox checked={playerData.isWicketKeeper} onChange={handleCheckboxChange} />} label="Is Wicketkeeper?" />
        <Button variant="contained" component="label">
          Upload Photo
          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
        </Button>
        {avatarSrc &&  <img src={avatarSrc}/>}

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

export default NewPlayer;

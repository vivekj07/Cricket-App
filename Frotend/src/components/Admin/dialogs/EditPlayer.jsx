import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useCustomMutation } from "../../../hooks/hooks";
import { useUpdatePlayerMutation } from "../../../redux/api/api";


const EditPlayer = ({ open, onClose, player }) => {
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [playerData, setPlayerData] = useState(player);

  const [updatePlayer] = useCustomMutation(useUpdatePlayerMutation, "Updating Player...");

  useEffect(() => {
    if (player) {
      setPlayerData(player);
      setAvatarSrc(player?.photo?.url || null);
    }
  }, [player]);

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
    // if (!playerData.fullName || !playerData.dob || !playerData.country) {
    //   alert("Please fill all required fields.");
    //   return;
    // }
    

    const formData = new FormData();
    formData.append("fullName", playerData.fullName);
    formData.append("country", playerData.country);
    formData.append("homeTown", playerData.homeTown);
    formData.append("role", playerData.role);
    formData.append("battingStyle", playerData.battingStyle);
    formData.append("bowlingStyle", playerData.bowlingStyle);
    formData.append("avatar", playerData.photo);
    formData.append("dob", playerData.dob);
    formData.append("isWicketKeeper", playerData.isWicketKeeper);
    formData.append("jersyNo", playerData.jersyNo);

    await updatePlayer({ id: player._id, formData });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Player</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem",
        overflow: "auto",
              "&::-webkit-scrollbar": { // Corrected syntax
                display: "none",
              },
              scrollbarWidth: "none", // For Firefox
              msOverflowStyle: "none", // For IE and Edge
       }}>
        <TextField label="Full Name" name="fullName" value={playerData?.fullName} onChange={handleChange} required />
        <TextField label="Date of Birth" type="date" name="dob" value={playerData?.dob} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
        <TextField label="Country" name="country" value={playerData?.country} onChange={handleChange} required />
        <TextField label="Home Town" name="homeTown" value={playerData?.homeTown} onChange={handleChange} required />
        <TextField label="Jersey Number" type="number" name="jersyNo" value={playerData?.jersyNo} onChange={handleChange} />
        <FormControlLabel control={<Checkbox checked={playerData?.isWicketKeeper} onChange={handleCheckboxChange} />} label="Is Wicketkeeper?" />
        <Button variant="contained" component="label">
          Upload Photo
          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
        </Button>
        {avatarSrc && <img src={avatarSrc} alt="Player Avatar" height={"auto"} width={"170px"}/>}

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

export default EditPlayer;

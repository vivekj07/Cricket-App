import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { useCustomMutation } from "../../../hooks/hooks";
import { useUpdateTeamMutation } from "../../../redux/api/api";

const EditTeam = ({ open, onClose, team }) => {
  const [logoSrc, setLogoSrc] = useState(null);
  const [teamData, setTeamData] = useState(team);

  const [updateTeam] = useCustomMutation(useUpdateTeamMutation, "Updating Team...");

  useEffect(() => {
    if (team) {
      setTeamData(team);
      setLogoSrc(team?.logo?.url || null);
    }
  }, [team]);

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
    const formData = new FormData();
    formData.append("name", teamData.name);
    formData.append("shortName", teamData.shortName);
    formData.append("coach", teamData.coach);
    formData.append("logo", teamData.logo);

    await updateTeam({ id: team._id, formData });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Team</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem" }}>
        <TextField label="Team Name" name="name" value={teamData?.name} onChange={handleChange} required />
        <TextField label="Short Name" name="shortName" value={teamData?.shortName} onChange={handleChange} required />
        <TextField label="Coach" name="coach" value={teamData?.coach} onChange={handleChange} />
        <Button variant="contained" component="label">
          Upload Logo
          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
        </Button>
        {logoSrc && <img src={logoSrc} alt="Team Logo" style={{ maxWidth: "100px", marginTop: "10px" }} />}

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

export default EditTeam;

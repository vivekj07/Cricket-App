import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useCustomMutation } from "../../../hooks/hooks";
import { useUpdateUmpireMutation } from "../../../redux/api/api";


const EditUmpire = ({ open, onClose, umpire }) => {
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [umpireData, setUmpireData] = useState(umpire);

  const [updateUmpire] = useCustomMutation(useUpdateUmpireMutation, "Updating Umpire...");

  useEffect(() => {
    if (umpire) {
      setUmpireData(umpire);
      setAvatarSrc(umpire?.photo?.url || null);
    }
  }, [umpire]);

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

  const roles = ["On-field", "Third Umpire", "Match Referee"];
  const statuses = ["Active", "Retired"];

  const handleSubmit = async () => {
    if (!umpireData.fullName || !umpireData.dob || !umpireData.country) {
      alert("Please fill all required fields.");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", umpireData.fullName);
    formData.append("country", umpireData.country);
    formData.append("role", umpireData.role);
    formData.append("experienceYears", umpireData.experienceYears);
    formData.append("matchesOfficiated", umpireData.matchesOfficiated);
    formData.append("avatar", umpireData.photo);
    formData.append("dob", umpireData.dob);
    formData.append("status", umpireData.status);

    await updateUmpire({ id: umpireData._id, formData });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Umpire</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem" }}>
        <TextField label="Full Name" name="fullName" value={umpireData?.fullName} onChange={handleChange} required />
        <TextField label="Date of Birth" type="date" name="dob" value={umpireData?.dob} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
        <TextField label="Country" name="country" value={umpireData?.country} onChange={handleChange} required />
        <TextField select label="Role" name="role" value={umpireData?.role} onChange={handleChange} required>
            {roles.map((role) => (
                <MenuItem key={role} value={role}>
                    {role}
                </MenuItem>
            ))}
        </TextField>
        <TextField select label="Status" name="status" value={umpireData?.status} onChange={handleChange} required>
            {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                    {status}
                </MenuItem>
            ))}
        </TextField>
        <TextField label="Experience (Years)" type="number" name="experienceYears" value={umpireData?.experienceYears} onChange={handleChange} required />
        <TextField label="Matches Officiated" type="number" name="matchesOfficiated" value={umpireData?.matchesOfficiated} onChange={handleChange} required />
        <Button variant="contained" component="label">
          Upload Photo
          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
        </Button>
        {avatarSrc && <img src={avatarSrc} alt="Umpire Avatar" />}

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

export default EditUmpire;

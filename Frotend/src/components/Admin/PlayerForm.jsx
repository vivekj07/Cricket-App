import React, { useState, useEffect } from "react";
import { Button, TextField, Select, MenuItem, Card, CardContent, Typography } from "@mui/material";


const PlayerForm = ({ initialData, onSubmit }) => {
    const [player, setPlayer] = useState(initialData || {});
  
    const handleChange = (e) => {
      setPlayer({ ...player, [e.target.name]: e.target.value });
    };
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">{initialData ? "Edit Player" : "Add Player"}</Typography>
          <TextField name="fullName" label="Full Name" value={player.fullName || ""} onChange={handleChange} fullWidth />
          <TextField name="country" label="Country" value={player.country || ""} onChange={handleChange} fullWidth />
          <Select name="role" value={player.role || ""} onChange={handleChange} fullWidth>
            <MenuItem value="Batsman">Batsman</MenuItem>
            <MenuItem value="Bowler">Bowler</MenuItem>
            <MenuItem value="All-rounder">All-rounder</MenuItem>
            <MenuItem value="Wicketkeeper">Wicketkeeper</MenuItem>
          </Select>
          <Button onClick={() => onSubmit(player)}>Submit</Button>
        </CardContent>
      </Card>
    );
  };
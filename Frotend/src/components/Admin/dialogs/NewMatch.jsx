import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useCustomMutation, useErrors } from "../../../hooks/hooks";
import { useGetAllUmpiresQuery, useGetAllVenuesQuery, useNewMatchMutation } from "../../../redux/api/api";
  
  const NewMatch = ({ open, onClose, leagueId, leagueTeams }) => {

    const [venues,setVenues]= useState([])
    const [umpires,setUmpires]= useState([])

    const initialState={
        date: "",
        startTime: "",
        endTime: "",
        teams: [],
        venue: "",
        umpires: [],
        league:leagueId
    }
    const [matchData, setMatchData] = useState(initialState);
  
    const { data ,isError,error,isLoading} = useGetAllVenuesQuery();
    const { data: umpiresData,isError:umpireIsError, error:umpireError,isLoading:umpireIsLoading } = useGetAllUmpiresQuery();
    const [newMatch] = useCustomMutation(useNewMatchMutation, "Creating New Match...");
  
    useErrors([{isError,error},{isError:umpireIsError, error:umpireError}])

    useEffect(() => {
      if(data){
        setVenues(data.venues)
      }
      if(umpiresData){
        setUmpires(umpiresData.umpires)
      }
    }, [data,umpiresData]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setMatchData({ ...matchData, [name]: value });
    };
  
    const handleSubmit = async () => {
      if (!matchData.date || matchData.teams.length !== 2 || !matchData.venue) {
        alert("Please fill all required fields and select exactly two teams.");
        return;
      }
      await newMatch(matchData);
      setMatchData(initialState)
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Match</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem" }}>
          <TextField type="date" label="Match Date" name="date" InputLabelProps={{ shrink: true }} value={matchData.date} onChange={handleChange} required />
          <TextField type="time" label="Start Time" name="startTime" InputLabelProps={{ shrink: true }} value={matchData.startTime} onChange={handleChange} />
          <TextField type="time" label="End Time" name="endTime" InputLabelProps={{ shrink: true }} value={matchData.endTime} onChange={handleChange} />
  
          <TextField select label="Select Team 1" name="team1" value={matchData.teams[0] || ""} onChange={(e) => setMatchData({ ...matchData, teams: [e.target.value, matchData.teams[1] || ""] })} required>
            {leagueTeams.map((team) => <MenuItem key={team._id} value={team._id}>{team.name}</MenuItem>)}
          </TextField>
  
          <TextField select label="Select Team 2" name="team2" value={matchData.teams[1] || ""} onChange={(e) => setMatchData({ ...matchData, teams: [matchData.teams[0] || "", e.target.value] })} required>
            {leagueTeams.map((team) => <MenuItem key={team._id} value={team._id}>{team.name}</MenuItem>)}
          </TextField>
  
          <TextField select label="Select Venue" name="venue" value={matchData.venue} onChange={handleChange} required>
            {venues?.map((venue) => <MenuItem key={venue._id} value={venue._id}>{venue.name}</MenuItem>)}
          </TextField>
  
          <TextField select label="Select Umpires" name="umpires" value={matchData.umpires} onChange={(e) => setMatchData({ ...matchData, umpires: e.target.value })} SelectProps={{ multiple: true }}>
            {umpires?.map((umpire) => <MenuItem key={umpire._id} value={umpire._id}>{umpire.fullName}</MenuItem>)}
          </TextField>
  
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Create</Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default NewMatch;
  
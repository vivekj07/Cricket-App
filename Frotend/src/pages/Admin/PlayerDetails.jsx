import { Avatar, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/loaders/Loader";
import { useErrors } from "../../hooks/hooks";
import { useGetPlayerDetailsQuery } from "../../redux/api/api";
import { lazy } from "react";

const EditPlayerPerformance= lazy(()=> import("../../components/Admin/dialogs/EditPlayerPerformance"))

const PlayerDetails = () => {
  const { id } = useParams();

  const [player,setPlayer]= useState(null)
  const [playerStat,setPlayerStat]= useState(null)
  const [openDialog,setOpenDialog]= useState(false)
  const { data, isLoading, error,isError } = useGetPlayerDetailsQuery(id);

 useErrors([{isError,error}])

 useEffect(()=>{
    if(data){
        setPlayer(data.player)
    }
 },[data])

 const handlePlayerUpdate=(stat)=>{ 
  setPlayerStat(stat)
  setOpenDialog(true)
 }

  return isLoading ? <Loader /> :(
    <div>
      <Paper elevation={3} 
      sx={{ padding: "2rem 1rem", display:"flex", flexDirection:"column", justifyContent:"center",
        alignItems:"center", gap:"1rem"
       }}>
        <Typography variant="h4" gutterBottom>
          {player?.fullName}
        </Typography>
        <Avatar src={player?.photo?.url} alt={player?.fullName} sx={{ width: 150, height: 150, border:"3px solid rgb(25, 242, 6)" }} />
        <Typography variant="h6">Country: {player?.country}</Typography>
        <Typography variant="h6">Role: {player?.role}</Typography>
        <Typography variant="h6">Jersey No: {player?.jersyNo}</Typography>
        <Typography variant="h6">Batting Style: {player?.battingStyle}</Typography>
        <Typography variant="h6">Bowling Style: {player?.bowlingStyle}</Typography>

        

        <Typography variant="h5" sx={{ marginTop: "1.5rem" }}>
          Batting Stats
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Format</TableCell>
                <TableCell>Matches</TableCell>
                <TableCell>Out</TableCell>
                <TableCell>Runs</TableCell>
                <TableCell>Balls</TableCell>
                <TableCell>Average</TableCell>
                <TableCell>Strike Rate</TableCell>
                <TableCell>6s</TableCell>
                <TableCell>4s</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {player?.performance?.map((stat) => (
                <TableRow key={stat._id}>
                  <TableCell>{stat.leagueType}</TableCell>
                  <TableCell>{stat.matchesPlayed}</TableCell>
                  <TableCell>{stat.noOfTimeDismissed}</TableCell>
                  <TableCell>{stat.runsScored}</TableCell>
                  <TableCell>{stat.noOfBallsFaced}</TableCell>
                  <TableCell>{(stat.runsScored/stat.noOfTimeDismissed).toFixed(2)}</TableCell>
                  <TableCell>{(100*stat.runsScored/stat.noOfBallsFaced).toFixed(2)}</TableCell>
                  <TableCell>{stat.noOf6s}</TableCell>
                  <TableCell>{stat.noOf4s}</TableCell>
                  <TableCell>
                      <Button variant="contained" sx={{ mt: 2 }} onClick={()=>handlePlayerUpdate(stat)}>
                          Update
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h5" sx={{ marginTop: "1.5rem" }}>
          Bowling Stats
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Format</TableCell>
                <TableCell>Matches</TableCell>
                <TableCell>Overs</TableCell>
                <TableCell>Runs</TableCell>
                <TableCell>Wickets</TableCell>
                <TableCell>Average</TableCell>
                <TableCell>Economy</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {player?.performance?.map((stat) => (
                <TableRow key={stat._id}>
                  <TableCell>{stat.leagueType}</TableCell>
                  <TableCell>{stat.matchesPlayed}</TableCell>
                  <TableCell>{(stat.noOfBallsBowled/6).toFixed(0)}</TableCell>
                  <TableCell>{stat.runsGiven}</TableCell>
                  <TableCell>{stat.wicketsTaken}</TableCell>
                  <TableCell>{(stat.runsGiven/stat.matchesPlayed).toFixed(2)}</TableCell>
                  <TableCell>{((stat.runsGiven/stat.noOfBallsBowled*6)).toFixed(2)}</TableCell>
                  <TableCell>
                      <Button variant="contained" sx={{ mt: 2 }} onClick={()=>handlePlayerUpdate(stat)}>
                          Update
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <EditPlayerPerformance open={openDialog} onClose={()=> setOpenDialog(false)} initialData={{...playerStat,playerId:player?._id}}/>
      </Paper>
    </div>
  );
};

export default AdminLayout(PlayerDetails) ;

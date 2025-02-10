import { Avatar, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";


import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hooks";
import { useGetAllPlayersQuery } from "../../redux/api/api";
import { LayoutLoader } from "../Loaders";

const PlayerList = () => {
    const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
 
  const {data,isError,error,isLoading}=useGetAllPlayersQuery()

  useEffect(() => {
    if(data){
        setPlayers(data.players?.map((player)=>({
            ...player,
            id:player._id  
        })))
    }
  }, [data]);

  useErrors([{isError,error}])


  const columns = [
    {
        field: "avatar",
        headerName: "Avatar",
        sortable: false,
        renderCell: (params) => (
            <Avatar alt={params.row.fullName} src={params.row?.photo?.url} />
        ),
    },
    { field: "fullName", headerName: "Name",width:150 },
    { field: "country", headerName: "Country",width:120 },
    { field: "role", headerName: "Role", width:100 },
    { field: "jersyNo", headerName: "JN",width:100 },
    { field: "homeTown", headerName: "Origin", width:150 },
    { field: "battingStyle", headerName: "Batting",width:120 },
    { field: "bowlingStyle", headerName: "Bowling", fwidth:150 },
    { field: "isWicketKeeper", headerName: "Wk", width:100 },
    {
        field: "details",
        headerName: "Details",
        sortable: false,
        width: 120,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => navigate(`/player/${params.row.id}`)}
          >
            View
          </Button>
        ),
      },
  ];

  return (
    <div
    >
      <Paper elevation={3} 
      sx={{ 
        padding: "2rem 1rem", 
      }}>
        
        {
            isLoading ? <LayoutLoader /> :
            <Table rows={players} columns={columns} heading="Players" />
        }
      </Paper>
    </div>
  );
};

export default AppLayout(PlayerList) ;

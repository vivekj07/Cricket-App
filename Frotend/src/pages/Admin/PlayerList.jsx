import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Button, Container, IconButton, Paper } from "@mui/material";
import { lazy, useEffect, useState } from "react";

const EditPlayer= lazy(()=> import("../../components/Admin/dialogs/EditPlayer"))
const NewPlayer= lazy(()=> import("../../components/Admin/dialogs/NewPlayer"))

import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/loaders/Loader";
import Table from "../../components/shared/Table";
import { useCustomMutation, useErrors } from "../../hooks/hooks";
import { useDeletePlayerMutation, useGetAllPlayersQuery } from "../../redux/api/api";

const PlayerList = () => {
    const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const {data,isError,error,isLoading}=useGetAllPlayersQuery()
  const [deletPlayer]= useCustomMutation(useDeletePlayerMutation,"Deleting Player...")

  useEffect(() => {
    if(data){
        setPlayers(data.players?.map((player)=>({
            ...player,
            id:player._id  // keep note ChatGPT This field id is required for MUI DataGrid
        })))
    }
  }, [data]);

  useErrors([{isError,error}])

  const handleEdit = (player) => {
    setSelectedPlayer(player);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this player?");
    if (!confirmDelete) return; // Cancel operation if user clicks "No"

    await deletPlayer(id)
  };

  const columns = [
    {
        field: "avatar",
        headerName: "Avatar",
        sortable: false,
        renderCell: (params) => (
            <Avatar alt={params.row.fullName} src={params.row?.photo?.url} />
        ),
    },
    { field: "fullName", headerName: "Player Name", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "jersyNo", headerName: "JN",width:100 },
    { field: "homeTown", headerName: "Origin", flex: 1 },
    { field: "battingStyle", headerName: "Batting", flex: 1 },
    { field: "bowlingStyle", headerName: "Bowling", flex: 1 },
    { field: "isWicketKeeper", headerName: "Wk", flex: 1 },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleEdit(params.row)}>
          <Edit />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
          <Delete />
        </IconButton>
      ),
    },
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
            onClick={() => navigate(`/admin/player/${params.row.id}`)}
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
        // margin:0,
      }}>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ marginBottom: "1rem" }}>
          Add Player
        </Button>
        {
            isLoading ? <Loader /> :
            <Table rows={players} columns={columns} heading="Player Management" />
        }
      </Paper>


        {/* // These two are Dialogs  */}
      <NewPlayer open={openDialog} onClose={() => setOpenDialog(false)}  />
      <EditPlayer open={editDialogOpen} onClose={() => setEditDialogOpen(false)} player={selectedPlayer} />
    </div>
  );
};

export default AdminLayout(PlayerList) ;

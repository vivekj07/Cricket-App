import { Delete, Edit } from "@mui/icons-material";
import { Button, Container, IconButton, Paper } from "@mui/material";
import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/loaders/Loader";
import Table from "../../components/shared/Table";
import { useDeleteleagueMutation, useGetAllLeaguesQuery } from "../../redux/api/api";
import { useCustomMutation, useErrors } from "../../hooks/hooks";

const EditLeague = lazy(() => import("../../components/Admin/dialogs/EditLeague"));
const NewLeague = lazy(() => import("../../components/Admin/dialogs/NewLeague"));

const LeagueList = () => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data, isError, error, isLoading } = useGetAllLeaguesQuery();
  const [deleteLeague] = useCustomMutation(useDeleteleagueMutation, "Deleting League...");

  useEffect(() => {
    if (data) {
      setLeagues(
        data.leagues?.map((league) => ({
          ...league,
          id: league._id, // Required for MUI DataGrid
        }))
      );
    }
  }, [data]);

  useErrors([{ isError, error }]);

  const handleEdit = (league) => {
    setSelectedLeague(league);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this league?");
    if (!confirmDelete) return;
    await deleteLeague(id);
  };

  const columns = [
    { field: "name", headerName: "League",width: 120},
    { field: "season", headerName: "Season", width: 120 },
    { field: "format", headerName: "Format", width: 120 },
    { field: "startDate", headerName: "Start",
      renderCell: (params) => new Date(params.row.startDate).toLocaleDateString(),
    //   flex: 1 ,
      width: 150 
    },
    { field: "endDate", headerName: "End",
        renderCell: (params) => new Date(params.row.endDate).toLocaleDateString(),
        // flex: 1 ,
        width: 150 
    },
    {
      field: "teams",
      headerName: "Teams",
      renderCell: (params) => params.row.teams?.length || 0,
      width: 120,
    },
    {
      field: "winner",
      headerName: "Winner",
      renderCell: (params) => params.row.winner?.name || "N/A",
      width: 120
    },
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
          onClick={() => navigate(`/admin/league/${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Paper elevation={3} sx={{ padding: "2rem 1rem" }}>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ marginBottom: "1rem" }}>
          Add League
        </Button>
        {isLoading ? <Loader /> : <Table rows={leagues} columns={columns} heading="League Management" />}
      </Paper>

      {/* Dialogs */}
      <NewLeague open={openDialog} onClose={() => setOpenDialog(false)} />
      <EditLeague open={editDialogOpen} onClose={() => setEditDialogOpen(false)} league={selectedLeague} />
    </div>
  );
};

export default AdminLayout(LeagueList);

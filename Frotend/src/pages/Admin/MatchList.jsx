import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Button, Container, IconButton, Paper } from "@mui/material";
import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/loaders/Loader";
import Table from "../../components/shared/Table";
import { useCustomMutation, useErrors } from "../../hooks/hooks";
import { useDeleteMatchMutation, useGetAllMatchesQuery } from "../../redux/api/api";

const EditMatch = lazy(() => import("../../components/Admin/dialogs/EditMatch"));
// const NewMatch = lazy(() => import("../../components/Admin/dialogs/NewMatch"));

const MatchList = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data, isError, error, isLoading } = useGetAllMatchesQuery();
  const [deleteMatch] = useCustomMutation(useDeleteMatchMutation, "Deleting Match...");

  useEffect(() => {
    if (data) {
      setMatches(
        data.matches?.map((match) => ({
          ...match,
          id: match._id, // Required for MUI DataGrid
        }))
      );
    }
  }, [data]);

  useErrors([{ isError, error }]);

  const handleEdit = (match) => {
    setSelectedMatch(match);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this match?");
    if (!confirmDelete) return;
    await deleteMatch(id);
  };

  const columns = [
    { field: "league", headerName: "League", width: 150 ,
        renderCell: (params) => params.row.league.name,
    },
    {
        field: "teams",
        headerName: "Teams",
        width: 120,
        renderCell: (params) => params.row.teams.map((team) => team.shortName).join(" vs "),
    },
    { field: "date", headerName: "Date", width: 150 ,
        renderCell: (params) => new Date(params.row.date).toLocaleDateString(),
    },
    {
        field: "status",
        headerName: "Status",
        width: 120,
    },
    { field: "startTime", headerName: "Start Time", width: 120 },
    { field: "endTime", headerName: "End Time", width: 120 },
    {
      field: "venue",
      headerName: "Venue",
      width: 120,
      renderCell: (params) => params.row.venue?.name || "N/A",
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
          onClick={() => navigate(`/admin/match/${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Paper elevation={3} sx={{ padding: "2rem 1rem" }}>
        {/* <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ marginBottom: "1rem" }}>
          Add Match
        </Button> */}
        {isLoading ? <Loader /> : <Table rows={matches} columns={columns} heading="Match Management" />}
      </Paper>

      {/* Dialogs */}
      {/* <NewMatch open={openDialog} onClose={() => setOpenDialog(false)} /> */}
      <EditMatch open={editDialogOpen} onClose={() => setEditDialogOpen(false)} match={selectedMatch} />
    </div>
  );
};

export default AdminLayout(MatchList);

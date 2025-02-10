import { Delete, Edit } from "@mui/icons-material";
import { Button, Container, IconButton, Paper } from "@mui/material";
import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/loaders/Loader";
import Table from "../../components/shared/Table";
import { useCustomMutation, useErrors } from "../../hooks/hooks";
import { useDeleteVenueMutation, useGetAllVenuesQuery } from "../../redux/api/api";

const EditVenue = lazy(() => import("../../components/Admin/dialogs/EditVenue"));
const NewVenue = lazy(() => import("../../components/Admin/dialogs/NewVenue"));

const VenueList = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data, isError, error, isLoading } = useGetAllVenuesQuery();
  const [deleteVenue] = useCustomMutation(useDeleteVenueMutation, "Deleting Venue...");

  useEffect(() => {
    if (data) {
      setVenues(
        data.venues?.map((venue) => ({
          ...venue,
          id: venue._id, // Required for MUI DataGrid
        }))
      );
    }
  }, [data]);

  useErrors([{ isError, error }]);

  const handleEdit = (venue) => {
    setSelectedVenue(venue);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this venue?");
    if (!confirmDelete) return;
    await deleteVenue(id);
  };

  const columns = [
    { field: "name", headerName: "Venue Name", width: 150 },
    { field: "city", headerName: "City", width: 120 },
    { field: "country", headerName: "Country", width: 120 },
    { field: "capacity", headerName: "Capacity", width: 120 },
    { field: "establishedYear", headerName: "Established", width: 120 },
    {
      field: "homeTeams",
      headerName: "Home Teams",
      renderCell: (params) => params.row.homeTeams?.map(team => team.name).join(", ") || "N/A",
      width: 200,
    },
    { field: "matchesHosted", headerName: "Matches Hosted", width: 150 },
    { field: "pitchType", headerName: "Pitch Type", width: 120 },
    {
      field: "floodlights",
      headerName: "Floodlights",
      renderCell: (params) => (params.row.floodlights ? "Yes" : "No"),
      width: 120,
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
          onClick={() => navigate(`/admin/venue/${params.row.id}`)}
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
          Add Venue
        </Button>
        {isLoading ? <Loader /> : <Table rows={venues} columns={columns} heading="Venue Management" />}
      </Paper>

      {/* Dialogs */}
      <NewVenue open={openDialog} onClose={() => setOpenDialog(false)} />
      <EditVenue open={editDialogOpen} onClose={() => setEditDialogOpen(false)} venue={selectedVenue} />
    </div>
  );
};

export default AdminLayout(VenueList);

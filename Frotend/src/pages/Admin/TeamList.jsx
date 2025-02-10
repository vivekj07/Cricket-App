import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Button, Container, IconButton, Paper } from "@mui/material";
import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/loaders/Loader";
import Table from "../../components/shared/Table";
import { useCustomMutation, useErrors } from "../../hooks/hooks";
import { useDeleteTeamMutation, useGetAllTeamsQuery } from "../../redux/api/api";

const EditTeam = lazy(() => import("../../components/Admin/dialogs/EditTeam"));
const NewTeam = lazy(() => import("../../components/Admin/dialogs/NewTeam"));

const TeamList = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data, isError, error, isLoading } = useGetAllTeamsQuery();
  const [deleteTeam] = useCustomMutation(useDeleteTeamMutation, "Deleting Team...");

  useEffect(() => {
    if (data) {
      setTeams(
        data.teams?.map((team) => ({
          ...team,
          id: team._id, // Required for MUI DataGrid
        }))
      );
    }
  }, [data]);

  useErrors([{ isError, error }]);

  const handleEdit = (team) => {
    setSelectedTeam(team);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this team?");
    if (!confirmDelete) return;
    await deleteTeam(id);
  };

  const columns = [
    {
      field: "logo",
      headerName: "Logo",
      sortable: false,
      renderCell: (params) => <Avatar src={params.row?.logo?.url} alt="team logo"  />,
    },
    { field: "name", headerName: "Team Name", flex: 1 },
    { field: "shortName", headerName: "Short Name", width: 120 },
    {
      field: "captain",
      headerName: "Captain",
      renderCell: (params) => params.value?.fullName || "N/A",
      flex: 1,
    },
    { field: "coach", headerName: "Coach", flex: 1 },
    {
      field: "matchesPlayed",
      headerName: "Matches",
      renderCell: (params) => params.row.performance?.reduce((acc, stat) => acc + stat.matchesPlayed, 0) || 0,
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
          onClick={() => navigate(`/admin/team/${params.row.id}`)}
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
          Add Team
        </Button>
        {isLoading ? <Loader /> : <Table rows={teams} columns={columns} heading="Team Management" />}
      </Paper>

      {/* Dialogs */}
      <NewTeam open={openDialog} onClose={() => setOpenDialog(false)} />
      <EditTeam open={editDialogOpen} onClose={() => setEditDialogOpen(false)} team={selectedTeam} />
    </div>
  );
};

export default AdminLayout(TeamList);

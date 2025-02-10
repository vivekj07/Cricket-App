import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Button, Container, IconButton, Paper } from "@mui/material";
import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/loaders/Loader";
import Table from "../../components/shared/Table";
import { useDeleteUmpireMutation, useGetAllUmpiresQuery } from "../../redux/api/api";
import { useCustomMutation, useErrors } from "../../hooks/hooks";


const EditUmpire = lazy(() => import("../../components/Admin/dialogs/EditUmpire"));
const NewUmpire = lazy(() => import("../../components/Admin/dialogs/NewUmpire"));

const UmpireList = () => {
  const navigate = useNavigate();
  const [umpires, setUmpires] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUmpire, setSelectedUmpire] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data, isError, error, isLoading } = useGetAllUmpiresQuery();
  const [deleteUmpire] = useCustomMutation(useDeleteUmpireMutation, "Deleting Umpire...");

  useEffect(() => {
    if (data) {
      setUmpires(
        data.umpires?.map((umpire) => ({
          ...umpire,
          id: umpire._id, // Required for MUI DataGrid
        }))
      );
    }
  }, [data]);

  useErrors([{ isError, error }]);

  const handleEdit = (umpire) => {
    setSelectedUmpire(umpire);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this umpire?");
    if (!confirmDelete) return;
    await deleteUmpire(id);
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      sortable: false,
      renderCell: (params) => <Avatar alt={params.row.fullName} src={params.row?.photo?.url} />,
    },
    { field: "fullName", headerName: "Umpire Name", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "matchesOfficiated", headerName: "Matches Officiated", flex: 1 },
    { field: "experienceYears", headerName: "Experience (Years)", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
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
          onClick={() => navigate(`/admin/umpire/${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Paper elevation={3} sx={{ padding: "2rem 1rem" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
          sx={{ marginBottom: "1rem" }}
        >
          Add Umpire
        </Button>
        {isLoading ? <Loader /> : <Table rows={umpires} columns={columns} heading="Umpire Management" />}
      </Paper>

      {/* Dialogs */}
      <NewUmpire open={openDialog} onClose={() => setOpenDialog(false)} />
      <EditUmpire open={editDialogOpen} onClose={() => setEditDialogOpen(false)} umpire={selectedUmpire} />
    </div>
  );
};

export default AdminLayout(UmpireList);

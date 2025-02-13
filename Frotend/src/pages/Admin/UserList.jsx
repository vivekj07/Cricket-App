import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Button, IconButton, Paper } from "@mui/material";
import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/loaders/Loader";
import Table from "../../components/shared/Table";
import { useCustomMutation, useErrors } from "../../hooks/hooks";
import { useGetAllusersQuery } from "../../redux/api/api";

// const EditUser = lazy(() => import("../../components/Admin/dialogs/EditUser"));

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data, isError, error, isLoading } = useGetAllusersQuery();
//   const [deleteUser] = useCustomMutation(useDeleteUserMutation, "Deleting User...");

  useEffect(() => {
    if (data) {
      setUsers(data.users?.map((user) => ({
        ...user,
        id: user._id // Required for MUI DataGrid
      })));
    }
  }, [data]);

  useErrors([{ isError, error }]);

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setEditDialogOpen(true);
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (!confirmDelete) return;
//     await deleteUser(id);
//   };

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      sortable: false,
      renderCell: (params) => (
        <Avatar alt={params.row.name} src={params.row?.photo?.url} />
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "isAdmin", headerName: "Admin", flex: 1, renderCell: (params) => (params.row.isAdmin ? "Yes" : "No") },
    // {
    //   field: "edit",
    //   headerName: "Edit",
    //   sortable: false,
    //   width: 100,
    //   renderCell: (params) => (
    //     <IconButton color="primary" onClick={() => handleEdit(params.row)}>
    //       <Edit />
    //     </IconButton>
    //   ),
    // },
    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   sortable: false,
    //   width: 100,
    //   renderCell: (params) => (
    //     <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
    //       <Delete />
    //     </IconButton>
    //   ),
    // },
  ];

  return (
    <div>
      <Paper elevation={3} sx={{ padding: "2rem 1rem" }}>
        {isLoading ? <Loader /> : <Table rows={users} columns={columns} heading="User Management" />}
      </Paper>
      {/* <EditUser open={editDialogOpen} onClose={() => setEditDialogOpen(false)} user={selectedUser} /> */}
    </div>
  );
};

export default AdminLayout(UserList);

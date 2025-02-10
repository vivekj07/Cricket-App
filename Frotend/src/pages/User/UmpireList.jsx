import { Avatar, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import Loader from "../../components/loaders/Loader";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hooks";
import { useGetAllUmpiresQuery } from "../../redux/api/api";

const UmpireList = () => {
  const navigate = useNavigate();
  const [umpires, setUmpires] = useState([]);
  
  const { data, isError, error, isLoading } = useGetAllUmpiresQuery();

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

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      sortable: false,
      renderCell: (params) => <Avatar alt={params.row.fullName} src={params.row?.photo?.url} />,
    },
    { field: "fullName", headerName: "Name", width: 150 },
    { field: "country", headerName: "Country", width: 120 },
    { field: "role", headerName: "Role", width: 120 },
    { field: "matchesOfficiated", headerName: "Matches Officiated", width: 120 },
    { field: "experienceYears", headerName: "Experience (Years)", width: 120},
    { field: "status", headerName: "Status", width: 120 },
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
          onClick={() => navigate(`/umpire/${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Paper elevation={3} sx={{ padding: "2rem 1rem" }}>
        {isLoading ? <Loader /> : <Table rows={umpires} columns={columns} heading="Umpire Management" />}
      </Paper>
    </div>
  );
};

export default AppLayout(UmpireList);

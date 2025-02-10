import { Avatar, Button, Paper } from "@mui/material";
import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import Loader from "../../components/loaders/Loader";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hooks";
import { useGetAllTeamsQuery } from "../../redux/api/api";

const TeamList = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const { data, isError, error, isLoading } = useGetAllTeamsQuery();

  useEffect(() => {
    if (data) {
      setTeams(
        data.teams?.map((team) => ({
          ...team,
          id: team._id, 
        }))
      );
    }
  }, [data]);

  useErrors([{ isError, error }]);

  const columns = [
    {
      field: "logo",
      headerName: "Logo",
      sortable: false,
      renderCell: (params) => <Avatar src={params.row?.logo?.url} alt="team logo"  />,
    },
    { field: "name", headerName: "Team", width: 150 },
    { field: "shortName", headerName: "Name", width: 120 },
    {
      field: "captain",
      headerName: "Captain",
      renderCell: (params) => params.value?.fullName || "N/A",
      width: 120
    },
    { field: "coach", headerName: "Coach", width: 120 },
    {
      field: "matchesPlayed",
      headerName: "Matches",
      renderCell: (params) => params.row.performance?.reduce((acc, stat) => acc + stat.matchesPlayed, 0) || 0,
      width: 120,
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
          onClick={() => navigate(`/team/${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Paper elevation={3} sx={{ padding: "2rem 1rem" }}>
        {isLoading ? <Loader /> : <Table rows={teams} columns={columns} heading="Teams" />}
      </Paper>
    </div>
  );
};

export default AppLayout(TeamList);

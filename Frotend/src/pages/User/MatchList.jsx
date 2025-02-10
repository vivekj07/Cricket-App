import { Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import Loader from "../../components/loaders/Loader";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hooks";
import { useGetAllMatchesQuery } from "../../redux/api/api";

const MatchList = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);

  const { data, isError, error, isLoading } = useGetAllMatchesQuery();

  useEffect(() => {
    if (data) {
      setMatches(
        data.matches?.map((match) => ({
          ...match,
          id: match._id,
        }))
      );
    }
  }, [data]);

  useErrors([{ isError, error }]);

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
    {
      field: "fullname",
      headerName: "FullMatch",
      width: 150,
      renderCell: (params) => params.row.teams.map((team) => team.name).join(" vs "),
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
      field: "details",
      headerName: "Details",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="info"
          size="small"
          onClick={() => navigate(`/match/${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Paper elevation={3} sx={{ padding: "2rem 1rem" }}>
        {isLoading ? <Loader /> : <Table rows={matches} columns={columns} heading="Matches" />}
      </Paper>
    </div>
  );
};

export default AppLayout(MatchList);

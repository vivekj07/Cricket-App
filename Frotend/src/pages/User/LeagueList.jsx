import { Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import Loader from "../../components/loaders/Loader";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hooks";
import { useGetAllLeaguesQuery } from "../../redux/api/api";

const LeagueList = () => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState([]);
 
  const { data, isError, error, isLoading } = useGetAllLeaguesQuery();

  useEffect(() => {
    if (data) {
      setLeagues(
        data.leagues?.map((league) => ({
          ...league,
          id: league._id, 
        }))
      );
    }
  }, [data]);

  useErrors([{ isError, error }]);

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
      width: 150,
    },
    {
      field: "winner",
      headerName: "Winner",
      renderCell: (params) => params.row.winner?.name || "N/A",
      width: 120
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
          onClick={() => navigate(`/league/${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Paper elevation={3} sx={{ padding: "2rem 1rem" }}>
        {isLoading ? <Loader /> : <Table rows={leagues} columns={columns} heading="Leagues" />}
      </Paper>
    </div>
  );
};

export default AppLayout(LeagueList);

import { Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import Loader from "../../components/loaders/Loader";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hooks";
import { useGetAllVenuesQuery } from "../../redux/api/api";

const VenueList = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);

  const { data, isError, error, isLoading } = useGetAllVenuesQuery();

  useEffect(() => {
    if (data) {
      setVenues(
        data.venues?.map((venue) => ({
          ...venue,
          id: venue._id, 
        }))
      );
    }
  }, [data]);

  useErrors([{ isError, error }]);

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
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
      field: "details",
      headerName: "Details",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="info"
          size="small"
          onClick={() => navigate(`/venue/${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Paper elevation={3} sx={{ padding: "2rem 1rem" }}>
        {isLoading ? <Loader /> : <Table rows={venues} columns={columns} heading="Venue Management" />}
      </Paper>
    </div>
  );
};

export default AppLayout(VenueList);

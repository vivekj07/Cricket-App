import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import Loader from "../../components/loaders/Loader";
import { useErrors } from "../../hooks/hooks";
import { useGetVenueQuery } from "../../redux/api/api";

const VenueDetails = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  const { data, isLoading, error, isError } = useGetVenueQuery(id);
  useErrors([{ isError, error }]);

  useEffect(() => {
    if (data) {
      setVenue(data.venue);
    }
  }, [data]);

  return isLoading ? (
    <Loader />
  ) : (
    <div
    style={{
      height:"100%"
    }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "2rem 1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          height:"100%"
        }}
      >
        <Typography variant="h4" gutterBottom>
          {venue?.name}
        </Typography>
        <Typography variant="h6">City: {venue?.city}</Typography>
        <Typography variant="h6">Country: {venue?.country}</Typography>
        <Typography variant="h6">Capacity: {venue?.capacity}</Typography>
        <Typography variant="h6">Established Year: {venue?.establishedYear}</Typography>
        <Typography variant="h6">Pitch Type: {venue?.pitchType}</Typography>
        <Typography variant="h6">Floodlights: {venue?.floodlights ? "Yes" : "No"}</Typography>
        <Typography variant="h6">Matches Hosted: {venue?.matchesHosted}</Typography>

        {/* Home Teams Table */}
        <Typography variant="h5" sx={{ marginTop: "1.5rem" }}>
          Home Teams
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Logo</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Short Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {venue?.homeTeams?.map((team) => (
                <TableRow key={team._id}>
                  <TableCell>
                    <Avatar src={team.logo?.url} alt={team.name} />
                  </TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.shortName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default AppLayout(VenueDetails);

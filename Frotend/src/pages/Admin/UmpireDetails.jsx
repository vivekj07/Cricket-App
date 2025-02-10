import { Avatar, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/loaders/Loader";
import { useErrors } from "../../hooks/hooks";
import { useGetUmpireQuery } from "../../redux/api/api";

const UmpireDetails = () => {
  const { id } = useParams();

  const [umpire, setUmpire] = useState({});

  const { data, isLoading, error, isError } = useGetUmpireQuery(id);

  useErrors([{ isError, error }]);

  useEffect(() => {
    if (data) {
      setUmpire(data.umpire);
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
          {umpire?.fullName}
        </Typography>
        <Avatar src={umpire?.photo?.url} alt={umpire?.fullName} sx={{ width: 100, height: 100 }} />
        <Typography variant="h6">Country: {umpire?.country}</Typography>
        <Typography variant="h6">Role: {umpire?.role}</Typography>
        <Typography variant="h6">Experience: {umpire?.experienceYears} Years</Typography>
        <Typography variant="h6">Status: {umpire?.status}</Typography>

        <Typography variant="h5" sx={{ marginTop: "1.5rem" }}>
          Matches Officiated
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Match ID</TableCell>
                <TableCell>League Type</TableCell>
                <TableCell>Match Date</TableCell>
                <TableCell>Venue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {umpire?.matchesOfficiatedDetails?.map((match) => (
                <TableRow key={match._id}>
                  <TableCell>{match.matchId}</TableCell>
                  <TableCell>{match.leagueType}</TableCell>
                  <TableCell>{new Date(match.matchDate).toLocaleDateString()}</TableCell>
                  <TableCell>{match.venue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default AdminLayout(UmpireDetails);

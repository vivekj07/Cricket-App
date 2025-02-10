import React, { useEffect, useState } from 'react';
import LeagueCard from "../components/specific/LeagueCard";
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { useGetAllLeaguesQuery } from '../redux/api/api';
import { useErrors } from '../hooks/hooks';
import Loader from '../components/loaders/Loader';
import { Container, Grid2 as Grid, Box } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState([]);

  const { data, isError, error, isLoading } = useGetAllLeaguesQuery();

  const handleClick = (id) => {
    navigate(`/league/${id}`);
  };

  useErrors([{ isError, error }]);

  useEffect(() => {
    if (data) {
      setLeagues(data.leagues);
    }
  }, [data]);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {isLoading ? (
          <Loader />
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {leagues.map((league) => (
              <Grid item key={league._id} xs={12} sm={6} md={4} lg={3}>
                <LeagueCard league={league} onclick={handleClick} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Home;
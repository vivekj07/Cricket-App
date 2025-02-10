import React, { useEffect, useState } from 'react'
import MatchCard from '../components/shared/MatchCard'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import { useGetAllMatchesOfLeagueQuery } from '../redux/api/api';
import { useErrors } from '../hooks/hooks';
import Loader from '../components/loaders/Loader';

const League = () => {
  const navigate=useNavigate();
  const params=useParams()


  const [matches,setMatches]= useState([])

  const {data,isError,error,isLoading}= useGetAllMatchesOfLeagueQuery(params.id)

  const handleClick=(id)=>{
      navigate(`/match/${id}`)
  }

  useErrors([{isError,error}])

  useEffect(()=>{
    if(data){
      setMatches(data.updatedMatches)
    }
  })

  return (
    <>
      <Header />

      {
        isLoading ? <Loader /> :
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {matches?.map((match) => (
        <MatchCard key={match._id} match={match} onclick={handleClick}/>
      ))}
    </div>
      }

      
    </>
    
  )
}

export default League
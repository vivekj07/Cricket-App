import React from 'react'
import { Container, Paper } from '@mui/material'
import AppLayout from '../../components/layout/AppLayout'

const Home = () => {
  return (
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
        }}>

          Welcome To Ghgarwadi Premire League
        
      </Paper>
    </div>
  )
}

export default AppLayout(Home)
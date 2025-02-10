import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Container, Paper } from '@mui/material'

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

          Some stats will display here
        
      </Paper>
    </div>
  )
}

export default AdminLayout(Home)
import { Box, Drawer, Grid2 as Grid, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';

import SideBar from '../Admin/SideBar';
import { Close, Menu } from '@mui/icons-material';
import { getSocket } from '../../socket';
import { green, greenBorder } from '../../constants/colors';

const AdminLayout = (WrappedComponent) => {
  return ()=>{
    const socket=getSocket()

    const [isMobile, setIsMobile] = useState(false)
    const [onlineUsers, setOnlineUsers] = useState(0)

    const handleMobile = () => {
      setIsMobile((pre) => (!pre))
    }

    useEffect(()=>{
        socket.on("onlineUsers",(data)=>{
          setOnlineUsers(data)
        })
    
        return ()=>{
          socket.off("onlineUsers")
        }
    },[])

    return (
        
            <Grid container 
            sx={{
              height:"100vh"
            }}>
                {/* this have height 4rem */}
                {/* <Header />  */}

                <Box
                    sx={{
                        position: "fixed",
                        right: "0.5rem",
                        top: "0.5rem",
                        height: "2.5rem",
                        width: "2.5rem",
                        borderRadius: "50%",
                        backgroundColor: "white",
                        border:`3px solid ${greenBorder}`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "black",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
                        zIndex: 1000
                    }}
                >
                        {onlineUsers}
                </Box>

                <Box
                    sx={{
                        display: { xs: "block", md: "none" },
                        position: "fixed",
                        right: "0.5rem",
                        top: "3.5rem",
                        zIndex: 1000
                    }}
                >
                    <IconButton onClick={handleMobile}
                        sx={{
                            backgroundColor: 'black',
                            color: "white",
                        }}
                    >
                        {isMobile ? <Close /> : <Menu />}
                    </IconButton>
                </Box> 

                <Grid item size={{md:2}} 
                sx={{
                  display:{xs:"none",md:"block", overflow:"auto",
                  height:"100vh",
                  overflow:"auto",
                  "&::-webkit-scrollbar": {
                      display: "none",
                  },
                    // Hide scrollbar for Firefox
                    scrollbarWidth: "none",
                  // Hide scrollbar for IE and Edge
                   msOverflowStyle: "none",
                }}}
                >
                    <SideBar />
                </Grid>

                <Grid item size={{xs:12,md:10}}
                sx={{
                  backgroundColor:"rgba(33, 33, 29, 0.1)",
                  overflow:"auto",
                  height:"100vh",
                  padding:{
                    xs:"0 0",
                    md:"0 1rem"
                  },
                  // Hide scrollbar for WebKit browsers (Chrome, Safari)
                  "&::-webkit-scrollbar": {
                      display: "none",
                  },
                    // Hide scrollbar for Firefox
                    scrollbarWidth: "none",
                  // Hide scrollbar for IE and Edge
                   msOverflowStyle: "none",
                }}
                >
                    <WrappedComponent />
                </Grid>

                <Drawer open={isMobile} onClose={handleMobile}
                  PaperProps={{
                    sx: { width: "60vw" , maxWidth:"350px"} // This correctly applies width
                  }}
                >
                    <SideBar />
                </Drawer>

            </Grid>
    )
  }
    
}

export default AdminLayout
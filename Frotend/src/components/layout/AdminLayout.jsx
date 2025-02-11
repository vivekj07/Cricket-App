import { Box, Drawer, Grid2 as Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';

import SideBar from '../Admin/SideBar';
import Header from "./Header";
import { Close, Menu } from '@mui/icons-material';

const AdminLayout = (WrappedComponent) => {
  return ()=>{

    const [isMobile, setIsMobile] = useState(false)

    const handleMobile = () => {
      setIsMobile((pre) => (!pre))
    }

    return (
        
            <Grid container 
            sx={{
              height:"100vh"
            }}>
                {/* this have height 4rem */}
                {/* <Header />  */}

                <Box
                    sx={{
                        display: { xs: "block", md: "none" },
                        position: "fixed",
                        right: "0.5rem",
                        top: "0.5rem",
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
                sx={{display:{xs:"none",md:"block", overflow:"auto",
                  height:"100vh"
                  // backgroundColor:"rgb(191, 233, 240)"
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

                <Drawer open={isMobile} onClose={handleMobile}>
                    <SideBar />
                </Drawer>

            </Grid>
    )
  }
    
}

export default AdminLayout
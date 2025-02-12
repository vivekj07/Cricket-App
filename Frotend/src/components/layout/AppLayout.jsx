import { Box, Drawer, Grid2 as Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';

import UserSideBar from '../layout/UserSideBar';
import Header from "./Header";
import { Close, Menu } from '@mui/icons-material';
import Title from '../shared/Title';
import { orangeBorder } from '../../constants/colors';

const AppLayout = (WrappedComponent) => {
  return ()=>{

    const [isMobile, setIsMobile] = useState(false)

    const handleMobile = () => {
      setIsMobile((pre) => (!pre))
    }

    return (
        <>
        <Title />
        {/* this have height 4rem */}
        <Header /> 

        <Grid container 
            sx={{
              height:"calc(100vh - 4rem)"
            }}>
                
                
                <Grid item size={{md:2}} maxHeight={"100%"}
                sx={{display:{xs:"none",md:"block", overflow:"auto",
                  height:"100vh"
                  // backgroundColor:"rgb(191, 233, 240)"
                }}}
                >
                    <UserSideBar />
                </Grid>

                <Grid item size={{xs:12,md:10}} maxHeight={"100%"}
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

                <Box
                    sx={{
                        display: { xs: "block", md: "none" },
                        position: "fixed",
                        right: "-0.5rem",
                        top: "2.4rem",
                        zIndex:9999
                    }}
                >
                    <IconButton onClick={handleMobile}
                        sx={{
                            backgroundColor: 'white',
                            color: "black",
                            border:`1px solid ${orangeBorder}`
                        }}
                    >
                        {isMobile ? <Close /> : <Menu />}
                    </IconButton>
                </Box> 

                <Drawer open={isMobile} onClose={handleMobile}
                 PaperProps={{
                  sx: { width: "60vw" , maxWidth:"350px"} // This correctly applies width
                }}>
                    <UserSideBar />
                </Drawer>

            </Grid>
        </>
            
    )
  }
    
}

export default AppLayout
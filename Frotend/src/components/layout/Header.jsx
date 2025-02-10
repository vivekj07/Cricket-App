import { Add, AdminPanelSettings, Group, Home, Logout, Menu as MenuIcon, NotificationAdd, PersonPinCircle, Search as SearchIcon } from '@mui/icons-material'
import { AppBar, Avatar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { green ,tomato} from '../../constants/colors'
import { useCustomMutation } from '../../hooks/hooks'
import { useLogOutMutation } from '../../redux/api/api'
import { userExist, userNotExist } from '../../redux/reducers/auth'

// import image from "../../../public/Logo.png"




const Header = () => {
    const {user}= useSelector((state)=>state.auth)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [logOut,res]=useCustomMutation(useLogOutMutation)

    const logoutHandler= async ()=>{
        await logOut()
    }

    useEffect(()=>{
            if(res && res.data){
                dispatch(userNotExist())
            }
    },[dispatch,res])
    
    return (
        <>
            <Box sx={{
                height: '4rem',
                width:"100%",
                overflowX:"hidden",
                overflowY:"visible",
                position:"relative"
                // flexGrow: 1
            }}>
                <AppBar
                    sx={{
                        backgroundColor: green,
                        // position: "relative",
                    }}
                >
                    <Toolbar>

                        <Box
                            sx={{
                                height: "50px",
                                width: "50px",
                                backgroundColor: "rgb(237, 237, 235)",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                // display: { xs: "none", sm: "flex" }
                            }}
                        >
                            <Avatar src={"image"}
                                sx={{
                                    height: '40px',
                                    width: '40px',
                                    // backgroundColor: 'transparent',
                                    // filter: 'brightness(0) invert(1)', // Converts the image to white (you can adjust this to other colors)

                                }}
                            />
                        </Box>

                        <Typography
                            sx={{
                                // display: { xs: "none", sm: "block" },
                                position: "absolute",
                                top: "40px",
                                left: "75px",
                                color: "black",
                                fontSize: "13px"

                            }}
                        >
                            {/* CricPro. */}
                        </Typography>

                       
                        <Box sx={{
                            flexGrow: 1
                        }}></Box>


                        {/* For Profile */}
                        {/* <Box 
                            sx={{
                                display: { xs: "flex", md: "none" },
                                justifyContent:"center",
                                alignItems:"center",
                                position:"absolute",
                                right:"-20px",
                                bottom:"-20px",
                                backgroundColor:tomato,
                                borderRadius:"50%",
                                border:"3px solid rgb(101, 237, 33)",
                                height:"40px",
                                width:"40px",
                            }}
                        >
                            <IconButton  
                            sx={{
                                height:"15px",
                                width:"15px",
                                color:"white"
                            }}
                            >
                                <PersonPinCircle />
                            </IconButton>
                        </Box> */}
                        

                        <Box>
                            {
                                user?.isAdmin && (
                                    <IconBtn
                                    title={"Admin"}
                                    icon={<AdminPanelSettings />}
                                    handler={()=> navigate("/admin")}
                                    />
                                )
                            }
                            

                            <IconBtn
                                title={"Home"}
                                icon={<Home />}
                                handler={()=>navigate("/")}
                            />
                            
                            <IconBtn
                                title={"Logout"}
                                icon={<Logout />}
                                handler={logoutHandler}
                                style={{
                                    mr:"1rem"
                                }}
                            />
                        </Box>

                    </Toolbar>
                </AppBar>
            </Box>

        </>
    )
}

const IconBtn = ({ title, icon, handler, value,style }) => (
    <Tooltip title={title}>
        <IconButton onClick={handler}
            sx={{
                // backgroundColor: 'white',
                ...style,
                color:"rgba(1, 1, 1, 0.82)",
            }}
        >
            {
                value ? <Badge badgeContent={value} color='error'>{icon}</Badge> : <>{icon}</>
            }
        </IconButton >
    </Tooltip>
)

export default Header
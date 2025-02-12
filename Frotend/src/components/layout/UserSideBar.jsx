import { Apps, ControlPointDuplicate, ExitToApp, Info } from '@mui/icons-material';
import {
    Box,
    Stack,
    Typography,
    styled
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <Box width={"100%"} p={"1rem"} height={"100%"}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
            }}
        >
            {/* <Typography variant='h5'>GoReply.</Typography> */}

            {/* <Stack direction={"row"}
                sx={{
                    // backgroundColor: "blue"
                }}
            >
                <Box
                    sx={{
                        height: "70px",
                        width: "70px",
                        backgroundColor: "black",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // display: { xs: "none", sm: "flex" },
                        marginBottom: "2rem",
                        // alignSelf: "center"
                    }}
                >
                    <Avatar src={Logo}
                        sx={{
                            height: '60px',
                            width: '60px',
                            backgroundColor: 'transparent',
                            filter: 'brightness(0) invert(1)', // Converts the image to white (you can adjust this to other colors)

                        }}
                    />


                </Box>
                <Typography variant='h6' fontSize={"1rem"} color={"black"} alignSelf={"self-end"}
                    sx={{
                        position: "absolute",
                        top: "60px",
                        left: "85px"
                    }}
                >GoReply.</Typography>
            </Stack> */}

            <SideBarItem link={"/player"} Icon={ControlPointDuplicate} name={"Player"} />
            <SideBarItem link={"/team"} Icon={ControlPointDuplicate} name={"Team"} />
            <SideBarItem link={"/match"} Icon={ControlPointDuplicate} name={"Match"} />
            <SideBarItem link={"/league"} Icon={ControlPointDuplicate} name={"League"} />
            <SideBarItem link={"/umpire"} Icon={ControlPointDuplicate} name={"Umpire"} />
            <SideBarItem link={"/venue"} Icon={ControlPointDuplicate} name={"Venue"} />
            {/* <SideBarItem link={"/"} Icon={Apps} name={"GoTo App"} /> */}

            

            <LinkComponent to={"/about"}
                sx={{
                    backgroundColor: "rgba(1,1,1,.8)",
                    color: "white",
                    marginTop: "auto"
                }}
            >
                <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                    <Info />

                    <Typography>About US</Typography>
                </Stack>
            </LinkComponent>

            {/* <LinkComponent 
                sx={{
                    backgroundColor: "rgba(1,1,1,.8)",
                    color: "white",
                    // marginTop: "auto"
                }}
            >
                <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                    <ExitToApp />

                    <Typography>Logout</Typography>
                </Stack>
            </LinkComponent> */}

        </Box>
    )
}

const SideBarItem = ({ link, Icon, name }) => (
    <Stack

    >
        <LinkComponent to={link}
            sx={{
                backgroundColor: location.pathname.includes(link) ? "black" : "",
                color: location.pathname.includes(link) ? "white" : "",
                ":hover": {
                    backgroundColor: location.pathname.includes(link) ? "black" : "rgb(228, 230, 227)",
                    color: location.pathname.includes(link) ? "white" : "",
                },

            }}
        >
            <Stack spacing={"1rem"} direction={"row"} alignItems={"center"}>
                <Icon />
                <Typography>{name}</Typography>
            </Stack>
        </LinkComponent>
    </Stack>

)

const LinkComponent = styled(Link)({
    textDecoration: "none",
    padding: "1rem 1rem",
    borderRadius: "1rem",
    cursor: "default",
    color: "black"
})

export default SideBar
import { AdminPanelSettingsOutlined, Apps } from '@mui/icons-material';
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

            <SideBarItem link={"/admin/player"} Icon={AdminPanelSettingsOutlined} name={"Player"} />
            <SideBarItem link={"/admin/team"} Icon={AdminPanelSettingsOutlined} name={"Team"} />
            <SideBarItem link={"/admin/match"} Icon={AdminPanelSettingsOutlined} name={"Match"} />
            <SideBarItem link={"/admin/league"} Icon={AdminPanelSettingsOutlined} name={"League"} />
            <SideBarItem link={"/admin/umpire"} Icon={AdminPanelSettingsOutlined} name={"Umpire"} />
            <SideBarItem link={"/admin/venue"} Icon={AdminPanelSettingsOutlined} name={"Venue"} />
            {/* <SideBarItem link={"/"} Icon={Apps} name={"GoTo App"} /> */}

            

            <LinkComponent to={"/"}
                sx={{
                    backgroundColor: "rgba(1,1,1,.8)",
                    color: "white",
                    marginTop: "auto"
                }}
            >
                <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                    <Apps />

                    <Typography>GoTo App</Typography>
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
    padding: "1rem 2rem",
    borderRadius: "1rem",
    cursor: "default",
    color: "black"
})

export default SideBar
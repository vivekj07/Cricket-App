import { Grid2 as Grid, Box, Skeleton, Stack } from '@mui/material'
import React from 'react'

export const LayoutLoader = () => (
    <>
        <Box
            sx={{
                height: "4rem",
            }}
        >
            <Skeleton height={"3rem"} variant="rectangular" />

        </Box>
        <Grid container spacing={"1rem"} sx={{
            height: "calc(100vh - 4rem)",
        }}>

            <Grid item size={{md:2.5}} maxHeight={"100%"}
                sx={{
                    display:
                    {
                        xs:"none",md:"block", overflow:"auto",
                    }
                }}
            >
                <Skeleton height={"calc(100vh - 4rem)"} variant="rectangular" />
            </Grid>

            <Grid item size={{xs:12,md:9.5}} maxHeight={"100%"}
            >
                <Stack sx={{
                    gap: "1rem"
                }}>
                    <Skeleton height={"5vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />
                    <Skeleton height={"5vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />
                    <Skeleton height={"5vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />
                    <Skeleton height={"5vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />
                    <Skeleton height={"5vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />
                    <Skeleton height={"5vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />
                    

                </Stack>



            </Grid>

            <Grid item md={3}
                sx={{
                    display: {
                        xs: "none", md: "block",

                    }
                }}>
                <Skeleton height={"calc(100vh - 4rem)"} variant="rectangular" />


            </Grid>
        </Grid>


    </>

)
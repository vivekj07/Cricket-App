import { Container, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { DataGrid } from "@mui/x-data-grid"



const Table = ({ rows, columns, heading, rowHeight = 50 }) => {

    return (
        <Container
            sx={{
                height: "100vh",
                backgroundColor: "white",
                // borderRadius: "1rem",
                overflow: "auto"
            }}>
            <Paper
                elevation={0}
                sx={{
                    // margin: "1rem",
                    // padding: "1rem",
                    fontSize: "2rem",
                    textAlign: "center"
                }}>
                {heading} <br></br>
                {/* <Typography variant="caption" >
                    Click on Three Dots For More Options
                </Typography> */}
            </Paper>

            

            <DataGrid
                sx={{
                    height: "80%",
                    border: "none",
                    ".table-header": {
                        backgroundColor: "black",
                        color: "white",

                    },
                    ".cell-wrap": {
                        whiteSpace: "normal !important",
                        overflowWrap: "break-word",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        overflow: "auto"

                    }
                }}
                rows={rows}
                columns={columns}
                rowHeight={rowHeight}
                autoHeight
            // disableColumnMenu
            />

        </Container>
    )
}

export default Table
import { Stack, styled } from "@mui/material";
import { Link } from "react-router-dom";


export const VisuallyHiddenInput = styled("input")({
    position: 'absolute',
    width: '0',
    height: '0',
    padding: 0,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    border: 0,

})

export const LinkComponent = styled(Link)({
    textDecoration: "none",
    color: "black",
    cursor: "default",
    '&:hover': {
        backgroundColor: 'rgba(230, 228, 227)',

    },

})

export const SearchInput = styled("input")({
    height: "100%",
    padding: "1rem",
    border: "none",
    outline: "none",
    backgroundColor: "lightgray",
    borderRadius: "1.5rem"

})

// export const CurveButton = styled("button")({
//     height: "100%",
//     padding: "1rem",
//     border: "none",
//     outline: "none",
//     backgroundColor: "black",
//     color: "white",
//     borderRadius: "1.5rem",
// })

// export const StyledStack = styled(Stack)({
//     height: '100%',
//     display: { xs: 'none', sm: 'block' },
//     backgroundColor: "blue",
//     overflow: 'auto',
//     '&::-webkit-scrollbar': {
//         display: "none",
//     },

//     '&::-webkit-scrollbar': {
//         width: '4px',
//     },
//     '&::-webkit-scrollbar-thumb': {
//         backgroundColor: 'red',
//         borderRadius: '10px',
//     },
//     '&::-webkit-scrollbar-thumb:hover': {
//         backgroundColor: 'blue',
//     },
//     '&::-webkit-scrollbar-track': {
//         backgroundColor: 'yellow',
//     },
//     'scrollbar-width': 'thin', // For Firefox
//     'scrollbar-color': 'red', // For Firefox
// });
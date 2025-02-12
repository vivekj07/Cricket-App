import { useEffect, useState } from "react";
import { Box, Typography, Card,Grid2 as Grid, CardContent, IconButton, Button, CircularProgress } from "@mui/material";
import { Delete, CloudUpload } from "@mui/icons-material";
import AppLayout from "../../components/layout/AppLayout";
import { useGetAllFilesQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hooks";

const Home = () => {
  const [files, setFiles] = useState([]);

  const { data, isError, error, isLoading } = useGetAllFilesQuery();

  useEffect(() => {
    if (data) {
      setFiles(data.files);
    }
  }, [data]);

  useErrors([{ isError, error }]);

  
  return (
    <Box sx={{ backgroundColor: "white", height: "100%"  }}>

      {/* Loading State */}
      {isLoading ? (
        <Box textAlign="center">
          <CircularProgress size={60} thickness={4} sx={{ color: "primary.main" }} />
        </Box>
      ) : files.length === 0 ? (
        <Typography textAlign="center" color="textSecondary" variant="h6">
          No files available.
        </Typography>
      ) : (
        <Grid container 
            sx={{
              display: "flex",  
              justifyContent: "center",
              alignItems: "center",
            }}
        >
          {files.map(({ file: { url, public_id },description }) => (
            <Grid key={public_id} size={{ 
                xs:12, sm:6, md:4 
            }}
            sx={{
              display: "flex",  
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "0 !important",
              // border: "1px solid black",
            }}
            >
              <a
              href={url}
              target='_blanck'
              download
              style={{
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "bold",
              }}>
              <Card elevation={0} 
                sx={{
                  height: "auto",
                  // borderRadius: 2,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                    // padding: "10px", // Force remove padding
                  },
                }}
              >
                <CardContent   sx={{
                  padding: "10px !important", // Force remove padding
                "&:last-child": { paddingBottom: "0px !important" }, // Remove extra bottom padding
                }}>
                  {url.includes("/image/") ? (
                    <img
                      src={url}
                      alt="Uploaded file"
                      style={{
                        width: "100%",
                        height: "auto",
                        // borderRadius: 5,
                        objectFit: "contain",
                        margin:0,
                        padding:0
                      }}
                    />
                  ) : (
                    <video
                      controls
                      style={{
                        width: "100%",
                        height: "auto",
                        // borderRadius: 5,
                      }}
                    >
                      <source src={url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </CardContent>
                <Typography textAlign="center" color="textSecondary" variant="body2" sx={{ px: 1, pb: 1 }}>
                {description || ""}
              </Typography>
              </Card>
              </a>
              
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AppLayout(Home);
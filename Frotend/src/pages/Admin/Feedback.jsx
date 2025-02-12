import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, IconButton, CircularProgress, Tooltip, Avatar } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDeleteContactUSDataMutation, useGetAllContactUSQuery } from "../../redux/api/api";
import { useCustomMutation, useErrors } from "../../hooks/hooks";
import AdminLayout from "../../components/layout/AdminLayout";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const { data, isError, error, isLoading } = useGetAllContactUSQuery();

  const [deleteFeedback] = useCustomMutation(useDeleteContactUSDataMutation, "Deleting Feedback...");

  useErrors([{ isError, error }]);

  useEffect(() => {
    if (data) {
      setFeedbacks(data.feedbacks);
    }
  }, [data]);

  const handleDelete = async (id) => {
    await deleteFeedback(id);
  };

  return (
    <div
        style={{
            backgroundColor:"white",
            height:"100%"
        }}
    >
        <Box sx={{ maxWidth: 800, p: 3, display: "flex", flexDirection: "column", gap: 3}}>    
      {/* <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4} >
        User Feedbacks
      </Typography> */}

      {isLoading ? (
        <Box textAlign="center">
          <CircularProgress size={60} thickness={4} sx={{ color: "primary.main" }} />
        </Box>
      ) : feedbacks.length === 0 ? (
        <Typography textAlign="center" color="textSecondary" variant="h6">
          No feedbacks available.
        </Typography>
      ) : (
        feedbacks.map(({ _id, name, email, message, createdAt }) => (
          <Card
            key={_id}
            sx={{
              mb: 3,
              position: "relative",
              boxShadow: 3,
              borderRadius: 2,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                  {name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {email}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" mt={1} sx={{ color: "text.primary" }}>
                {message}
              </Typography>
              <Typography variant="caption" color="textSecondary" display="block" mt={2}>
                {new Date(createdAt).toLocaleString()}
              </Typography>

              <Tooltip title="Delete Feedback" arrow>
                <IconButton
                  onClick={() => handleDelete(_id)}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: "error.main",
                    "&:hover": {
                      backgroundColor: "error.light",
                    },
                  }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
    </div>
  );
};

export default AdminLayout(FeedbackPage);
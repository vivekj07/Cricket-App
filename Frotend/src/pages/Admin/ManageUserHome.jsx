import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Grid2 as Grid,
  CardContent,
  IconButton,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Delete, CloudUpload, Close } from "@mui/icons-material";
import { useDeleteFileMutation, useGetAllFilesQuery, useNewFilesUploadMutation } from "../../redux/api/api";
import { useCustomMutation, useErrors } from "../../hooks/hooks";
import AdminLayout from "../../components/layout/AdminLayout";

const ManageUserHome = () => {
  const [files, setFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState("");

  const { data, isError, error, isLoading } = useGetAllFilesQuery();
  const [deleteFile] = useCustomMutation(useDeleteFileMutation, "Deleting File...");
  const [uploadFile] = useCustomMutation(useNewFilesUploadMutation, "Uploading New Files...");

  useEffect(() => {
    if (data) {
      setFiles(data.files);
    }
  }, [data]);

  useErrors([{ isError, error }]);

  const handleDelete = async (publicId) => {
    await deleteFile({ publicId });
  };

  const handleFileSelect = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    formData.append("description", description); // Append description

    await uploadFile(formData);
    setOpenDialog(false);
    setSelectedFiles([]);
    setDescription("");
  };

  return (
    <Box sx={{ backgroundColor: "white", p: 3, height: "100%" }}>
      {/* Upload Button */}
      <Box textAlign="center" mb={4}>
        <Button
          variant="contained"
          startIcon={<CloudUpload />}
          sx={{ backgroundColor: "primary.main", "&:hover": { backgroundColor: "primary.dark" } }}
          onClick={() => setOpenDialog(true)}
        >
          Upload File
        </Button>
        <br />
        <Typography textAlign="center" color="textSecondary" variant="caption">
          Keep 6 OR multiple of 6 files for better UI experience.
        </Typography>
      </Box>

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
        <Grid container spacing={1}>
          {files.map(({ file: { url, public_id }, description }) => (
            <Grid key={public_id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                }}
              >
                <CardContent sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {url.includes("/image/") ? (
                    <img
                      src={url}
                      alt="Uploaded file"
                      style={{ width: "100%", height: "auto", borderRadius: 5, objectFit: "cover" }}
                    />
                  ) : (
                    <video controls style={{ width: "100%", height: "auto", borderRadius: 5 }}>
                      <source src={url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </CardContent>

                {/* Description */}
                <Typography textAlign="center" color="textSecondary" variant="body2" sx={{ px: 1, pb: 1 }}>
                  {description || "No description"}
                </Typography>

                {/* Delete Button */}
                <Box textAlign="right" p={1}>
                  <IconButton
                    onClick={() => handleDelete(public_id)}
                    sx={{ color: "error.main", "&:hover": { backgroundColor: "error.light" } }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Upload Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
  <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0', pb: 2 }}>
    Upload File
    <IconButton onClick={() => setOpenDialog(false)} sx={{ color: 'text.secondary' }}>
      <Close />
    </IconButton>
  </DialogTitle>
  <DialogContent dividers sx={{ pt: 3, pb: 3 }}>
    <Box display="flex" flexDirection="column" gap={3}>
      <Box
        sx={{
          border: '2px dashed #e0e0e0',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          backgroundColor: '#fafafa',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUpload />}
            sx={{ textTransform: 'none' }}
          >
            Choose Files
          </Button>
        </label>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Drag and drop files here or click to upload
        </Typography>
      </Box>
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mt: 2 }}
      />
    </Box>
  </DialogContent>
  <DialogActions sx={{ p: 3, borderTop: '1px solid #e0e0e0' }}>
    <Button onClick={() => setOpenDialog(false)} color="secondary" sx={{ textTransform: 'none' }}>
      Cancel
    </Button>
    <Button
      onClick={handleUpload}
      variant="contained"
      color="primary"
      sx={{ textTransform: 'none' }}
    >
      Upload
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default AdminLayout(ManageUserHome);

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useRequest } from "ahooks";
import { ExhibitsAPI } from "../../api/exhibitsAPI";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreatePostForm: React.FC = () => {
  const theme = useTheme();
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { run: submitForm, loading, error } = useRequest(
    async () => {
        const formData = new FormData();
        formData.append('description', description);
        if (image) formData.append('image', image);

        return await ExhibitsAPI.createExhibit(formData);
    },
    {
      manual: true,
      onSuccess: () => {
        console.log("Post created successfully");
        setDescription("");
        setImage(null);
        setImagePreview(null);
      },
      onError: (err: any) => {
        console.log("Failed to create a new post", err);
      },
    },
  );

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (description.trim() && image) {
      submitForm();
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <Card
        sx={{ maxWidth: 600, width: "100%", boxShadow: 3, borderRadius: 2 }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Create New Post
          </Typography>

          <TextField
            label="Post Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
            sx={{
              marginBottom: 2,
              "& .MuiInputBase-root": {
                borderRadius: "10px",
              },
            }}
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={handleImageChange}
              multiple
            />
          </Button>

          {imagePreview && (
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  borderRadius: "10px",
                  boxShadow: theme.shadows[2],
                }}
              />
            </Box>
          )}

          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              Failed to create a post
            </Typography>
          )}
        </CardContent>

        <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={!description.trim() || !image || loading}
            sx={{
              padding: "10px 20px",
              fontWeight: "bold",
              borderRadius: "12px",
              boxShadow: 3,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Post"}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CreatePostForm;

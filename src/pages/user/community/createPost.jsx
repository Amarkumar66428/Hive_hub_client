import React, { useState } from "react";
import { Modal } from "antd";
import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  Chip,
  IconButton,
  Button,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";
import communityService from "../../../services/community";

const CreatePostModal = ({ createPostModal, setCreatePostModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
    tagInput: "",
    media: null,
    mediaPreview: null,
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && formData.tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(formData.tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, prev.tagInput.trim()],
          tagInput: "",
        }));
      } else {
        setFormData((prev) => ({ ...prev, tagInput: "" }));
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        media: file,
        mediaPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleRemoveMedia = () => {
    setFormData((prev) => ({
      ...prev,
      media: null,
      mediaPreview: null,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { title, content, tags, media } = formData;
      const form = new FormData();
      form.append("title", title);
      form.append("content", content);

      tags.forEach((tag) => {
        form.append("tags[]", tag); // or just "tags" if backend expects that
      });

      if (media) {
        form.append("media", media);
      }

      const postData = form;
      const response = await communityService.createPost(postData);
      if (response) {
        setCreatePostModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      open={createPostModal}
      onCancel={() => setCreatePostModal(false)}
      footer={null}
      centered
      width={"60%"}
    >
      {/* Header */}
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "primary.main" }}>U</Avatar>
        <Typography variant="h6" fontWeight={600}>
          Create Post
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Content */}
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {/* Left Side - Form */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              variant="outlined"
              placeholder="Give your post a title"
              value={formData.title}
              onChange={handleChange("title")}
              fullWidth
            />

            <TextField
              label="Content"
              placeholder="What’s on your mind?"
              multiline
              minRows={5}
              variant="outlined"
              value={formData.content}
              onChange={handleChange("content")}
              fullWidth
            />

            <Box>
              <TextField
                label="Tags"
                placeholder="Press Enter to add tag"
                variant="outlined"
                value={formData.tagInput}
                onChange={handleChange("tagInput")}
                onKeyDown={handleAddTag}
                fullWidth
              />
              <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>

        {/* Right Side - Media Upload */}
        <Grid
          item
          size={{ xs: 12, md: 5 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {formData.mediaPreview ? (
            <Box
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 250,
                width: "100%",
              }}
            >
              <img
                src={formData.mediaPreview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ) : (
            <>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<PhotoCamera />}
                onClick={() => document.getElementById("media-input").click()}
                sx={{
                  height: 250,
                  borderRadius: 2,
                  borderStyle: "dashed",
                  textTransform: "none",
                }}
              >
                Click to Upload Image or Video
              </Button>
              <input
                id="media-input"
                type="file"
                accept="image/*,video/*"
                hidden
                onChange={handleMediaChange}
              />
            </>
          )}
          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{ borderTop: "1px solid #ccc" }}
          >
            {formData.mediaPreview && (
              <Button
                variant="text"
                onClick={handleRemoveMedia}
                sx={{
                  py: 0,
                  ml: "auto",
                  color: "error.main",
                  backgroundColor: "#fff",
                  "&:hover": { backgroundColor: "#eee" },
                }}
              >
                Remove
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Footer Buttons */}
      <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
        <Button
          onClick={() => setCreatePostModal(false)}
          variant="outlined"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!formData.content.trim() && !formData.media}
        >
          Post
        </Button>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;

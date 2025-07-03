import React, { useCallback, useEffect, useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton,
} from "@mui/material";
import { Close, PhotoCamera } from "@mui/icons-material";
import communityService from "../../../services/community";
import { useSnackbar } from "../../../features/snackBar";
import adminPlansServices from "../../../services/adminPlansServices";

const CreatePostModal = ({ createPostModal, setCreatePostModal, fetchPosts }) => {
  const { showSnackbar } = useSnackbar();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
    tagInput: "",
    media: null,
    mediaPreview: null,
    visibleToPlans: "",
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
      console.log('formData: ', formData);
      setLoading(true);
      const { title, content, tags, media, visibleToPlans } = formData;
      if (!title && !media) {
        showSnackbar("Title or Media is required", "error");
        return;
      }
      const form = new FormData();
      form.append("title", title);
      form.append("content", content);
      form.append("visibleToPlans", visibleToPlans);

      tags.forEach((tag) => {
        form.append("tags[]", tag); // or just "tags" if backend expects that
      });

      if (media) {
        form.append("media", media);
      }

      const postData = form;
      const response = await communityService.createAdminPost(postData);
      if (response) {
        showSnackbar("Post created successfully", "success");
        setCreatePostModal(false);
        setFormData({
          title: "",
          content: "",
          tags: [],
          tagInput: "",
          media: null,
          mediaPreview: null,
          visibleToPlans: "",
        });
        fetchPosts(1, false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminPlansServices.getAdminPlans();
      setPlans(response?.plans || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return (
    <Modal
      open={createPostModal}
      onCancel={() => setCreatePostModal(false)}
      footer={null}
      centered
      width={"50%"}
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
        <Grid size={{ xs: 12, md: 6 }}>
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
            <FormControl fullWidth>
              <InputLabel id="select-plan-label">Select Plan</InputLabel>
              {loading ? (
                <Skeleton variant="rectangular" height={56} />
              ) : (
                <Select
                  labelId="select-plan-label"
                  id="select-plan"
                  value={formData.visibleToPlans}
                  label="Select Plan"
                  onChange={handleChange("visibleToPlans")}
                  disabled={loading}
                  variant="outlined"
                >
                  {plans.map((plan) => (
                    <MenuItem key={plan._id} value={plan._id}>
                      {plan.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </Stack>
        </Grid>

        {/* Right Side - Media Upload */}
        <Grid
          item
          size={{ xs: 12, md: 6 }}
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
                height: "100%",
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
              <IconButton
                variant="text"
                onClick={handleRemoveMedia}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  margin: 0.5,
                  p: 0,
                  color: "error.main",
                  zIndex: 1,
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <Close />
              </IconButton>
            </Box>
          ) : (
            <>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<PhotoCamera />}
                onClick={() => document.getElementById("media-input").click()}
                sx={{
                  height: "100%",
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
          loading={loading}
        >
          Post
        </Button>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;

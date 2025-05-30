import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Chip,
  Stack,
  Paper,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Templates2 from "../../templates/templates2";
import Template from "../../templates/templates1";
import Templates3 from "../../templates/templates3";
const initialItem = {
  title: "",
  description: "",
  price: "",
  sku: "",
  category: "",
  tags: [],
  image: null,
};

const templateComponents = {
  1: Template,
  2: Templates2,
  3: Templates3,
};

const CreateStore = ({ previousStep, selectedTemplate }) => {
  const [storeTitle, setStoreTitle] = useState("");
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(initialItem);
  const [tagInput, setTagInput] = useState("");

  const Component = templateComponents[selectedTemplate.id];

  // Handle item input change
  const handleItemChange = (field, value) => {
    setCurrentItem((prev) => ({ ...prev, [field]: value }));
  };

  // Handle adding tag on Enter or comma
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !currentItem.tags.includes(newTag)) {
        setCurrentItem((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
      }
      setTagInput("");
    }
  };

  // Remove tag
  const handleDeleteTag = (tagToDelete) => {
    setCurrentItem((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleItemChange("image", file);
  };

  // Add item to items list and reset current item
  const handleAddItem = () => {
    // Simple validation: title and price required
    if (!currentItem.title.trim() || !currentItem.price.trim()) {
      alert("Please provide item title and price.");
      return;
    }
    setItems((prev) => [...prev, currentItem]);
    setCurrentItem(initialItem);
    setTagInput("");
  };

  return (
    <Box display="flex" flexDirection="row" height="100vh">
      {/* Tools Panel (4/12) */}
      <Box sx={{ width: "20%" }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Button
            variant="text"
            onClick={previousStep}
            startIcon={<ArrowBack />}
            sx={{ textTransform: "none", textDecoration: "underline" }}
          >
            Back
          </Button>
          <Typography variant="h6" color="primary" gutterBottom>
            Store Tools
          </Typography>

          {/* Store Title */}
          <TextField
            label="Store Title"
            variant="outlined"
            fullWidth
            value={storeTitle}
            onChange={(e) => setStoreTitle(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* Add Item Form */}
          <Typography variant="subtitle1" color="secondary" gutterBottom>
            Add Item
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={currentItem.title}
              onChange={(e) => handleItemChange("title", e.target.value)}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              minRows={2}
              value={currentItem.description}
              onChange={(e) => handleItemChange("description", e.target.value)}
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              type="number"
              value={currentItem.price}
              onChange={(e) => handleItemChange("price", e.target.value)}
            />
            <TextField
              label="SKU"
              variant="outlined"
              fullWidth
              value={currentItem.sku}
              onChange={(e) => handleItemChange("sku", e.target.value)}
            />
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              value={currentItem.category}
              onChange={(e) => handleItemChange("category", e.target.value)}
            />

            {/* Tags input */}
            <TextField
              label="Add Tags (press Enter or comma)"
              variant="outlined"
              fullWidth
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
            {/* Display tags */}
            <Box>
              {currentItem.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  color="primary"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>

            {/* Image Upload */}
            <Button variant="outlined" component="label" color="secondary">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {currentItem.image && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {currentItem.image.name}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddItem}
              sx={{ mt: 2 }}
            >
              Add Item
            </Button>
          </Stack>
        </Paper>
      </Box>

      {/* Preview Panel (8/12) */}
      <Box sx={{ height: "100%", overflow: "auto", width: "80%" }}>
        {Component ? <Component /> : null}
      </Box>
    </Box>
  );
};

export default CreateStore;

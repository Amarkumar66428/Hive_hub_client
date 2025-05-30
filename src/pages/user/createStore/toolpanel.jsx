import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { addItem, createStore } from "../../../services/stroeService";

const ProjectConfigForm = ({
  projectConfig,
  setProjectConfig,
  isAddItemEnabled,
}) => {
  const handleChange = (field, value) => {
    setProjectConfig((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={projectConfig.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        minRows={2}
        value={projectConfig.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <TextField
        label="Subdomain"
        variant="outlined"
        fullWidth
        value={projectConfig.subdomain}
        onChange={(e) => handleChange("subdomain", e.target.value)}
      />

      <Button variant="outlined" component="label" color="secondary">
        Upload Logo
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            if (e.target.files[0]) {
              handleChange("logo", e.target.files[0]);
            }
          }}
        />
      </Button>
      {projectConfig.logo && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Selected: {projectConfig.logo.name}
        </Typography>
      )}

      <Typography
        variant="caption"
        color={isAddItemEnabled ? "success.main" : "error.main"}
        sx={{ mt: 1 }}
      >
        {isAddItemEnabled
          ? "Project config looks good! You can add items now."
          : "Please fill all project config fields to add items."}
      </Typography>
    </Stack>
  );
};

const AddItemForm = ({
  currentItem,
  handleItemChange,
  tagInput,
  setTagInput,
  handleTagKeyDown,
  handleDeleteTag,
  handleImageChange,
  handleAddItem,
}) => {
  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
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

      <TextField
        label="Add Tags (press Enter or comma)"
        variant="outlined"
        fullWidth
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleTagKeyDown}
      />

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
        fullWidth
      >
        Add Item
      </Button>
    </Stack>
  );
};

const ToolsPanel = ({
  previousStep,
  projectConfig,
  setProjectConfig,
  items,
  setItems,
  currentItem,
  setCurrentItem,
  tagInput,
  setTagInput,
}) => {
  const [expanded, setExpanded] = React.useState("projectConfig");
  const [publishing, setPublishing] = React.useState(false);

  const isProjectConfigValid =
    projectConfig.name.trim() &&
    projectConfig.description.trim() &&
    projectConfig.subdomain.trim() &&
    projectConfig.logo;

  const isPublishEnabled = isProjectConfigValid && items.length > 0;

  const handleItemChange = (field, value) => {
    setCurrentItem((prev) => ({ ...prev, [field]: value }));
  };

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

  const handleDeleteTag = (tagToDelete) => {
    setCurrentItem((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleItemChange("image", file);
  };

  const handleAddItem = () => {
    if (!currentItem.title.trim() || !currentItem.price.trim()) {
      alert("Please provide item title and price.");
      return;
    }
    setItems((prev) => [...prev, currentItem]);
    setCurrentItem({
      title: "",
      description: "",
      price: "",
      sku: "",
      category: "",
      tags: [],
      image: null,
    });
    setTagInput("");
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    if (panel === "addItem" && !isProjectConfigValid) return;
    setExpanded(isExpanded ? panel : false);
  };

  // Publish API call function
  const handlePublish = async () => {
    if (!isPublishEnabled) {
      alert(
        "Please complete project config and add at least one item before publishing."
      );
      return;
    }

    setPublishing(true);

    try {
      // 1. Call createStore with projectConfig including logo file as FormData
      const storeResponse = await createStore(projectConfig);
      // Assume createStore returns success or throws error if fails
      if (!storeResponse) {
        throw new Error("Store creation failed");
      }

      // 2. Call addItem with items array including image files
      const productResponse = await addItem(items);
      if (!productResponse) {
        throw new Error("Adding items failed");
      }

      alert("Project published successfully!");
    } catch (error) {
      console.error("Publish error:", error);
      alert(`Publish failed: ${error.message}`);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <Box
      sx={{
        width: "20%",
        px: 2,
        backgroundColor: "white",
        borderRight: "1px solid #e0e0e0",
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        variant="text"
        onClick={previousStep}
        startIcon={<ArrowBack />}
        sx={{ textTransform: "none", textDecoration: "underline", mb: 1 }}
      >
        Back
      </Button>

      <Box sx={{ flexGrow: 1 }}>
        <Accordion
          expanded={expanded === "projectConfig"}
          onChange={handleAccordionChange("projectConfig")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" color="primary">
              Project Configuration
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProjectConfigForm
              projectConfig={projectConfig}
              setProjectConfig={setProjectConfig}
              isAddItemEnabled={isProjectConfigValid}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "addItem"}
          onChange={handleAccordionChange("addItem")}
          disabled={!isProjectConfigValid}
          sx={{
            "&.Mui-disabled": {
              opacity: 0.6,
              pointerEvents: "auto",
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="h6"
              color={isProjectConfigValid ? "primary" : "text.disabled"}
            >
              Add Item
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddItemForm
              currentItem={currentItem}
              handleItemChange={handleItemChange}
              tagInput={tagInput}
              setTagInput={setTagInput}
              handleTagKeyDown={handleTagKeyDown}
              handleDeleteTag={handleDeleteTag}
              handleImageChange={handleImageChange}
              handleAddItem={handleAddItem}
            />
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box
        sx={{
          mt: 2,
          py: 1,
          borderTop: "1px solid #ddd",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={handlePublish}
          disabled={!isPublishEnabled || publishing}
          fullWidth
          startIcon={publishing && <CircularProgress size={20} />}
        >
          {publishing ? "Publishing..." : "Publish"}
        </Button>
      </Box>
    </Box>
  );
};

export default ToolsPanel;

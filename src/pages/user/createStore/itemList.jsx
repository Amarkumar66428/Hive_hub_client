import React, { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ItemList = ({ items, setItems }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Open edit modal and load selected item data
  const handleEditOpen = (index) => {
    setEditIndex(index);
    setEditData(items[index]);
    if (items[index].images instanceof File) {
      setImagePreview(URL.createObjectURL(items[index].images));
    } else {
      setImagePreview(items[index].images || null);
    }
    setEditOpen(true);
  };

  // Close edit modal and cleanup
  const handleEditClose = () => {
    setEditOpen(false);
    setEditData(null);
    setEditIndex(null);
    if (imagePreview && editData?.images instanceof File) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
  };

  // Handle form input changes in modal
  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
    if (field === "images" && value instanceof File) {
      if (imagePreview && editData?.images instanceof File) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(value));
    }
  };

  // Save changes to item list
  const handleSave = () => {
    if (editIndex === null || !editData) return;
    setItems((prev) =>
      prev.map((item, i) => (i === editIndex ? editData : item))
    );
    handleEditClose();
  };

  // Delete item
  const handleDelete = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ p: 2 }}>
      <TableContainer component={Paper} sx={{ maxHeight: "80vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No items added yet.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={item.sku || index}>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={
                        item.images instanceof File
                          ? URL.createObjectURL(item.images)
                          : item.images || ""
                      }
                      alt={item.title}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{item.title || "Untitled"}</TableCell>
                  <TableCell>{item.category || "N/A"}</TableCell>
                  <TableCell>{item.price ? `₹${item.price}` : "N/A"}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditOpen(index)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent dividers>
          {editData && (
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 1,
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Title"
                value={editData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                fullWidth
              />
              <TextField
                label="Description"
                multiline
                minRows={3}
                value={editData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Price"
                type="number"
                value={editData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                fullWidth
              />
              <TextField
                label="SKU"
                value={editData.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={editData.category}
                  label="Category"
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                >
                  <MenuItem value="shop">Shop</MenuItem>
                  <MenuItem value="services">Services</MenuItem>
                </Select>
              </FormControl>

              <Box>
                <InputLabel>Image</InputLabel>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files[0] &&
                    handleInputChange("images", e.target.files[0])
                  }
                  style={{ marginTop: 8 }}
                />
                {imagePreview && (
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Preview"
                    sx={{
                      mt: 2,
                      width: 150,
                      height: 150,
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ItemList;

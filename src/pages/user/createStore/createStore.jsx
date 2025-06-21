import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  CircularProgress,
  Drawer,
  TextField,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Edit, Delete, Logout } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { createStore } from "../../../services/storeService";
import { useSnackbar } from "../../../features/snackBar";
import Templates2 from "../../templates/templates2";

const CreateStore = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const template = state?.template;
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [itemListDrawerOpen, setItemListDrawerOpen] = useState(false);

  const [itemsList, setItemsList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [itemForm, setItemForm] = useState({
    title: "",
    description: "",
    price: "",
    sku: "",
    category: "shop",
    tags: "",
    image: null,
    imagePreview: null,
  });

  const categories = ["shop", "services"];

  const handlePublish = async () => {
    try {
      setLoading(true);
      const storeData = {
        name: template.name,
        subdomain: template.subdomain,
        templateId: template?.id,
        logo: template.icon,
      };
      const response = await createStore(storeData);
      if (response) {
        showSnackbar("Store created successfully", "success");
        navigate("/user/home/create-store", { state: { screen: 2 } });
      }
    } catch (error) {
      showSnackbar(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePreview = URL.createObjectURL(file);
      setItemForm((prev) => ({ ...prev, image: file, imagePreview }));
    }
  };

  const handleAddItem = () => {
    const newItem = {
      ...itemForm,
      tags: itemForm.tags.split(",").map((tag) => tag.trim()),
    };

    if (editIndex !== null) {
      const updated = [...itemsList];
      updated[editIndex] = newItem;
      setItemsList(updated);
      setEditIndex(null);
      showSnackbar("Item updated", "success");
    } else {
      setItemsList((prev) => [...prev, newItem]);
      showSnackbar("Item added", "success");
    }

    setItemForm({
      title: "",
      description: "",
      price: "",
      sku: "",
      category: "shop",
      tags: "",
      image: null,
      imagePreview: null,
    });
    setDrawerOpen(false);
    setItemListDrawerOpen(true);
  };

  const handleEditItem = (index) => {
    const item = itemsList[index];
    setItemForm({
      ...item,
      tags: item.tags.join(", "),
      image: null,
    });
    setEditIndex(index);
    setDrawerOpen(true);
  };

  const handleDeleteItem = (index) => {
    const updated = [...itemsList];
    updated.splice(index, 1);
    setItemsList(updated);
    showSnackbar("Item deleted", "info");
  };

  useEffect(() => {
    localStorage.setItem("itemsList", JSON.stringify(itemsList));
  }, [itemsList]);

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={1}
        className="store-editor-header"
      >
        <Box display="flex" alignItems="center">
          <IconButton
            variant="text"
            onClick={() =>
              navigate("/user/home/create-store", { state: { screen: 2 } })
            }
            sx={{
              color: "#fff",
              borderRadius: 0,
              borderRight: "1px solid #928aa2",
              "&:hover": { backgroundColor: "#928aa2" },
            }}
          >
            <Logout sx={{ transform: "rotate(180deg)", color: "#fff" }} />
          </IconButton>
          <Button
            variant="text"
            onClick={() => setDrawerOpen(true)}
            sx={{
              color: "#fff",
              textTransform: "capitalize",
              borderRadius: 0,
              "&:hover": { backgroundColor: "#928aa2" },
            }}
          >
            Add Product
          </Button>
          <Button
            variant="text"
            color="info"
            onClick={() => setItemListDrawerOpen(true)}
            sx={{
              color: "#fff",
              textTransform: "capitalize",
              borderRadius: 0,
              "&:hover": { backgroundColor: "#928aa2" },
            }}
          >
            {" "}
            View Products
          </Button>
        </Box>
        <Button
          variant="text"
          onClick={handlePublish}
          disabled={loading}
          sx={{
            color: "#fff",
            textTransform: "capitalize",
            borderRadius: 0,
            backgroundColor: "success.main",
            "&:hover": { backgroundColor: "success.dark" },
          }}
          startIcon={
            loading ? (
              <CircularProgress size={20} sx={{ color: "success.main" }} />
            ) : null
          }
        >
          {loading ? "Publishing..." : "Publish"}
        </Button>
      </Stack>

      <Box sx={{ height: `calc(100vh - 60px)`, overflow: "auto" }}>
        <Templates2 plate template={template} items={itemsList} />
      </Box>

      {/* Add Item Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 350, p: 3 }}>
          <Typography variant="h6" mb={2}>
            {editIndex !== null ? "Edit Product" : "Add New Product"}
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Title"
              name="title"
              value={itemForm.title}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={itemForm.description}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Price"
              name="price"
              value={itemForm.price}
              onChange={handleInputChange}
              type="number"
              fullWidth
            />
            <TextField
              label="SKU"
              name="sku"
              value={itemForm.sku}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Category"
              name="category"
              select
              value={itemForm.category}
              onChange={handleInputChange}
              fullWidth
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Tags (comma separated)"
              name="tags"
              value={itemForm.tags}
              onChange={handleInputChange}
              fullWidth
            />
            <Button variant="outlined" component="label">
              Upload Image
              <input hidden type="file" onChange={handleImageChange} />
            </Button>
            {itemForm.imagePreview && (
              <img
                src={itemForm.imagePreview}
                alt="preview"
                width={80}
                height={80}
                style={{ objectFit: "cover" }}
              />
            )}
            <Button variant="contained" color="primary" onClick={handleAddItem}>
              {editIndex !== null ? "Update Product" : "Add Product"}
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {/* View Items Drawer */}
      <Drawer
        anchor="left"
        open={itemListDrawerOpen}
        onClose={() => setItemListDrawerOpen(false)}
      >
        <Box sx={{ width: 600, p: 3 }}>
          <Typography variant="h6" mb={2}>
            Products List
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsList.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    {item.imagePreview ? (
                      <img
                        src={item.imagePreview}
                        alt={item.title}
                        width={5}
                        height={5}
                        style={{ objectFit: "cover", borderRadius: 4 }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditItem(idx)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteItem(idx)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CreateStore;

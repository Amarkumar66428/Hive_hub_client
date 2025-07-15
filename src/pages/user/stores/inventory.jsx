import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  useTheme,
  useMediaQuery,
  Switch,
  Menu,
  Popover,
  CircularProgress,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Edit,
  Close,
  TextFields,
  Save,
} from "@mui/icons-material";
import { Image } from "antd";
import storeService from "../../../services/storeService";
import TableSkeleton from "../../../components/tableSkeleton";
import { useSnackbar } from "../../../features/snackBar";

// const brandItems = [
//   { key: "zermoten", label: "Zermoten" },
//   { key: "nike", label: "Nike" },
//   { key: "adidas", label: "Adidas" },
//   { key: "puma", label: "Puma" },
// ];

const sortItems = [
  { key: "all", label: "All" },
  { key: "priceLow", label: "Price: Low to High" },
  { key: "priceHigh", label: "Price: High to Low" },
  { key: "stockHigh", label: "Stock: High to Low" },
  { key: "stockLow", label: "Stock: Low to High" },
];

const InventoryManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryItems, setCategoryItems] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    sortBy: "all",
  });

  const handleRowToggle = (productId) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(productId)) {
      newExpandedRows.delete(productId);
    } else {
      newExpandedRows.add(productId);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormValues(product);
    setEditModalOpen(true);
  };

  // const handleModalClose = () => {
  //   setEditModalOpen(false);
  //   setSelectedProduct(null);
  //   setFormValues({});
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Updated Product:", formValues);
  //   handleModalClose();
  // };

  // const handleFormChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormValues({
  //     ...formValues,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };

  const fetchStore = async () => {
    try {
      setLoading(true);
      const response = await storeService.getMyInventory();
      setProducts(response?.inventory || null);
      setFilteredProducts(response?.inventory || null);
      setCategoryItems((prev) => {
        const newCategories = response?.inventory
          ?.map((item) => item?.productId?.category)
          .filter(Boolean);

        return [...new Set([...prev, ...(newCategories || [])])];
      });
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (category === "all") {
      setFilteredProducts(products);
      return;
    }
    setFilters({ ...filters, category });
    const filteredProducts = products.filter((product) =>
      product?.productId?.category
        ?.toLowerCase()
        .includes(category.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  const handleSortByChange = (e) => {
    const sortBy = e.target.value;
    setFilters({ ...filters, sortBy });
    if (sortBy === "all") {
      setFilteredProducts(products);
      return;
    }
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === "priceLow")
        return a.productId.basePrice - b.productId.basePrice;
      if (sortBy === "priceHigh")
        return b.productId.basePrice - a.productId.basePrice;
      if (sortBy === "stockHigh") return b.stock - a.stock;
      if (sortBy === "stockLow") return a.stock - b.stock;
      return 0;
    });
    setFilteredProducts(sortedProducts);
  };

  return (
    <>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" gap={2}>
          <Typography variant="h4">Inventory</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="all">All</MenuItem>
                {categoryItems.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Brand</InputLabel>
              <Select
                value={filters.brand}
                label="Brand"
                onChange={(e) =>
                  setFilters({ ...filters, brand: e.target.value })
                }
              >
                {brandItems.map((item) => (
                  <MenuItem key={item.key} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={filters.sortBy}
                label="Sort By"
                onChange={handleSortByChange}
              >
                {sortItems.map((item) => (
                  <MenuItem key={item.key} value={item.key}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </Paper>

      <Container maxWidth={false}>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Stock</TableCell>
                    </>
                  )}
                  <TableCell width={50}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableSkeleton
                    showActions={true}
                    showProfile={true}
                    rows={4}
                    columns={isMobile ? 4 : 7}
                  />
                ) : filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 5 : 8} align="center">
                      <Typography variant="body1">
                        No Inventory found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <ProductRow
                      key={product?._id}
                      theme={theme}
                      expandedRows={expandedRows}
                      product={product}
                      handleRowToggle={handleRowToggle}
                      handleEditProduct={handleEditProduct}
                      fetchStore={fetchStore}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      {/* <ProductDetails
        product={selectedProduct}
        editModalOpen={editModalOpen}
        handleModalClose={handleModalClose}
        handleFormSubmit={handleFormSubmit}
        handleFormChange={handleFormChange}
        formValues={formValues}
        selectedProduct={selectedProduct}
        setFormValues={setFormValues}
      /> */}
    </>
  );
};

export default InventoryManagement;

const ProductRow = ({
  product,
  theme,
  expandedRows,
  handleRowToggle,
  isMobile,
  fetchStore,
}) => {
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    stock: product.stock,
    lowStockThreshold: product.lowStockThreshold,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const isExpanded = expandedRows.has(product._id);

  const updateInventory = async () => {
    try {
      setLoading(true);
      if (formValues.stock < 0) {
        showSnackbar("Stock cannot be less than 0", "error");
        return;
      }
      if (formValues.lowStockThreshold < 0) {
        showSnackbar("Low stock threshold cannot be less than 0", "error");
        return;
      }
      const response = await storeService.updateInventory(product._id, {
        stock: formValues.stock,
        lowStockThreshold: formValues.lowStockThreshold,
      });
      console.log("response: ", response);
      showSnackbar("Inventory updated successfully", "success");
      setAnchorEl(null);
      fetchStore();
    } catch (error) {
      console.error("Error updating inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TableRow
        hover
        sx={{
          cursor: "pointer",
          "&:hover": { backgroundColor: "#f5f5f5" },
          backgroundColor: isExpanded ? "#e3f2fd" : "inherit",
          borderLeft: isExpanded
            ? `4px solid ${theme.palette.primary.main}`
            : `4px solid transparent`,
        }}
      >
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              src={product?.productId?.images[0]}
              variant="rounded"
              sx={{ width: 36, height: 36 }}
            >
              {product?.productId?.title.charAt(0)}
            </Avatar>
            {isMobile && (
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  {product?.productId?.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {product._id}
                </Typography>
              </Box>
            )}
          </Stack>
        </TableCell>

        {!isMobile && (
          <>
            <TableCell>
              <Typography variant="body2">
                {product?.productId?.title}
              </Typography>
            </TableCell>

            <TableCell>
              <Chip
                label={product?.productId?.category || "--"}
                size="small"
                variant="outlined"
              />
            </TableCell>
            <TableCell>
              <Typography variant="body2" fontWeight="bold" color="primary">
                ${product?.productId?.basePrice?.toLocaleString()}
              </Typography>
            </TableCell>
            <TableCell>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">{product.stock}</Typography>
                <Chip
                  label={
                    product.status === "in-stock" ? "In Stock" : "Out of Stock"
                  }
                  color={product.status === "in-stock" ? "success" : "error"}
                  size="small"
                />
              </Box>
            </TableCell>
          </>
        )}

        <TableCell>
          <IconButton size="small" onClick={() => handleRowToggle(product._id)}>
            {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={isMobile ? 2 : 7}
        >
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 3 }}>
              <Card elevation={0} sx={{ backgroundColor: "#fafafa" }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item size={{ xs: 12, md: 4 }}>
                      <Box textAlign="center">
                        <Image
                          width={200}
                          height={200}
                          src={product?.productId?.images[0]}
                          alt={product.name}
                          style={{ borderRadius: 8 }}
                        />
                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                          {product?.productId?.title || "Product Name"}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                        >
                          {product?.productId?.description ||
                            "Product Description"}
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<Edit />}
                          onClick={(e) => setAnchorEl(e.currentTarget)}
                          fullWidth
                        >
                          Edit Inventory
                        </Button>
                        <Popover
                          open={!!anchorEl}
                          anchorEl={anchorEl}
                          onClose={() => setAnchorEl(null)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          PaperProps={{
                            sx: { p: 2, width: 300, borderRadius: 2 },
                          }}
                        >
                          <Typography variant="subtitle1" mb={1}>
                            Update Inventory
                          </Typography>
                          <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                              name="stock"
                              label="Stock"
                              size="small"
                              fullWidth
                              value={formValues.stock}
                              onChange={(e) =>
                                setFormValues({
                                  ...formValues,
                                  stock: e.target.value,
                                })
                              }
                            />
                            <TextField
                              name="lowStockThreshold"
                              label="Low Stock Threshold"
                              size="small"
                              fullWidth
                              value={formValues.lowStockThreshold}
                              onChange={(e) =>
                                setFormValues({
                                  ...formValues,
                                  lowStockThreshold: e.target.value,
                                })
                              }
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              disabled={loading}
                              onClick={updateInventory}
                              startIcon={
                                loading ? (
                                  <CircularProgress size={16} />
                                ) : (
                                  <Save />
                                )
                              }
                            >
                              {loading ? "Updating..." : "Update Inventory"}
                            </Button>
                          </Box>
                        </Popover>
                      </Box>
                    </Grid>

                    <Grid item size={{ xs: 12, md: 4 }}>
                      <Typography variant="h6" gutterBottom color="primary">
                        Product Details
                      </Typography>
                      <Stack spacing={2}>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            ID:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {product._id}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Category:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {product?.productId?.category || "--"}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Material:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {product.material || "--"}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Weight:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {product.weight || "--"}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Color:
                          </Typography>
                          <Chip label={product.color || "--"} size="small" />
                        </Box>
                      </Stack>
                    </Grid>

                    <Grid item size={{ xs: 12, md: 4 }}>
                      <Typography variant="h6" gutterBottom color="primary">
                        Inventory & Pricing
                      </Typography>
                      <Stack spacing={2}>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Price:
                          </Typography>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            color="primary"
                          >
                            ${product?.productId?.basePrice?.toLocaleString()}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Stock:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {product.stock || "--"} pairs
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Size Range:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {product.stockInfo || "--"}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Total Value:
                          </Typography>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            color="success.main"
                          >
                            ${product?.productId?.basePrice?.toLocaleString()}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Product Line:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {product.productLine || "--"}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="body2" color="text.secondary">
                            Featured:
                          </Typography>
                          <Chip
                            label={product.featured ? "Yes" : "No"}
                            color={product.featured ? "primary" : "default"}
                            size="small"
                          />
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

// const ProductDetails = ({
//   editModalOpen,
//   handleModalClose,
//   handleFormSubmit,
//   handleFormChange,
//   formValues,
//   selectedProduct,
//   setFormValues,
// }) => {
//   return (
//     <Modal open={editModalOpen} onClose={handleModalClose}>
//       <Box
//         component="form"
//         onSubmit={handleFormSubmit}
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: { xs: "95%", md: 800 },
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           borderRadius: 2,
//           p: 4,
//           maxHeight: "90vh",
//           overflowY: "auto",
//         }}
//       >
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={2}
//         >
//           <Typography variant="h6" fontWeight="bold">
//             Edit Product - {selectedProduct?.name}
//           </Typography>
//           <IconButton onClick={handleModalClose}>
//             <Close />
//           </IconButton>
//         </Box>

//         <Grid container spacing={2}>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <TextField
//               label="Product Name"
//               fullWidth
//               name="name"
//               value={formValues.name || ""}
//               onChange={handleFormChange}
//               required
//             />
//           </Grid>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <TextField
//               label="SKU"
//               fullWidth
//               name="id"
//               value={formValues._id || ""}
//               onChange={handleFormChange}
//               required
//             />
//           </Grid>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <FormControl fullWidth>
//               <InputLabel>Brand</InputLabel>
//               <Select
//                 name="brand"
//                 value={formValues.brand || ""}
//                 onChange={handleFormChange}
//                 label="Brand"
//               >
//                 {["Zermoten", "Nike", "Adidas", "Puma"].map((brand) => (
//                   <MenuItem key={brand} value={brand}>
//                     {brand}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <FormControl fullWidth>
//               <InputLabel>Category</InputLabel>
//               <Select
//                 name="category"
//                 value={formValues.category || ""}
//                 onChange={handleFormChange}
//                 label="Category"
//               >
//                 {["Sneakers", "Boots", "Sandals", "Formal Shoes"].map((cat) => (
//                   <MenuItem key={cat} value={cat}>
//                     {cat}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid size={{ xs: 12, md: 4 }}>
//             <TextField
//               label="Price ($)"
//               type="number"
//               fullWidth
//               name="price"
//               value={formValues.price || ""}
//               onChange={handleFormChange}
//             />
//           </Grid>
//           <Grid size={{ xs: 12, md: 4 }}>
//             <TextField
//               label="Stock"
//               type="number"
//               fullWidth
//               name="stock"
//               value={formValues.stock || ""}
//               onChange={handleFormChange}
//             />
//           </Grid>
//           <Grid size={{ xs: 12, md: 4 }}>
//             <TextField
//               label="Size"
//               fullWidth
//               name="size"
//               value={formValues.size || "M"}
//               onChange={handleFormChange}
//             />
//           </Grid>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <TextField
//               label="Material"
//               fullWidth
//               name="material"
//               value={formValues.material || ""}
//               onChange={handleFormChange}
//             />
//           </Grid>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <TextField
//               label="Weight"
//               fullWidth
//               name="weight"
//               value={formValues.weight || ""}
//               onChange={handleFormChange}
//             />
//           </Grid>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <TextField
//               label="Color"
//               fullWidth
//               name="color"
//               value={formValues.color || ""}
//               onChange={handleFormChange}
//             />
//           </Grid>
//           <Grid size={{ xs: 6, md: 3 }}>
//             <FormControl>
//               <Typography variant="body2">In Stock</Typography>
//               <Switch
//                 name="inStock"
//                 checked={!!formValues.inStock}
//                 onChange={(e) =>
//                   setFormValues({
//                     ...formValues,
//                     inStock: e.target.checked,
//                   })
//                 }
//               />
//             </FormControl>
//           </Grid>
//           <Grid size={{ xs: 6, md: 3 }}>
//             <FormControl>
//               <Typography variant="body2">Featured</Typography>
//               <Switch
//                 name="featured"
//                 checked={!!formValues.featured}
//                 onChange={(e) =>
//                   setFormValues({
//                     ...formValues,
//                     featured: e.target.checked,
//                   })
//                 }
//               />
//             </FormControl>
//           </Grid>
//           <Grid size={{ xs: 12 }}>
//             <TextField
//               label="Description"
//               fullWidth
//               name="description"
//               value={formValues.description || ""}
//               onChange={handleFormChange}
//               multiline
//               rows={4}
//             />
//           </Grid>
//         </Grid>

//         <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
//           <Button variant="outlined" onClick={handleModalClose}>
//             Cancel
//           </Button>
//           <Button variant="contained" type="submit">
//             Save Changes
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

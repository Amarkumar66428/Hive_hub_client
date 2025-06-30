import React, { useState } from "react";
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
  Divider,
  Grid,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Modal,
  Tooltip,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";
import {
  Edit,
  Delete,
  Logout,
  Close,
  CloudUpload,
  Save,
  Add,
  Settings,
  ChevronLeft,
  Construction,
  Undo,
  Redo,
  ViewAgenda,
  PhoneAndroidOutlined,
  TabletMacOutlined,
  DesktopWindowsOutlined,
  UploadFile,
  ArrowForwardIosSharp,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "../../../features/snackBar";
import Templates2 from "../../templates/templates2";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { ColorPicker } from "antd";
import first_hero from "../../../assets/storePage/temp2/first_hero.webp";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import SiteFormDialog from "./publishForm";

const layoutSection = [
  {
    title: "Hero Section",
    id: "heroSection",
  },
  {
    title: "About Section",
    id: "aboutSection",
  },
  {
    title: "Services Section",
    id: "servicesSection",
  },
  {
    title: "Footer Section",
    id: "footerSection",
  },
];

const categories = ["shop", "services"];

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharp sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const CreateStore = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { showSnackbar } = useSnackbar();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [itemListDrawerOpen, setItemListDrawerOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [expandedAccordion, setExpandedAccordion] = useState("panel1");
  const [itemsList, setItemsList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const [tabValue, setTabValue] = useState("1");
  const [siteWidth, setSiteWidth] = useState("1440px");
  const [publishOpen, setPublishOpen] = useState(false);
  const [layout, setLayout] = useState({
    siteName: "Store Name",
    primaryColor: "#000",
    textColor: "#000",
  });

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

  const handleColorChange = (key, color) => {
    const hex = color.toHexString();
    setLayout({ ...layout, [key]: hex });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleDrawer = () => {
    setExpanded(!expanded);
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

  const checkSiteResponsive = (size) => {
    setSiteWidth(size);
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

  const handleChange = (panel) => (event, newExpanded) => {
    setExpandedAccordion(newExpanded ? panel : false);
  };

  const handleImageChangeHeader = (event, key) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setLayout((prev) => ({ ...prev, [key]: e.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (key) => {
    setLayout((prev) => ({ ...prev, [key]: null }));
  };

  const handleSectionClick = (section) => {
    setOpenSection(section);
  };

  return (
    <Box className="store-editor">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={1}
        className="store-editor-header"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "#fff",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box display="flex" alignItems="center">
          <Tooltip title="Go Back">
            <IconButton
              variant="text"
              onClick={() => {
                storeId
                  ? navigate("/user/manage-store/my-store")
                  : navigate("/user/manage-store/create-store", {
                      state: { screen: 2 },
                    });
              }}
              sx={{
                color: "#fff",
                borderRadius: 0,
                borderRight: "1px solid #928aa2",
                "&:hover": { backgroundColor: "#928aa2" },
              }}
            >
              <Logout sx={{ transform: "rotate(180deg)", color: "#fff" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Website builder">
            <IconButton
              onClick={toggleDrawer}
              sx={{
                color: "#fff",
                borderRadius: 0,
                borderRight: "1px solid #928aa2",
                "&:hover": { backgroundColor: "#928aa2" },
              }}
            >
              <Construction />
            </IconButton>
          </Tooltip>
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
          onClick={() => setPublishOpen(true)}
          sx={{
            color: "#fff",
            textTransform: "capitalize",
            borderRadius: 0,
            backgroundColor: "success.main",
            "&:hover": { backgroundColor: "success.dark" },
          }}
        >
          Publish
        </Button>
      </Stack>
      <Box
        sx={{
          display: "flex",
          pt: "40px",
          bgcolor: "#f5f5f5",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            width: !expanded ? 0 : "12%",
            transition: "width 0.3s ease",
            backgroundColor: "#fff",
            overflow: "hidden",
            flexDirection: "column",
            borderRight: "1px solid",
            borderColor: "divider",
            borderRadius: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                px: 1,
                minHeight: 34,
                borderBottom: "1px solid",
                borderColor: "divider",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "1em" }}>
                Website Builder
              </Typography>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeft />
              </IconButton>
            </Box>

            {/* Toolbar Buttons */}
            <Box
              sx={{
                px: 1,
                py: 1,
                display: "flex",
                gap: 1,
                justifyContent: "space-between",
              }}
            >
              <Box>
                <IconButton size="small">
                  <Undo sx={{ fontSize: "inherit" }} />
                </IconButton>
                <IconButton size="small">
                  <Redo sx={{ fontSize: "inherit" }} />
                </IconButton>
                <IconButton size="small">
                  <Save sx={{ fontSize: "inherit" }} />
                </IconButton>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box>
                <IconButton
                  size="small"
                  onClick={() => checkSiteResponsive("1440px")}
                >
                  <DesktopWindowsOutlined sx={{ fontSize: "inherit" }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => checkSiteResponsive("899px")}
                >
                  <TabletMacOutlined sx={{ fontSize: "inherit" }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => checkSiteResponsive("599px")}
                >
                  <PhoneAndroidOutlined sx={{ fontSize: "inherit" }} />
                </IconButton>
              </Box>
            </Box>
            <Divider orientation="horizontal" flexItem />

            {/* Tab Section */}
            <TabContext value={tabValue}>
              <Box>
                <TabList
                  onChange={handleTabChange}
                  aria-label="builder tabs"
                  variant="fullWidth"
                  sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Tab
                    icon={<ViewAgenda fontSize="small" />}
                    iconPosition="top"
                    label="Section"
                    value="1"
                    sx={{
                      p: 0,
                      fontSize: "0.8em",
                      textTransform: "capitalize",
                      minWidth: "unset",
                    }}
                  />
                  <Tab
                    icon={<Settings fontSize="small" />}
                    iconPosition="top"
                    label="Settings"
                    value="2"
                    sx={{
                      p: 0,
                      fontSize: "0.8em",
                      textTransform: "capitalize",
                      minWidth: "unset",
                    }}
                  />
                  <Tab
                    icon={<Add fontSize="small" />}
                    iconPosition="top"
                    label="Add"
                    value="3"
                    sx={{
                      p: 0,
                      fontSize: "0.8em",
                      textTransform: "capitalize",
                      minWidth: "unset",
                    }}
                  />
                </TabList>
              </Box>
              <Box sx={{ px: 0, py: 1, flexGrow: 1, overflowY: "auto" }}>
                <TabPanel value="1" sx={{ px: 1, py: 0 }}>
                  <List
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {layoutSection?.map((section, index) => (
                      <ListItemButton
                        key={index}
                        onClick={() => handleSectionClick(section.id)}
                        sx={(theme) => ({
                          border: "1px solid",
                          borderColor: "divider",
                          backgroundColor:
                            openSection === section.id
                              ? theme.palette.grey[400]
                              : "transparent",
                          "&:hover": {
                            backgroundColor: theme.palette.grey[400],
                          },
                        })}
                      >
                        <ListItemText primary={section.title} />
                      </ListItemButton>
                    ))}
                  </List>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </Box>
            </TabContext>
          </Box>

          <Stack
            spacing={2}
            sx={{
              px: 1,
              py: 1,
              borderTop: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "1em" }}>
              Global Settings
            </Typography>

            <Stack spacing={1}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <ColorPicker
                  className="color-picker"
                  value={layout.primaryColor}
                  onChangeComplete={(color) =>
                    handleColorChange("primaryColor", color)
                  }
                />
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ fontSize: "0.8em" }}
                >
                  Primary Color
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <ColorPicker
                  className="color-picker"
                  value={layout.textColor}
                  onChangeComplete={(color) =>
                    handleColorChange("textColor", color)
                  }
                />
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ fontSize: "0.8em" }}
                >
                  Text Color
                </Typography>
              </Box>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                Site Name
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                value={layout.siteName}
                onChange={(e) =>
                  setLayout((prev) => ({ ...prev, siteName: e.target.value }))
                }
              />
            </Stack>
          </Stack>
        </Paper>
        <Box
          sx={{
            height: "calc(100vh - 40px)",
            overflow: "auto",
            width: !expanded ? "100%" : "76%",
            transition: "width 0.3s ease",
            px: 0,
          }}
        >
          <Templates2
            siteWidth={siteWidth}
            layout={layout}
            setLayout={setLayout}
            isStoreOwner={true}
          />
        </Box>
        <Paper
          elevation={2}
          sx={{
            width: !expanded ? 0 : "12%",
            transition: "width 0.3s ease",
            backgroundColor: "#fff",
            overflow: "hidden",
            flexDirection: "column",
            borderRight: "1px solid",
            borderColor: "divider",
            borderRadius: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {openSection === "heroSection" && (
            <Accordion
              expanded={expandedAccordion === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography component="span">Hero Background</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius={2}
                  width="100%"
                  textAlign="center"
                  gap={1}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: 120,
                      backgroundColor: "#f5f5f5",
                      backgroundImage: layout.heroImage
                        ? `url(${layout.heroImage})`
                        : `url(${first_hero})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: 1,
                    }}
                  />
                  <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
                    <Button
                      variant="contained"
                      size="small"
                      component="label"
                      startIcon={<UploadFile />}
                      fullWidth
                    >
                      {layout.heroImage ? "Change Image" : "Upload Image"}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                          handleImageChangeHeader(e, "heroImage")
                        }
                      />
                    </Button>
                    {layout.heroImage && (
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleRemoveImage("heroImage")}
                        sx={{ alignSelf: "flex-end" }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          )}
          {openSection === "servicesSection" && (
            <Accordion
              expanded={expandedAccordion === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography component="span">Services Cards</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius={2}
                  width="100%"
                  textAlign="center"
                  gap={1}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: 120,
                      backgroundColor: "#f5f5f5",
                      backgroundImage: layout.heroImage
                        ? `url(${layout.heroImage})`
                        : `url(${first_hero})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: 1,
                    }}
                  />
                  <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
                    <Button
                      variant="contained"
                      size="small"
                      component="label"
                      startIcon={<UploadFile />}
                      fullWidth
                    >
                      {layout.heroImage ? "Change Image" : "Upload Image"}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                          handleImageChangeHeader(e, "heroImage")
                        }
                      />
                    </Button>
                    {layout.heroImage && (
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleRemoveImage("heroImage")}
                        sx={{ alignSelf: "flex-end" }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          )}
        </Paper>
      </Box>
      <Modal
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "flex-end", sm: "center" },
          backdropFilter: "blur(2px)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" },
            height: { xs: "100vh", sm: "auto" },
            maxHeight: { sm: "90vh" },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: { xs: 0, sm: 2 },
            overflowY: "auto",
            right: { xs: 0, sm: "auto" },
          }}
        >
          {/* Close button positioned absolutely */}
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              zIndex: 1,
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <Close />
          </IconButton>

          <Box sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              {editIndex !== null ? "Edit Product" : "Add New Product"}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box display={"flex"} gap={2}>
              <Stack spacing={2} flex={1}>
                <TextField
                  label="Title"
                  name="title"
                  value={itemForm.title}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />

                <TextField
                  label="Description"
                  name="description"
                  value={itemForm.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  size="small"
                />

                <Grid container spacing={2}>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Price"
                      name="price"
                      value={itemForm.price}
                      onChange={handleInputChange}
                      type="number"
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="SKU"
                      name="sku"
                      value={itemForm.sku}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>

                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    name="category"
                    value={itemForm.category}
                    onChange={handleInputChange}
                    variant="outlined"
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Tags (comma separated)"
                  name="tags"
                  value={itemForm.tags}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  helperText="Separate multiple tags with commas"
                />
              </Stack>
              <Stack spacing={3} flex={1}>
                {!itemForm.imagePreview ? (
                  <Box
                    component="label"
                    sx={{
                      position: "relative",
                      display: "block",
                      border: "2px dashed",
                      borderColor: "primary.light",
                      borderRadius: 3,
                      p: 4,
                      textAlign: "center",
                      backgroundColor: "primary.50",
                      cursor: "pointer",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        borderColor: "primary.main",
                        backgroundColor: "primary.100",
                        transform: "translateY(-2px)",
                      },
                      "&:active": {
                        transform: "translateY(0px)",
                      },
                    }}
                  >
                    <input
                      hidden
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      {/* Upload Icon with Animation */}
                      <Box
                        sx={{
                          position: "relative",
                          p: 2,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          color: "white",
                        }}
                      >
                        <CloudUpload sx={{ fontSize: 32 }} />
                      </Box>

                      {/* Upload Text */}
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="600"
                          color="primary.main"
                          gutterBottom
                        >
                          Drop your image here
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          or{" "}
                          <strong style={{ color: "#2563eb" }}>
                            click to browse
                          </strong>{" "}
                          from your device
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.disabled"
                          sx={{
                            display: "block",
                            bgcolor: "background.paper",
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: "divider",
                          }}
                        >
                          PNG, JPG, WEBP up to 5MB
                        </Typography>
                      </Box>

                      {/* Modern Upload Button */}
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<CloudUpload />}
                        sx={{
                          mt: 1,
                          borderRadius: 2,
                          px: 4,
                          py: 1.5,
                          textTransform: "none",
                          fontWeight: 600,
                          background: "primary.main",
                          "&:hover": {
                            transform: "translateY(-1px)",
                          },
                        }}
                      >
                        Choose Image
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      position: "relative",
                      border: "2px dashed",
                      borderColor: "primary.light",
                      borderRadius: 3,
                      p: 1,
                      backgroundColor: "success.50",
                      overflow: "hidden",
                    }}
                  >
                    {/* Image Preview */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 3,
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      {/* Image Container */}
                      <Box
                        sx={{
                          position: "relative",
                          borderRadius: 2,
                          overflow: "hidden",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                          border: "3px solid white",
                        }}
                      >
                        <Box
                          component="img"
                          src={itemForm.imagePreview}
                          alt="Product preview"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />

                        {/* Image Overlay on Hover */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bgcolor: "rgba(0,0,0,0.7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            "&:hover": {
                              opacity: 1,
                            },
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="white"
                            fontWeight="600"
                          >
                            Preview
                          </Typography>
                        </Box>
                      </Box>

                      {/* Image Actions */}
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1.5}>
                          {/* Change Image Button */}
                          <Button
                            variant="outlined"
                            component="label"
                            size="small"
                            startIcon={<CloudUpload />}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 600,
                              borderColor: "primary.main",
                              color: "primary.main",
                              "&:hover": {
                                bgcolor: "primary.50",
                                borderColor: "primary.dark",
                              },
                            }}
                          >
                            Change
                            <input
                              hidden
                              type="file"
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </Button>

                          {/* Remove Button */}
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<Delete />}
                            onClick={() =>
                              setItemForm({ ...itemForm, imagePreview: null })
                            }
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 600,
                              "&:hover": {
                                bgcolor: "error.50",
                              },
                            }}
                          >
                            Remove
                          </Button>
                        </Stack>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Stack>
            </Box>
            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                pt: 2,
                position: { sm: "sticky" },
                bottom: 0,
                bgcolor: "background.paper",
                pb: { xs: 2, sm: 0 },
                borderTop: "1px solid",
                borderColor: "divider",
                mt: 2,
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setDrawerOpen(false)}
                sx={{
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1em",
                  borderColor: "grey.300",
                  color: "text.secondary",
                  "&:hover": {
                    borderColor: "grey.400",
                    bgcolor: "grey.50",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddItem}
                sx={{
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1em",
                  "&:hover": {
                    transform: "translateY(-1px)",
                  },
                  "&:disabled": {
                    background: "linear-gradient(45deg, #e5e7eb, #d1d5db)",
                    color: "text.disabled",
                    boxShadow: "none",
                  },
                }}
                startIcon={editIndex !== null ? <Save /> : <Add />}
                disabled={!itemForm.imagePreview}
              >
                {editIndex !== null ? "Save Product" : "Add Product"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Drawer
        anchor="left"
        open={itemListDrawerOpen}
        onClose={() => setItemListDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "50%",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
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
                      <figure style={{ width: 80, height: 50 }}>
                        <img
                          src={item.imagePreview}
                          alt={item.title}
                          style={{ objectFit: "contain", borderRadius: 4 }}
                        />
                      </figure>
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
      <SiteFormDialog
        open={publishOpen}
        layout={layout}
        onClose={() => setPublishOpen(false)}
      />
    </Box>
  );
};

export default CreateStore;

import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  Drawer,
  TextField,
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Tooltip,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  styled,
  TableBody,
  CircularProgress,
  ThemeProvider,
} from "@mui/material";
import {
  Delete,
  Logout,
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
  ReplayOutlined,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
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
import storeService from "../../../services/storeService";
import templateTheme from "../../templates/templateTheme";

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
  const { storeId, type, template } = useParams();

  const [layoutSection, setLayoutSection] = useState([]);
  const [itemListDrawerOpen, setItemListDrawerOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [expandedAccordion, setExpandedAccordion] = useState("panel1");
  const [itemsList, setItemsList] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [tabValue, setTabValue] = useState("1");
  const [siteWidth, setSiteWidth] = useState("1440px");
  const [publishOpen, setPublishOpen] = useState(false);
  const [sectionImages, setSectionImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState({
    siteName: "Shop.com",
    primaryColor: "#000",
    textColor: "#000",
  });

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true);
        const response = await storeService.getMyStore();
        setLayout(JSON.parse(response?.store?.layout) || {});
        setItemsList(
          response?.products?.filter((item) => item.isPublished) || []
        );
      } catch (error) {
        console.log("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };
    if (type === "edit") {
      fetchStore();
    } else {
      setLayout(null);
      setItemsList([]);
      setLoading(false);
    }
  }, [type]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "background.paper",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

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

  const checkSiteResponsive = (size) => {
    setSiteWidth(size);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpandedAccordion(newExpanded ? panel : false);
  };

  const handleImageChangeHeader = (event, key) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      setSectionImages((prev) => ({ ...prev, [key]: file }));
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
                  value={layout?.primaryColor || "#000"}
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
                  value={layout?.textColor || "#000"}
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
                value={layout?.siteName}
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
          <ThemeProvider
            theme={templateTheme({
              primaryColor: layout?.primaryColor || "#000",
              secondaryColor: layout?.primaryColor || "#000",
              textColor: layout?.textColor || "#000",
            })}
          >
            <Templates2
              isEdit={true}
              siteWidth={siteWidth}
              layout={layout}
              setLayout={setLayout}
              setLayoutSection={setLayoutSection}
              isStoreOwner={true}
              products={itemsList}
            />
          </ThemeProvider>
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
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      width: "100%",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      component="label"
                      fullWidth
                    >
                      {layout.heroImage ? <ReplayOutlined /> : "Upload"}
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
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsList?.length ===  0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                itemsList.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      {item.images[0] ? (
                        <figure style={{ width: 80, height: 50 }}>
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            style={{ objectFit: "contain", borderRadius: 4 }}
                          />
                        </figure>
                      ) : (
                        "No Image"
                      )}
                    </TableCell>
                    <TableCell>{item.title || "Untitled"}</TableCell>
                    <TableCell>{item.basePrice || "0.00"}</TableCell>
                    <TableCell>{item.category || "Uncategorized"}</TableCell>
                    <TableCell>{item.sku || "SKU"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </Drawer>
      <SiteFormDialog
        template={template}
        open={publishOpen}
        layout={layout}
        sectionImages={sectionImages}
        onClose={() => setPublishOpen(false)}
      />
    </Box>
  );
};

export default CreateStore;

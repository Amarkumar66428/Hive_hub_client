import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Modal,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import img2 from "../../../assets/storePage/image2.png";
import img3 from "../../../assets/storePage/image3.png";
import img4 from "../../../assets/storePage/image4.png";
import { useNavigate } from "react-router-dom";
const categories = ["E-Commerce", "Education", "College", "Marketing"];
const allCategories = [
  "All Categories",
  "E-Commerce",
  "Education",
  "College",
  "Marketing",
];

const templates = [
  {
    id: 1,
    title: "E-Commerce",
    image: img2,
    isPublished: true,
    path: "/templates/e-commerce",
  },
    {
    id: 2,
    title: "E-Commerce",
    image: img4,
    isPublished: true,
    path: "/templates/shop",
  },
  {
    id: 3,
    title: "Education",
    image: img3,
    isPublished: false,
    path: "/templates/education",
  },
];

const TemplateSelector = ({ setCurrentStep, setSelectedTemplate }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    subdomain: "",
    icon: null,
    iconUrl: "",
  });

  // Cleanup object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (formData.iconUrl) {
        URL.revokeObjectURL(formData.iconUrl);
      }
    };
  }, [formData.iconUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        icon: file,
        iconUrl: objectUrl,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic or API call here
    navigate("/user/home/create-store/editor", {
      state: {
        template: formData,
      },
    });
    setOpen(false);
  };

  // Filter templates based on search and category
  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      categoryFilter === "All Categories" || template.title === categoryFilter;
    const matchesSearch = template.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        gutterBottom
        sx={{ margin: "2rem 0" }}
      >
        Choose a template and start creating
      </Typography>

      {/* Search Bar */}
      <Box
        sx={{
          width: "70%",
          alignSelf: "center",
        }}
      >
        <TextField
          variant="standard"
          placeholder="Search templates"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            disableUnderline: false,
          }}
        />
      </Box>

      {/* Top Picks */}
      <Box
        sx={{
          width: "70%",
          alignSelf: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          flexWrap: "wrap",
          margin: "1rem 0",
          color: "text.secondary",
          fontSize: "1.2rem",
        }}
      >
        <Typography
          component="span"
          fontWeight="bold"
          color="primary"
          sx={{ mr: 0.5 }}
        >
          Top Picks:
        </Typography>
        {categories.map((cat, idx) => (
          <React.Fragment key={cat}>
            <Button
              size="small"
              variant="text"
              color="primary"
              sx={{ textTransform: "none", minWidth: "auto" }}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </Button>
            {idx < categories.length - 1 && (
              <Typography
                component="span"
                sx={{ mx: 1, color: "text.disabled" }}
              >
                |
              </Typography>
            )}
          </React.Fragment>
        ))}
      </Box>

      {/* Category Dropdown */}
      <Box sx={{ maxWidth: "20%", margin: "0 2rem" }}>
        <FormControl fullWidth variant="standard">
          <InputLabel id="category-select-label">All Categories</InputLabel>
          <Select
            labelId="category-select-label"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            label="All Categories"
          >
            {allCategories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Templates Grid */}
      <Box
        sx={{
          backgroundColor: "#4D114B1A",
          padding: "2rem 0",
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {filteredTemplates.map((template) => (
            <Grid
              key={template.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Box
                sx={{
                  borderRadius: 1,
                  boxShadow: 2,
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <figure className="template-image">
                  <Box
                    component="img"
                    src={template.image}
                    alt={`${template.name} Template`}
                    sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </figure>
                <Box
                  sx={{
                    borderTop: "1px solid #e0e0e0",
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    fontSize="1rem"
                    color="text.primary"
                  >
                    {template.name}
                  </Typography>
                  <Box>
                    <Button
                      variant="text"
                      sx={{
                        py: 0,
                        fontSize: "1rem",
                        color: "green",
                        textDecoration: "underline",
                      }}
                      onClick={() => {
                        setCurrentStep(3);
                        setSelectedTemplate(template);
                      }}
                    >
                      Preview
                    </Button>
                    {template.isPublished ? (
                      <Button
                        variant="text"
                        color="error"
                        onClick={() => {
                          setOpen(true);
                          setFormData((prev) => ({
                            ...prev,
                            id: template.id,
                          }));
                        }}
                        sx={{
                          py: 0,
                          fontSize: "1rem",
                          textTransform: "none",
                          textDecoration: "underline",
                        }}
                      >
                        Select
                      </Button>
                    ) : (
                      <Typography
                        variant="text"
                        color="warning"
                        sx={{
                          fontSize: "1rem",
                          textTransform: "none",
                          textDecoration: "underline",
                        }}
                      >
                        Coming Soon
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Create Own Store
          </Typography>

          <TextField
            label="Title"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
          />

          <TextField
            label="Subdomain"
            name="subdomain"
            value={formData.subdomain}
            onChange={handleInputChange}
            fullWidth
            required
          />

          <Button variant="outlined" component="label">
            Upload Icon
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          {formData.iconUrl && (
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src={formData.iconUrl} alt="Icon Preview" />
              <Typography variant="body2" color="textSecondary">
                {formData.icon.name}
              </Typography>
            </Box>
          )}

          <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TemplateSelector;

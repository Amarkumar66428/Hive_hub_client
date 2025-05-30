import React, { useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import img2 from "../../../assets/storePage/image2.png";
import img3 from "../../../assets/storePage/image3.png";
import img4 from "../../../assets/storePage/image4.png";

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
    title: "Education",
    image: img3,
    isPublished: false,
    path: "/templates/education",
  },
  {
    id: 3,
    title: "E-Commerce",
    image: img4,
    isPublished: false,
    path: "/templates/shop",
  },
  // add more as needed
];

const TemplateSelector = ({ onNext, setSelectedTemplate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

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
                    alt={`${template.title} Template`}
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
                    fontSize: "1.2em",
                    py: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    fontSize="1.2rem"
                    color="text.primary"
                  >
                    {template.title}
                  </Typography>
                  <Box>
                    <Button
                      variant="text"
                      sx={{
                        py: 0,
                        fontSize: "1.2rem",
                        color: "green",
                        textDecoration: "underline",
                      }}
                      onClick={() => {
                        window.open(template.path, "_blank");
                      }}
                    >
                      View
                    </Button>
                    {template.isPublished ? (
                      <Button
                        variant="text"
                        color="error"
                        onClick={() => {
                          onNext();
                          setSelectedTemplate({
                            category: template.title,
                            id: template.id,
                          });
                        }}
                        sx={{
                          py: 0,
                          fontSize: "1.2rem",
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
                          fontSize: "1.2rem",
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
    </Box>
  );
};

export default TemplateSelector;

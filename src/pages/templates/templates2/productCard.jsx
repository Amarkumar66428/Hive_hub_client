import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  Grid,
  Button,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        maxWidth: "100%",
        borderRadius: "16px",
        boxShadow: "none",
        border: "none",
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="div"
          sx={{
            height: isMobile ? 200 : 280,
            backgroundColor: "#e8e8e8",
            borderRadius: "12px",
            margin: "16px 16px 0 16px",
            backgroundImage: `url(${product.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        {/* Hover Overlay with Buttons */}
        <Fade in={isHovered}>
          <Box
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.1)", // subtle white transparency
              backdropFilter: "blur(10px)", // glass blur
              WebkitBackdropFilter: "blur(10px)", // Safari support
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              zIndex: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: 600,
                textTransform: "none",
                width: "80%",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#000",
                color: "#000",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: 600,
                textTransform: "none",
                width: "80%",
                "&:hover": {
                  borderColor: "#000",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Buy Now
            </Button>
          </Box>
        </Fade>
      </Box>

      <CardContent sx={{ padding: "16px 16px 20px 16px" }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: isMobile ? "14px" : "16px",
            color: "#000",
            marginBottom: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            lineHeight: 1.3,
          }}
        >
          {product.title}
        </Typography>

        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "12px" }}
        >
          <Rating
            value={product.rating}
            precision={0.5}
            readOnly
            size={isMobile ? "small" : "medium"}
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#ffc107",
              },
              "& .MuiRating-iconEmpty": {
                color: "#e0e0e0",
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              marginLeft: "8px",
              color: "#666",
              fontSize: isMobile ? "12px" : "14px",
            }}
          >
            {product.rating}/5
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontWeight: 700,
              color: "#000",
              fontSize: isMobile ? "18px" : "20px",
            }}
          >
            ${product.price}
          </Typography>

          {product.originalPrice && (
            <>
              <Typography
                variant="body1"
                component="span"
                sx={{
                  textDecoration: "line-through",
                  color: "#999",
                  fontSize: isMobile ? "14px" : "16px",
                }}
              >
                ${product.originalPrice}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                sx={{
                  color: "#ff4444",
                  fontSize: isMobile ? "12px" : "14px",
                  fontWeight: 600,
                }}
              >
                -{product.discount}%
              </Typography>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

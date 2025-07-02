import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  Button,
  Fade,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import shopersService from "../../../services/shopersService";
import { setCart } from "../../../reducer/websiteSlice";
import { useNavigate, useParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { Add, Remove } from "@mui/icons-material";
import Cookies from "js-cookie";

const ProductCard = ({
  product,
  isEdit = false,
  setSignInOpen,
  dummy = false,
}) => {
  const theme = useTheme();
  const token = Cookies.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cart = useSelector((state) => state.website.cart);
  const { subdomain } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddItem, setIsAddItem] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const handleAddToCart = async (quantity) => {
    await shopersService
      .addProductToCart({
        productId: product._id,
        quantity: quantity,
      })
      .then((res) => {
        console.log(res);
        dispatch(setCart({ ...cart, [product._id]: quantity }));
      });
  };

  const handleUpdateCart = async (quantity) => {
    await shopersService
      .updateProductToCart({
        productId: product._id,
        quantity: quantity,
      })
      .then((res) => {
        console.log(res);
        dispatch(setCart({ ...cart, [product._id]: quantity }));
      });
  };

  const addItemToCart = async () => {
    setIsAddItem(true);
    setCartQuantity(1);
  };

  const updateCart = async (quantity) => {
    const parsedQuantity = Number(quantity);

    if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
      setIsAddItem(false);
      setCartQuantity(parsedQuantity);
    }
  };

  useEffect(() => {
    if (cartQuantity > 0) {
      const debouncedCartHandler = debounce(() => {
        if (isAddItem) {
          handleAddToCart(cartQuantity || 0);
        } else {
          handleUpdateCart(cartQuantity || 0);
        }
      }, 400);

      debouncedCartHandler();

      return () => {
        debouncedCartHandler.cancel();
      };
    }
  }, [cartQuantity, isAddItem]);

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
    >
      <Box
        sx={{ position: "relative" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardMedia
          component="div"
          sx={{
            height: isMobile ? 200 : 280,
            backgroundColor: "#e8e8e8",
            borderRadius: "12px",
            margin: "16px 16px 0 16px",
            backgroundImage: `url(${product?.images})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        <Fade in={isHovered}>
          <Box
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
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
            <Box
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "12px",
                p: isMobile ? "8px 16px" : "12px 24px",
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: 600,
                textTransform: "none",
                width: "100%",
                maxWidth: 320,
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#222",
                },
              }}
            >
              {cartQuantity > 0 || cart[product._id] > 0 ? (
                <>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#bbb",
                      mb: 1,
                      textAlign: "center",
                    }}
                  >
                    In Cart
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        updateCart((cartQuantity || cart[product._id] || 0) - 1)
                      }
                      sx={{
                        color: "#fff",
                        backgroundColor: "#444",
                        "&:hover": {
                          backgroundColor: "#666",
                        },
                        borderRadius: 1,
                        p: "4px",
                      }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>

                    <Typography
                      sx={{
                        minWidth: 24,
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: isMobile ? "14px" : "16px",
                      }}
                    >
                      {cartQuantity || cart[product._id] || 0}
                    </Typography>

                    <IconButton
                      onClick={() =>
                        updateCart((cartQuantity || cart[product._id] || 0) + 1)
                      }
                      sx={{
                        color: "#fff",
                        backgroundColor: "#444",
                        "&:hover": {
                          backgroundColor: "#666",
                        },
                        borderRadius: 1,
                        p: "4px",
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={() =>
                    isEdit || dummy
                      ? null
                      : token
                      ? addItemToCart()
                      : setSignInOpen(true)
                  }
                  sx={{
                    width: "100%",
                    backgroundColor: "#222",
                    color: "#fff",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#444",
                    },
                  }}
                >
                  Add to Cart
                </Button>
              )}
            </Box>

            <Button
              variant="outlined"
              onClick={() =>
                isEdit || dummy
                  ? null
                  : token
                  ? navigate(`/hive/${subdomain}/checkout`)
                  : setSignInOpen(true)
              }
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
          {product.title || "Untitled"}
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
            {product.rating || 0}/5
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
            ${product.basePrice}
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

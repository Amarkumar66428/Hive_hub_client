import React, { useEffect, useState } from "react";
import "./global.css";
import {
  AccountCircleOutlined,
  CloseOutlined,
  Facebook,
  GitHub,
  Instagram,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Badge, Box, Button, InputBase, ThemeProvider } from "@mui/material";
import first_hero from "../../../assets/storePage/temp2/first_hero.webp";
import new1 from "../../../assets/storePage/temp2/newA1.webp";
import new2 from "../../../assets/storePage/temp2/newA2.webp";
import new3 from "../../../assets/storePage/temp2/newA3.webp";
import new4 from "../../../assets/storePage/temp2/newA4.webp";
import topS1 from "../../../assets/storePage/temp2/topS1.webp";
import topS2 from "../../../assets/storePage/temp2/topS2.webp";
import topS3 from "../../../assets/storePage/temp2/topS3.webp";
import topS4 from "../../../assets/storePage/temp2/topS4.webp";
import brs1 from "../../../assets/storePage/temp2/brs1.webp";
import brs2 from "../../../assets/storePage/temp2/brs2.webp";
import brs3 from "../../../assets/storePage/temp2/brs3.webp";
import brs4 from "../../../assets/storePage/temp2/brs4.webp";
import EditableText from "../../../components/editAbleText";
import ProductCard from "./productCard";
import AuthModals from "./authmodals";
import templateTheme from "../templateTheme";
import useAuth from "../../../hooks/useAuth";
import Cookies from "js-cookie";
import { UserMenu } from "./component";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

const newProducts = [
  {
    id: 1,
    title: "T-SHIRT WITH TAPE DETAILS",
    basePrice: 120,
    rating: 4.5,
    images: new1,
  },
  {
    id: 2,
    title: "SKINNY FIT JEANS",
    basePrice: 240,
    originalPrice: 260,
    discount: 20,
    rating: 4.5,
    images: new2,
  },
  {
    id: 3,
    title: "CHECKERED SHIRT",
    basePrice: 120,
    rating: 4.5,
    images: new3,
  },
  {
    id: 4,
    title: "SLEEVE STRIPED T-SHIRT",
    basePrice: 240,
    originalPrice: 260,
    discount: 20,
    rating: 4.5,
    images: new4,
  },
];

const topProducts = [
  {
    id: 1,
    title: "T-SHIRT WITH TAPE DETAILS",
    basePrice: 120,
    rating: 4.5,
    images: topS1,
  },
  {
    id: 2,
    title: "SKINNY FIT JEANS",
    basePrice: 240,
    originalPrice: 260,
    discount: 20,
    rating: 4.5,
    images: topS2,
  },
  {
    id: 3,
    title: "CHECKERED SHIRT",
    basePrice: 120,
    rating: 4.5,
    images: topS3,
  },
  {
    id: 4,
    title: "SLEEVE STRIPED T-SHIRT",
    basePrice: 240,
    originalPrice: 260,
    discount: 20,
    rating: 4.5,
    images: topS4,
  },
];

// Custom theme matching AMK's aesthetic

const Templates2 = ({
  siteWidth = "1440px",
  layout,
  setLayout,
  setLayoutSection,
  isStoreOwner = false,
  products,
  subdomain,
}) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const user = useAuth();
  const cart = useSelector((state) => state.website.cart);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleTextChange = (key, newValue) => {
    setLayout((prev) => ({ ...prev, [key]: newValue }));
  };

  useEffect(() => {
    if (isStoreOwner) {
      setLayoutSection(layoutSection);
    }
  }, [isStoreOwner]);

  return (
    <ThemeProvider
      theme={templateTheme({
        primaryColor: layout.primaryColor,
        secondaryColor: layout.primaryColor,
        textColor: layout.textColor,
      })}
    >
      <div className="temp2">
        <div
          className="template"
          style={{
            transition: "max-width 0.5s ease-in-out",
            maxWidth: siteWidth ? siteWidth : "100%",
            margin: "0 auto",
            color: layout.textColor,
          }}
        >
          <div className="div">
            {token ? null : (
              <Box className="frame-4" backgroundColor="primary.main">
                <p className="sign-up-and-get">
                  <span className="span">
                    Sign up and get 20% off to your first order.{" "}
                  </span>
                  <span
                    className="text-wrapper-5"
                    onClick={() => setSignUpOpen(true)}
                  >
                    Sign Up Now
                  </span>
                </p>
                <CloseOutlined
                  sx={{
                    color: "#ffffff",
                    position: "absolute",
                    right: 0,
                    top: 0,
                  }}
                />
              </Box>
            )}
            <div className="frame-6">
              <div className="text-wrapper-6">
                {layout?.siteName || "SHOP.CO"}
              </div>
              <div className="frame-7">
                <div className="frame-8">
                  <div className="text-wrapper-7">Shop</div>
                </div>
                <div className="text-wrapper-7">On Sale</div>
                <div className="text-wrapper-7">New Arrivals</div>
                <div className="text-wrapper-7">Brands</div>
              </div>
              <Box className="frame-10">
                <SearchOutlined className="frame-11" />
                <InputBase
                  placeholder="Search for products..."
                  fullWidth
                  sx={{
                    color: "inherit",
                    "& .MuiInputBase-input": {
                      p: 0,
                    },
                  }}
                />
              </Box>
              <div className="frame-12" style={{ color: layout.primaryColor }}>
                <Box sx={{ position: "relative" }}>
                  <ShoppingCartOutlined
                    className="frame-11"
                    onClick={() => navigate(`/hive/${subdomain}/cart`)}
                  />
                  {Object.keys(cart).length > 0 && (
                    <Badge
                      badgeContent={Object.keys(cart).length}
                      color="primary"
                      sx={{
                        position: "absolute",
                      }}
                    />
                  )}
                </Box>
                <AccountCircleOutlined
                  className="frame-11"
                  onClick={(e) => {
                    if (token && user) {
                      setAnchorEl(e.currentTarget);
                    } else {
                      setSignInOpen(true);
                    }
                  }}
                />
                <UserMenu
                  user={user}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                />
              </div>
            </div>
            <div className="overlap">
              <figure>
                <div
                  style={{
                    backgroundImage: `url(${layout?.heroImage || first_hero})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </figure>
              <div className="hero-content">
                {isStoreOwner ? (
                  <EditableText
                    className="text-wrapper"
                    textKey="heroTitle"
                    value={
                      layout?.heroTitle ||
                      "FIND CLOTHES THAT MATCHES YOUR STYLE"
                    }
                    onChange={handleTextChange}
                  />
                ) : (
                  <p className="text-wrapper">
                    {layout?.heroTitle ||
                      "FIND CLOTHES THAT MATCHES YOUR STYLE"}
                  </p>
                )}
                {isStoreOwner ? (
                  <EditableText
                    className="p"
                    textKey="heroDescription"
                    value={
                      layout?.heroDescription ||
                      "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style."
                    }
                    onChange={handleTextChange}
                  />
                ) : (
                  <p className="p">
                    {layout?.heroDescription ||
                      "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style."}
                  </p>
                )}
                <Button
                  className="frame text-wrapper-2"
                  style={{
                    backgroundColor: layout.primaryColor,
                  }}
                >
                  Shop Now
                </Button>
                <div className="frame-2">
                  <div className="frame-3">
                    {isStoreOwner ? (
                      <EditableText
                        className="text-wrapper-3"
                        textKey="heroSubDescTitle1"
                        value={layout?.heroSubDescTitle1 || "200+"}
                        onChange={handleTextChange}
                      />
                    ) : (
                      <div className="text-wrapper-3">
                        {layout?.heroSubDescTitle1 || "200+"}
                      </div>
                    )}
                    {isStoreOwner ? (
                      <EditableText
                        className="text-wrapper-4"
                        textKey="heroSubDesc1"
                        value={layout?.heroSubDesc1 || "International Brands"}
                        onChange={handleTextChange}
                      />
                    ) : (
                      <div className="text-wrapper-4">
                        {layout?.heroSubDesc1 || "International Brands"}
                      </div>
                    )}
                  </div>
                  <div className="frame-3">
                    {isStoreOwner ? (
                      <EditableText
                        className="text-wrapper-3"
                        textKey="heroSubDescTitle2"
                        value={layout?.heroSubDescTitle2 || "2,000+"}
                        onChange={handleTextChange}
                      />
                    ) : (
                      <div className="text-wrapper-3">
                        {layout?.heroSubDescTitle2 || "2,000+"}
                      </div>
                    )}
                    {isStoreOwner ? (
                      <EditableText
                        className="text-wrapper-4"
                        textKey="heroSubDesc2"
                        value={layout?.heroSubDesc2 || "High-Quality Products"}
                        onChange={handleTextChange}
                      />
                    ) : (
                      <div className="text-wrapper-4">
                        {layout?.heroSubDesc2 || "High-Quality Products"}
                      </div>
                    )}
                  </div>
                  <div className="frame-3">
                    {isStoreOwner ? (
                      <EditableText
                        className="text-wrapper-3"
                        textKey="heroSubDescTitle3"
                        value={layout?.heroSubDescTitle3 || "30,000+"}
                        onChange={handleTextChange}
                      />
                    ) : (
                      <div className="text-wrapper-3">
                        {layout?.heroSubDescTitle3 || "30,000+"}
                      </div>
                    )}
                    {isStoreOwner ? (
                      <EditableText
                        className="text-wrapper-4"
                        textKey="heroSubDesc3"
                        value={layout?.heroSubDesc3 || "Happy Customers"}
                        onChange={handleTextChange}
                      />
                    ) : (
                      <div className="text-wrapper-4">
                        {layout?.heroSubDesc3 || "Happy Customers"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="overlap-group"
              style={{
                backgroundColor: layout.primaryColor || "#000",
              }}
            >
              {isStoreOwner ? (
                <EditableText
                  className="brand-text"
                  textKey="brand1"
                  value={layout?.brand1 || "VERSACE"}
                  onChange={handleTextChange}
                />
              ) : (
                <h2 className="brand-text">{layout?.brand1 || "VERSACE"}</h2>
              )}
              {isStoreOwner ? (
                <EditableText
                  className="brand-text"
                  textKey="brand2"
                  value={layout?.brand2 || "GUCCI"}
                  onChange={handleTextChange}
                />
              ) : (
                <h2 className="brand-text">{layout?.brand2 || "GUCCI"}</h2>
              )}

              {isStoreOwner ? (
                <EditableText
                  className="brand-text"
                  textKey="brand3"
                  value={layout?.brand3 || "ZARA"}
                  onChange={handleTextChange}
                />
              ) : (
                <h2 className="brand-text">{layout?.brand3 || "ZARA"}</h2>
              )}

              {isStoreOwner ? (
                <EditableText
                  className="brand-text"
                  textKey="brand4"
                  value={layout?.brand4 || "PRADA"}
                  onChange={handleTextChange}
                />
              ) : (
                <h2 className="brand-text">{layout?.brand4 || "PRADA"}</h2>
              )}

              {isStoreOwner ? (
                <EditableText
                  className="brand-text"
                  textKey="brand5"
                  value={layout?.brand5 || "DIOR"}
                  onChange={handleTextChange}
                />
              ) : (
                <h2 className="brand-text">{layout?.brand5 || "DIOR"}</h2>
              )}
            </div>
            <div>
              <div className="text-wrapper-9">
                {isStoreOwner ? (
                  <EditableText
                    className="p"
                    textKey="productListTitle1"
                    value={layout?.productListTitle1 || "NEW ARRIVALS"}
                    onChange={handleTextChange}
                  />
                ) : (
                  <p className="p">
                    {layout?.productListTitle1 || "NEW ARRIVALS"}
                  </p>
                )}
              </div>
              <div className="new-arrivals">
                {(products?.length > 0 ? products : newProducts)
                  ?.slice(0, 4)
                  ?.map((product) => (
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                    />
                  ))}
              </div>
              <div className="frame-32">
                <button className="frame-33">
                  <div className="text-wrapper-24">View All</div>
                </button>
              </div>
            </div>
            <div>
              <div className="text-wrapper-9">
                {isStoreOwner ? (
                  <EditableText
                    className="p"
                    textKey="productListTitle2"
                    value={layout?.productListTitle2 || "TOP SELLING"}
                    onChange={handleTextChange}
                  />
                ) : (
                  <p className="p">
                    {layout?.productListTitle2 || "TOP SELLING"}
                  </p>
                )}
              </div>
              <div className="new-arrivals">
                {topProducts?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="frame-32">
                <button className="frame-33">
                  <div className="text-wrapper-24">View All</div>
                </button>
              </div>
            </div>
            <div className="frame-34-wrapper">
              <div className="frame-35">
                <div className="text-wrapper-9">
                  {isStoreOwner ? (
                    <EditableText
                      className="p"
                      textKey="productListTitle3"
                      value={
                        layout?.productListTitle3 || "BROWSE BY DRESS STYLE"
                      }
                      onChange={handleTextChange}
                    />
                  ) : (
                    <p className="p">
                      {layout?.productListTitle3 || "BROWSE BY DRESS STYLE"}
                    </p>
                  )}
                </div>
                <div className="frame-34">
                  <div className="overlap-group-wrapper">
                    <div
                      className="overlap-group-2"
                      style={{
                        backgroundImage: `url(${brs1})`,
                        transform: "scaleX(-1)",
                      }}
                    ></div>
                    {isStoreOwner ? (
                      <EditableText
                        className="text-wrapper-26"
                        textKey="styleBlk1"
                        value={layout?.styleBlk1 || "Casual"}
                        onChange={handleTextChange}
                      />
                    ) : (
                      <p className="text-wrapper-26">
                        {layout?.styleBlk1 || "Casual"}
                      </p>
                    )}
                  </div>
                  <div className="overlap-wrapper">
                    <div
                      className="overlap-group-2"
                      style={{
                        backgroundImage: `url(${brs2})`,
                        transform: "scaleX(-1)",
                      }}
                    ></div>
                    {isStoreOwner ? (
                      <EditableText
                        className="text-wrapper-26"
                        textKey="styleBlk2"
                        value={layout?.styleBlk2 || "Gym"}
                        onChange={handleTextChange}
                      />
                    ) : (
                      <p className="text-wrapper-26">
                        {layout?.styleBlk2 || "Gym"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="frame-34">
                  <div className="frame-36">
                    <div
                      className="overlap-3"
                      style={{ backgroundImage: `url(${brs3})` }}
                    >
                      {isStoreOwner ? (
                        <EditableText
                          className="text-wrapper-26"
                          textKey="styleBlk3"
                          value={layout?.styleBlk3 || "Formal"}
                          onChange={handleTextChange}
                        />
                      ) : (
                        <p className="text-wrapper-26">
                          {layout?.styleBlk3 || "Formal"}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="overlap-group-wrapper">
                    <div
                      className="overlap-group-2"
                      style={{
                        backgroundImage: `url(${brs4})`,
                        transform: "scaleX(-1)",
                      }}
                    ></div>
                    {isStoreOwner ? (
                      <EditableText
                        className="text-wrapper-26"
                        textKey="styleBlk4"
                        value={layout?.styleBlk4 || "Party"}
                        onChange={handleTextChange}
                      />
                    ) : (
                      <p className="text-wrapper-26">
                        {layout?.styleBlk4 || "Party"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="group-wrapper">
              <div className="group-3">
                <div className="overlap-group-3">
                  <div className="rectangle"></div>
                  <div
                    className="frame-48"
                    style={{
                      backgroundColor: layout.primaryColor,
                    }}
                  >
                    {isStoreOwner ? (
                      <EditableText
                        className="text-wrapper-30"
                        textKey="footerTitle1"
                        value={
                          layout?.footerTitle1 ||
                          "STAY UPTO DATE ABOUT OUR LATEST OFFERS"
                        }
                        onChange={handleTextChange}
                      />
                    ) : (
                      <p className="text-wrapper-30">
                        {layout?.footerTitle1 ||
                          "STAY UPTO DATE ABOUT OUR LATEST OFFERS"}
                      </p>
                    )}
                    <div className="frame-49">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "350px",
                          height: "48px",
                          backgroundColor: "#fff",
                          borderRadius: "999px",
                          boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
                          px: 2,
                          color: "#000",
                        }}
                      >
                        <SearchOutlined className="frame-11" />
                        <InputBase
                          placeholder="Enter your email address"
                          fullWidth
                          sx={{
                            color: "inherit",
                            "& .MuiInputBase-input": {
                              p: 0,
                            },
                          }}
                        />
                      </Box>
                      <Button className="frame-51 text-wrapper-31">
                        Subscribe to Newsletter
                      </Button>
                    </div>
                  </div>
                  <div className="frame-52">
                    <div className="frame-53">
                      <div className="frame-54">
                        <div className="text-wrapper-32">
                          {layout?.siteName || "SHOP.CO"}
                        </div>
                        {isStoreOwner ? (
                          <EditableText
                            className="text-wrapper-33"
                            textKey="footerDesc"
                            value={
                              layout?.footerDesc ||
                              "We have clothes that suits your style and which you’re proud to wear. From women to men."
                            }
                            onChange={handleTextChange}
                          />
                        ) : (
                          <p className="text-wrapper-33">
                            {layout?.footerDesc ||
                              "We have clothes that suits your style and which you’re proud to wear. From women to men."}
                          </p>
                        )}
                      </div>
                      <div className="social">
                        <div
                          className="frame-56"
                          style={{ color: layout?.primaryColor }}
                        >
                          <Facebook fontSize="large" />
                          <GitHub fontSize="large" />
                          <Instagram fontSize="large" />
                        </div>
                      </div>
                    </div>
                    <div className="frame-55">
                      <div className="HELP-MENU">COMPANY</div>
                      <div className="about-features-works">
                        About
                        <br />
                        <br />
                        Features
                        <br />
                        <br />
                        Works
                        <br />
                        <br />
                        Career
                      </div>
                    </div>
                    <div className="frame-55">
                      <div className="HELP-MENU">HELP</div>
                      <p className="span-wrapper">
                        <span className="text-wrapper-34">
                          Customer Support
                          <br />
                          <br />
                          Delivery Details
                          <br />
                          <br />
                          Terms &amp; Conditions
                          <br />
                          <br />
                          Privacy Policy
                        </span>
                      </p>
                    </div>
                    <div className="frame-55">
                      <div className="HELP-MENU">FAQ</div>
                      <div className="about-features-works-2">
                        Account
                        <br />
                        <br />
                        Manage Deliveries
                        <br />
                        <br />
                        Orders
                        <br />
                        <br />
                        Payments
                      </div>
                    </div>
                    <div className="frame-55">
                      <div className="HELP-MENU">RESOURCES</div>
                      <p className="about-features-works">
                        Free eBooks
                        <br />
                        <br />
                        Development Tutorial
                        <br />
                        <br />
                        How to - Blog
                        <br />
                        <br />
                        Youtube Playlist
                      </p>
                    </div>
                  </div>
                  <div className="element-all-rights-wrapper">
                    <p className="element-all-rights">
                      Shop.co © 2000-2023, All Rights Reserved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AuthModals
          siteName={layout?.siteName}
          signInOpen={signInOpen}
          signUpOpen={signUpOpen}
          setSignInOpen={setSignInOpen}
          setSignUpOpen={setSignUpOpen}
        />
      </div>
    </ThemeProvider>
  );
};

export default Templates2;

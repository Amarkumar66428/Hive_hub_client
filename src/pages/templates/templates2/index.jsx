import React, { useRef, useState } from "react";
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
import { Box, Button, InputBase, Rating } from "@mui/material";
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

const Templates2 = ({ siteWidth, layout, isStoreOwner = false }) => {
  const [data, setData] = useState({
    heroTitle: "",
    heroDescription: "",
    heroSubDescTitle1: "",
    heroSubDesc1: "",
    heroSubDescTitle2: "",
    heroSubDesc2: "",
    heroSubDescTitle3: "",
    heroSubDesc3: "",
    brand1: "",
    brand2: "",
    brand3: "",
    brand4: "",
    brand5: "",
    productListTitle1: "",
    productListTitle2: "",
    productListTitle3: "",
    styleBlk1: "",
    styleBlk2: "",
    styleBlk3: "",
    styleBlk4: "",
    footerTitle1: "",
    footerDesc: "",
  });

  const handleTextChange = (key, newValue) => {
    setData((prev) => ({ ...prev, [key]: newValue }));
  };

  return (
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
          <div
            className="frame-4"
            style={{
              backgroundColor: layout.primaryColor,
            }}
          >
            <p className="sign-up-and-get">
              <span className="span">
                Sign up and get 20% off to your first order.{" "}
              </span>
              <span className="text-wrapper-5">Sign Up Now</span>
            </p>
            <CloseOutlined
              sx={{ color: "#ffffff", position: "absolute", right: 0, top: 0 }}
            />
          </div>
          <div className="frame-6">
            <div className="text-wrapper-6">
              {layout?.siteName || "SHOP.CO"}
            </div>
            <div className="frame-7">
              <div className="frame-8">
                <div className="text-wrapper-7">Shop</div>
                <img
                  className="frame-9"
                  src="https://c.animaapp.com/mb9ouoro5Ao2nl/img/frame-6.svg"
                />
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
              <ShoppingCartOutlined className="frame-11" />
              <AccountCircleOutlined className="frame-11" />
            </div>
          </div>
          <div className="overlap">
            <figure>
              <div
                style={{
                  backgroundImage: `url(${first_hero})`,
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
                    data?.heroTitle || "FIND CLOTHES THAT MATCHES YOUR STYLE"
                  }
                  onChange={handleTextChange}
                />
              ) : (
                <p className="text-wrapper">
                  {data?.heroTitle || "FIND CLOTHES THAT MATCHES YOUR STYLE"}
                </p>
              )}
              {isStoreOwner ? (
                <EditableText
                  className="p"
                  textKey="heroDescription"
                  value={
                    data?.heroDescription ||
                    "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style."
                  }
                  onChange={handleTextChange}
                />
              ) : (
                <p className="p">
                  {data?.heroDescription ||
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
                      value={data?.heroSubDescTitle1 || "200+"}
                      onChange={handleTextChange}
                    />
                  ) : (
                    <div className="text-wrapper-3">
                      {data?.heroSubDescTitle1 || "200+"}
                    </div>
                  )}
                  {isStoreOwner ? (
                    <EditableText
                      className="text-wrapper-4"
                      textKey="heroSubDesc1"
                      value={data?.heroSubDesc1 || "International Brands"}
                      onChange={handleTextChange}
                    />
                  ) : (
                    <div className="text-wrapper-4">
                      {data?.heroSubDesc1 || "International Brands"}
                    </div>
                  )}
                </div>
                <div className="frame-3">
                  {isStoreOwner ? (
                    <EditableText
                      className="text-wrapper-3"
                      textKey="heroSubDescTitle2"
                      value={data?.heroSubDescTitle2 || "2,000+"}
                      onChange={handleTextChange}
                    />
                  ) : (
                    <div className="text-wrapper-3">
                      {data?.heroSubDescTitle2 || "2,000+"}
                    </div>
                  )}
                  {isStoreOwner ? (
                    <EditableText
                      className="text-wrapper-4"
                      textKey="heroSubDesc2"
                      value={data?.heroSubDesc2 || "High-Quality Products"}
                      onChange={handleTextChange}
                    />
                  ) : (
                    <div className="text-wrapper-4">
                      {data?.heroSubDesc2 || "High-Quality Products"}
                    </div>
                  )}
                </div>
                <div className="frame-3">
                  {isStoreOwner ? (
                    <EditableText
                      className="text-wrapper-3"
                      textKey="heroSubDescTitle3"
                      value={data?.heroSubDescTitle3 || "30,000+"}
                      onChange={handleTextChange}
                    />
                  ) : (
                    <div className="text-wrapper-3">
                      {data?.heroSubDescTitle3 || "30,000+"}
                    </div>
                  )}
                  {isStoreOwner ? (
                    <EditableText
                      className="text-wrapper-4"
                      textKey="heroSubDesc3"
                      value={data?.heroSubDesc3 || "Happy Customers"}
                      onChange={handleTextChange}
                    />
                  ) : (
                    <div className="text-wrapper-4">
                      {data?.heroSubDesc3 || "Happy Customers"}
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
                value={data?.brand1 || "VERSACE"}
                onChange={handleTextChange}
              />
            ) : (
              <h2 className="brand-text">{data?.brand1 || "VERSACE"}</h2>
            )}
            {isStoreOwner ? (
              <EditableText
                className="brand-text"
                textKey="brand2"
                value={data?.brand2 || "GUCCI"}
                onChange={handleTextChange}
              />
            ) : (
              <h2 className="brand-text">{data?.brand2 || "GUCCI"}</h2>
            )}

            {isStoreOwner ? (
              <EditableText
                className="brand-text"
                textKey="brand3"
                value={data?.brand3 || "ZARA"}
                onChange={handleTextChange}
              />
            ) : (
              <h2 className="brand-text">{data?.brand3 || "ZARA"}</h2>
            )}

            {isStoreOwner ? (
              <EditableText
                className="brand-text"
                textKey="brand4"
                value={data?.brand4 || "PRADA"}
                onChange={handleTextChange}
              />
            ) : (
              <h2 className="brand-text">{data?.brand4 || "PRADA"}</h2>
            )}

            {isStoreOwner ? (
              <EditableText
                className="brand-text"
                textKey="brand5"
                value={data?.brand5 || "DIOR"}
                onChange={handleTextChange}
              />
            ) : (
              <h2 className="brand-text">{data?.brand5 || "DIOR"}</h2>
            )}
          </div>
          <div>
            <div className="text-wrapper-9">
              {isStoreOwner ? (
                <EditableText
                  className="p"
                  textKey="productListTitle1"
                  value={data?.productListTitle1 || "NEW ARRIVALS"}
                  onChange={handleTextChange}
                />
              ) : (
                <p className="p">{data?.productListTitle1 || "NEW ARRIVALS"}</p>
              )}
            </div>
            <div className="new-arrivals">
              <div className="image-wrapper">
                <figure>
                  <img className="image" src={new1} />
                </figure>
                <p className="title">T-SHIRT WITH TAPE DETAILS</p>
                <div className="frame-13">
                  <div className="frame-14">
                    <Rating
                      name="half-rating-read"
                      defaultValue={2.5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <p className="element">
                    <span className="text-wrapper-12">4.5/</span>{" "}
                    <span className="text-wrapper-13">5</span>
                  </p>
                </div>
                <div className="div-wrapper">
                  <div className="text-wrapper-15">$120</div>
                </div>
              </div>
              <div className="image-wrapper">
                <figure>
                  <img className="image" src={new2} />
                </figure>
                <p className="title">SKINNY FIT JEANS</p>
                <div className="frame-13">
                  <div className="frame-14">
                    <Rating
                      name="half-rating-read"
                      defaultValue={2.5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <p className="element">
                    <span className="text-wrapper-12">4.5/</span>{" "}
                    <span className="text-wrapper-13">5</span>
                  </p>
                </div>
                <div className="frame-22">
                  <div className="text-wrapper-15">$240</div>
                  <div className="text-wrapper-16">$260</div>
                  <div className="frame-21">
                    <div className="text-wrapper-18">-20%</div>
                  </div>
                </div>
              </div>
              <div className="image-wrapper">
                <figure>
                  <img className="image" src={new3} />
                </figure>
                <p className="title">CHECKERED SHIRT</p>
                <div className="frame-13">
                  <div className="frame-14">
                    <Rating
                      name="half-rating-read"
                      defaultValue={2.5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <p className="element">
                    <span className="text-wrapper-12">4.5/</span>{" "}
                    <span className="text-wrapper-13">5</span>
                  </p>
                </div>
                <div className="div-wrapper">
                  <div className="text-wrapper-15">$120</div>
                </div>
              </div>
              <div className="image-wrapper">
                <figure>
                  <img className="image" src={new4} />
                </figure>
                <p className="title">SLEEVE STRIPED T-SHIRT</p>
                <div className="frame-13">
                  <div className="frame-14">
                    <Rating
                      name="half-rating-read"
                      defaultValue={2.5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <p className="element">
                    <span className="text-wrapper-12">4.5/</span>{" "}
                    <span className="text-wrapper-13">5</span>
                  </p>
                </div>
                <div className="frame-22">
                  <div className="text-wrapper-15">$240</div>
                  <div className="text-wrapper-16">$260</div>
                  <div className="frame-21">
                    <div className="text-wrapper-18">-20%</div>
                  </div>
                </div>
              </div>
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
                  value={data?.productListTitle2 || "TOP SELLING"}
                  onChange={handleTextChange}
                />
              ) : (
                <p className="p">{data?.productListTitle2 || "TOP SELLING"}</p>
              )}
            </div>
            <div className="new-arrivals">
              <div className="image-wrapper">
                <figure>
                  <img className="image" src={topS1} />
                </figure>
                <p className="title">VERTICAL STRIPED SHIRT</p>
                <div className="frame-13">
                  <div className="frame-14">
                    <Rating
                      name="half-rating-read"
                      defaultValue={2.5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <p className="element">
                    <span className="text-wrapper-12">4.5/</span>{" "}
                    <span className="text-wrapper-13">5</span>
                  </p>
                </div>
                <div className="div-wrapper">
                  <div className="text-wrapper-15">$120</div>
                </div>
              </div>
              <div className="image-wrapper">
                <figure>
                  <img className="image" src={topS2} />
                </figure>
                <p className="title">COURAGE GRAPHIC T-SHIRT</p>
                <div className="frame-13">
                  <div className="frame-14">
                    <Rating
                      name="half-rating-read"
                      defaultValue={2.5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <p className="element">
                    <span className="text-wrapper-12">4.5/</span>{" "}
                    <span className="text-wrapper-13">5</span>
                  </p>
                </div>
                <div className="frame-22">
                  <div className="text-wrapper-15">$240</div>
                  <div className="text-wrapper-16">$260</div>
                  <div className="frame-21">
                    <div className="text-wrapper-18">-20%</div>
                  </div>
                </div>
              </div>
              <div className="image-wrapper">
                <figure>
                  <img className="image" src={topS3} />
                </figure>
                <p className="title">LOOSE FIT BERMUDA SHORTS</p>
                <div className="frame-13">
                  <div className="frame-14">
                    <Rating
                      name="half-rating-read"
                      defaultValue={2.5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <p className="element">
                    <span className="text-wrapper-12">4.5/</span>{" "}
                    <span className="text-wrapper-13">5</span>
                  </p>
                </div>
                <div className="div-wrapper">
                  <div className="text-wrapper-15">$120</div>
                </div>
              </div>
              <div className="image-wrapper">
                <figure>
                  <img className="image" src={topS4} />
                </figure>
                <p className="title">FADED SKINNY JEANS</p>
                <div className="frame-13">
                  <div className="frame-14">
                    <Rating
                      name="half-rating-read"
                      defaultValue={2.5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <p className="element">
                    <span className="text-wrapper-12">4.5/</span>{" "}
                    <span className="text-wrapper-13">5</span>
                  </p>
                </div>
                <div className="frame-22">
                  <div className="text-wrapper-15">$240</div>
                  <div className="text-wrapper-16">$260</div>
                  <div className="frame-21">
                    <div className="text-wrapper-18">-20%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-32">
              <button className="frame-33">
                <div className="text-wrapper-24">View All</div>
              </button>
            </div>
          </div>
          <img
            className="line-2"
            src="https://c.animaapp.com/mb9ouoro5Ao2nl/img/line-8.svg"
          />

          <div className="frame-34-wrapper">
            <div className="frame-35">
              <div className="text-wrapper-9">
                {isStoreOwner ? (
                  <EditableText
                    className="p"
                    textKey="productListTitle3"
                    value={data?.productListTitle3 || "BROWSE BY DRESS STYLE"}
                    onChange={handleTextChange}
                  />
                ) : (
                  <p className="p">
                    {data?.productListTitle3 || "BROWSE BY DRESS STYLE"}
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
                      value={data?.styleBlk1 || "Casual"}
                      onChange={handleTextChange}
                    />
                  ) : (
                    <p className="text-wrapper-26">
                      {data?.styleBlk1 || "Casual"}
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
                      value={data?.styleBlk2 || "Gym"}
                      onChange={handleTextChange}
                    />
                  ) : (
                    <p className="text-wrapper-26">
                      {data?.styleBlk2 || "Gym"}
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
                        value={data?.styleBlk3 || "Formal"}
                        onChange={handleTextChange}
                      />
                    ) : (
                      <p className="text-wrapper-26">
                        {data?.styleBlk3 || "Formal"}
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
                      value={data?.styleBlk4 || "Party"}
                      onChange={handleTextChange}
                    />
                  ) : (
                    <p className="text-wrapper-26">
                      {data?.styleBlk4 || "Party"}
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
                        data?.footerTitle1 ||
                        "STAY UPTO DATE ABOUT OUR LATEST OFFERS"
                      }
                      onChange={handleTextChange}
                    />
                  ) : (
                    <p className="text-wrapper-30">
                      {data?.footerTitle1 ||
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
                            data?.footerDesc ||
                            "We have clothes that suits your style and which you’re proud to wear. From women to men."
                          }
                          onChange={handleTextChange}
                        />
                      ) : (
                        <p className="text-wrapper-33">
                          {data?.footerDesc ||
                            "We have clothes that suits your style and which you’re proud to wear. From women to men."}
                        </p>
                      )}
                    </div>
                    <div className="social">
                      <div className="logo-twitter-wrapper">
                        <div className="logo-twitter"></div>
                      </div>
                      <div className="logo-fb-simple-wrapper">
                        <div className="logo-fb-simple"></div>
                      </div>
                      <div className="logo-instagram-wrapper">
                        <div className="logo-instagram"></div>
                      </div>
                      <div className="logo-github-wrapper">
                        <div className="logo-github"></div>
                      </div>
                    </div>
                  </div>
                  <div className="frame-55">
                    <div className="HELP-MENU">COMPANY</div>
                    <div className="about-features-works">
                      About&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <br />
                      <br />
                      Features&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <br />
                      <br />
                      Works&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                <div
                  className="frame-56"
                  style={{ color: layout?.primaryColor }}
                >
                  <Facebook className="badge" />
                  <GitHub className="badge-2" />
                  <Instagram className="badge-3" />
                </div>
                <p className="element-all-rights">
                  Shop.co © 2000-2023, All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates2;

const EditableText = ({ className, textKey, value, onChange }) => {
  const ref = useRef(null);

  const handleClick = () => {
    const el = ref.current;
    el.setAttribute("contenteditable", "true");
    el.focus();

    // Move cursor to end
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const handleBlur = () => {
    const el = ref.current;
    el.removeAttribute("contenteditable");
    onChange(textKey, el.innerText);
  };

  return (
    <div
      className={className}
      ref={ref}
      onClick={handleClick}
      onBlur={handleBlur}
      style={{
        border: "1px solid rgb(101, 182, 248)",
        cursor: "pointer",
        whiteSpace: "pre-wrap",
        direction: "ltr",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.borderColor = "rgb(101, 182, 248)")
      }
      onMouseOut={(e) => (e.currentTarget.style.borderColor = "transparent")}
    >
      {value}
    </div>
  );
};

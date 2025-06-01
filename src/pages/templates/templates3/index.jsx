import React from "react";
import "./global.css";
import { Box, IconButton, Rating } from "@mui/material";
import {
  FavoriteBorderOutlined,
  MenuBookOutlined,
  RemoveRedEyeOutlined,
  SchoolOutlined,
  ShoppingCartOutlined,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import first_hero from "../../../assets/storePage/temp3/first_hero.webp";
import sec_hero from "../../../assets/storePage/temp3/sec_hero.webp";
import vec1 from "../../../assets/storePage/temp3/vec1.svg";
import vec2 from "../../../assets/storePage/temp3/vec2.svg";
import rec1 from "../../../assets/storePage/temp3/rec1.svg";
import rec2 from "../../../assets/storePage/temp3/rec2.svg";
import rec3 from "../../../assets/storePage/temp3/rec3.svg";
import img1 from "../../../assets/storePage/temp3/image 1.webp";
import img3 from "../../../assets/storePage/temp3/image 3.webp";
import exp1 from "../../../assets/storePage/temp3/exp1.webp";
import exp2 from "../../../assets/storePage/temp3/exp2.webp";
import exp3 from "../../../assets/storePage/temp3/exp3.webp";
import crs1 from "../../../assets/storePage/temp3/crs1.webp";
import crs2 from "../../../assets/storePage/temp3/crs2.webp";
import crs3 from "../../../assets/storePage/temp3/crs3.webp";
import crs4 from "../../../assets/storePage/temp3/crs4.webp";
import cl1 from "../../../assets/storePage/temp3/cl1.webp";
import cl2 from "../../../assets/storePage/temp3/cl2.webp";

const Templates3 = () => {
  return (
    <Box
      className="temp3"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#F9F9F9",
      }}
    >
      <div className="template">
        <div className="header">
          <div className="overlap">
            <div className="background">
              <div className="hero-bg-shape">
                <div className="overlap-group">
                  <div className="none">
                    <div className="div">
                      <div className="rectangle"></div>
                      <div className="rectangle-2"></div>
                    </div>
                  </div>
                  <div className="overlap-wrapper">
                    <div className="overlap-2">
                      <div className="frame">
                        <img className="img" src={rec1} />
                      </div>
                      <img className="vector" src={vec1} />
                      <img className="vector-2" src={vec2} />
                      <img className="placeholder" src={first_hero} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="navbar-style">
                <div className="navbar-brand-sec">
                  <div className="text-wrapper">Brandname</div>
                </div>
                <div className="navbar-toggler"></div>
                <div className="collapse-navbar">
                  <div className="navbar-nav">
                    <div className="li-sec">
                      <div className="a">
                        <div className="link">Home</div>
                      </div>
                    </div>
                    <div className="a-wrapper">
                      <div className="a">
                        <div className="link">Product</div>
                      </div>
                    </div>
                    <div className="div-wrapper">
                      <div className="a">
                        <div className="link">Pricing</div>
                      </div>
                    </div>
                    <div className="li-sec-2">
                      <div className="a">
                        <div className="link">Contact</div>
                      </div>
                    </div>
                  </div>
                  <div className="navbar-nav-2">
                    <div className="nav-item-sec">
                      <button className="btn-text-wrapper">
                        <div className="btn-text">Login</div>
                      </button>
                    </div>
                    <div className="button-btn-primary-wrapper">
                      <div className="button-btn-primary">
                        <div className="btn-text-2">JOIN US</div>
                        <img
                          className="icn-arrow-right-icn"
                          src="https://c.animaapp.com/mb9pesf442tRSF/img/icn-arrow-right--icn-xs-3.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-2">
              <div className="row">
                <div className="col-md">
                  <div className="header-tag-sec">Join Us</div>
                  <div className="headline-sec">25K+ STUDENTS TRUST US</div>
                  <p className="sub-headline-sec">
                    Every day brings with it a fresh set of learning
                    possibilities.
                  </p>
                  <div className="cta">
                    <div className="button-md-sec">
                      <div className="btn-text-3">Get Quote Now</div>
                    </div>
                    <button className="button">
                      <div className="btn-text-4">Learn More</div>
                    </button>
                  </div>
                </div>
                <div className="col-md-2"></div>
              </div>
              <div className="row">
                <div className="card-wrapper">
                  <div className="card">
                    <div className="circle-sec">
                      <SchoolOutlined sx={{ color: "#fff", fontSize: "3em" }} />
                    </div>
                    <div className="text-wrapper-2">Expert instruction</div>
                    <div className="fixed-width-fixed"></div>
                    <p className="p">
                      The gradual accumulation of <br />
                      information about atomic and <br />
                      small-scale behaviour...
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="circle-sec">
                      <WorkspacePremiumOutlined
                        sx={{ color: "#fff", fontSize: "3em" }}
                      />
                    </div>
                    <div className="text-wrapper-2">Training Courses</div>
                    <div className="fixed-width-fixed"></div>
                    <p className="p">
                      The gradual accumulation of <br />
                      information about atomic and <br />
                      small-scale behaviour...
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="circle-sec">
                      <MenuBookOutlined
                        sx={{ color: "#fff", fontSize: "3em" }}
                      />
                    </div>
                    <div className="text-wrapper-2">Expert instruction</div>
                    <div className="fixed-width-fixed"></div>
                    <p className="p">
                      The gradual accumulation of <br />
                      information about atomic and <br />
                      small-scale behaviour...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="stats">
          <div className="row-wrapper">
            <div className="row-2">
              <div className="div-2">
                <div className="metrics">15K</div>
                <div className="metrics-title">Happy Customers</div>
              </div>
              <div className="div-3">
                <div className="metrics">150K</div>
                <div className="metrics-title">Monthly Visitors</div>
              </div>
              <div className="div-4">
                <div className="metrics">15</div>
                <div className="metrics-title">
                  Countries&nbsp;&nbsp;Worldwide
                </div>
              </div>
              <div className="div-4">
                <div className="metrics">100+</div>
                <div className="metrics-title">Top Partners</div>
              </div>
            </div>
          </div>
        </div>
        <div className="element-layout">
          <div className="container-3">
            <div className="row-3">
              <div className="col-md-4">
                <div className="fixed-width-fixed-2"></div>
                <div className="section-title">Every Client Matters</div>
                <p className="p">
                  Problems trying to resolve the conflict between <br />
                  the two major realms of classNameical physics:
                  <br />
                  Newtonian mechanics
                </p>
                <div className="div-5">
                  <div className="text-wrapper-3">Learn More</div>
                  <img
                    className="icon-arrow-next"
                    src="https://c.animaapp.com/mb9pesf442tRSF/img/icon-arrow-next.svg"
                  />
                </div>
              </div>
              <div className="thumb-concept-wrapper">
                <div className="thumb-concept">
                  <div className="overlap-3">
                    <div className="overlap-group-2">
                      <img className="rectangle-3" src={rec3} />
                      <img className="rectangle-4" src={rec3} />
                      <img className="technology" src={sec_hero} />
                      <img className="image" src={img1} />
                      <img className="image-2" src={img3} />
                    </div>
                    <img className="rectangle-5" src={rec2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-wrapper">
          <div className="container-4">
            <div className="main-content-wrapper">
              <div className="main-content">
                <div className="text-wrapper-4">Practice Advice</div>
                <div className="section-title">Our Experts Teacher</div>
                <p className="p">
                  Problems trying to resolve the conflict between <br />
                  the two major realms of classNameical physics: Newtonian
                  mechanics
                </p>
              </div>
            </div>
            <div className="row-4">
              <div className="col-md-5">
                <div className="product-card">
                  <div
                    className="fixed-height"
                    style={{ background: `url(${exp1}) 50% 50% / cover` }}
                  >
                    <div className="product-actions-sec">
                      <div className="icn-favorite-wrapper">
                        <IconButton sx={{ color: "white" }}>
                          <FavoriteBorderOutlined
                            sx={{ color: "#000" }}
                            size="small"
                          />
                        </IconButton>
                      </div>
                      <div className="icn-favorite-wrapper">
                        <IconButton sx={{ color: "white" }}>
                          <ShoppingCartOutlined
                            sx={{ color: "#000" }}
                            size="small"
                          />
                        </IconButton>
                      </div>
                      <div className="icn-favorite-wrapper">
                        <IconButton sx={{ color: "white" }}>
                          <RemoveRedEyeOutlined
                            sx={{ color: "#000" }}
                            size="small"
                          />
                        </IconButton>
                      </div>
                    </div>
                    <div className="tag-sec">
                      <div className="text-wrapper-5">Sale</div>
                    </div>
                  </div>
                  <div className="frame-2">
                    <div className="frame-3">
                      <div className="div-5">
                        <div className="text-wrapper-3">Training Courses</div>
                      </div>
                      <div className="frame-sec">
                        <img
                          className="img-2"
                          src="https://c.animaapp.com/mb9pesf442tRSF/img/icon-emojione-star-1.svg"
                        />
                        <div className="small">4.9</div>
                      </div>
                    </div>
                    <div className="product-title">Get Quality Education</div>
                    <p className="p">
                      We focus on ergonomics and meeting <br />
                      you where you work. It&#39;s only a <br />
                      keystroke away.
                    </p>
                    <div className="div-5">
                      <img
                        className="img-2"
                        src="https://c.animaapp.com/mb9pesf442tRSF/img/frame-sec--1.svg"
                      />
                      <div className="text-wrapper-6">15 Sales</div>
                    </div>
                    <div className="prices">
                      <div className="price-sec">$16.48</div>
                      <div className="h-price-sec">$6.48</div>
                    </div>
                    <button className="button-sm-sec">
                      <div className="h">Learn More</div>
                      <img
                        className="icn-arrow-right-icn-2"
                        src="https://c.animaapp.com/mb9pesf442tRSF/img/icn-arrow-right--icn-xs.svg"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="product-card">
                  <div
                    className="fixed-height-2"
                    style={{ background: `url(${exp2}) 50% 50% / cover` }}
                  >
                    <div className="product-actions-sec">
                      <div className="icn-favorite-wrapper">
                        <IconButton sx={{ color: "white" }}>
                          <FavoriteBorderOutlined
                            sx={{ color: "#000" }}
                            size="small"
                          />
                        </IconButton>
                      </div>
                      <div className="icn-favorite-wrapper">
                        <IconButton sx={{ color: "white" }}>
                          <ShoppingCartOutlined
                            sx={{ color: "#000" }}
                            size="small"
                          />
                        </IconButton>
                      </div>
                      <div className="icn-favorite-wrapper">
                        <IconButton sx={{ color: "white" }}>
                          <RemoveRedEyeOutlined
                            sx={{ color: "#000" }}
                            size="small"
                          />
                        </IconButton>
                      </div>
                    </div>
                    <div className="tag-sec">
                      <div className="text-wrapper-5">Sale</div>
                    </div>
                  </div>
                  <div className="frame-2">
                    <div className="frame-3">
                      <div className="div-5">
                        <div className="text-wrapper-3">
                          2,769 online courses
                        </div>
                      </div>
                      <div className="frame-sec">
                        <img
                          className="img-2"
                          src="https://c.animaapp.com/mb9pesf442tRSF/img/icon-emojione-star-1.svg"
                        />
                        <div className="small">4.9</div>
                      </div>
                    </div>
                    <div className="product-title">Our Popular Courses</div>
                    <p className="p">
                      We focus on ergonomics and meeting <br />
                      you where you work. It&#39;s only a <br />
                      keystroke away.
                    </p>
                    <div className="div-5">
                      <img
                        className="img-2"
                        src="https://c.animaapp.com/mb9pesf442tRSF/img/frame-sec--1.svg"
                      />
                      <div className="text-wrapper-6">15 Sales</div>
                    </div>
                    <div className="prices">
                      <div className="price-sec">$16.48</div>
                      <div className="h-price-sec">$6.48</div>
                    </div>
                    <button className="button-sm-sec">
                      <div className="h">Learn More</div>
                      <img
                        className="icn-arrow-right-icn-2"
                        src="https://c.animaapp.com/mb9pesf442tRSF/img/icn-arrow-right--icn-xs.svg"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-card-2">
                  <div
                    className="fixed-height-3"
                    style={{ background: `url(${exp3}) 50% 50% / cover` }}
                  >
                    <div className="product-actions-sec">
                      <div className="icn-favorite-wrapper">
                        <IconButton sx={{ color: "white" }}>
                          <FavoriteBorderOutlined
                            sx={{ color: "#000" }}
                            size="small"
                          />
                        </IconButton>
                      </div>
                      <div className="icn-favorite-wrapper">
                        <IconButton sx={{ color: "white" }}>
                          <ShoppingCartOutlined
                            sx={{ color: "#000" }}
                            size="small"
                          />
                        </IconButton>
                      </div>
                      <div className="icn-favorite-wrapper">
                        <IconButton sx={{ color: "white" }}>
                          <RemoveRedEyeOutlined
                            sx={{ color: "#000" }}
                            size="small"
                          />
                        </IconButton>
                      </div>
                    </div>
                    <div className="tag-sec">
                      <div className="text-wrapper-5">Sale</div>
                    </div>
                  </div>
                  <div className="frame-2">
                    <div className="frame-3">
                      <div className="div-5">
                        <div className="text-wrapper-3">Expert instruction</div>
                      </div>
                      <div className="frame-sec">
                        <img
                          className="img-2"
                          src="https://c.animaapp.com/mb9pesf442tRSF/img/icon-emojione-star.svg"
                        />
                        <div className="small">4.9</div>
                      </div>
                    </div>
                    <div className="product-title">Most Popular Courses</div>
                    <p className="p">
                      We focus on ergonomics and meeting <br />
                      you where you work. It&#39;s only a <br />
                      keystroke away.
                    </p>
                    <div className="div-5">
                      <img
                        className="img-2"
                        src="https://c.animaapp.com/mb9pesf442tRSF/img/frame-sec-.svg"
                      />
                      <div className="text-wrapper-6">15 Sales</div>
                    </div>
                    <div className="prices">
                      <div className="price-sec">$16.48</div>
                      <div className="h-price-sec">$6.48</div>
                    </div>
                    <button className="button-sm-sec">
                      <div className="h">Learn More</div>
                      <img
                        className="icn-arrow-right-icn-2"
                        src="https://c.animaapp.com/mb9pesf442tRSF/img/icn-arrow-right--icn-xs.svg"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="element-layout-2">
          <div className="container-4">
            <div className="main-content-wrapper">
              <div className="main-content">
                <div className="text-wrapper-4">Practice Advice</div>
                <div className="section-title">Every Client Matters</div>
                <p className="p">
                  Problems trying to resolve the conflict between <br />
                  the two major realms of classNameical physics: Newtonian
                  mechanics
                </p>
              </div>
            </div>
            <div className="row-4">
              <div className="col-md-5">
                <div className="testimonials-card">
                  <div className="card-content">
                    <div className="stars">
                      <Rating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <p className="paragraph">
                      Slate helps you see <br />
                      how many more days <br />
                      you need to work to <br />
                      reach your financial
                      <br />
                      goal for the month <br />
                      and year.
                    </p>
                  </div>
                  <div className="div-6">
                    <div
                      className="circle"
                      style={{ background: `url(${cl1}) 50% 50% / cover` }}
                    ></div>
                    <div className="div-7">
                      <div className="text-wrapper-4">Regina Miles</div>
                      <div className="h-2">Designer</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="testimonials-card">
                  <div className="card-content">
                    <div className="stars">
                      <Rating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <p className="paragraph">
                      Slate helps you see <br />
                      how many more days <br />
                      you need to work to <br />
                      reach your financial
                      <br />
                      goal for the month <br />
                      and year.
                    </p>
                  </div>
                  <div className="div-6">
                    <div
                      className="circle-2"
                      style={{ background: `url(${cl2}) 50% 50% / cover` }}
                    ></div>
                    <div className="div-7">
                      <div className="text-wrapper-4">Regina Miles</div>
                      <div className="h-2">Designer</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="testimonials-card-2">
                  <div className="card-content">
                    <div className="stars">
                      <Rating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <p className="paragraph">
                      Slate helps you see <br />
                      how many more days <br />
                      you need to work to <br />
                      reach your financial
                      <br />
                      goal for the month <br />
                      and year.
                    </p>
                  </div>
                  <div className="div-6">
                    <div
                      className="circle-3"
                      style={{ background: `url(${crs2}) 50% 50% / cover` }}
                    ></div>
                    <div className="div-7">
                      <div className="text-wrapper-4">Regina Miles</div>
                      <div className="h-2">Designer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="element-layout-3">
          <div className="container-5">
            <div className="main-content-wrapper">
              <div className="main-content">
                <div className="text-wrapper-4">Team</div>
                <div className="text-wrapper-2">Our Popular Courses</div>
                <p className="p">
                  Problems trying to resolve the conflict between <br />
                  the two major realms of classNameical physics: Newtonian
                  mechanics
                </p>
              </div>
            </div>
            <div className="row-2">
              <div className="div-2">
                <div className="user-card">
                  <div
                    className="fixed-height-sec"
                    style={{ background: `url(${crs1}) 50% 50% / cover` }}
                  ></div>
                  <div className="card-content-2">
                    <div className="user-title-sec">Julian Jameson</div>
                    <div className="small-job">Profession</div>
                    <div className="div-8">
                      <div className="facebook"></div>
                      <div className="instagram"></div>
                      <div className="twitter"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-3">
                <div className="user-card">
                  <div
                    className="fixed-height-sec"
                    style={{ background: `url(${crs2}) 50% 50% / cover` }}
                  ></div>
                  <div className="card-content-2">
                    <div className="user-title-sec">Julian Jameson</div>
                    <div className="small-job">Profession</div>
                    <div className="div-8">
                      <div className="facebook"></div>
                      <div className="instagram"></div>
                      <div className="twitter"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-4">
                <div className="user-card">
                  <div
                    className="fixed-height-sec"
                    style={{ background: `url(${crs3}) 50% 50% / cover` }}
                  ></div>
                  <div className="card-content-2">
                    <div className="user-title-sec">Julian Jameson</div>
                    <div className="small-job">Profession</div>
                    <div className="div-8">
                      <div className="facebook"></div>
                      <div className="instagram"></div>
                      <div className="twitter"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-4">
                <div className="user-card">
                  <div
                    className="fixed-height-sec"
                    style={{ background: `url(${crs4}) 50% 50% / cover` }}
                  ></div>
                  <div className="card-content-2">
                    <div className="user-title-sec">Julian Jameson</div>
                    <div className="small-job">Profession</div>
                    <div className="div-8">
                      <div className="facebook"></div>
                      <div className="instagram"></div>
                      <div className="twitter"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="element-layout-4">
          <div className="container-4">
            <div className="row-5">
              <div className="main-content-2">
                <div className="section-tag-sec">Newsletter</div>
                <div className="h-section-title">Watch our Courses</div>
                <p className="paragraph-sec">
                  Problems trying to resolve the conflict between <br />
                  the two major realms of classNameical physics: Newtonian
                  mechanics
                </p>
              </div>
            </div>
            <div className="row-sec">
              <div className="subscribe-wrapper">
                <div className="subscribe">
                  <div className="input-group">
                    <div className="overlap-group-3">
                      <div className="form-control-input">
                        <div className="text-wrapper-7">Your Email</div>
                      </div>
                      <button className="input-group-append">
                        <div className="btn">
                          <div className="input-group-text">Subscribe</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="div-9">
            <div className="container-6">
              <div className="row-2">
                <div className="col-md-7">
                  <div className="h-3">Company Info</div>
                  <div className="div-10">
                    <div className="link-2">About Us</div>
                    <div className="link-3">Carrier</div>
                    <div className="link-3">We are hiring</div>
                    <div className="link-3">Blog</div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="h-3">Legal</div>
                  <div className="div-10">
                    <div className="link-2">About Us</div>
                    <div className="link-3">Carrier</div>
                    <div className="link-3">We are hiring</div>
                    <div className="link-3">Blog</div>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="h-3">Features</div>
                  <div className="div-10">
                    <div className="link-2">Business Marketing</div>
                    <div className="link-3">User Analytic</div>
                    <div className="link-3">Live Chat</div>
                    <div className="link-3">Unlimited Support</div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="h-3">Resources</div>
                  <div className="div-10">
                    <div className="link-2">IOS &amp; Android</div>
                    <div className="link-3">Watch a Demo</div>
                    <div className="link-3">Customers</div>
                    <div className="link-3">API</div>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="h-3">Get In Touch</div>
                  <div className="div-10">
                    <div className="div-5">
                      <img
                        className="bx-bx-phone"
                        src="https://c.animaapp.com/mb9pesf442tRSF/img/bx-bx-phone.svg"
                      />
                      <div className="text-wrapper-6">(480) 555-0103</div>
                    </div>
                    <div className="div-5">
                      <img
                        className="bx-bx-map"
                        src="https://c.animaapp.com/mb9pesf442tRSF/img/bx-bx-map.svg"
                      />
                      <p className="h-4">
                        4517 Washington Ave. Manchester, <br />
                        Kentucky 39495
                      </p>
                    </div>
                    <div className="div-5">
                      <img
                        className="carbon-send-alt"
                        src="https://c.animaapp.com/mb9pesf442tRSF/img/carbon-send-alt.svg"
                      />
                      <div className="h-5">debra.holt@example.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="div-11">
            <div className="container-7">
              <div className="row-6">
                <div className="col-md-10">
                  <p className="text-wrapper-6">
                    Made With Love By Figmaland All Right Reserved
                  </p>
                </div>
                <div className="social-media-wrapper">
                  <div className="div-8">
                    <div className="facebook"></div>
                    <div className="instagram"></div>
                    <div className="twitter"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Box>
  );
};

export default Templates3;

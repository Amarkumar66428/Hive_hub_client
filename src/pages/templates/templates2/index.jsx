import React from "react";
import "./global.css";
import {
  AccountCircleOutlined,
  CloseOutlined,
  East,
  Facebook,
  GitHub,
  Instagram,
  SearchOutlined,
  ShoppingCartOutlined,
  West,
} from "@mui/icons-material";
import { Rating, Typography } from "@mui/material";
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
import crs4 from "../../../assets/storePage/temp3/crs4.webp";
import cl1 from "../../../assets/storePage/temp3/cl1.webp";
import cl2 from "../../../assets/storePage/temp3/cl2.webp";

const Templates2 = ({ siteWidth, layout }) => {
  return (
    <div className="temp2">
      <div
        className="template"
        style={{
          transition: "max-width 0.5s ease-in-out",
          maxWidth: siteWidth ? siteWidth : "100%",
          margin: "0 auto",
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
            <div className="text-wrapper-6">SHOP.CO</div>
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
            <div className="frame-10">
              <SearchOutlined className="frame-11" />
              <div className="text-wrapper-8">Search for products...</div>
            </div>
            <div className="frame-12">
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
              <p className="text-wrapper">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </p>
              <p className="p">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <button
                className="frame"
                style={{
                  backgroundColor: layout.primaryColor,
                }}
              >
                <div className="text-wrapper-2">Shop Now</div>
              </button>
              <div className="frame-2">
                <div className="frame-3">
                  <div className="text-wrapper-3">200+</div>
                  <div className="text-wrapper-4">International Brands</div>
                </div>
                <img
                  className="line"
                  src="https://c.animaapp.com/mb9ouoro5Ao2nl/img/line-9.svg"
                />
                <div className="frame-3">
                  <div className="text-wrapper-3">2,000+</div>
                  <div className="text-wrapper-4">High-Quality Products</div>
                </div>
                <img
                  className="line"
                  src="https://c.animaapp.com/mb9ouoro5Ao2nl/img/line-9.svg"
                />
                <div className="frame-3">
                  <div className="text-wrapper-3">30,000+</div>
                  <div className="text-wrapper-4">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="overlap-group"
            style={{
              backgroundColor: layout.primaryColor,
            }}
          >
            <Typography variant="h1">VERSACE</Typography>
            <Typography variant="h1">GUCCI</Typography>
            <Typography variant="h1">ZARA</Typography>
            <Typography variant="h1">PRADA</Typography>
            <Typography variant="h1">DIOR</Typography>
          </div>
          <div>
            <div className="text-wrapper-9">NEW ARRIVALS</div>
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
          </div>
          <div>
            <div className="text-wrapper-10">top selling</div>
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
          </div>
          <div className="frame-33">
            <div className="text-wrapper-24">View All</div>
          </div>
          <div className="frame-34">
            <div className="text-wrapper-24">View All</div>
          </div>
          <img
            className="line-2"
            src="https://c.animaapp.com/mb9ouoro5Ao2nl/img/line-8.svg"
          />
          <div className="frame-35">
            <div className="text-wrapper-25">BROWSE BY dress STYLE</div>
            <div className="overlap-group-wrapper">
              <div
                className="overlap-group-2"
                style={{ backgroundImage: `url(${brs1})` }}
              >
                <div className="text-wrapper-26">Casual</div>
              </div>
            </div>
            <div className="overlap-wrapper">
              <div className="overlap-2">
                <img className="image-5" src={brs2} />
                <div className="text-wrapper-27">Gym</div>
              </div>
            </div>
            <div className="frame-36">
              <div
                className="overlap-3"
                style={{ backgroundImage: `url(${brs3})` }}
              >
                <div className="text-wrapper-26">Formal</div>
              </div>
            </div>
            <div className="frame-37">
              <div className="overlap-4">
                <img className="image-6" src={brs4} />
                <div className="text-wrapper-27">Party</div>
              </div>
            </div>
          </div>
          <div className="frame-wrapper">
            <div className="frame-38">
              <div className="frame-39">
                <div className="frame-40">
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className="frame-41">
                  <div className="frame-8">
                    <div className="text-wrapper-28">Sarah M.</div>
                    <img className="frame-11" src={crs4} />
                  </div>
                  <p className="text-wrapper-29">
                    &#34;I&#39;m blown away by the quality and style of the
                    clothes I received from Shop.co. From casual wear to elegant
                    dresses, every piece I&#39;ve bought has exceeded my
                    expectations.”
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-42">
            <div className="frame-38">
              <div className="frame-39">
                <div className="frame-40">
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className="frame-41">
                  <div className="frame-8">
                    <div className="text-wrapper-28">Sarah M.</div>
                    <img className="frame-43" src={cl2} />
                  </div>
                  <p className="text-wrapper-29">
                    &#34;I&#39;m blown away by the quality and style of the
                    clothes I received from Shop.co. From casual wear to elegant
                    dresses, every piece I&#39;ve bought has exceeded my
                    expectations.”
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-44">
            <div className="frame-38">
              <div className="frame-39">
                <div className="frame-40">
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className="frame-41">
                  <div className="frame-8">
                    <div className="text-wrapper-28">Alex K.</div>
                    <img className="frame-11" src={cl1} />
                  </div>
                  <p className="text-wrapper-29">
                    &#34;Finding clothes that align with my personal style used
                    to be a challenge until I discovered Shop.co. The range of
                    options they offer is truly remarkable, catering to a
                    variety of tastes and occasions.”
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-45">
            <div className="frame-38">
              <div className="frame-39">
                <div className="frame-40">
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className="frame-41">
                  <div className="frame-8">
                    <div className="text-wrapper-28">James L.</div>
                    <img className="frame-11" src={cl1} />
                  </div>
                  <p className="text-wrapper-29">
                    &#34;As someone who&#39;s always on the lookout for unique
                    fashion pieces, I&#39;m thrilled to have stumbled upon
                    Shop.co. The selection of clothes is not only diverse but
                    also on-point with the latest trends.”
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-46">
            <div className="frame-38">
              <div className="frame-39">
                <div className="frame-40">
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className="frame-41">
                  <div className="frame-8">
                    <div className="text-wrapper-28">Mooen</div>
                    <img
                      className="frame-47"
                      src="https://c.animaapp.com/mb9ouoro5Ao2nl/img/frame.svg"
                    />
                  </div>
                  <p className="text-wrapper-29">
                    &#34;As someone who&#39;s always on the lookout for unique
                    fashion pieces, I&#39;m thrilled to have stumbled upon
                    Shop.co. The selection of clothes is not only diverse but
                    also on-point with the latest trends.”
                  </p>
                </div>
              </div>
            </div>
          </div>
          <West className="arrow-down-bold" sx={{ color: "#000" }} />
          <East className="arrow-down-bold-2" sx={{ color: "#000" }} />
          <div className="group-wrapper">
            <div className="group-3">
              <div className="overlap-group-3">
                <div className="rectangle"></div>
                <img
                  className="line-3"
                  src="https://c.animaapp.com/mb9ouoro5Ao2nl/img/line-8.svg"
                />
                <div
                  className="frame-48"
                  style={{
                    backgroundColor: layout.primaryColor,
                  }}
                >
                  <p className="text-wrapper-30">
                    STAY UPTO DATE ABOUT OUR LATEST OFFERS
                  </p>
                  <div className="frame-49">
                    <div className="frame-50">
                      <SearchOutlined className="frame-11" />
                      <div className="text-wrapper-8">
                        Enter your email address
                      </div>
                    </div>
                    <div className="frame-51">
                      <div className="text-wrapper-31">
                        Subscribe to Newsletter
                      </div>
                    </div>
                  </div>
                </div>
                <div className="frame-52">
                  <div className="frame-53">
                    <div className="frame-54">
                      <div className="text-wrapper-32">SHOP.CO</div>
                      <p className="text-wrapper-33">
                        We have clothes that suits your style and which you’re
                        proud to wear. From women to men.
                      </p>
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
                <div className="frame-56">
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

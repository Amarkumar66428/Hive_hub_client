import React from "react";
import "./global.css";
import { Button } from "@mui/material";
import {
  ArrowForwardIos,
  ChatBubbleOutlineOutlined,
  EmailOutlined,
  FacebookOutlined,
  LocationOnOutlined,
  PhoneOutlined,
  Search,
} from "@mui/icons-material";

import first_hero from "../../../assets/storePage/temp1/first_hero.webp";
import last_hero from "../../../assets/storePage/temp1/last_hero.webp";
import paws from "../../../assets/svg/Vector.svg";
import paws2 from "../../../assets/svg/Vector2.svg";
import feature1 from "../../../assets/storePage/temp1/feature1.webp";
import feature2 from "../../../assets/storePage/temp1/feature2.webp";
import feature3 from "../../../assets/storePage/temp1/feature3.webp";
import service1 from "../../../assets/storePage/temp1/service1.webp";
import service2 from "../../../assets/storePage/temp1/service2.webp";
import service3 from "../../../assets/storePage/temp1/service3.webp";
import service4 from "../../../assets/storePage/temp1/service4.webp";
import service5 from "../../../assets/storePage/temp1/service5.webp";
import about1 from "../../../assets/storePage/temp1/about1.webp";
import about2 from "../../../assets/storePage/temp1/about2.webp";
import team1 from "../../../assets/storePage/temp1/team1.webp";
import team2 from "../../../assets/storePage/temp1/team2.webp";
import team3 from "../../../assets/storePage/temp1/team3.webp";
import team4 from "../../../assets/storePage/temp1/team4.webp";
import play from "../../../assets/svg/play.svg";
import linkedin from "../../../assets/svg/linkedin.svg";
import twitter from "../../../assets/svg/twitter.svg";
import web from "../../../assets/svg/web.svg";

const Template = () => {
  return (
    <div className="temp1">
      <div className="template">
        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="frame">
              <div
                className="section-hero"
                style={{
                  background: `radial-gradient(50% 50% at 71% 43%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 68%), url(${first_hero}) 50% 50% / cover`,
                }}
              >
                <div className="hero-title-wrapper">
                  <div className="hero-text-wrapper">
                    <p className="pawsitively-perfect">
                      Pawsitively Perfect: Where Every Pet&#39;s Dream Comes
                      True!
                    </p>
                    <p className="welcome-to-paws-n">
                      Welcome to Paws n’ Play, the ultimate destination for pet
                      lovers! Explore a world of tail-wagging joy and furry
                      companionship with our wide range of products and
                      services. From pampering essentials to playful toys,
                      we&#39;re here to make every moment with your pet
                      pawsitively perfect!&#34;
                    </p>
                  </div>
                  <button className="button">
                    <div className="button-base">
                      <div className="text">Shop Now</div>
                      <img className="fluent-emoji-flat" src={paws} />
                    </div>
                  </button>
                </div>
              </div>
              <div className="container-wrapper">
                <div className="container">
                  <div className="div">
                    <div className="frame-2">
                      <div className="frame-3">
                        <div className="div-wrapper">
                          <div className="text-wrapper">Featured Products</div>
                        </div>
                        <div className="frame-wrapper">
                          <div className="frame-4">
                            <Search sx={{ color: "black" }} />
                            <div className="text-wrapper-2">Search</div>
                          </div>
                        </div>
                      </div>
                      <div className="frame-5">
                        <div className="frame-6">
                          <div className="text-wrapper-3">Random</div>
                        </div>
                        <div className="frame-7">
                          <div className="text-wrapper-4">Cat</div>
                        </div>
                        <div className="frame-7">
                          <div className="text-wrapper-4">Dogs</div>
                        </div>
                        <div className="frame-7">
                          <div className="text-wrapper-4">Fish</div>
                        </div>
                        <div className="frame-7">
                          <div className="text-wrapper-4">Birds</div>
                        </div>
                      </div>
                      <div className="frame-8">
                        <div className="frame-9">
                          <div className="product-card">
                            <img
                              className="chemarro-about-a"
                              src={feature1}
                              alt="feature 1"
                            />
                          </div>
                          <div className="product-card">
                            <img
                              className="chemarro-about-a"
                              src={feature2}
                              alt="feature 2"
                            />
                          </div>
                          <div className="product-card">
                            <img
                              className="chemarro-about-a"
                              src={feature3}
                              alt="feature 3"
                            />
                          </div>
                        </div>
                        <div className="view-more">View More &gt;&gt;&gt;</div>
                      </div>
                    </div>
                  </div>
                  <div className="frame-wrapper-2">
                    <div className="frame-10">
                      <img
                        className="fluent-emoji-flat"
                        style={{
                          color: "black",
                        }}
                        src={paws2}
                      />
                      <div className="text-wrapper-5">Shop</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-wrapper">
                <div className="container">
                  <div className="div">
                    <div className="frame-11">
                      <div className="overlap-group-wrapper">
                        <div
                          className="overlap-group"
                          style={{ backgroundImage: `url(${service1})` }}
                        >
                          <div className="text-wrapper-6">Grooming</div>
                        </div>
                      </div>
                      <div className="overlap-group-wrapper">
                        <div
                          className="overlap-2"
                          style={{ backgroundImage: `url(${service2})` }}
                        >
                          <div className="text-wrapper-7">Boarding</div>
                        </div>
                      </div>
                      <div className="overlap-group-wrapper">
                        <div
                          className="overlap-3"
                          style={{ backgroundImage: `url(${service3})` }}
                        >
                          <div className="text-wrapper-8">Veterinary</div>
                        </div>
                      </div>
                      <div className="overlap-group-wrapper">
                        <div
                          className="overlap-4"
                          style={{ backgroundImage: `url(${service4})` }}
                        >
                          <div className="text-wrapper-9">Training</div>
                        </div>
                      </div>
                    </div>
                    <div className="frame-12">
                      <div
                        className="overlap-5"
                        style={{
                          backgroundImage: `url(${service5})`,
                        }}
                      >
                        <div className="text-wrapper-10">Adoption</div>
                      </div>
                    </div>
                  </div>
                  <div className="frame-wrapper-2">
                    <div className="frame-10">
                      <img className="fluent-emoji-flat" src={paws2} />
                      <div className="text-wrapper-5">Services</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-wrapper">
                <div className="container">
                  <div className="div">
                    <div className="group">
                      <div className="overlap-group-2">
                        <img className="mask-group" src={about1} />
                        <img className="mask-group-2" src={about2} />
                      </div>
                    </div>
                    <div className="flexcontainer">
                      <p className="span-wrapper">
                        <span className="span">
                          At Paws n’ Play, our journey began with a simple yet
                          profound love for animals. Inspired by the unwavering
                          companionship and joy they bring to our lives, we
                          embarked on a mission to create a haven where pets and
                          their owners alike could experience unparalleled
                          happiness and care.
                          <br />
                        </span>
                      </p>
                      <p className="span-wrapper">
                        <span className="span">
                          Driven by our passion for animal welfare, we
                          hand-select each product and service with meticulous
                          attention to quality and sustainability. From
                          nutritious food and enriching toys to expert grooming
                          and healthcare, every offering is carefully curated to
                          meet the unique needs of our beloved furry friends.
                          <br />
                        </span>
                      </p>
                      <p className="span-wrapper">
                        <span className="span">
                          But our commitment doesn&#39;t end there. We&#39;re
                          dedicated to fostering a community that celebrates the
                          bond between pets and their human companions. Through
                          educational resources, compassionate support, and
                          memorable experiences, we strive to empower pet owners
                          to provide the best possible care for their furry
                          family members.
                          <br />
                        </span>
                      </p>
                      <p className="span-wrapper">
                        <span className="span">
                          At Paws n’ Play, customer satisfaction isn&#39;t just
                          a goal – it&#39;s our guiding principle. We go above
                          and beyond to ensure every interaction leaves tails
                          wagging and hearts smiling. From personalized
                          recommendations to attentive service, we&#39;re here
                          to make your journey with your pet as joyful and
                          fulfilling as possible.
                          <br />
                        </span>
                      </p>
                      <p className="span-wrapper">
                        <span className="span">
                          Join us in our mission to create a world where every
                          pet is cherished, every need is met, and every tail
                          wags with happiness. Welcome to Paws n’ Play, where
                          pets are family, and love knows no bounds.
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="frame-wrapper-2">
                    <div className="frame-10">
                      <img className="fluent-emoji-flat" src={paws2} />
                      <div className="text-wrapper-5">About Us</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team-section">
                <div className="about-header">
                  <div className="frame-10">
                    <img className="fluent-emoji-flat" src={paws2} />
                    <div className="text-wrapper-5">Our Team</div>
                  </div>
                </div>
                <div className="content-wrapper">
                  <div className="div-2">
                    <div className="team-member">
                      <img className="img-2" src={team1} />
                      <div className="div-3">
                        <div className="div-4">
                          <div className="name-and-role">
                            <div className="name">Dr. Olivia Rhye</div>
                            <div className="role">Senior Veterinarian</div>
                          </div>
                        </div>
                        <div className="social-icons">
                          <img className="img" src={linkedin} />
                          <img className="img" src={twitter} />
                          <img className="img" src={web} />
                        </div>
                      </div>
                    </div>
                    <div className="team-member">
                      <img className="img-2" src={team2} />
                      <div className="div-3">
                        <div className="div-4">
                          <div className="name-and-role">
                            <div className="name">Phoenix Baker</div>
                            <div className="role">Asst. Veterinarian</div>
                          </div>
                        </div>
                        <div className="social-icons">
                          <img className="img" src={linkedin} />
                          <img className="img" src={twitter} />
                          <img className="img" src={web} />
                        </div>
                      </div>
                    </div>
                    <div className="team-member">
                      <img className="img-2" src={team3} />
                      <div className="div-3">
                        <div className="div-4">
                          <div className="name-and-role">
                            <div className="name">Lana Steiner</div>
                            <div className="role">Resident Veterinarian</div>
                          </div>
                        </div>
                        <div className="social-icons">
                          <img className="img" src={linkedin} />
                          <img className="img" src={twitter} />
                          <img className="img" src={web} />
                        </div>
                      </div>
                    </div>
                    <div className="team-member">
                      <img className="unsplash" src={team4} />
                      <div className="div-3">
                        <div className="div-4">
                          <div className="name-and-role">
                            <div className="name">Demi Wilkinson</div>
                            <div className="role">Intern Veterinarian</div>
                          </div>
                        </div>
                        <div className="social-icons">
                          <img className="img" src={linkedin} />
                          <img className="img" src={twitter} />
                          <img className="img" src={web} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rich-text-section">
                <div className="about-header">
                  <div className="frame-10">
                    <img className="fluent-emoji-flat" src={paws2} />
                    <div className="text-wrapper-5">Blog</div>
                  </div>
                </div>
                <div className="container-2">
                  <div className="content">
                    <div className="div-5">
                      <div className="heading">
                        Milestone: 20,000 Pets Treated
                      </div>
                    </div>
                    <div className="div-6">
                      <div className="div-6">
                        <img className="divider" src={last_hero} />
                        <p className="paragraph">
                          <span className="text-wrapper-11">
                            Eget quis mi enim, leo lacinia pharetra, semper.
                            Eget in{" "}
                          </span>
                          <span className="text-wrapper-12">
                            volutpat mollis
                          </span>
                          <span className="text-wrapper-11">
                            at volutpat lectus velit, sed auctor. Porttitor
                            fames arcu quis fusce augue enim. Quis at habitant
                            diam at. Suscipit
                          </span>
                          <span className="text-wrapper-12">
                            tristique risus
                          </span>
                          <span className="text-wrapper-11">
                            , at donec. In turpis vel et quam imperdiet. Ipsum
                            molestie aliquet sodales id est ac volutpat. Eget
                            quis mi enim, leo lacinia pharetra, semper. Eget in
                          </span>
                          <span className="text-wrapper-12">
                            volutpat mollis
                          </span>
                          <span className="text-wrapper-11">
                            at volutpat lectus velit, sed auctor. Porttitor
                            fames arcu quis fusce augue enim. Quis at habitant
                            diam at. Suscipit
                          </span>
                          <span className="text-wrapper-12">
                            tristique risus
                          </span>
                          <span className="text-wrapper-11">
                            , at donec. In turpis vel et quam imperdiet. Ipsum
                            molestie aliquet sodales id est ac volutpat.
                          </span>
                        </p>
                      </div>
                      <div className="div-4">
                        <div className="heading-2">Renewed target</div>
                        <p className="p">
                          Pharetra morbi libero id aliquam elit massa integer
                          tellus. Quis felis aliquam ullamcorper porttitor.
                          Pulvinar ullamcorper sit dictumst ut eget a, elementum
                          eu. Maecenas est morbi mattis id in ac.
                        </p>
                      </div>
                    </div>
                    <div className="frame-13">
                      <div className="text-wrapper-13">Read more</div>
                    </div>
                  </div>
                  <div
                    className="image"
                    style={{
                      background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), url(${last_hero}) 50% 50% / cover`,
                    }}
                  >
                    <img className="octicon-play" src={play} />
                  </div>
                </div>
              </div>
              <div className="contact-sections">
                <div className="about-header-2">
                  <div className="frame-10">
                    <img className="fluent-emoji-flat" src={paws} />
                    <div className="text-wrapper-14">Get in touch</div>
                  </div>
                </div>
                <div className="container-3">
                  <div className="form-wrapper">
                    <div className="form">
                      <div className="div-3">
                        <div className="div-2">
                          <div className="input-field">
                            <div className="div-7">
                              <div className="div-7">
                                <input
                                  className="label"
                                  htmlFor="input-2"
                                  placeholder="First name"
                                  type="text"
                                />
                                <div className="input">
                                  <div className="content-2">
                                    <input
                                      className="text-2"
                                      placeholder="First name"
                                      type="text"
                                      id="input-2"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="input-field">
                            <div className="div-7">
                              <div className="div-7">
                                <input
                                  className="label"
                                  htmlFor="input-4"
                                  placeholder="Last name"
                                  type="text"
                                />
                                <div className="input">
                                  <div className="content-2">
                                    <input
                                      className="text-2"
                                      placeholder="Last name"
                                      type="text"
                                      id="input-4"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="input-field-base-wrapper">
                          <div className="div-7">
                            <div className="div-7">
                              <input
                                className="label"
                                htmlFor="input-6"
                                placeholder="Email"
                                type="email"
                              />
                              <div className="input">
                                <div className="content-2">
                                  <input
                                    className="text-2"
                                    placeholder="you@company.com"
                                    type="email"
                                    id="input-6"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="textarea-input-field">
                          <div className="div-8">
                            <div className="div-8">
                              <div className="label-2">Message</div>
                              <div className="input-2"></div>
                            </div>
                          </div>
                        </div>
                        <div className="checkbox">
                          <div className="checkbox-base-wrapper">
                            <div className="checkbox-base"></div>
                          </div>
                          <p className="text-3">
                            <span className="text-wrapper-15">
                              You agree to our friendly{" "}
                            </span>
                            <span className="text-wrapper-16">
                              privacy policy
                            </span>
                            <span className="text-wrapper-15">.</span>
                          </p>
                        </div>
                      </div>
                      <div className="div-4">
                        <div className="button-base-wrapper">
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{
                              backgroundColor: "#101828",
                              color: "white",
                              fontSize: "1.2rem",
                            }}
                          >
                            Send Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-3">
                    <div className="div-2">
                      <div className="div-9">
                        <EmailOutlined
                          sx={{ color: "white", fontSize: "2em" }}
                        />
                        <div className="text-and-supporting">
                          <div className="text-4">Email</div>
                          <p className="supporting-text">
                            Our friendly team is here to help.
                          </p>
                        </div>
                        <button className="button-2">
                          <div className="button-base-3">
                            <div className="text-5">hello@pawsnplay.com</div>
                          </div>
                        </button>
                      </div>
                      <div className="div-9">
                        <ChatBubbleOutlineOutlined
                          sx={{ color: "white", fontSize: "2em" }}
                        />
                        <div className="text-and-supporting">
                          <div className="text-4">Live chat</div>
                          <p className="supporting-text">
                            Our friendly team is here to help.
                          </p>
                        </div>
                        <button className="button-2">
                          <div className="button-base-3">
                            <div className="text-6">Start new chat</div>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="div-2">
                      <div className="div-9">
                        <LocationOnOutlined
                          sx={{ color: "white", fontSize: "2em" }}
                        />
                        <div className="text-and-supporting">
                          <div className="text-4">Office</div>
                          <p className="supporting-text">
                            Come say hello at our office HQ.
                          </p>
                        </div>
                        <div className="button-3">
                          <div className="button-base-3">
                            <p className="text-7">
                              123, Yaya Abatan st, Ogba Lagos.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="div-9">
                        <PhoneOutlined
                          sx={{ color: "white", fontSize: "2em" }}
                        />
                        <div className="text-and-supporting">
                          <div className="text-4">Phone</div>
                          <p className="supporting-text">
                            Mon-Fri from 8am to 5pm.
                          </p>
                        </div>
                        <button className="button-2">
                          <div className="button-base-3">
                            <div className="text-6">+234 901234 384</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="footer">
                <div className="section">
                  <div className="content-wrapper">
                    <div className="content-4">
                      <div className="text-and-supporting-2">
                        <div className="text-8">Join our newsletter</div>
                        <p className="supporting-text-2">
                          Be the first to receive latest updates on promo, sales
                          and offers
                        </p>
                      </div>
                      <div className="email-capture">
                        <div className="input-field-2">
                          <div className="div-7">
                            <div className="div-7">
                              <div className="input-3">
                                <div className="content-2">
                                  <input
                                    className="text-9"
                                    placeholder="Enter your email"
                                    type="email"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button className="button">
                          <div className="button-base-4">
                            <div className="text-10">Subscribe</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section-2">
                  <div className="container-4">
                    <div className="content-5">
                      <div className="logo-and-supporting">
                        <div className="logo">
                          <img className="fluent-emoji-flat" src={paws} />
                          <div className="text-wrapper-17">Paws n’ Play</div>
                        </div>
                        <p className="supporting-text-3">
                          Where wagging tails and purring hearts reign supreme!
                        </p>
                      </div>
                      <div className="links">
                        <div className="div-9">
                          <div className="heading-3">Shop</div>
                          <div className="div-5">
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Pet Adoption</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Nutrition</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Pet Care</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Pet Food</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Pricing</div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="div-9">
                          <div className="heading-3">Company</div>
                          <div className="div-5">
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">About us</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Careers</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Press</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">News</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Contact</div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="div-9">
                          <div className="heading-3">Services</div>
                          <div className="div-5">
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Grooming</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Boarding</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Traaining</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Vetinary</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Support</div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="div-9">
                          <div className="heading-3">Social</div>
                          <div className="div-5">
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Twitter</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">LinkedIn</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Facebook</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">AngelList</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Dribbble</div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="div-9">
                          <div className="heading-3">Legal</div>
                          <div className="div-5">
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Terms</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Privacy</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Cookies</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Licenses</div>
                                </div>
                              </button>
                            </div>
                            <div className="footer-link">
                              <button className="button-2">
                                <div className="button-base-3">
                                  <div className="text-11">Settings</div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-5">
                    <div className="divider-2"></div>
                    <div className="content-6">
                      <p className="footer-text">
                        © 2024 Paws n’ Play. All rights reserved.
                      </p>
                      <div className="social-icons-2">
                        <img className="img" src={linkedin} />
                        <img className="img" src={twitter} />
                        <img className="img" src={web} />
                        <FacebookOutlined
                          sx={{ color: "#98A2B3", fontSize: "2em" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
            <div className="sectio-navbar">
              <header className="header">
                <div className="container-6">
                  <div className="content-7">
                    <div className="logo">
                      <img className="fluent-emoji-flat" src={paws} />
                      <div className="text-wrapper-17">Paws n’ Play</div>
                    </div>
                    <div className="nav-menu">
                      <div className="dropdown-header">
                        <button className="button-2">
                          <div className="button-base-3">
                            <div className="text-12">Shop</div>
                            <ArrowForwardIos
                              sx={{
                                color: "white",
                                transform: "rotate(90deg)",
                                fontSize: "1.2rem",
                              }}
                            />
                          </div>
                        </button>
                      </div>
                      <div className="dropdown-header">
                        <button className="button-2">
                          <div className="button-base-3">
                            <div className="text-12">Services</div>
                            <ArrowForwardIos
                              sx={{
                                color: "white",
                                transform: "rotate(90deg)",
                                fontSize: "1.2rem",
                              }}
                            />
                          </div>
                        </button>
                      </div>
                      <button className="button-2">
                        <div className="button-base-3">
                          <div className="text-12">About Us</div>
                        </div>
                      </button>
                      <button className="button-2">
                        <div className="button-base-3">
                          <div className="text-12">Blog</div>
                        </div>
                      </button>
                      <button className="button-2">
                        <div className="button-base-3">
                          <div className="text-12">Contact</div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="navigation-actions">
                    <button className="button-4">
                      <div className="button-base-5">
                        <div className="text-13">Get Started</div>
                      </div>
                    </button>
                  </div>
                </div>
              </header>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;

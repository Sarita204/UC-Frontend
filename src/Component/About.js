// import React, { useState } from "react";
// import "../Style/Home.css";
// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { BiSolidQuoteSingleLeft } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MagicSliderDots from "react-magic-slider-dots";
import "react-magic-slider-dots/dist/magic-dots.css";
import "../Style/Home.css";
import { LuView } from "react-icons/lu";
import OwlCarousel from "react-owl-carousel";
import { FaQuoteLeft } from "react-icons/fa6";
import Carousel from "react-grid-carousel";
import Modal from "react-bootstrap/Modal";
import { TbFlagFilled } from "react-icons/tb";
import { FaGraduationCap } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegThumbsUp } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { FaInvision } from "react-icons/fa6";
import { MdOutlineVisibility } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import axios from "axios";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

function About() {
  // const [acc, setacc] = useState(false);
  // const [acc1, setacc1] = useState(false);
  // const [acc2, setacc2] = useState(false);
  //get for About us
  const [data, setdata] = useState([]);
  const getAbout = () => {
    axios
      .get("https://coorgtour.in/api/admin/getAbout")
      .then(function (response) {
        setdata(response.data.About);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //get for visionmission and what we do
  const [data1, setdata1] = useState([]);
  const getvisionMission_WhatWeDo = async () => {
    try {
      let res = await axios.get(
        "https://coorgtour.in/api/admin/getAllVisionMission"
      );
      if (res.status == 200) {
        setdata1(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get for why choose us
  const [data2, setdata2] = useState([]);
  const getWhychooseus = () => {
    axios
      .get("https://coorgtour.in/api/admin/getWhychooseus")
      .then(function (response) {
        setdata2(response.data.Whychooseus);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //get for what people say
  const [data3, setdata3] = useState([]);
  const getWhatpeoplesay = () => {
    axios
      .get("https://coorgtour.in/api/admin/getWhatpeoplesay")
      .then(function (response) {
        setdata3(response.data.Whatpeoplesay);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
  };

  const [View, setView] = useState({});
  const [View1, setView1] = useState({});

  // const [show1, setShow1] = useState();
  // const handleClose1 = () => setShow1(false);
  // const handleShow1 = () => {
  //   setShow1(true);
  // };
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => {
      return <MagicSliderDots dots={dots} numDotsToShow={2} dotWidth={30} />;
    },
  };

  useEffect(() => {
    getAbout();
    getvisionMission_WhatWeDo();
    getWhychooseus();
    getWhatpeoplesay();
  }, []);
  return (
    <>
      <div>
        <div className="service-bg">
          <div
            className="bg-img"
            style={{ position: "absolute", width: "100%" }}
          ></div>
          <div className="bg-text-container">
            <div className="text-display" style={{ padding: "40px 0px" }}>
              <h3 className="text-center" style={{ color: "white" }}>
                About Us
              </h3>
            </div>
          </div>
        </div>

        <div>
          <div className="offered-title">ABOUT VALUE PRO</div>
        </div>

        {/* ABOUT US */}
        <div style={{ paddingBottom: "30px" }}>
          {/* <div className="offered-title">ABOUT US</div> */}
          <div className="about-display">
            {data?.map((item) => {
              return (
                <div
                  className="about-display-containerfdfg"
                >
                  <div
                    className="mobile-apps mb-2"
                  // style={{ border: "1px solid white" }}
                  // data-aos="zoom-in"
                  // data-aos-duration="3000"
                  // data-aos-offset="200"
                  // data-aos-once="false"
                  // data-aos-delay="50"
                  >
                    <div
                      className="about-img-container"
                      style={{ textAlign: "center" }}
                    >
                      <img
                        src={`https://coorgtour.in/About/${item?.abtimg}`}
                        alt=""
                        className="about-img"
                      />
                    </div>
                  </div>

                  <div className="about-img-container">
                    <div className="about-first-content">
                      {/* <div className="about-icon">
                  <img src={`https://coorgtour.in/About/${item?.abticon}`} alt="" style={{width:"50%",height:"25px"}} />
                  </div> */}
                      <div>
                        <h3
                          style={{
                            // fontSize: "20px",
                            fontWeight: "500",
                            padding: "0px",
                            // lineHeight: "40px",
                          }}
                        >
                          {item?.abtheader}
                        </h3>
                        <p
                          style={{ lineHeight: "30px", paddingBottom: "20px", textAlign: "justify" }}
                        >
                          {parse(`<div>${item?.abtdesc}</div>`)}
                        </p>
                      </div>
                    </div>

                    {/* <div className="about-first-content">
                  <div className="about-icon">
                    <FaGraduationCap style={{ color: "white" }} />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        lineHeight: "40px",
                      }}
                    >
                      ANNUAL CERTIFICATION OF EMPLOYEES
                    </h5>
                    <p style={{ lineHeight: "30px" }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                    {/* <a href="/aboutus">
                  <Button style={{ padding: "6px 10px" }} className="learn-more-btn-2">Learn More</Button>
                  </a> 
                  </div>
                </div> */}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="our-m-v-cards"
            style={{ padding: "0px 100px", gap: "30px" }}
          >
            <div className="our-mission-vision-card mb-2">
              <div
                className="card"
                style={{
                  width: "100%",
                  margin: "0px",
                  boxShadow: "#939191 1px 3px 17px 4px",
                }}
              >
                <div className="card-body">
                  {/* <h6 className='about-card-subtitle'></h6> */}
                  {/* <h5 className='about-card-title'>BELIVES IN LORD RAMA AND <br></br>VISHNU DEVA</h5> */}
                  {/* <p className='about-card-tagline'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum</p> */}

                  <div className="about-first-content">
                    {/* <div
                      className="about-icon"
                      style={{ height: "4rem", width: "300px" }}
                    >
                      <MdOutlineVisibility style={{ color: "white" }} />
                    </div> */}
                    <div>
                      <h5
                        style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          lineHeight: "40px",
                        }}
                      >
                        <MdOutlineVisibility className="eye" /> &nbsp; OUR
                        MISSION & VISION
                      </h5>
                      {data1?.map((item, i) => {
                        return (
                          <div>
                            <p style={{ lineHeight: "30px", textAlign: "justify" }}>
                              {parse(
                                `<div>${item?.visionMission.slice(
                                  0,
                                  250
                                )}...</div>`
                              )}
                            </p>

                            <Button
                              variant=""
                              className="btn btn-secondary"
                              onClick={() => {
                                handleShow();
                                setView(item);
                              }}
                              style={{
                                color: "white",
                                cursor: "pointer",
                                background: "navy",
                                padding: "4px 6px",
                                borderRadius: "5px",
                                textAlign: "center",
                              }}
                            >
                              Read More
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="our-mission-vision-card mb-2">
              <div
                className="card"
                style={{
                  width: "100%",
                  boxShadow: "#939191 1px 3px 17px 4px",
                  margin: "0px",
                }}
              >
                <div className="card-body">
                  {/* <h6 className='about-card-right-subtitle'></h6> */}
                  {/* <h5 className='about-card-right-title'>OUR VOLUNTEERS ACHIEVMENTS</h5> */}
                  {/* <p className='about-card-right-tagline'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum</p> */}

                  <div className="about-first-content">
                    {/* <div
                      className="about-icon"
                      style={{ height: "4rem", width: "250px" }}
                    >
                      <FaQuestion style={{ color: "white" }} />
                    </div> */}
                    <div>
                      <h5
                        style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          lineHeight: "40px",
                        }}
                      >
                        <FaQuestion className="eye" /> &nbsp; WHAT WE DO
                      </h5>
                      {data1?.map((item, i) => {
                        return (
                          <div>
                            <p style={{ lineHeight: "30px", textAlign: "justify" }}>
                              {parse(
                                `<div>${item?.WhatWeDo.slice(0, 250)}...</div>`
                              )}
                              {/* {parse(`<div>${item?.WhatWeDo}</div>`)} */}
                            </p>
                            <Button
                              className="btn btn-secondary"
                              onClick={() => {
                                handleShow1();
                                setView1(item);
                              }}
                              style={{
                                color: "white",
                                cursor: "pointer",
                                background: "navy",
                                padding: "4px 6px",
                                borderRadius: "5px",
                                textAlign: "center",
                              }}
                            >
                              Read More
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why choose us */}
        <Container>
          <div className="y-c-b">
            <div className="offered-title">WHY CHOOSEN US</div>

            <div className="why-choose-us-text">
              <p>
                We Make It Personal. When you work with us, you can count on
                personalized, one-on-one service every step of the way, We
                Innovate for You. We're a team of dreamers, thinkers and
                creators, We Stand by Our Values....
              </p>
            </div>
            <div>
              {/* <div class="container"> */}

              <div class="choosen-us-card-container">
                {data2?.map((item, i) => {
                  return (
                    <>
                      <div class="choosen-card">
                        <Card
                          className="text-center"
                          style={{
                            background: "navy",
                            color: "white",
                            border: "none",
                          }}
                        >
                          <div className="why-choose-us-img-container">
                            <img
                              src={`https://coorgtour.in/Whychooseus/${item?.img}`}
                              alt=""
                              className="why-choose-us-img"
                            />
                          </div>
                          <Card.Body>
                            <div>
                              <TiTickOutline
                                style={{
                                  fontSize: "28px",
                                  margin: "15px 0px",
                                  color: "white ",
                                }}
                              />
                            </div>
                            <Card.Title>{item?.title}</Card.Title>
                            <Card.Text>
                              {parse(`<div>${item?.desc}</div>`)}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </>
                  );
                })}

                {/* <div class="choosen-card">
                        <Card className="text-center">
                          <div className="why-choose-us-img-container">
                            <img
                              src="../images/y-c-img1.jpg"
                              alt=""
                              className="why-choose-us-img"
                            />
                          </div>
                          <Card.Body>
                            <div>
                              <IoSettingsOutline
                                style={{
                                  fontSize: "28px",
                                  margin: "15px 0px",
                                  color: "#083a87 ",
                                }}
                              />
                            </div>
                            <Card.Title>SKILL</Card.Title>
                            <Card.Text>
                              Duis aute irure dolor in reprehenderit in
                              voluptate velit esse cillum dolore eu fugiat nulla
                              pariatur.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>

                      <div class="choosen-card">
                        <Card className="text-center">
                          <div className="why-choose-us-img-container">
                            <img
                              src="../images/y-c-img2.jpg"
                              alt=""
                              className="why-choose-us-img"
                            />
                          </div>
                          <Card.Body>
                            <div>
                              <FaRegThumbsUp
                                style={{
                                  fontSize: "28px",
                                  margin: "15px 0px",
                                  color: "#083a87 ",
                                }}
                              />
                            </div>
                            <Card.Title>QUALITY</Card.Title>
                            <Card.Text>
                              Duis aute irure dolor in reprehenderit in
                              voluptate velit esse cillum dolore eu fugiat nulla
                              pariatur.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>

                      <div class="choosen-card">
                        <Card className="text-center">
                          <div className="why-choose-us-img-container">
                            <img
                              src="../images/y-c-img3.jpg"
                              alt=""
                              className="why-choose-us-img"
                            />
                          </div>
                          <Card.Body>
                            <div>
                              <TbNotes
                                style={{
                                  fontSize: "30px",
                                  margin: "15px 0px",
                                  color: "#083a87 ",
                                }}
                              />
                            </div>
                            <Card.Title>GUARANTEES</Card.Title>
                            <Card.Text>
                              Duis aute irure dolor in reprehenderit in
                              voluptate velit esse cillum dolore eu fugiat nulla
                              pariatur.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div> */}
              </div>

              {/* </div> */}
            </div>
          </div>
        </Container>

        <div>
          <div className="offered-title">WHAT PEOPLE SAY</div>
          <div className="about-container">
            <div className="container">
              <div className="cate-0">
                <Slider {...settings}>
                  <div id="cards_landscape_wrap-2">
                    <div class="container">
                      <div
                        class="row"
                        style={{ gap: "60px", justifyContent: "center" }}
                      >
                        {data3?.map((item) => {
                          return (
                            <div class="col-md-3 mb-2">
                              <Card
                                className="text-center"
                                style={{
                                  margin: "0",
                                  border: "1px solid lightgray",
                                  minHeight: '350px'
                                }}
                              >
                                <Card.Header>
                                  <FaQuoteLeft
                                    style={{
                                      color: "#10398c",
                                      margin: "10px 0px",
                                    }}
                                  />
                                </Card.Header>
                                <Card.Body>
                                  <Card.Text>
                                    {parse(`<div>${(item?.desc9).slice(0, 190)}</div>`)}
                                  </Card.Text>
                                  <div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <img
                                        src={`https://coorgtour.in/Whatpeoplesay/${item?.img9}`}
                                        alt=""
                                        className="review-img"
                                      />
                                    </div>
                                    <div className="reviewer-name">
                                      <p>{item?.Header9}</p>
                                      <p>{item?.title9}</p>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Card>
                            </div>
                          );
                        })}
                        {/* <div class="col-md-3 mb-2">
                          <Card className="text-center" style={{ margin: "0" }}>
                            <Card.Header>
                              <FaQuoteLeft
                                style={{ color: "#10398c", margin: "10px 0px" }}
                              />
                            </Card.Header>
                            <Card.Body>
                              <Card.Text>
                                Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur.{" "}
                              </Card.Text>
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <img
                                    src="../images/review2.jpg"
                                    alt=""
                                    className="review-img"
                                  />
                                </div>
                                <div className="reviewer-name">
                                  <p>Roberto Duran</p>
                                  <p>Traveler from Panama</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>

                        <div class="col-md-3 mb-2">
                          <Card className="text-center" style={{ margin: "0" }}>
                            <Card.Header>
                              <FaQuoteLeft
                                style={{ color: "#10398c", margin: "10px 0px" }}
                              />
                            </Card.Header>
                            <Card.Body>
                              <Card.Text>
                                Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur.{" "}
                              </Card.Text>
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <img
                                    src="../images/review1.jpg"
                                    alt=""
                                    className="review-img"
                                  />
                                </div>
                                <div className="reviewer-name">
                                  <p>Roberto Duran</p>
                                  <p>Traveler from Panama</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  {/* <div id="cards_landscape_wrap-2">
                    <div class="container">
                      <div
                        class="row"
                        style={{ gap: "60px", justifyContent: "center" }}
                      >
                        <div class="col-md-3 mb-2">
                          <Card className="text-center">
                            <Card.Header>
                              <FaQuoteLeft
                                style={{ color: "#10398c", margin: "10px 0px" }}
                              />
                            </Card.Header>
                            <Card.Body>
                              <Card.Text>
                                Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur.{" "}
                              </Card.Text>
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <img
                                    src="../images/review2.jpg"
                                    alt=""
                                    className="review-img"
                                  />
                                </div>
                                <div className="reviewer-name">
                                  <p>Roberto Duran</p>
                                  <p>Traveler from Panama</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>

                        <div class="col-md-3 mb-2">
                          <Card className="text-center">
                            <Card.Header>
                              <FaQuoteLeft
                                style={{ color: "#10398c", margin: "10px 0px" }}
                              />
                            </Card.Header>
                            <Card.Body>
                              <Card.Text>
                                Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur.{" "}
                              </Card.Text>
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <img
                                    src="../images/review1.jpg"
                                    alt=""
                                    className="review-img"
                                  />
                                </div>
                                <div className="reviewer-name">
                                  <p>Roberto Duran</p>
                                  <p>Traveler from Panama</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>

                        <div class="col-md-3 mb-2">
                          <Card className="text-center" style={{ margin: "0" }}>
                            <Card.Header>
                              <FaQuoteLeft
                                style={{ color: "#10398c", margin: "10px 0px" }}
                              />
                            </Card.Header>
                            <Card.Body>
                              <Card.Text>
                                Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur.{" "}
                              </Card.Text>
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <img
                                    src="../images/review2.jpg"
                                    alt=""
                                    className="review-img"
                                  />
                                </div>
                                <div className="reviewer-name">
                                  <p>Roberto Duran</p>
                                  <p>Traveler from Panama</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </Slider>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="container" style={{ height:"500px"}}>
        <div className="row">
          <div className="row">
            <Slider {...settings}>
              <div className=" text-center">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Aspernatur modi fugiat possimus perferendis! Accusamus dolorum
                  incidunt reprehenderit ab? Ad natus corporis iste hic pariatur
                  illo tempora dignissimos quis, labore dolorem!
                </p>
                <img
                  src="/images/service4.jpg"
                  alt=""
                  className="testimonyimg"
                />
                <p style={{marginBottom:"unset"}}>Roberta Duran</p>
                <p>Traveller from Panama</p>
              </div>

              <div className="text-center">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Aspernatur modi fugiat possimus perferendis! Accusamus dolorum
                  incidunt reprehenderit ab? Ad natus corporis iste hic pariatur
                  illo tempora dignissimos quis, labore dolorem!
                </p>
                <img
                  src="/images/service5.jpg"
                  alt=""
                  className="testimonyimg"
                />
                <p style={{marginBottom:"unset"}}>Roberta Duran</p>
                <p>Traveller from Panama</p>
              </div>
            </Slider>
          </div>
          <div></div>
        </div>
      </div> */}

        {/* vision and mission  */}
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton>
            <h4>
              <b>OUR MISSION & VISION</b>
            </h4>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12">
              <div className="img-mo mb-4">
                <div className="car-details-card" style={{ display: "flex" }}>
                  <div className="car-details-content-container">
                    <p>{parse(`<div>${View?.visionMission}</div>`)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{ background: "#083a87", color: "white" }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* what we do  */}
        <Modal
          show={show1}
          onHide={handleClose1}
          size="lg"
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton>
            <h4>
              <b>WHAT WE DO</b>
            </h4>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12">
              <div className="img-mo mb-4">
                <div className="car-details-card" style={{ display: "flex" }}>
                  <div className="car-details-content-container">
                    <p>{parse(`<div>${View1?.WhatWeDo}</div>`)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{ background: "#083a87", color: "white" }}
              onClick={handleClose1}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default About;

import React, { useState } from "react";
import "../Style/Home.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useEffect } from "react";
import parse from "html-react-parser";
import moment from "moment";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MagicSliderDots from "react-magic-slider-dots";
import "react-magic-slider-dots/dist/magic-dots.css";
import { TiSpanner } from "react-icons/ti";
import { Button, Container, Row } from "react-bootstrap";
import Carousel from "react-grid-carousel";
import OwlCarousel from "react-owl-carousel";
import { LuView } from "react-icons/lu";
import ScrollTrigger from "react-scroll-trigger";
import CountUp from "react-countup";
import Aos from "aos";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import OwlCarousel from 'react-owl-carousel';

function Category(props) {
  // const userProfile = JSON.parse(sessionStorage.getItem("user"));

  const [View, setView] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [counterOn, setCounterOn] = useState(false);

  const [PName, setPName] = useState("");
  const [PEmail, setPEmail] = useState("");
  const [PNumber, setPNumber] = useState("");
  const [PType, setPType] = useState("");
  const [PMessage, setPMessage] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (input) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setPEmail(inputValue);
    setIsValidEmail(validateEmail(inputValue));
  };

  const addProrequest = async () => {
    if (!PName || !PEmail || !PNumber || !PType || !PMessage) {
      return alert("Please fill all the field !!!");
    }
    if (!isValidEmail) {
      return alert("Please enter valid email id");
    }
    if (PNumber.length !== 10) {
      return alert("Please enter valid 10 digits mobile no");
    }
    try {
      const config = {
        url: "/addProrequest",
        method: "post",
        baseURL: "https://coorgtour.in/api/User",
        data: {
          PName: PName,
          PEmail: PEmail,
          PNumber: PNumber,
          PType: PType,
          PMessage: PMessage,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert(res.data.success);
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  const [Offers, setOffers] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
  };
  const [Data, setData] = useState([]);
  const getTrusted = () => {
    axios
      .get("https://coorgtour.in/api/admin/getTrusted")
      .then(function (response) {
        setData(response.data.Trusted);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [data, setdata] = useState([]);
  const getCounts = () => {
    axios
      .get("https://coorgtour.in/api/admin/getCounts")
      .then(function (response) {
        setdata(response.data.getCounts);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [categorylist, setcategorylist] = useState([]);
  const getCategory = () => {
    axios
      .get("https://coorgtour.in/api/admin/getCategory")
      .then(function (response) {
        setcategorylist(response.data.Category);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getOffers = () => {
    axios
      .get("https://coorgtour.in/api/admin/getOffers")
      .then(function (response) {
        setOffers(response.data.Offers);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [allservices, setAllservices] = useState([]);
  const getService = () => {
    try {
      axios
        .get("https://coorgtour.in/api/admin/getService")
        .then(function (response) {
          setAllservices(response.data.Service);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
    getOffers();
    getService();
    getTrusted();
    getCounts();
  }, []);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => {
      return <MagicSliderDots dots={dots} numDotsToShow={2} dotWidth={30} />;
    },
  };

  useEffect(() => {
    Aos.init();
  }, []);

  const options = {
    margin: 30,
    responsiveClass: true,
    nav: false,
    dots: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 1,
      },
      700: {
        items: 1,
      },
      1000: {
        items: 4,
      },
    },
  };

  //========================================Add to cart==================================================
  const [qty, setqty] = useState(1);

  const [showMore, setShowMore] = useState(false);

  const todaydate = moment().format("YYYY-MM-DD");
  const todaydate1 = todaydate.split("-");
  const dayp = parseInt(todaydate1[2]);
  const monthp = parseInt(todaydate1[1]);
  const yearp = parseInt(todaydate1[0]);

  function cart(item) {
    const isItemInCart = props.basket.some(
      (basketItem) => basketItem.Service === item
    );

    if (isItemInCart) {
      props.dispatch({
        type: "deleteBasketItem",
        item: { Service: item, quantity: qty },
      });
      alert("Product already exists in your cart");
    } else {
      props.dispatch({
        type: "addBasketItem",
        item: { Service: item, quantity: qty },
      });
      alert("Product added to Your Cart");
    }
  }

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
      >
        <div className="servic-container ">
          <div className="cate-0">
            <div className="offered-title" style={{ paddingBottom: "0px" }}>
              OUR SERVICES
            </div>
            <div id="cards_landscape_wrap-2">
              <div
                className="row mt-3"
                style={{ gap: "20px", justifyContent: "center" }}
              >
                {categorylist?.map((itemCat) => {
                  return (
                    <div
                      class="col-md-4 servicd-cards mb-2"
                      // style={{ width: "240px", border: "2px solid lightgray" }}
                    >
                      <div class="card-flyer">
                        <div class="text-box">
                          <div class="image-box">
                            <img
                              src={`https://coorgtour.in/Category/${itemCat?.img}`}
                              alt=""
                              className="homepage-service-img"
                            />
                          </div>
                          <div className="service-preview-icon">
                            <TiSpanner />
                          </div>
                          <div class="text-container">
                            <h6>{itemCat?.name}</h6>
                            <Link
                              to={{
                                pathname: "/services",
                                state: { catname: itemCat?.name },
                              }}
                            >
                              <Button
                                style={{ padding: "2px 10px" }}
                                className="learn-more-btn-2"
                              >
                                View all services
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OFFERED SERVICES */}
      <div
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
      >
        <div>
          <div className="offered-title">QUICK SERVICES</div>
          <a className="small-title  mb-2" href="/services">
            View All Services
          </a>

          <div className="we-offered-service-display">
            <Container>
              <OwlCarousel
                className="owl-theme"
                loop
                margin={5}
                nav
                {...options}
              >
                {allservices?.map((item) => {
                  return (
                    <div class="item">
                      <div
                        class="card"
                        style={{ width: "16rem", height: "300px" }}
                      >
                        <img
                          class="card-img-top"
                          src={`https://coorgtour.in/Service/${item?.img}`}
                          alt="Card image cap"
                          style={{ width: "100%", height: "150px" }}
                        />
                        <div class="card-body">
                          <h5 class="card-title">{item?.name}</h5>
                          <h6 class="card-title">
                            Price: {Number(item?.price) + Number(item?.tax)}/-
                          </h6>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <LuView
                              onClick={() => {
                                setView(item);
                                handleShow();
                              }}
                              style={{
                                margin: "10px 0px",
                                color: "navy",
                                cursor: "pointer",
                              }}
                            />
                            <Button
                              variant=""
                              style={{
                                background: "#083a87",
                                color: "white",
                                padding: "0px 5px",
                              }}
                              onClick={() => cart(item)}
                            >
                              {props.basket.some(
                                (basketItem) => basketItem.Service === item
                              )
                                ? "Remove"
                                : "Add to cart"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </OwlCarousel>
            </Container>
          </div>
        </div>
      </div>

      {/* Download apps */}
      <div
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
      >
        <Container>
          <div className="mt-3" style={{ background: "navy" }}>
            <div
              className="offered-title"
              style={{ color: "white", fontFamily: "sans-serif" }}
            >
              DOWNLOAD APPLICATION
            </div>
            <div className="downld-display">
              <div className="downld-display-container" style={{ gap: "60px" }}>
                <div className="about-img-container">
                  <div className="about-first-content">
                    <div>
                      <h5 className="on-the-go">On The Go? Get the App</h5>
                      <p className="download-app-content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                    </div>
                  </div>

                  <div className="playstore-btn">
                    <div>
                      <img
                        src="../images/playstore.png"
                        alt=""
                        style={{
                          width: "150px",
                          height: "43px",
                          borderRadius: "5px",
                          marginBottom: "5px",
                        }}
                      />
                    </div>
                    <div>
                      <img
                        src="../images/appstore.png"
                        alt=""
                        style={{
                          width: "150px",
                          height: "43px",
                          marginBottom: "5px",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="mobile-apps mb-2"
                  style={{ border: "1px solid white" }}
                  data-aos="zoom-in"
                  data-aos-duration="3000"
                  data-aos-offset="200"
                  data-aos-once="false"
                  data-aos-delay="50"
                >
                  <div
                    className="about-img-container"
                    style={{ textAlign: "center" }}
                  >
                    <img
                      src="../images/customer.png"
                      alt=""
                      style={{ height: "250px", width: "200px" }}
                    />
                    <div style={{ padding: "10px 0px", textAlign: "center" }}>
                      <div className="app-buttons">
                        <img
                          src="../images/cus-img.jpg"
                          alt=""
                          style={{ height: "50px", width: "50px" }}
                        />
                        <a
                          href="/"
                          style={{
                            margin: "auto, 5px",
                            fontSize: "18px",
                            color: "white",
                            textDecoration: "none",
                          }}
                        >
                          Customer App
                        </a>
                      </div>
                    </div>
                  </div>

                  <div
                    className="about-img-container"
                    style={{ textAlign: "center" }}
                  >
                    <img
                      src="../images/vendor.png"
                      alt=""
                      style={{ height: "250px", width: "200px" }}
                    />
                    <div style={{ padding: "10px 0px", textAlign: "center" }}>
                      <div className="app-buttons">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0px 6px",
                          }}
                        >
                          <img
                            src="../images/proimg.png"
                            alt=""
                            style={{ height: "50px", width: "50px" }}
                          />
                          <a
                            href="/"
                            style={{
                              margin: "auto, 5px",
                              fontSize: "18px",
                              color: "white",
                              textDecoration: "none",
                            }}
                          >
                            Vendor App
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* OUR STATISTICS SO FAR */}
      <div className="statistics-container">
        <div className="offered-title">OUR STATISTICS SO FAR</div>

        <div
          className="statistics-content"
          data-aos="zoom-in"
          data-aos-duration="3000"
          data-aos-offset="200"
          data-aos-once="false"
          data-aos-delay="50"
        >
          <ScrollTrigger
            onEnter={() => setCounterOn(true)}
            onExit={() => setCounterOn(false)}
          >
            <div className="content">
              {data?.map((item) => {
                return (
                  <div className="numbers">
                    <div className="numbr-circle">
                      <div className="nos">
                        {counterOn && (
                          <CountUp
                            start={0}
                            end={item?.Counts}
                            duration={2}
                            delay={0}
                          />
                        )}
                      </div>
                      <p className="nos-text">{item?.Text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollTrigger>
        </div>
      </div>

      {/* WE ARE TRUSTED BY */}
      <Container>
        <div className="">
          <div className="offered-title">WE ARE TRUSTED BY</div>
          <div
            className="statistics-conten"
            data-aos="zoom-in"
            data-aos-duration="3000"
            data-aos-offset="200"
            data-aos-once="false"
            data-aos-delay="50"
          >
            <div className="brandlogo-content">
              <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                infinite={true}
                items={4}
                nav
              >
                {/* Your carousel items */}
                {Data?.map((item) => (
                  <div class="item">
                    <img
                      src={`https://coorgtour.in/Trusted/${item?.img}`}
                      alt="img"
                      style={{ width: "140px", height: "140px" }}
                    />
                  </div>
                ))}
              </OwlCarousel>
            </div>
          </div>

          {/* </div>
        </div> */}
        </div>
      </Container>

      {/* PARTNER HELP*/}
      <Container>
        <div>
          <div style={{ background: "navy" }}>
            <div className="offered-title" style={{ color: "white" }}>
              PARTNERSHIP WITH US
            </div>
            <div className="downld-display">
              <div className="downld-display-container" style={{ gap: "30px" }}>
                <div className="about-img-containers">
                  <div>
                    <img src="../images/star.png" alt="" className="star-img" />
                  </div>
                </div>
                <div className="about-img-containers">
                  <div
                    className="about-first-content"
                    style={{ padding: "20px 0px" }}
                  >
                    <div>
                      <h5 className="computer-skill">
                        You Have a Computers Repairing Skills? <br></br>You Will
                        Get a Job
                      </h5>
                      <h5 className="computer-skill-job">
                        We Will Help You to Get a Job on Your Location and It's
                        Full Time / Part-Time
                      </h5>
                      <Button variant="light" onClick={handleShow1}>
                        Click Here
                      </Button>
                    </div>
                  </div>
                  {/* <div>
                    <img
                      src="../images/star.png"
                      alt=""
                      className="star-img2"
                    />
                  </div> */}
                </div>

                <div className="mobile-apps">
                  <div
                    className="about-img-containers"
                    style={{ textAlign: "center" }}
                  >
                    <img
                      src="../images/repair1.png"
                      alt=""
                      className="repair-img"
                    />
                  </div>
                  {/* <div>
                    <img src="../images/star.png" alt="" className="star-img" />
                  </div> */}
                </div>
                <div className="about-img-containers">
                  <div>
                    <img
                      src="../images/star.png"
                      alt=""
                      className="star-img2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* View Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        style={{ zIndex: "999999999" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="col-lg-12">
            <div className="img-mo mb-4">
              <div className="car-details-card" style={{ display: "flex" }}>
                <Container
                  className="pooja-details-page"
                  style={{ width: "55%" }}
                >
                  <Carousel cols={1} rows={1} gap={0} loop>
                    <Carousel.Item>
                      <div className="car-details-img-container">
                        <img
                          src={`https://coorgtour.in/Service/${View?.img}`}
                          alt="logo"
                          className="car-details-images"
                          style={{ width: "270px", height: "300px" }}
                        />
                      </div>
                    </Carousel.Item>
                  </Carousel>
                </Container>

                <div className="car-details-content-container">
                  <h5
                    className="car-details-title"
                    style={{ textAlign: "left", color: "#080874" }}
                  >
                    {View?.name}
                  </h5>
                  <h6>Starting Amount MRP : {View?.price}</h6>
                  <h6 style={{ color: "#080874", fontSize: "16px" }}>
                    Warranty Period: {View?.warrantyperiod}
                  </h6>
                  <p
                    className="car-details-tagline"
                    style={{ textAlign: "left", textAlign: "justify" }}
                  >
                    {parse(`<div>${View?.description}</div>`)}
                  </p>
                  <Button
                    variant=""
                    style={{ background: "#083a87", color: "white" }}
                    onClick={() => cart(View)}
                  >
                    Add to Cart
                  </Button>
                  {/* <Button variant="" style={{ background: "#083a87", color: "white", margin: "0px 20px" }} onClick={handleShow1}>Enquiry</Button> */}
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

      {/* Enquiry Modal */}
      <Modal show={show1} onHide={handleClose1} style={{ zIndex: "99999999" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#083a87" }}>
            Partner Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <div className="col-lg-12 mb-2">
              <label className="fw-bold">Name :</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter Your Name"
                className="contact-info-form-input"
                // value={formData.firstName}
                onChange={(e) => setPName(e.target.value)}
              />
              {/* <span className="error">{formErrors.firstName}</span> */}
            </div>
            <div className="col-lg-12 mb-3">
              <label className="fw-bold">Number :</label>
              <input
                type="text"
                id="number"
                name="number"
                placeholder="Enter Your Phone Number"
                className="contact-info-form-input"
                // value={formData.number}
                onChange={(e) => setPNumber(e.target.value)}
              />
              {/* <span className="error">{formErrors.number}</span> */}
            </div>
            <div className="col-lg-12 mb-3">
              <label className="fw-bold">Email :</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="contact-info-form-input"
                // value={formData.email}
                onChange={handleEmailChange}
              />
              {/* <span className="error">{formErrors.email}</span> */}
            </div>
            <div className="col-lg-12 mb-3">
              <label className="fw-bold">Looking for :</label>
              <select
                className="form-control"
                id="type"
                name="type"
                // value={formData.type}
                onChange={(e) => setPType(e.target.value)}
              >
                <option>Select Job Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
              </select>
              {/* <span className="error">{formErrors.type}</span> */}
            </div>
            <div className="col-lg-12 mb-3">
              <label className="fw-bold">Message :</label>
              <textarea
                type="text"
                id="message"
                name="message"
                placeholder="Enter Your Message"
                className="contact-info-form-textarea"
                // value={formData.message}
                onChange={(e) => setPMessage(e.target.value)}
              />
              {/* <span className="error">{formErrors.message}</span> */}
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            style={{ backgroundColor: "#083a87", color: "white" }}
            onClick={addProrequest}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    subscribe: state.Subscribe,
    basket: state.basket,
  };
};

export default connect(mapStateToProps)(Category);

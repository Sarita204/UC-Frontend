import React, { useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Badge } from "@material-tailwind/react";
import "../Style/Header.css";
import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderLink from "./HeaderLink";
import { NavLink } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { FaPhoneVolume } from "react-icons/fa6";
import { TfiTimer } from "react-icons/tfi";
import Modal from "react-bootstrap/Modal";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";

function Header(props) {
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
    if (!PName) {
      return alert("Name is required !!!");
    }
    if (!PEmail) {
      return alert("Email is required !!!");
    }
    if (!isValidEmail) {
      return alert("Please enter valid email id !!!");
    }
    if (PNumber.length !== 10) {
      return alert("Please enter 10 digits Mobile number !!");
    }
    if (!PType) {
      return alert("Job type is required !!!");
    }
    if (!PMessage) {
      return alert("Message is required !!!");
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
          alert("Will contact you soon....!.");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  //get for contact
  const [data, setdata] = useState([]);
  const getContact = async () => {
    try {
      let res = await axios.get(
        "https://coorgtour.in/api/admin/getAllContactPage"
      );
      if (res.status == 200) {
        setdata(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    number: "",
    type: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    email: "",
    number: "",
    type: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Perform validation
    if (name === "firstName" && value === "") {
      setFormErrors({
        ...formErrors,
        firstName: "Name is required.",
      });
    } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      setFormErrors({
        ...formErrors,
        email: " email is required.",
      });
    } else if (name === "number" && value === "") {
      setFormErrors({
        ...formErrors,
        number: "number is required.",
      });
    } else if (name === "type" && value === "") {
      setFormErrors({
        ...formErrors,
        number: "type is required.",
      });
    } else if (name === "number" && value === "") {
      setFormErrors({
        ...formErrors,
        number: "number is required.",
      });
    } else {
      // Clear validation errors if input is valid
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation before submitting the form
    const validationErrors = Object.keys(formData).reduce((errors, name) => {
      if (formData[name] === "") {
        errors[name] = `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } is required.`;
      } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(formData[name])) {
        errors[name] = "Invalid email address.";
      }
      return errors;
    }, {});

    // Update form errors
    setFormErrors(validationErrors);

    // Check if there are any validation errors
    if (Object.values(validationErrors).every((error) => error === "")) {
      alert("Request submitted successfully!");
      window.location.reload();
      console.log("Form Data:", formData);
    } else {
      console.log("Form validation failed. Please check the errors.");
    }
  };

  const navigate = useNavigate();
  const [search, setsearch] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
  };

  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement({ pageLanguage: 'en', layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 'google_translate_element')
  //  }

  //  useEffect(() => {
  //    var addScript = document.createElement('script');
  //    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
  //    document.body.appendChild(addScript);
  //    window.googleTranslateElementInit = googleTranslateElementInit;
  //  }, [])

  const userLogin = JSON.parse(sessionStorage.getItem("user"));
  const userLogout = () => {
    sessionStorage.removeItem("user");
    window.location.assign("/");
  };

  const [cart, setcart] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );

  // console.log("Active Page:", activePage)

  // console.log(cart);

  useEffect(() => {
    getContact();
  }, []);

  // useEffect(() => {
  //   const User = JSON.parse(sessionStorage.getItem("user"));
  //   if (!User) {
  //     alert("Please login first");
  //     window.location.assign("/checkout");
  //   } else {
  //     window.location.assign("/login")
  //   }
  // }, []);

  return (
    <>
      <div
        className="headers"
        style={{
          position: "sticky",
          top: "0px",
          zIndex: "9999999",
          backgroundColor: "white",
        }}
      >
        {/* Top Nav Start */}
        <div className="top-nav-header">
          <div className="top-nav">
            <div>
              <a href="/">
                <img
                  src="../images/logo.jpg"
                  alt="logo"
                  style={{ width: "120px", height: "86px" }}
                />
              </a>
            </div>
          </div>

          <div className="navbar-left-content">
            <div className="row">
              <div className="col-sm-12">
                <div className="top-nav-icon">
                  <Button
                    variant="light"
                    style={{
                      background: "#080874 ",
                      color: "white",
                    }}
                    onClick={handleShow1}
                  >
                    Join as a Pro
                  </Button>
                </div>
                <div className="top-nav-icon">
                  <TfiTimer
                    style={{ width: "24px", height: "24px", color: "#080874" }}
                  />
                </div>
                <div className="top-nav-icon-content">
                  <p>Mon-Sat 9:00-19:00</p>
                  <p>Sunday - closed</p>
                </div>
                <div className="top-nav-icon">
                  {/* <img
                src="../images/call.png"
                alt="logo"
                style={{ width: "100%", height: "40px" }}
              /> */}
                  <div
                    style={{
                      background: "#080874",
                      padding: "8px",
                      borderRadius: "50%",
                    }}
                  >
                    <FaPhoneVolume
                      style={{ width: "22px", height: "16px", color: "white" }}
                    />
                  </div>
                </div>
                <div className="top-nav-icon-content">
                  {data?.map((item) => {
                    return <p style={{ fontSize: "14px" }}>{item?.mobile}</p>;
                  })}

                  <p style={{ fontSize: "14px" }}>Call us for enquiry</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Top Nav End */}

        {["xl"].map((expand) => (
          <Navbar
            key={expand}
            expand={expand}
            style={{ padding: "0px", background: "#080874" }}
          >
            <Container fluid>
              {/* <Navbar.Brand href="#">
                <img
                  src="../images/pc.png"
                  alt="logo"
                  style={{ width: "120px", height: "86px" }}
                />
              </Navbar.Brand> */}
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  {/* <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Offcanvas
                  </Offcanvas.Title> */}
                </Offcanvas.Header>
                <Offcanvas.Body style={{ padding: "0px 60px" }}>
                  <Nav className="justify-content-start flex-grow-1 pe-3 jsdf">
                    <Link to="/" className="tail-text">
                      HOME
                    </Link>
                    {/* </Link> */}
                    <Link to="/about" className="tail-text">
                      ABOUT US
                    </Link>
                    <Link to="/services" className="tail-text">
                      SERVICES
                    </Link>
                    <Link to="/contactus" className="tail-text">
                      CONTACT US
                    </Link>
                  </Nav>
                  <div className="navbar-right-content" style={{ gap: "11px" }}>
                    {userLogin ? (
                      <>
                        <Link
                          to="/profile"
                          className="tail-text"
                          style={{ paddingTop: "9px" }}
                        >
                          {userLogin.name}
                        </Link>
                        <div className="dropdown" style={{ paddingTop: "9px" }}>
                          <Link
                            href=""
                            className="tail-text"
                            style={{
                              color: "#083a87 ",
                              borderRadius: "12px",
                              padding: "12px 8px",
                              background: "white",
                            }}
                          >
                            My account
                          </Link>
                          <div className="dropdown-content">
                            <Link to="/profile">Profile</Link>
                            <p
                              style={{
                                borderBottom: "1px solid lightgray",
                                margin: "5px",
                              }}
                            ></p>
                            <Link to="/orderdetails">Order Details</Link>
                            <p
                              style={{
                                borderBottom: "1px solid lightgray",
                                margin: "5px",
                              }}
                            ></p>
                            <Link
                              onClick={userLogout}
                              style={{ cursor: "pointer" }}
                            >
                              Logout
                            </Link>
                          </div>
                        </div>
                        {/* <Link onClick={userLogout} className="tail-text">
                          Logout
                        </Link> */}
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="tail-text1">
                          Login/Register
                        </Link>
                      </>
                    )}

                    <Link to="/checkout" className="tail-text">
                      <Badge content={props?.basket?.length} color="secondary">
                        <AiOutlineShoppingCart
                          style={{ fontSize: "30px", margin: "7px 0px" }}
                          onClick={() => {
                            navigate("/checkout");
                          }}
                        />
                      </Badge>
                    </Link>
                  </div>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}

        {/* Enquiry Modal */}

        <Modal
          show={show1}
          onHide={handleClose1}
          style={{ zIndex: "99999999" }}
        >
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
              style={{
                background: "#080874 ",
                color: "white",
              }}
              onClick={addProrequest}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    subscribe: state.Subscribe,
    basket: state.basket,
  };
};

export default connect(mapStateToProps)(Header);

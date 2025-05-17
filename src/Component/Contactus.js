import React, { useState, useEffect } from "react";
import "../Style/Home.css";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { AiOutlineArrowUp } from "react-icons/ai";
import { IoMdCheckboxOutline } from "react-icons/io";
import { CiCalendarDate, CiMobile1 } from "react-icons/ci";
import { IoDocumentsOutline, IoPersonSharp } from "react-icons/io5";
import Form from "react-bootstrap/Form";
import { FaHome } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import "../Style/otp.css";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa";
import axios from "axios";
import parse from "html-react-parser";
import { Email, Message } from "@mui/icons-material";

const Contactus = () => {
  const [phone, setPhone] = useState("");
  const [showNameError, setShowNameError] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [validateEmail, setValidateEmail] = useState("");
  const [sendMessage, setSendMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    number: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    email: "",
    number: "",
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
    if (name === "firstName" && !/^[a-zA-Z]+(?:[-\s][a-zA-Z]+)*$/.test(value)) {
      setFormErrors({
        ...formErrors,
        firstName: "Name must contain only letters.",
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
      } else if (name === "name" && !/^[a-zA-Z]+$/.test(formData[name])) {
        errors[name] = "Name must contain only letters.";
      }
      return errors;
    }, {});

    // Update form errors
    setFormErrors(validationErrors);

    // Check if there are any validation errors
    if (Object.values(validationErrors).every((error) => error === "")) {
      alert("Will contact you soon....!.");
      window?.location?.reload(true);
      console.log("Form Data:", formData);
    } else {
      console.log("Form validation failed. Please check the errors.");
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
  //get for faq
  const [data1, setdata1] = useState([]);
  const getFAQ = async () => {
    try {
      let res = await axios.get("https://coorgtour.in/api/admin/getAllFaq");
      if (res.status == 200) {
        setdata1(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get for SocialMedias
  const [data2, setdata2] = useState([]);
  const getSocialMedias = async () => {
    try {
      let res = await axios.get(
        "https://coorgtour.in/api/admin/getAllSocialMedias"
      );
      if (res.status == 200) {
        setdata2(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //post for Enquiry
  const [EName, setEName] = useState("");
  const [EEmail, setEEmail] = useState("");
  const [ENumber, setENumber] = useState("");
  const [EMessage, setEMessage] = useState("");

  const addEnquiry = async () => {
    try {
      const config = {
        url: "/admin/addEnquiry",
        method: "Post",
        baseURL: "https://coorgtour.in/api",
        data: {
          EName: EName,
          EEmail: Email,
          ENumber: Number,
          EMessage: Message,
        },
      };

      let res = await axios(config);
      if (res.status == 200) {
        alert("Will contact you soon....!.");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContact();
    getFAQ();
    getSocialMedias();
  }, []);

  const result = data2?.MediaName === name ? data2?.MediaName : null;
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const closeAccordion = () => {
    setOpenIndex(null);
  };
  return (
    <div>
      <div className="service-bg">
        <div
          className="contact-img"
          style={{ position: "absolute", width: "100%" }}
        ></div>
        <div className="bg-text-container">
          <div className="text-display" style={{ padding: "40px 0px" }}>
            <h3 className="text-center" style={{ color: "white" }}>
              Contact Us
            </h3>
          </div>
        </div>
      </div>

      <div>
        {data?.map((item) => {
          return (
            <div className="contact-cards-container">
              <div className="contact-cards">
                <div
                  className="card"
                  style={{
                    width: "20rem",
                    height: "120px",
                    margin: "10px auto",
                    boxShadow: "rgb(1, 53, 102) 0px -1px 3px 1px",
                  }}
                >
                  <div className="card-body">
                    <div className="address-title-section">
                      <IoLocationSharp
                        style={{
                          width: "20px",
                          height: "23px",
                          color: "#013566",
                        }}
                      />
                      <h5
                        className="card-title"
                        style={{
                          textAlign: "center",
                          margin: "5px",
                          fontSize: "20px",
                          color: "#013566",
                        }}
                      >
                        Address
                      </h5>
                    </div>

                    <p style={{ padding: "5px 0px" }} className="card-text">
                      {item?.Adress}
                    </p>
                  </div>
                </div>
                <div
                  className="card"
                  style={{
                    width: "20rem",
                    height: "120px",
                    margin: "10px auto",
                    boxShadow: "rgb(1, 53, 102) 0px -1px 3px 1px",
                  }}
                >
                  <div className="card-body">
                    <div className="address-title-section">
                      <FaPhoneVolume
                        style={{
                          width: "20px",
                          height: "23px",
                          color: "#013566",
                        }}
                      />
                      <h5
                        className="card-title"
                        style={{
                          textAlign: "center",
                          margin: "5px",
                          fontSize: "20px",
                          color: "#013566",
                        }}
                      >
                        Phone Number
                      </h5>
                    </div>
                    <p style={{ padding: "5px 0px" }} className="card-text">
                      {" "}
                      +91 {item?.mobile}
                    </p>
                  </div>
                </div>
                <div
                  className="card"
                  style={{
                    width: "20rem",
                    height: "120px",
                    margin: "10px auto",
                    boxShadow: "rgb(1, 53, 102) 0px -1px 3px 1px",
                  }}
                >
                  <div className="card-body">
                    <div className="address-title-section">
                      <IoMdMail
                        style={{
                          width: "20px",
                          height: "23px",
                          color: "#013566",
                        }}
                      />
                      <h5
                        className="card-title"
                        style={{
                          textAlign: "center",
                          margin: "5px",
                          fontSize: "20px",
                          color: "#013566",
                        }}
                      >
                        E-Mail
                      </h5>
                    </div>
                    <p style={{ padding: "5px 0px" }} className="card-text">
                      {" "}
                      {item?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="contact-form-section mb-4">
        <div
          className="form-container"
          style={{
            height: "100%",
            backgroundColor: "white",
            border: "1px solid rgb(202, 194, 194)",
          }}
          id="contct"
        >
          <form style={{ padding: "30px" }}>
            <h4>Message Us</h4>

            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter Your Name"
              className="contact-info-form-input"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <span className="error">{formErrors.firstName}</span>

            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              className="contact-info-form-input"
              value={formData.email}
              onChange={handleInputChange}
            />
            <span className="error">{formErrors.email}</span>

            <input
              type="number"
              id="number"
              name="number"
              placeholder="Enter Your Phone Number"
              className="contact-info-form-input"
              value={formData.number}
              onChange={handleInputChange}
            />
            <span className="error">{formErrors.number}</span>

            <textarea
              type="text"
              id="message"
              name="message"
              placeholder="Enter Your Message"
              className="contact-info-form-textarea"
              value={formData.message}
              onChange={handleInputChange}
            />
            <span className="error">{formErrors.message}</span>
            <button className="send-button" onClick={handleSubmit}>
              Submit
            </button>
          </form>

          <div className="mb-2">
            <div
              className="contact-info-container-social-icon "
              style={{ gap: "5px" }}
            >
              <div className="icon-section">
                <a href={result} target="_new">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xlink="http://www.w3.org/1999/xlink"
                    viewBox="0,0,256,256"
                    width="33px"
                    height="33px"
                  >
                    <g transform="translate(51.2,51.2) scale(0.6,0.6)">
                      <g
                        fill="navy"
                        fill-rule="nonzero"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-miterlimit="10"
                        stroke-dasharray=""
                        stroke-dashoffset="0"
                        font-family="none"
                        font-weight="none"
                        font-size="none"
                        text-anchor="none"
                        style={{ mixBlendMode: "normal" }}
                      >
                        <g transform="scale(5.12,5.12)">
                          <path d="M25,2c-12.682,0 -23,10.318 -23,23c0,3.96 1.023,7.854 2.963,11.29l-2.926,10.44c-0.096,0.343 -0.003,0.711 0.245,0.966c0.191,0.197 0.451,0.304 0.718,0.304c0.08,0 0.161,-0.01 0.24,-0.029l10.896,-2.699c3.327,1.786 7.074,2.728 10.864,2.728c12.682,0 23,-10.318 23,-23c0,-12.682 -10.318,-23 -23,-23zM36.57,33.116c-0.492,1.362 -2.852,2.605 -3.986,2.772c-1.018,0.149 -2.306,0.213 -3.72,-0.231c-0.857,-0.27 -1.957,-0.628 -3.366,-1.229c-5.923,-2.526 -9.791,-8.415 -10.087,-8.804c-0.295,-0.389 -2.411,-3.161 -2.411,-6.03c0,-2.869 1.525,-4.28 2.067,-4.864c0.542,-0.584 1.181,-0.73 1.575,-0.73c0.394,0 0.787,0.005 1.132,0.021c0.363,0.018 0.85,-0.137 1.329,1.001c0.492,1.168 1.673,4.037 1.819,4.33c0.148,0.292 0.246,0.633 0.05,1.022c-0.196,0.389 -0.294,0.632 -0.59,0.973c-0.296,0.341 -0.62,0.76 -0.886,1.022c-0.296,0.291 -0.603,0.606 -0.259,1.19c0.344,0.584 1.529,2.493 3.285,4.039c2.255,1.986 4.158,2.602 4.748,2.894c0.59,0.292 0.935,0.243 1.279,-0.146c0.344,-0.39 1.476,-1.703 1.869,-2.286c0.393,-0.583 0.787,-0.487 1.329,-0.292c0.542,0.194 3.445,1.604 4.035,1.896c0.59,0.292 0.984,0.438 1.132,0.681c0.148,0.242 0.148,1.41 -0.344,2.771z"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </div>
              <div className="icon-section">
                <a href={"https://www.facebook.com/"} target="_new">
                  <svg
                    width="34"
                    height="32"
                    viewBox="0 0 34 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="33.336"
                      height="31.9972"
                      rx="15.9986"
                      fill="white"
                    />
                    <path
                      d="M21.065 24.9972V16.8012H23.83L24.241 13.5922H21.065V11.5482C21.065 10.6222 21.323 9.98817 22.652 9.98817H24.336V7.12717C23.5166 7.03936 22.693 6.99696 21.869 7.00017C19.425 7.00017 17.747 8.49217 17.747 11.2312V13.5862H15V16.7952H17.753V24.9972H21.065Z"
                      fill="navy"
                    />
                  </svg>
                </a>
              </div>
              <div className="icon-section">
                <a href={"https://www.twitter.com/"} target="_new">
                  <svg
                    width="34"
                    height="33"
                    viewBox="0 0 34 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.335999"
                      width="32.7743"
                      height="32.5844"
                      rx="16.2922"
                      fill="white"
                    />
                    <path
                      d="M25.436 10.8898C24.7951 11.1738 24.1067 11.3656 23.383 11.4523C24.1298 11.0055 24.6884 10.3023 24.9548 9.47387C24.2532 9.89058 23.4854 10.1839 22.6847 10.3411C22.1462 9.76616 21.433 9.3851 20.6558 9.25705C19.8786 9.129 19.0808 9.26113 18.3864 9.63292C17.692 10.0047 17.1397 10.5954 16.8154 11.3132C16.4911 12.031 16.4128 12.8358 16.5927 13.6027C15.1712 13.5313 13.7805 13.1618 12.511 12.5182C11.2415 11.8746 10.1215 10.9713 9.22376 9.8668C8.91678 10.3963 8.74027 11.0103 8.74027 11.6641C8.73993 12.2528 8.88488 12.8324 9.16227 13.3515C9.43966 13.8707 9.84091 14.3134 10.3304 14.6403C9.76272 14.6222 9.20755 14.4688 8.71111 14.1929V14.2389C8.71105 15.0645 8.99662 15.8646 9.51937 16.5036C10.0421 17.1426 10.7698 17.5811 11.579 17.7446C11.0524 17.8871 10.5003 17.9081 9.96434 17.806C10.1927 18.5163 10.6374 19.1375 11.2363 19.5825C11.8352 20.0276 12.5582 20.2742 13.3042 20.2879C12.0378 21.282 10.4738 21.8213 8.86383 21.8189C8.57864 21.819 8.29368 21.8023 8.01044 21.769C9.64468 22.8198 11.5471 23.3775 13.49 23.3753C20.0669 23.3753 23.6624 17.928 23.6624 13.2036C23.6624 13.0501 23.6586 12.8951 23.6517 12.7416C24.351 12.2359 24.9547 11.6096 25.4344 10.8921L25.436 10.8898Z"
                      fill="navy"
                    />
                  </svg>
                </a>
              </div>
              <div className="icon-section">
                <a href="/" target="_new">
                  <svg
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.110352"
                      width="32.2325"
                      height="32.2325"
                      rx="16.1163"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.7463 7.72497C13.6465 7.68353 13.9335 7.67432 16.2266 7.67432C18.5198 7.67432 18.8068 7.68429 19.7062 7.72497C20.6057 7.76564 21.2196 7.90915 21.7568 8.11713C22.3194 8.32971 22.8297 8.66201 23.2518 9.09178C23.6816 9.51311 24.0131 10.0227 24.2249 10.586C24.4337 11.1232 24.5764 11.7371 24.6178 12.6351C24.6593 13.5368 24.6685 13.8238 24.6685 16.1162C24.6685 18.4093 24.6585 18.6963 24.6178 19.5965C24.5772 20.4944 24.4337 21.1084 24.2249 21.6456C24.0131 22.209 23.681 22.7194 23.2518 23.1413C22.8297 23.5711 22.3194 23.9026 21.7568 24.1144C21.2196 24.3232 20.6057 24.4659 19.7078 24.5074C18.8068 24.5488 18.5198 24.558 16.2266 24.558C13.9335 24.558 13.6465 24.548 12.7463 24.5074C11.8484 24.4667 11.2344 24.3232 10.6972 24.1144C10.1339 23.9026 9.62344 23.5705 9.20149 23.1413C8.77201 22.7197 8.43966 22.2096 8.2276 21.6463C8.01963 21.1091 7.87688 20.4952 7.83544 19.5973C7.794 18.6955 7.78479 18.4085 7.78479 16.1162C7.78479 13.8231 7.79477 13.536 7.83544 12.6366C7.87612 11.7371 8.01963 11.1232 8.2276 10.586C8.43997 10.0227 8.77258 9.51258 9.20225 9.09101C9.62361 8.66163 10.1335 8.32928 10.6965 8.11713C11.2337 7.90915 11.8484 7.76641 12.7463 7.72497ZM19.6379 9.2445C18.7477 9.20383 18.4806 9.19538 16.2266 9.19538C13.9727 9.19538 13.7056 9.20383 12.8154 9.2445C11.9919 9.28211 11.5453 9.41948 11.2475 9.53536C10.8538 9.68885 10.5721 9.87073 10.2767 10.1662C9.99659 10.4387 9.78104 10.7704 9.64583 11.137C9.52995 11.4348 9.39258 11.8814 9.35497 12.7049C9.3143 13.5951 9.30586 13.8622 9.30586 16.1162C9.30586 18.3701 9.3143 18.6372 9.35497 19.5274C9.39258 20.3509 9.52995 20.7976 9.64583 21.0953C9.7809 21.4614 9.99656 21.7937 10.2767 22.0661C10.5491 22.3463 10.8814 22.5619 11.2475 22.697C11.5453 22.8129 11.9919 22.9502 12.8154 22.9878C13.7056 23.0285 13.9719 23.037 16.2266 23.037C18.4814 23.037 18.7477 23.0285 19.6379 22.9878C20.4614 22.9502 20.908 22.8129 21.2058 22.697C21.5995 22.5435 21.8811 22.3616 22.1766 22.0661C22.4567 21.7937 22.6724 21.4614 22.8074 21.0953C22.9233 20.7976 23.0607 20.3509 23.0983 19.5274C23.139 18.6372 23.1474 18.3701 23.1474 16.1162C23.1474 13.8622 23.139 13.5951 23.0983 12.7049C23.0607 11.8814 22.9233 11.4348 22.8074 11.137C22.654 10.7433 22.4721 10.4617 22.1766 10.1662C21.9041 9.88614 21.5724 9.67059 21.2058 9.53536C20.908 9.41948 20.4614 9.28211 19.6379 9.2445ZM13.1584 13.0479C13.5613 12.645 14.0397 12.3254 14.5661 12.1073C15.0926 11.8893 15.6568 11.777 16.2266 11.777C16.7965 11.777 17.3607 11.8893 17.8872 12.1073C18.4136 12.3254 18.8919 12.645 19.2949 13.0479C19.6978 13.4509 20.0174 13.9292 20.2355 14.4557C20.4535 14.9821 20.5658 15.5463 20.5658 16.1162C20.5658 16.686 20.4535 17.2502 20.2355 17.7767C20.0174 18.3031 19.6978 18.7815 19.2949 19.1844C18.4811 19.9981 17.3775 20.4553 16.2266 20.4553C15.0758 20.4553 13.9722 19.9981 13.1584 19.1844C12.3447 18.3707 11.8875 17.267 11.8875 16.1162C11.8875 14.9654 12.3447 13.8617 13.1584 13.0479ZM21.5281 12.4232C21.628 12.3291 21.7079 12.2158 21.7632 12.0902C21.8185 11.9645 21.848 11.8291 21.85 11.6918C21.852 11.5546 21.8264 11.4183 21.7748 11.2911C21.7232 11.1639 21.6466 11.0484 21.5496 10.9513C21.4525 10.8543 21.337 10.7777 21.2098 10.7261C21.0826 10.6745 20.9463 10.6489 20.8091 10.6509C20.6718 10.6529 20.5364 10.6824 20.4108 10.7377C20.2851 10.793 20.1718 10.8729 20.0777 10.9728C19.8945 11.167 19.7942 11.4249 19.7981 11.6918C19.802 11.9587 19.9097 12.2136 20.0985 12.4024C20.2873 12.5912 20.5422 12.6989 20.8091 12.7028C21.076 12.7067 21.3339 12.6064 21.5281 12.4232Z"
                      fill="navy"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="contact-form-section mb-4"> */}
        <div className="form-container-1">
          <div className="faq">
            <h2>Frequently Asked Questions</h2>
            <ul className="accordian" style={{ padding: "0px" }}>
              {data1?.map((item, index) => {
                return (
                  <li key={index}>
                    <input
                      type="radio"
                      name="accordion"
                      id={`accordion-${index}`}
                      checked={openIndex === index}
                      onChange={() => toggleAccordion(index)}
                    />
                    <label htmlFor={`accordion-${index}`}>
                      {parse(`<div>${item.question}</div>`)}
                      {/* <button
                        onClick={() => setOpenIndex(null)}
                        style={{ right: "10%" }}
                      >
                        X
                      </button> */}
                    </label>
                    <div
                      className={`content ${openIndex === index ? "open" : ""}`}
                    >
                      <p>{parse(`<div>${item.answer}</div>`)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;

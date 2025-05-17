import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../Style/footer.css";
import { Button } from "react-bootstrap";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { BiUpArrowAlt } from "react-icons/bi";
import axios from "axios";
import parse from "html-react-parser";

function Footer() {
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
  //get for contact
  const [data1, setdata1] = useState([]);
  const getContact = async () => {
    try {
      let res = await axios.get(
        "https://coorgtour.in/api/admin/getAllContactPage"
      );
      if (res.status == 200) {
        setdata1(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAbout();
    getContact();
  }, []);
  return (
    <>
      <div
        className="footer"
        style={{
          backgroundImage: "url('../images/servicebg.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "350px",
        }}
      >
        <div class="ocean">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
        <Container>
          <div className="footer-0">
            <Row>
              <Col md={4} className="px-3">
                <div className="provid">
                  <img
                    src="../images/f-logo.png"
                    alt=""
                    style={{ width: "100px", height: "80px" }}
                  />
                  {data?.map((item) => {
                    return (
                      <>
                        <p style={{ color: "black", textAlign: "justify" }}>
                          {parse(
                            `<div>${item?.abtdesc.slice(
                              0,
                              150
                            )} <span><a href="/about">View more...</a></span></div>`
                          )}
                        </p>
                      </>
                    );
                  })}
                </div>
              </Col>
              <Col md={4} className="px-4">
                <div className="provid">
                  <h5>Useful Links</h5>

                  <ul className="pro-links">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/about">About Us</a>
                    </li>
                    <li>
                      <a href="/services">Services</a>
                    </li>
                    <li>
                      <a href="/contactus">Contact Us</a>
                    </li>
                  </ul>
                </div>
              </Col>
              {/* <Col md={3} className="px-2">
                <div className="provid">
                  <h5>Address</h5>
                  {data1?.map((item) => {
                    return <p style={{ color: "black" }}>{item?.Adress}</p>;
                  })}
                </div>
              </Col> */}
              <Col md={4} className="px-2">
                <div className="provid">
                  <h5>
                    Please Share Your Feedback <br></br> or any Suggestion
                  </h5>

                  <a href="/contactus">
                    <Button
                      variant=""
                      style={{ backgroundColor: "#080874", color: "white" }}
                    >
                      Click Here
                    </Button>
                  </a>
                  <div style={{ margin: "12px 0", gap: "10px" }}>
                    <a href="/">
                      <Button
                        variant=""
                        style={{ backgroundColor: "#080874", color: "white" }}
                      >
                        Download App
                        <IoLogoGooglePlaystore
                          style={{
                            color: "white",
                            margin: "0px 5px",
                            fontSize: "20px",
                          }}
                        />
                      </Button>
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Row
          style={{
            display: "flex",
            float: "right",
            margin: "-55px 30px 0px 0px ",
          }}
        >
          <Col md={2} d-end>
            <div>
              <a href="/">
                <BiUpArrowAlt style={{ height: "50px", width: "40px" }} />
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Footer;

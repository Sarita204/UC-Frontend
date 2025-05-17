import React from "react";
import "../Style/Home.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Container } from "@mui/material";
import { Button } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel";

function Home() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    getBanner();
  }, []);

  const getBanner = () => {
    axios
      .get("https://coorgtour.in/api/admin/getBanner")
      .then(function (response) {
        setdata(response.data.Banner);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Container className="-cotainerslider">
        <Carousel fade>
          {data?.map((item, i) => {
            return (
              <Carousel.Item>
                <img
                  src={`https://coorgtour.in/Banner/${item?.img}`}
                  alt="df"
                  text="First slide"
                  className="slider-img"
                />
                <Carousel.Caption
                  data-aos="fade-right"
                  data-aos-duration="3000"
                >
                  <div
                    className="text-content"
                    data-aos="fade-right"
                    data-aos-duration="3000"
                  >
                    <h2>{item?.name}</h2>
                    <h4 className="mb-3" style={{ textAlign: "left" }}>
                      {item?.tagline}
                    </h4>
                    <a href="/services" style={{ textDecoration: "none" }}>
                      <Button
                        variant=""
                        className="sliders-btn "
                        style={{ textAlign: "left", display: "flex" }}
                      >
                        Learn More
                      </Button>
                    </a>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Container>
    </>
  );
}

export default Home;

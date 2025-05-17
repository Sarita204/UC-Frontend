import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { Navbar, Nav, Container, Col, Row, Modal } from "react-bootstrap";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { DynamicStar } from "react-dynamic-star";
import moment from "moment";
import parse from "html-react-parser";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const DemoDescription = (props) => {
    const [qty, setqty] = useState(1);

  const location = useLocation();
  const { dis } = location.state;
  console.log(dis.productname);

  const user = JSON.parse(sessionStorage.getItem("admin"));

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setdata] = useState([]);
  const [wis, setwis] = useState(false);
  const [selectimage, setselectimage] = useState("");
  const [selectvideo, setselectvideo] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [promocode, setpromocode] = useState([]);
  const [buyingnotification, setbuyingnotification] = useState([]);
  const [livedemodetails, setlivedemodetails] = useState([]);

  const todaydate = moment().format("YYYY-MM-DD");
  const todaydate1 = todaydate.split("-");
  const dayp = parseInt(todaydate1[2]);
  const monthp = parseInt(todaydate1[1]);
  const yearp = parseInt(todaydate1[0]);

  const newpromocode = promocode.filter((item) => item.status === "valid");

  const newbuyingnotification = buyingnotification.filter(
    (item) => item.productname === dis.productname
  );

  console.log("newpromocode", newpromocode);

  useEffect(() => {
    if (user) {
      getproductdiscription();
      getproductwislist();
      getpromocode();
      getuserlivedemo();
    }
  }, []);

  useEffect(() => {
    getproductdiscription();
  }, [showMore]);

  useEffect(() => {
    getbuyingnotification();
  }, []);

  function fun() {
    window.location.assign("/cart");
  }

  const getproductdiscription = () => {
    axios
      .get(
        "https://homegymdynamics.com/api/admin/getproductdiscription/" + dis._id
      )
      .then(function (response) {
        // handle success
        console.log(response.data);
        setdata(response.data.product);
        setselectimage(response.data.product[0].productimage);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const getpromocode = () => {
    axios
      .get("https://homegymdynamics.com/api/admin/getpromocode")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setpromocode(response.data.promocode);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const increment = () => {
    console.log("clicked", qty);
    setqty(qty + 1);
  };
  const decrement = () => {
    if (qty > 1) {
      setqty(qty - 1);
    }
  };

  function cart() {
    if (user) {
      props.dispatch({
        type: "addBasketItem",
        item: { product: data[0], quantity: qty },
      });
      alert("Product added to Your Cart");
    } else {
      alert("Need to Login");
    }
  }

  function cart1() {
    if (user) {
      props.dispatch({
        type: "addBasketItem",
        item: { product: data[0], quantity: qty },
      });
      window.location.assign("/cart");
    } else {
      alert("Need to Login");
    }
  }

  const addwishlist = async () => {
    if (user) {
      try {
        const config = {
          url: "/addwishlist",
          method: "post",
          baseURL: "https://homegymdynamics.com/api/user",
          data: {
            productid: dis._id,
            userid: user._id,
          },
        };
        await axios(config).then(function (res) {
          if ((res.status = 200)) {
            console.log("success");
            alert("Added to wishlist");
            getproductwislist();
          }
        });
      } catch (error) {
        console.log(error);
        alert("product not added");
      }
    } else {
      alert("Need to Login");
    }
  };

  const getproductwislist = () => {
    axios
      .get(
        "https://homegymdynamics.com/api/user/getproductwishlist/" +
          user._id +
          "/" +
          dis._id
      )
      .then(function (response) {
        // handle success
        console.log(response.data);
        if (response.data.product === null) {
          setwis(false);
        } else if (Object.keys(response.data.product).length > 0) {
          setwis(true);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const removewishlist = async () => {
    axios({
      method: "post",
      url:
        "https://homegymdynamics.com/api/user/removeproductwishlist/" +
        user._id +
        "/" +
        dis._id,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("Product removed from wishlist");
        getproductwislist();
        // window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };

  function comet() {
    if (user) {
      window.location.assign("/cometchat");
    } else {
      alert("Need to Login");
    }
  }

  const getbuyingnotification = () => {
    axios
      .get("https://homegymdynamics.com/api/admin/getBuyingnotification")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setbuyingnotification(response.data.buyingnotification);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const addlivedemo = async () => {
    if (user) {
      try {
        const config = {
          url: "/addlivedemo",
          method: "post",
          baseURL: "https://homegymdynamics.com/api/admin",
          data: {
            productId: dis._id,
            userId: user._id,
          },
        };
        await axios(config).then(function (res) {
          if ((res.status = 200)) {
            console.log("success");
            alert("Your request sent sucessfully");
            getuserlivedemo();
          }
        });
      } catch (error) {
        console.log(error);
        alert("Unable to send your request try after some time");
      }
    } else {
      alert("Need to Login");
    }
  };

  const getuserlivedemo = () => {
    axios
      .get(
        "https://homegymdynamics.com/api/admin/getuserlivedemo/" +
          user._id +
          "/" +
          dis._id
      )
      .then(function (response) {
        // handle success
        console.log(response.data);
        setlivedemodetails(response.data.livedemo);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const [CopySuccess, setCopySuccess] = useState();
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess(livedemodetails[0]?.meetingid);
    alert("Code Copied");
  }

  return (
    <>
   

    {/* <MidHeader /> */}
    <div className="mid-header" style={{ backgroundColor: "#f3efef" }}>
      <Navbar sticky collapseOnSelect variant="">
        <Container fluid>
          <Navbar.Brand>
            <img
              src="../logo.png"
              alt="logo"
              className="img-fluid"
              style={{ width: "150px" }}
              onClick={() => window.location.assign("/")}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
              className="mx-auto"
              // style={{ overflow: "hidden", width: "100%" }}
            >
              {/* <div className="marquee">
                <div className="marquee__content">
                  <div className="list-inline">
                    {newbuyingnotification.map((item) => (
                      <p style={{ color: "red", fontStyle: "italic" }}>
                        {item.buyingnotification}
                      </p>
                    ))}
                  </div>
                </div>
              </div> */}
              <p className="blink">
                {newbuyingnotification[0]?.buyingnotification}
              </p>
              {/* <Search /> */}
              {/* <input
                type="text"
                placeholder="Search..."
                id="search-text-input"
                required
                onChange={(e) => setdata(e.target.value)}
              />
              <div id="button-holder">
                <img src="../search.png" alt="search" onClick={postsearch} />
              </div> */}
            </Nav>
            <Nav>
              <Nav.Link
                href="#"
                className="text-dark font-weight-bold"
                style={{ fontSize: "15px" }}
              >
                Call Us Now
                <br />
                <strong>9591430090</strong>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="badge">
            <Tooltip title="add" arrow>
              <Button>
                <IconButton aria-label="cart" onClick={fun}>
                  <StyledBadge
                    badgeContent={props.basket.length}
                    color="secondary"
                    showZero
                  ></StyledBadge>

                  <ShoppingCartIcon />
                </IconButton>
              </Button>
            </Tooltip>
          </div>
        </Container>
      </Navbar>
    </div>

    <br></br>

    {data?.map((item) => {
      return (
        <Container className="mt-5">
          <Row>
            <Col md={6}>
              <Row>
                <Col md={3} className="prodimage">
                  <img
                    src={
                      "https://homegymdynamics.com/product/" +
                      item.productimage
                    }
                    onClick={() => {
                      setselectimage(item.productimage);
                      setselectvideo("");
                    }}
                    alt=""
                    className="imgbrand"
                  />
                  <div className="video1">
                    <video
                      src={
                        "https://homegymdynamics.com/product/" +
                        item.productvideo
                      }
                      alt=""
                      onClick={() => setselectvideo(item.productvideo)}
                    />
                    <div class="centered1">
                      <i
                        class="fa fa-play"
                        aria-hidden="true"
                        style={{ fontSize: "16px", color: "white" }}
                        onClick={() => setselectvideo(item.productvideo)}
                      ></i>
                    </div>
                  </div>
                  <img
                    src={
                      "https://homegymdynamics.com/product/" +
                      item.productsubimage1
                    }
                    onClick={() => {
                      setselectimage(item.productsubimage1);
                      setselectvideo("");
                    }}
                    alt=""
                    className="imgbrand"
                  />
                  <img
                    src={
                      "https://homegymdynamics.com/product/" +
                      item.productsubimage2
                    }
                    onClick={() => {
                      setselectimage(item.productsubimage2);
                      setselectvideo("");
                    }}
                    alt=""
                    className="imgbrand"
                  />
                  <img
                    src={
                      "https://homegymdynamics.com/product/" +
                      item.productsubimage3
                    }
                    onClick={() => {
                      setselectimage(item.productsubimage3);
                      setselectvideo("");
                    }}
                    alt=""
                    className="imgbrand"
                  />
                  <img
                    src={
                      "https://homegymdynamics.com/product/" +
                      item.productsubimage4
                    }
                    onClick={() => {
                      setselectimage(item.productsubimage4);
                      setselectvideo("");
                    }}
                    alt=""
                    className="imgbrand"
                  />
                </Col>
                <Col
                  md={9}
                  className="prodimage1 figure"
                  style={{ height: "375px", width: "416px" }}
                >
                  {selectvideo ? (
                    <video
                      src={
                        "https://homegymdynamics.com/product/" +
                        item.productvideo
                      }
                      alt=""
                      autoPlay
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src={
                        "https://homegymdynamics.com/product/" + selectimage
                      }
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    ></img>
                  )}
                  <div class="top-left">
                    {!wis ? (
                      <button
                        onClick={() => addwishlist()}
                        style={{ border: "none" }}
                      >
                        <i
                          class="fas fa-heart"
                          style={{ color: "black" }}
                        ></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => removewishlist()}
                        style={{ border: "none" }}
                      >
                        <i class="fas fa-heart" style={{ color: "red" }}></i>
                      </button>
                    )}
                  </div>
                  <div
                    class="bottom-right"
                    style={{
                      backgroundColor: "#ff192f",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {item.productdiscount}%
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <div>
                <h1
                  style={{
                    color: "#ff192d",
                    fontWeight: "800",
                    fontSize: "x-large",
                  }}
                >
                  {item.productname}
                </h1>
                {/* <div
                  className="wrap-star text-left"
                  style={{ color: "#63666ead" }}
                >
                  <strong className="rating">
                    {item.productrating === 1 ? (
                      <i
                        class="bi bi-star-fill"
                        style={{ color: "gold" }}
                      ></i>
                    ) : (
                      <i class="bi bi-star-fill"></i>
                    )}
                    {item.productrating === 2 ? (
                      <i
                        class="bi bi-star-fill"
                        style={{ color: "gold" }}
                      ></i>
                    ) : (
                      <i class="bi bi-star-fill"></i>
                    )}
                    {item.productrating === 3 ? (
                      <i
                        class="bi bi-star-fill"
                        style={{ color: "gold" }}
                      ></i>
                    ) : (
                      <i class="bi bi-star-fill"></i>
                    )}
                    {item.productrating === 4 ? (
                      <i
                        class="bi bi-star-fill"
                        style={{ color: "gold" }}
                      ></i>
                    ) : (
                      <i class="bi bi-star-fill"></i>
                    )}
                    {item.productrating === 5 ? (
                      <i
                        class="bi bi-star-fill"
                        style={{ color: "gold" }}
                      ></i>
                    ) : (
                      <i class="bi bi-star-fill"></i>
                    )}
                  </strong>
                </div> */}
                {/* <p>Ratings : {item.productrating}</p> */}
                <DynamicStar
                  rating={
                    item.ratings?.reduce((a, b) => a + b.ratings, 0) /
                    item.ratings?.length
                  }
                  width={15}
                  height={15}
                  outlined={true}
                  style={{ marginBottom: "10px" }}
                />
                <b
                  style={{
                    fontSize: "20px",
                    fontFamily: "Oswald,sans-serif",
                  }}
                >
                  ₹{" "}
                  {Math.trunc(
                    item.productprice +
                      (item.CGST / 100) * item.productprice +
                      (item.SGST / 100) * item.productprice -
                      (item.productdiscount / 100) *
                        (item.productprice +
                          (item.CGST / 100) * item.productprice +
                          (item.SGST / 100) * item.productprice)
                  )}
                </b>
                {/* <b
                  style={{
                    textDecoration: "line-through",
                    color: "#a7a7a7",
                    fontSize: "15px",
                    fontFamily: "Oswald,sans-serif",
                    marginLeft: "10px",
                  }}
                >
                  ₹{" "}
                  {item.productprice +
                    (item.CGST / 100) * item.productprice +
                    (item.SGST / 100) * item.productprice}
                </b> */}
                {/* <p style={{ color: "gray", textAlign: "justify" }}>
                  {showMore
                    ? item.productdiscription
                    : `${item.productdiscription.substring(0, 150)}`}
                  <button
                    className="btn"
                    onClick={() => setShowMore(!showMore)}
                    style={{ color: "black", fontWeight: "800" }}
                  >
                    {showMore ? "...Show less" : "Show more..."}
                  </button>
                </p> */}
                <b> - 3/6 months EMI available</b>
                {showMore ? (
                  <div style={{ marginTop: "10px" }}>
                    <p style={{ textAlign: "justify" }}>
                      {parse(item.productdiscription)}
                    </p>
                    <Row style={{ marginTop: "10px" }}>
                      <Col md={3} style={{ fontWeight: "500" }}>
                        Brand
                      </Col>

                      <Col md={9}>{item.productbrand}</Col>
                    </Row>
                    <Row>
                      <Col md={3} style={{ fontWeight: "500" }}>
                        Features
                      </Col>
                      <Col md={9}>{item.productfeature}</Col>
                    </Row>
                    {item.productspecialfeature ? (
                      <Row>
                        <Col md={3} style={{ fontWeight: "500" }}>
                          Special Features
                        </Col>
                        <Col md={9}>{item.productspecialfeature}</Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <Row>
                      <Col md={3} style={{ fontWeight: "500" }}>
                        Total Stock
                      </Col>
                      <Col md={9}>{item.producttotalstack}</Col>
                    </Row>
                    <Row>
                      <Col md={3} style={{ fontWeight: "500" }}>
                        Available Stock
                      </Col>
                      <Col md={9}>{item.productavailstack}</Col>
                    </Row>
                    <Row>
                      <Col md={3} style={{ fontWeight: "500" }}>
                        Warranty
                      </Col>
                      <Col md={9}>{item.productwarranty}</Col>
                    </Row>
                    <Row>
                      <Col md={3} style={{ fontWeight: "500" }}>
                        Training Fees
                      </Col>
                      <Col md={9}>{item.fees}</Col>
                    </Row>
                    <button
                      className="btn"
                      onClick={() => setShowMore(!showMore)}
                      style={{ color: "black", fontWeight: "800" }}
                    >
                      {showMore ? "...Show less" : "Show more..."}
                    </button>
                  </div>
                ) : (
                  <>
                    <p style={{ marginTop: "10px" }}>
                      {parse(item.productdiscription.substring(0, 150))}
                    </p>
                    <button
                      className="btn"
                      onClick={() => setShowMore(!showMore)}
                      style={{ color: "black", fontWeight: "800" }}
                    >
                      {showMore ? "...Show less" : "Show more..."}
                    </button>
                  </>
                )}

                {/* <p>Total available product :{item.productavailstack}</p> */}
                <div
                  className="quantity"
                  style={{
                    display: "flex",
                    marginTop: "10px",
                    marginBottom: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: "bold", color: "red" }}>
                      Quantity
                    </p>
                    <div
                      style={{
                        display: "flex",
                        marginTop: newpromocode.length > 0 ? "10px" : "2px",
                      }}
                    >
                      <button
                        onClick={() => decrement()}
                        style={{
                          border: "none",
                          backgroundColor: "white",
                        }}
                      >
                        <i
                          class="fa fa-minus"
                          style={{ marginTop: "10px" }}
                        ></i>
                      </button>
                      <p
                        style={{
                          marginLeft: "20px",
                          fontSize: "20px",
                          marginTop: "10px",
                        }}
                      >
                        {qty}
                      </p>
                      <button
                        onClick={() => increment()}
                        style={{
                          border: "none",
                          backgroundColor: "white",
                          marginLeft: "20px",
                        }}
                      >
                        <i
                          class="fa fa-plus"
                          style={{ marginTop: "10px" }}
                        ></i>
                      </button>
                    </div>
                  </div>

                  {newpromocode.length > 0
                    ? newpromocode.map((item) => (
                        <div className="promocode">
                          <p>{parse(item.discription)}</p>
                          <p style={{ fontSize: "12px", marginTop: "10px" }}>
                            Add a coupon code <b>({item.coupon})</b> to get
                            extra Rs: {item.discount}/- Off{" "}
                          </p>
                        </div>
                      ))
                    : ""}
                </div>
                {livedemodetails[0]?.status === "Sent" ? (
                  <button
                    // style={{
                    //   backgroundColor: "black",
                    //   color: "white",
                    //   padding: "10px",
                    //   width: "100%",
                    //   borderRadius: "10px",
                    // }}
                    className="hvr-shutter-out-horizontal1"
                  >
                    Request sent for Live Online Demo
                  </button>
                ) : livedemodetails[0]?.status === "Accepted" ? (
                  <button
                    // onClick={addlivedemo}
                    // style={{
                    //   backgroundColor: "black",
                    //   color: "white",
                    //   padding: "10px",
                    //   width: "100%",
                    //   borderRadius: "10px",
                    // }}
                    className="hvr-shutter-out-horizontal1"
                  >
                    Live Online Demo Request Accepted
                    <i
                      class="fa fa-eye"
                      aria-hidden="true"
                      style={{ marginLeft: "10%" }}
                      onClick={handleShow}
                    ></i>
                  </button>
                ) : (
                  <button
                    onClick={addlivedemo}
                    // style={{
                    //   backgroundColor: "black",
                    //   color: "white",
                    //   padding: "10px",
                    //   width: "100%",
                    //   borderRadius: "10px",
                    // }}
                    className="hvr-shutter-out-horizontal1"
                  >
                    Request Live Online Demo
                  </button>
                )}
                {/* <div className="livebtn">
                  <button
                    onClick={() =>
                      user
                        ? window.location.assign("/joinwebinar")
                        : alert("Need to Login")
                    }
                    // onClick={() => window.location.assign("/VideoApp")}
                  >
                    Weekly live classes
                  </button>
                  <button onClick={comet}>Join Webinar</button>
                  <Link
                    to="/trainingdetails"
                    style={{ textDecoration: "none" }}
                    state={{ data: item }}
                  >
                    <button>Live Training</button>
                  </Link>
                  <button
                    onClick={() =>
                      user
                        ? window.location.assign("/liveshow")
                        : alert("Need to Login")
                    }
                  >
                    Virtual Experience Centre
                  </button>
                </div> */}
                <div className="cartbuy" style={{ marginTop: "10px" }}>
                  <button
                    className="hvr-shutter-out-horizontal"
                    onClick={cart}
                  >
                    <i
                      class="fa fa-shopping-cart"
                      aria-hidden="true"
                      style={{ padding: "0px 10px" }}
                    ></i>
                    Add to Cart
                  </button>
                  <button
                    className="hvr-shutter-out-horizontal"
                    onClick={cart1}
                  >
                    <i
                      class="fa fa-angle-double-right"
                      aria-hidden="true"
                      style={{
                        padding: "0px 10px",
                        fontSize: "22px",
                        fontWeight: "bolder",
                      }}
                    ></i>
                    Buy Now
                  </button>
                </div>
              </div>
            </Col>
          </Row>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <p style={{ color: "red" }}>
                Your Live Demo request has beed accepted.
              </p>
            </Modal.Header>
            <Modal.Body>
              <p style={{ fontWeight: "bold" }}>Demo Details</p>
              <Row>
                <Col md={6}>Date</Col>
                <Col md={6}>{livedemodetails[0]?.date}</Col>
              </Row>
              <Row>
                <Col md={6}>Start From</Col>
                <Col md={6}>{livedemodetails[0]?.fromtime}</Col>
              </Row>
              <Row>
                <Col md={6}>End At</Col>
                <Col md={6}>{livedemodetails[0]?.totime}</Col>
              </Row>
              <Row>
                <Col md={6}>Meeting ID</Col>
                <Col md={6}>
                  <input
                    type="text"
                    style={{
                      // backgroundColor: "red",
                      color: "red",
                      height: "28px",
                      // textAlign: "center",
                      fontWeight: "600",
                    }}
                    value={livedemodetails[0]?.meetingid}
                    ref={textAreaRef}
                    onClick={copyToClipboard}
                  />
                </Col>
              </Row>
              <Row>
                <Link
                  to={"/VideoApp/" + user?.name}
                  style={{
                    fontSize: "18px",
                    textAlign: "center",
                    marginTop: "30px",
                  }}
                >
                  Click here to Join Live Demo
                </Link>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "black", color: "white" }}
                onClick={handleClose}
              >
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
          </Container>
          );
        })}
        {/* </>
        ) : (
          <>
            <h1 style={{ margin: "100px 0px 200px 500px", color: "red" }}>
              <i>Need to Login</i>
            </h1>
          </>
        )} */}
      </>
    );
  }
  
  const mapStateToProps = (state) => {
    return {
      subscribe: state.Subscribe,
      basket: state.basket,
    };
  };



export default connect(mapStateToProps)(DemoDescription);
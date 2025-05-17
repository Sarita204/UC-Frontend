import React, { Component, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import "../Style/Home.css";
import { LuView } from "react-icons/lu";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Row,
  Modal,
} from "react-bootstrap";
import Carousel, { Item } from "react-grid-carousel";
import ReactPaginate from "react-paginate";
import Pagination from "react-js-pagination";
import axios from "axios";
import parse from "html-react-parser";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";

const Services = (props) => {
  const userProfile = sessionStorage.getItem("user");
  const [View, setView] = useState();
  const location = useLocation();

  function gettingMainCategory() {
    if (location?.state) {
      const { catname } = location?.state;
      setElectric(catname);
    }
    console.log(location?.state, 878787);
  }

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

  // Pagination
  // const [itempage, setItempage] = useState(5);
  // const [pageNumber, setPageNumber] = useState(0);
  // const productPerPage = 5;
  // const visitedPage = pageNumber * productPerPage;
  // const displayPage = data.slice(visitedPage, visitedPage + productPerPage);
  // const pageCount = Math.ceil(data.length / productPerPage);

  // const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
  };

  const [All, setAll] = useState(true);
  const [laptop, setlaptop] = useState(false);
  const [Desktop, setDesktop] = useState(false);
  const [MacBook, setMacBook] = useState(false);

  const [Electric, setElectric] = useState("");
  const [Catfilter, setCatfilter] = useState([]);

  const [data1, setdata1] = useState([]);
  const getCategory = () => {
    axios
      .get("https://coorgtour.in/api/admin/getCategory")
      .then(function (response) {
        setdata1(response.data.Category);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [Allservice, setAllservice] = useState([]);
  const [SelectedCat, setSelectedCat] = useState("");
  const getService = () => {
    axios
      .get("https://coorgtour.in/api/admin/getService")
      .then(function (response) {
        setAllservice(response.data.Service);
        setCatfilter(response.data.Service);
        // setselectimage(response.data.product[0].productimage);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategory();
    getService();
    gettingMainCategory();
  }, []);

  useEffect(() => {
    if (Electric) {
      const xyz = Allservice?.filter((item) => item.category === Electric);
      setCatfilter(xyz);
    } else {
      setCatfilter(Allservice);
    }
  }, [Electric, Allservice]);

  //========================================Add to cart==================================================
  const [qty, setqty] = useState(1);

  const [showMore, setShowMore] = useState(false);

  const todaydate = moment().format("YYYY-MM-DD");
  const todaydate1 = todaydate.split("-");
  const dayp = parseInt(todaydate1[2]);
  const monthp = parseInt(todaydate1[1]);
  const yearp = parseInt(todaydate1[0]);

  useEffect(() => {
    getService();
  }, []);

  function cart(item) {
    const isItemInCart = props.basket.some(
      (basketItem) => basketItem.Service === item
    );

    if (isItemInCart) {
      props.dispatch({
        type: "deleteBasketItem",
        item: { Service: item, quantity: qty },
      });
      // alert("Product already exists in your cart");
    } else {
      props.dispatch({
        type: "addBasketItem",
        item: { Service: item, quantity: qty },
      });
      alert("Product added to Your Cart");
    }
  }

  const [searchquery, setSearchquery] = useState("");
  const filterdata = Catfilter.filter((item) =>
    item.name.toLowerCase().includes(searchquery.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filterdata.slice(startIndex, endIndex);

  const loadMore = () => {
    setItemsPerPage((prevItemsPerPage) => prevItemsPerPage + 6);
  };
  const totalItems = filterdata.length;
  const showLoadMore = totalItems > endIndex;

  return (
    <div>
      {/* <div className='service-bg'>
        <div style={{ backgroundColor: "#013566", opacity: "0.4" }}>
          <div className="offered-title" style={{ color: "white" }}>OUR SERVICES</div>
        </div>
      </div> */}
      <div className="service-bg">
        <div
          className="services-bg"
          style={{ position: "absolute", width: "100%" }}
        >
          {/* <img src="../images/aboutbg.jpg" style={{ width: "100%", height: "150px" }} /> */}
        </div>
        <div className="bg-text-container">
          <div className="text-display" style={{ padding: "40px 0px" }}>
            <h3 className="text-center" style={{ color: "white" }}>
              Services
            </h3>
          </div>
        </div>
      </div>
      <div className="filter-display">
        <div
          className="input-group col-lg-4 hgjhgyu mb-2"
          style={{
            height: "42px",
            display: "flex",
            float: "right",
            width: "auto",
            border: "1px solid white",
            boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: 10,
          }}
        >
          <span className="input-group-text" id="basic-addon1">
            <BsSearch />
          </span>
          <input
            type="text"
            className="form-control"
            value={searchquery}
            onChange={(e) => setSearchquery(e.target.value)}
            placeholder="Search..."
            aria-describedby="basic-addon1"
          />
        </div>
        {/* <div>
          <div className="dropdown">
            <select className="select-dropdown">
              <option>Filter</option>
              <option>Today Booking</option>
              <option>Last Week Booking</option>
              <option>Last Month Booking</option>
              <option>6 Month Booking</option>
              <option>Last 6 Month Booking</option>
            </select>
          </div>
        </div> */}
      </div>

      <div className="categories">
        <Container>
          <Row>
            <div className="col-3">
              <div style={{ position: "sticky", top: "10px" }}>
                <div className="category-box">
                  <div
                    id="serviceCategory"
                    name="serviceCategory"
                    style={{ padding: "5px" }}
                    className="service-category"
                  >
                    <h5 className="categories" style={{ textAlign: "center" }}>
                      Categories
                    </h5>
                    <hr></hr>
                    {data1?.map((item, i) => {
                      return (
                        <div
                          style={{ display: "flex" }}
                          onClick={() => setSelectedCat(item?.name)}
                        >
                          <div>
                            <img
                              class="service-sm-img"
                              src={`https://coorgtour.in/Category/${item?.img}`}
                              alt="no-img"
                            />
                          </div>
                          <div
                            className="category-text"
                            onClick={() => {
                              setElectric(item?.name);
                            }}
                          >
                            <p
                              onClick={() => {
                                setElectric(item?.name);
                              }}
                            >
                              {item?.name}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Conditions start */}
            {/* LAPTOP REPAIR */}
            <div className="col-9" style={{ padding: "0px 10px" }}>
              {/* {laptop ? (<> */}
              <div style={{ border: "1px solid lightgray", flex: "auto" }}>
                <div id="LaptopRepair" style={{ padding: "0px 20px" }}>
                  <h3
                    className="offered-title"
                    style={{ padding: "20px 0", textAlign: "center" }}
                  >
                    {SelectedCat}
                  </h3>
                  <div className="row">
                    {currentData?.length > 0 ? (
                      <>
                        {currentData?.map((item, i) => {
                          return (
                            <div className="col-4 dgfxgh">
                              <div className="related-services ">
                                <div
                                  class="card"
                                  style={{
                                    width: "100%",
                                    height: "18.5rem",
                                    margin: "0 5px",
                                  }}
                                >
                                  <img
                                    class="card-img-top"
                                    src={`https://coorgtour.in/Service/${item?.img}`}
                                    alt="Card image cap"
                                    style={{ width: "100%", height: "10rem" }}
                                  />
                                  <div class="card-body">
                                    <h5 class="card-title">{item?.name}</h5>
                                    <h6 class="card-title">
                                      Price:{" "}
                                      {Number(item?.price) + Number(item?.tax)}
                                      /-
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
                                          (basketItem) =>
                                            basketItem.Service === item
                                        )
                                          ? "Remove"
                                          : "Add to cart"}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {Allservice?.map((item, i) => {
                          return (
                            <div className="col-4 dgfxgh">
                              <div className="related-services">
                                <div
                                  class="card"
                                  style={{
                                    width: "100%",
                                    height: "18.5rem",
                                    margin: "0 5px",
                                  }}
                                >
                                  <img
                                    class="card-img-top"
                                    src={`https://coorgtour.in/Service/${item?.img}`}
                                    alt="Card image cap"
                                    style={{ width: "100%", height: "10rem" }}
                                  />
                                  <div class="card-body">
                                    <h5 class="card-title">{item?.name}</h5>
                                    <h6 class="card-title">
                                      Price:{" "}
                                      {Number(item?.price) + Number(item?.tax)}
                                      /-
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
                                          (basketItem) =>
                                            basketItem.Service === item
                                        )
                                          ? "Remove"
                                          : "Add to cart"}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
                <div>
                  {showLoadMore && (
                    <button
                      style={{
                        padding: "6px",
                        margin: "5px 27px",
                        boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        borderColor: "white",
                        fontWeight: "600",
                        borderRadius: "5px",
                      }}
                      onClick={loadMore}
                    >
                      Load More
                    </button>
                  )}
                </div>

                {/* Pagination */}
              </div>
            </div>
          </Row>
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
                    <div className="car-details-img-container">
                      <img
                        src={`https://coorgtour.in/Service/${View?.img}`}
                        alt="logo"
                        className="car-details-images"
                        style={{ width: "270px", height: "300px" }}
                      />
                    </div>
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
                      onClick={() => {
                        cart(View);
                      }}
                    >
                      {props.basket.some(
                        (basketItem) => basketItem.Service === View
                      )
                        ? "Remove"
                        : "Add to cart"}
                    </Button>
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    subscribe: state.Subscribe,
    basket: state.basket,
  };
};

export default connect(mapStateToProps)(Services);

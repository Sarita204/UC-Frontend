import React, { useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { FaLocationDot, FaPhone, FaPlus } from "react-icons/fa6";
import { GrCircleInformation } from "react-icons/gr";
import Autocomplete from "react-google-autocomplete";
import { IoArrowForward, IoTimeSharp } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
import { AiOutlineDelete, AiOutlineFieldTime } from "react-icons/ai";
import { BiTimer } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import "../Style/checkout.css";
import axios from "axios";
import { connect } from "react-redux";
import { getBasketTotal } from "./StoreReducer";
import { TbHomeCog } from "react-icons/tb";
import moment from "moment";
const LoginCheckout = (props) => {
  const [qty, setqty] = useState(1);

  const navigate = useNavigate();
  const getUserInfo = JSON.parse(sessionStorage.getItem("user"));
  const { state } = useLocation();

  const [Avoidcallingbefore, setAvoidcallingbefore] = useState(state);

  const [show9, setShow9] = useState(false);
  const handleClose9 = () => setShow9(false);
  const handleShow9 = () => setShow9(true);

  //Address
  const [show8, setShow8] = useState(false);
  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);

  //CurrentLocation
  const [show7, setShow7] = useState(false);
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);

  //Slot
  const [show6, setShow6] = useState(false);
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  //SavedAddress
  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  //Edit
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  //Delete
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  // EditDelete
  const [isVisible, setIsVisible] = useState(false);
  const [prevState, setPrevState] = useState("");
  const [nxtState, setNxtState] = useState("");

  // Other
  const [isVisible1, setIsVisible1] = useState(false);
  const [Other, setOther] = useState("");

  const [data, setdata] = useState([]);
  const getSlotbooking = () => {
    try {
      axios
        .get("https://coorgtour.in/api/admin/getSlotbooking")
        .then(function (response) {
          setdata(response.data.Slotbooking);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const increment = (item) => {
    props.dispatch({
      type: "addquantity",
      item: item,
    });
  };

  const decrement = (item) => {
    props.dispatch({
      type: "subquantity",
      item: item,
    });
    if (qty > 1) {
      setqty(qty - 1);
    }
  };
  const RemovebasketItem = (_id) => {
    props.dispatch({
      type: "deleteBasketItem",
      item: _id,
    });
  };

  useEffect(() => {
    getSlotbooking();
  }, []);

  //============use current location===============
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [error, setError] = useState(null);

  const [selecAdd, setseleAdd] = useState("");
  const [lat, setlat] = useState("");
  const [lang, setlang] = useState("");
  const [pinc, setpinc] = useState("");
  const [houseN, setHouseN] = useState("");
  const [addressType, setaddressType] = useState("");

  var handlePlaceChanged = (place) => {
    if (place) {
      const { address_components } = place;
      address_components.forEach((component) => {
        if (component.types.includes("postal_code")) {
          setpinc(component.long_name);
        }
      });
      setlat(place.geometry.location.lat());

      setlang(place.geometry.location.lng());

      setseleAdd(place.name);
    }
  };

  const [AllAdress, setAllAdress] = useState([]);
  const getUserAddress = async () => {
    try {
      let res = await axios.get(
        "https://coorgtour.in/api/admin/getAddress/" + getUserInfo?._id
      );
      if (res.status == 200) {
        setAllAdress(res.data.Address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserAddrees = async (id) => {
    try {
      let res = await axios.delete(
        "https://coorgtour.in/api/admin/deleteaddress/" + id
      );
      if (res.status == 200) {
        alert("Successfully deleted");
        getUserAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const AddAddressInDS = async () => {
    if (!addressType || !selecAdd || !pinc)
      return alert("Please fill the blank");
    try {
      const config = {
        url: "/api/admin/addAddress",
        method: "post",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          userId: getUserInfo?._id,
          name: getUserInfo?.name,
          email: getUserInfo.email,
          phone: mobile,
          AddressType: addressType,
          village: selecAdd,
          houseno: houseN,
          pincode: pinc,
          lat: lat,
          lang: lang,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully Added");
        getUserAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [bookLat, setbookLat] = useState("");
  const [BookLang, setBookLang] = useState("");
  const getLatlon = async () => {
    getUserAddress();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setbookLat(position.coords.latitude);
          setBookLang(position.coords.longitude);
        },
        (error) => {
          setError("Error getting geolocation.");
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLatlon();
  }, []);

  const fetchAddress = async () => {
    if (latitude !== null && longitude !== null) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch address.");
        }
        const data = await response.json();
        setAddress(data.display_name);
        setpincode(data?.address?.postcode);
      } catch (error) {
        setError("Error fetching address.");
        console.error("Error fetching address:", error);
      }
    }
  };
  useEffect(() => {
    fetchAddress();
  }, [latitude, longitude]);

  const [addId, setaddId] = useState("");

  const [mobile, setmobile] = useState("");
  const [AddressType, setAddressType] = useState("");
  const [HouseNum, setHouseNum] = useState("");
  const [sloteDate, setSloteDate] = useState("");
  const [slot, setslot] = useState("");

  useEffect(() => {
    if (getUserInfo) {
      setmobile(getUserInfo?.phone);
    }
  }, [getUserInfo]);

  const timeSlots = [
    { value: 900, start: "09:00 AM" },
    { value: 1000, start: "10:00 AM" },
    { value: 1100, start: "11:00 AM" },
    { value: 1200, start: "12:00 PM" },
    { value: 1300, start: "01:00 PM" },
    { value: 1400, start: "02:00 PM" },
    { value: 1500, start: "03:00 PM" },
    { value: 1600, start: "04:00 PM" },
    { value: 1700, start: "05:00 PM" },
    { value: 1800, start: "06:00 PM" },
    { value: 1900, start: "07:00 PM" },
    { value: 2000, start: "08:00 PM" },
  ];

  const getTimeSlots = () => {
    const selectedDay = moment(sloteDate).day();
    // Exclude slots for Saturday (6) and Sunday (0)
    if (selectedDay === 0) {
      return [{ value: "unavailable", start: "Unavailable" }];
    }
    //  else if (selectedDay === 6) {
    //   return []; // Saturday
    // }
    return timeSlots;
  };

  let timetwo = moment(moment().add(2, "hours")).format("HH:MM");
  const changeTime = timetwo?.split(":").join("");
  const checkoutService = async () => {
    if (props.basket.length == 0) return alert("Please services add in cart");
    if (!mobile || !address || !pincode || !sloteDate || !slot)
      return alert("Please complete the form");

    try {
      const config = {
        url: "/api/admin/AddJobsService",
        method: "post",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          userId: getUserInfo?._id,
          userName: getUserInfo?.name,
          userEmail: getUserInfo.email,
          userMobile: mobile,
          landmark: AddressType,
          userAddress: address,
          placeAddress: address,
          houseno: HouseNum,
          TotalAmount: getBasketTotal(props.basket),
          pincode: pincode,
          latitude: bookLat,
          longitude: BookLang,
          serviceDate: sloteDate,
          serviceTime: slot,
          payId: "348839449",
          paymentMethod: "Online",
          Avoidcallingbefore: Avoidcallingbefore,
          payAmount: 0,
          serviceType: props.basket?.map((item) => {
            return {
              serviceId: item?.Service?._id,
              price:
                (Number(item?.Service?.price) + Number(item?.Service?.tax)) *
                item?.quantity,
              quntitity: item?.quantity,
              name: item?.Service.name,
              actualPrice:
                Number(item?.Service?.price) + Number(item?.Service?.tax),
            };
          }),
          serviceRemark: "",
          discount: 0,
          gst: props.basket?.reduce(
            (a, item) => a + Number(item?.Service?.tax * item?.quantity),
            0
          ),
          serviceAmount: props.basket?.reduce(
            (a, item) => a + Number(item?.Service?.price * item?.quantity),
            0
          ),
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully Booked");
        props.basket?.map((item) => RemovebasketItem(item?._id));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!getUserInfo) {
    return navigate("/login");
  } else console.log("useer", getUserInfo);
  return (
    <div>
      <div>
        <div className="container">
          <div className="row text-center" style={{ fontWeight: "bold" }}>
            <div className="col-md-12 mb-4 mt-3">
              <div className="offered-title">CHECKOUT</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Card style={{ width: "auto" }}>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>
                        {" "}
                        <div style={{ display: "flex", gap: "8px" }}>
                          <div>
                            <FaPhone style={{ width: "17px" }} />
                          </div>
                          <p>Send booking details to</p>
                        </div>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="+91-8867257117"
                        value={mobile}
                        onChange={(e) => setmobile(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <div>
                            <TbHomeCog style={{ fontSize: "25px" }} />
                          </div>
                          <p style={{ fontSize: "16px", margin: "auto" }}>
                            Address Type{" "}
                          </p>
                        </div>
                      </Form.Label>

                      <div
                        className="row mt-0 mb-0"
                        style={{ justifyContent: "space-around" }}
                      >
                        <div className="col-md-5 mt-0 mb-0">
                          <input
                            type="text"
                            style={{
                              border: "2px solid #dee2e6",
                              // marginTop: "10px",
                              // marginBottom: "10px",
                              padding: "7px",
                              borderRadius: "10px",
                            }}
                            placeholder="Eg:- Home, Ofice .."
                            value={AddressType}
                            onChange={(e) => setAddressType(e.target.value)}
                          />
                        </div>
                        <div className="col-md-5 mt-0 mb-0">
                          <input
                            type="text"
                            style={{
                              border: "2px solid #dee2e6",
                              // marginTop: "10px",
                              // marginBottom: "10px",
                              padding: "7px",
                              borderRadius: "10px",
                            }}
                            placeholder="Eg:- #124 ..."
                            value={HouseNum}
                            onChange={(e) => setHouseNum(e.target.value)}
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <div>
                            <FaLocationDot style={{ width: "24px" }} />
                          </div>
                          <p style={{ fontSize: "16px", margin: "auto" }}>
                            Address{" "}
                          </p>
                        </div>
                      </Form.Label>
                      <br />

                      {address && (
                        <div
                          style={{
                            border: "2px solid #dee2e6",
                            marginTop: "10px",
                            marginBottom: "10px",
                            padding: "10px",
                            borderRadius: "10px",
                          }}
                        >
                          <h6>{address}</h6>
                        </div>
                      )}
                      <Form.Label>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <div>
                            <FaLocationDot style={{ width: "24px" }} />
                          </div>
                          <p style={{ fontSize: "16px", margin: "auto" }}>
                            Pincode{" "}
                          </p>
                        </div>
                      </Form.Label>
                      {pincode && (
                        <div
                          style={{
                            border: "2px solid #dee2e6",
                            marginTop: "10px",
                            marginBottom: "10px",
                            padding: "10px",
                            borderRadius: "10px",
                          }}
                        >
                          <h6>{pincode}</h6>
                        </div>
                      )}
                      <div>
                        <Button
                          variant=""
                          style={{
                            backgroundColor: "#080874",
                            width: "100%",
                            color: "white",
                          }}
                          onClick={() => {
                            handleShow8();
                          }}
                        >
                          Select an address
                        </Button>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <div>
                            <IoTimeSharp
                              style={{ width: "20px", height: "22px" }}
                            />
                          </div>
                          <p style={{ fontSize: "16px", margin: "auto" }}>
                            Slot
                          </p>
                        </div>
                      </Form.Label>

                      <div
                        className="row"
                        style={{ justifyContent: "space-around" }}
                      >
                        <div className="col-md-4">
                          <input
                            type="date"
                            value={sloteDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setSloteDate(e.target.value)}
                          />
                        </div>
                        <div className="col-md-4">
                          <select
                            style={{
                              border: " 2px solid #dee2e6",
                              outlineWidth: "0px",
                              padding: "7px",
                              borderRadius: "5px",
                            }}
                            onChange={(e) => setslot(e.target.value)}
                          >
                            <option value={""}>--select the time slot</option>
                            {getTimeSlots()
                              ?.filter((ele) => {
                                // if (
                                //   moment().format("YYYY-MM-DD") == sloteDate
                                // ) {
                                //   return ele.value >= Number(changeTime);
                                // } else {
                                //   return ele;
                                // }
                                if (
                                  moment().format("YYYY-MM-DD") === sloteDate
                                ) {
                                  return (
                                    ele.value === "unavailable" ||
                                    ele.value >= Number(changeTime)
                                  );
                                } else {
                                  return ele;
                                }
                              })
                              ?.map((item) => {
                                return (
                                  <option value={item?.start}>
                                    {item?.start}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>

              <div className="row  ">
                <h5>Cancellation Policy</h5>
                <h6>
                  Free cancellations if done more than 2 hrs before the service
                  or if a professional isn’t assigned. A fee will be charged
                  otherwise.
                </h6>
                <h6
                  className="cancellation"
                  style={{
                    borderBottom: "1px solid black",
                    fontWeight: "bold",
                    width: "20%",
                    marginTop: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleShow9();
                  }}
                >
                  Learn More
                </h6>
              </div>
            </div>

            <div className=" col-md-6 ">
              <div className="row justify-content-center">
                <Card className="itemscard" style={{ width: "80%" }}>
                  <Card.Body>
                    {props.basket.map((item) => {
                      return (
                        <div className="row mt-1">
                          <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <p>{item?.Service.name}</p>
                          </div>
                          <div className="col-3 col-sm-3 col-md-3 col-lg-3 d-flex gap-1">
                            <div
                              style={{
                                background: "white",
                                padding: "8px 25px",
                                border: "1px solid #080874",
                                borderRadius: "10px",
                                display: "flex",
                                gap: "5px",
                              }}
                            >
                              <div>
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => decrement(item)}
                                >
                                  -
                                </span>
                              </div>
                              {item.quantity}
                              <div>
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => increment(item)}
                                >
                                  +
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                            <h6>₹ {item?.Service?.price}/-</h6>
                          </div>
                          <div className="col-1 col-sm-1 col-md-1 col-lg-1">
                            <AiOutlineDelete
                              style={{ color: "", fontSize: "27px" }}
                              onClick={() => RemovebasketItem(item?._id)}
                            />
                          </div>
                        </div>
                      );
                    })}

                    {/* </div> */}
                    <br />

                    <br />
                    <div className="col-md-12">
                      <h2 style={{ borderBottom: "1px dotted black" }}></h2>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-12">
                        <h6>
                          Protection on this booking{" "}
                          <span>
                            <GrCircleInformation />
                          </span>{" "}
                        </h6>
                      </div>
                      <br />
                      <div className="col-md-12">
                        <h2 style={{ borderBottom: "1px dotted black" }}></h2>
                      </div>
                      <br />

                      <div className="col-md-12">
                        <Form>
                          {["checkbox"].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                              <Form.Check
                                inline
                                checked={Avoidcallingbefore}
                                label="Avoid calling before reaching the location"
                                name="group1"
                                type={type}
                                onChange={() =>
                                  setAvoidcallingbefore(!Avoidcallingbefore)
                                }
                                id={`inline-${type}-1`}
                              />
                            </div>
                          ))}
                        </Form>
                      </div>
                    </div>

                    <br />
                  </Card.Body>
                </Card>

                <br />
                <br />

                <div className="row" style={{ width: "80%" }}>
                  <Card>
                    <Card.Body>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                          <h5>Payment Summary</h5>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        {props.basket?.map((item) => {
                          return (
                            <>
                              <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                                <h6>
                                  {item?.Service.name} x {item?.quantity}
                                </h6>
                              </div>
                              <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                                <h6>
                                  Tax : {item?.Service?.tax * item?.quantity}/-{" "}
                                </h6>
                              </div>

                              <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                                <h6>
                                  {" "}
                                  Price :{" "}
                                  {item?.Service?.price * item?.quantity}/-
                                </h6>
                              </div>
                            </>
                          );
                        })}

                        <hr />
                      </div>

                      <div className="row total">
                        <div className="col-10 col-sm-10 col-md-10 col-lg-10">
                          <h5>Total</h5>
                        </div>

                        <div className="col-2 col-sm-2 col-md-2 ">
                          <h5>₹ {getBasketTotal(props.basket)}</h5>
                        </div>
                      </div>
                      <div className="row">
                        <div>
                          <button
                            style={{
                              backgroundColor: "#080874",
                              width: "100%",
                              color: "white",
                              height: "160%",
                              border: "none",
                            }}
                            onClick={checkoutService}
                          >
                            Pay
                          </button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>

        {/* Learn More  */}
        <Modal
          show={show9}
          onHide={handleClose9}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="row">
              <h4> CANCELLATION POLICY </h4>
            </div>
            <br />

            <div className="row">
              <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                <div>
                  <h5>Time</h5>
                  <p>More than 2 hrs before the service</p>
                  <hr />
                  <p>Within 2 hrs of the service</p>
                </div>
                <hr />
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                <div>
                  <h5 style={{ justifyContent: "end", display: "flex" }}>
                    Fee
                  </h5>
                  <p
                    style={{
                      justifyContent: "end",
                      display: "flex",
                      color: "green",
                    }}
                  >
                    Free
                  </p>
                  <br />
                  <br />
                  <p style={{ justifyContent: "end", display: "flex" }}>
                    Upto Rs.50
                  </p>
                </div>
              </div>

              <div className="col-md-12">
                <div
                  style={{ color: "#013566", borderBottom: "2px solid black" }}
                >
                  <h6>
                    <span>
                      <GrCircleInformation style={{ color: "#013566" }} />
                    </span>{" "}
                    No fee if a professional is not assigned{" "}
                  </h6>
                </div>
              </div>

              <div className="col-md-12 mt-3 mb-3">
                <div>
                  <h5>This fee goes to the professional</h5>
                  <h7>
                    Their time is reserved for the service & they cannot get
                    another job for the reserved time
                  </h7>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{
                backgroundColor: "#083a87",
                border: "1px solid #083a87",
                color: "white",
                width: "100%",
              }}
            >
              Proceed
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Address  */}
        <Modal
          show={show8}
          onHide={handleClose8}
          backdrop="static"
          keyboard={false}
          style={{ marginTop: "100px" }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <div className="pre-0">
                  <TbHomeCog style={{ fontSize: "25px" }} />{" "}
                  <label style={{ fontSize: "16px" }}>Address Type</label>
                  <div
                    className="row"
                    style={{ justifyContent: "space-around" }}
                  >
                    <div className="col-md-5">
                      <input
                        type="text"
                        style={{
                          border: "2px solid #dee2e6",
                          marginTop: "10px",
                          marginBottom: "10px",
                          padding: "7px",
                          borderRadius: "10px",
                        }}
                        placeholder="Eg:- Home, Ofice .."
                        value={addressType}
                        onChange={(e) => setaddressType(e.target.value)}
                      />
                    </div>
                    <div className="col-md-5">
                      <input
                        type="text"
                        style={{
                          border: "2px solid #dee2e6",
                          marginTop: "10px",
                          marginBottom: "10px",
                          padding: "7px",
                          borderRadius: "10px",
                        }}
                        placeholder="Eg:- #124 ..."
                        value={houseN}
                        onChange={(e) => setHouseN(e.target.value)}
                      />
                    </div>
                  </div>
                  <FaLocationDot style={{ width: "24px" }} />{" "}
                  <label style={{ fontSize: "16px", margin: "auto" }}>
                    Address
                  </label>
                  <br></br>
                  <Autocomplete
                    apiKey="AIzaSyACW1po0qU1jptIybBPGdFY-_MrycQPjfk"
                    placeholder={"Enter your service address"}
                    className="Googlebaba"
                    // defaultValue={area}
                    onPlaceSelected={(place) => {
                      handlePlaceChanged(place);
                    }}
                    options={{
                      componentRestrictions: { country: "in" },
                      fields: [
                        "address_components",
                        "geometry",
                        "icon",
                        "name",
                      ],
                      types: ["establishment"],
                      // location: center,
                      radius: 10000,
                    }}
                  />
                  <FaLocationDot style={{ width: "24px" }} />{" "}
                  <label style={{ fontSize: "16px", margin: "auto" }}>
                    Pincode
                  </label>
                  <br />
                  <input
                    type="number"
                    minLength={6}
                    min={1}
                    style={{
                      border: "2px solid #dee2e6",
                      marginTop: "10px",
                      marginBottom: "10px",
                      padding: "7px",
                      borderRadius: "10px",
                    }}
                    placeholder="Enter pincode"
                    value={pinc}
                    onChange={(e) => setpinc(e.target.value)}
                  />
                  <div>
                    <button
                      type="button"
                      style={{ float: "right" }}
                      class="btn btn-success"
                      onClick={AddAddressInDS}
                    >
                      Add
                    </button>
                  </div>
                  {AllAdress.map((result) => (
                    <div
                      className="row"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div
                        className="col-md-10"
                        onClick={() => {
                          setaddId(result?._id);
                          setbookLat(result?.lat);
                          setBookLang(result?.lang);
                          setpincode(result?.pincode);
                          setAddress(result?.village);
                          setAddressType(result?.AddressType);
                          setHouseNum(result?.houseno);
                          handleClose8();
                        }}
                      >
                        <Form>
                          {["checkbox"].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                              <Form.Check
                                inline
                                checked={addId == result?._id}
                                name="group1"
                                type={type}
                                onChange={() => {
                                  setaddId(result?._id);
                                  setbookLat(result?.lat);
                                  setBookLang(result?.lang);
                                  setpincode(result?.pincode);
                                  setAddress(result?.village);
                                  setAddressType(result?.AddressType);
                                  setHouseNum(result?.houseno);
                                  handleClose8();
                                }}
                                id={`inline-${type}-1`}
                              />{" "}
                              {result.AddressType}, {result.houseno}{" "}
                              {result.village},{result?.pincode}
                            </div>
                          ))}
                        </Form>
                      </div>
                      <div className="col-md-2">
                        <AiOutlineDelete
                          style={{
                            color: "red",
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteUserAddrees(result?._id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <br />

            <div className="row">
              <div
                onClick={() => {
                  getLatlon();
                  handleClose8();
                }}
              >
                <h7 style={{ color: "#080874" }}>
                  <TbCurrentLocation />
                </h7>{" "}
                &nbsp;
                <h7 style={{ color: "#080874", cursor: "pointer" }}>
                  Use current location
                </h7>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{
                backgroundColor: "#080874",
                border: "none",
                color: "white",
              }}
              onClick={handleClose8}
            >
              Okay
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Current Location  */}
        <Modal
          size="lg"
          show={show7}
          onHide={handleClose7}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#080874" }}>Location </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: "unset" }}>
            <div
              className="container-fluid"
              style={{ paddingLeft: "unset", paddingRight: "unset" }}
            >
              <div
                className="row"
                style={{ paddingLeft: "unset", paddingRight: "unset" }}
              >
                <div
                  className="col-md-6"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31090.264129437837!2d77.53480077779398!3d13.081241386031335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae229f7a8debe1%3A0x4d80f1d259c7e7ac!2sVidyaranyapura%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1702035015935!5m2!1sen!2sin"
                    style={{
                      width: "100%",
                      // marginTop: "2rem",
                      height: "450px",
                    }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <div className="col-md-6">
                  <div style={{ padding: "8px" }}>
                    <button
                      style={{
                        backgroundColor: "white",
                        padding: "8px",
                        color: "#080874",
                        border: "1px solid #080874",
                        borderRadius: "5px",
                        marginBottom: "10px",
                      }}
                      onClick={() => {
                        handleClose7();
                        handleShow8();
                      }}
                    >
                      Change
                    </button>

                    {error ? (
                      <p>{error}</p>
                    ) : (
                      <p>
                        {address
                          ? `Current Address: ${address}`
                          : "Fetching address..."}
                      </p>
                    )}

                    <h2
                      style={{
                        // borderBottom: "1px dotted black",
                        marginTop: "1rem",
                      }}
                    ></h2>

                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        <Form.Control
                          type="text"
                          placeholder="House/Flat Number*"
                        />
                      </Form.Group>
                    </Form>

                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Landmark (Optional)"
                        />
                      </Form.Group>
                    </Form>

                    <h7>Save as</h7>
                    <div className="row">
                      <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                        <div
                          className="home1"
                          style={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            padding: "8px",
                            cursor: "pointer",
                          }}
                        >
                          <h8>Home</h8>
                        </div>
                      </div>
                      &nbsp;
                      <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                        <div
                          className="other"
                          style={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            padding: "8px",
                            cursor: "pointer",
                          }}
                          onClick={() => setOther(!Other)}
                        >
                          <h8>Other</h8>
                        </div>

                        {Other ? (
                          <>
                            <Form
                              style={{
                                marginLeft: "-70px",
                                marginTop: "-15px",
                              }}
                            >
                              <Form.Group controlId="formGroupPassword">
                                <Form.Label></Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Ex:John's home, etc"
                                />
                              </Form.Group>
                            </Form>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <a href="/logincheckout">
                      <button
                        style={{
                          padding: "8px",
                          width: "100%",
                          marginTop: "2.5rem",
                          backgroundColor: "#080874",
                          border: "1px solid #080874",
                          color: "white",
                          width: "100%",
                        }}
                      >
                        Save and proceed to slots
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Edit  */}
        <Modal
          size="lg"
          show={show4}
          onHide={handleClose4}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#080874" }}>Location </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: "unset" }}>
            <div
              className="container-fluid"
              style={{ paddingLeft: "unset", paddingRight: "unset" }}
            >
              <div
                className="row"
                style={{ paddingLeft: "unset", paddingRight: "unset" }}
              >
                <div
                  className="col-md-6"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31090.264129437837!2d77.53480077779398!3d13.081241386031335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae229f7a8debe1%3A0x4d80f1d259c7e7ac!2sVidyaranyapura%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1702035015935!5m2!1sen!2sin"
                    style={{
                      width: "100%",
                      // marginTop: "2rem",
                      height: "450px",
                    }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <div className="col-md-6">
                  <div style={{ padding: "8px" }}>
                    <button
                      style={{
                        backgroundColor: "white",
                        padding: "8px",
                        color: "#080874",
                        // height: "160%",
                        border: "1px solid #080874",
                        marginBottom: "10px",
                      }}
                      onClick={() => {
                        handleShow8();
                      }}
                    >
                      Change
                    </button>

                    <h5>Singapura Main Rd</h5>
                    <h7>
                      Singapura Main Rd, opp. Indian Oil Petrol Pumb, Singapura
                      Village, Singapura, Bengaluru, Karnataka 560097, India
                    </h7>
                    <h2
                      style={{
                        borderBottom: "1px dotted black",
                        marginTop: "1rem",
                      }}
                    ></h2>

                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        {/* <Form.Label>
                      <IoTimeSharp /> &nbsp; Slot
                    </Form.Label> */}
                        <Form.Control
                          type="password"
                          placeholder="House/Flat Number*"
                        />
                      </Form.Group>
                    </Form>

                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        {/* <Form.Label>
                      <IoTimeSharp /> &nbsp; Slot
                    </Form.Label> */}
                        <Form.Control
                          type="password"
                          placeholder="Landmark (Optional)"
                        />
                      </Form.Group>
                    </Form>

                    <h7>Save as</h7>
                    <div className="row">
                      <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                        <div
                          className="home1"
                          style={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            padding: "8px",
                          }}
                        >
                          <h8>Home</h8>
                        </div>
                      </div>
                      &nbsp;
                      <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                        <div
                          className="other"
                          style={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            padding: "8px",
                          }}
                          onClick={() => setOther(!Other)}
                        >
                          <h8>Other</h8>
                        </div>

                        {Other ? (
                          <>
                            <Form
                              style={{
                                marginLeft: "-70px",
                                marginTop: "-15px",
                              }}
                            >
                              <Form.Group controlId="formGroupPassword">
                                <Form.Label></Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Ex:John's home, etc"
                                />
                              </Form.Group>
                            </Form>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <button
                      style={{
                        padding: "8px",
                        width: "100%",
                        marginTop: "2.5rem",
                        backgroundColor: "#080874",
                        border: "1px solid #080874",
                        color: "white",
                        width: "100%",
                      }}
                    >
                      Update Address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
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

export default connect(mapStateToProps)(LoginCheckout);

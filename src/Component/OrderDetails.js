import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Table,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { TbHomeCog } from "react-icons/tb";
import { Row } from "react-bootstrap";
import { MdDeleteForever, MdEngineering } from "react-icons/md";
import "../Style/profile.css";
import { FaLocationDot, FaPhone, FaPlus } from "react-icons/fa6";
import { IoIosArrowForward, IoIosChatboxes } from "react-icons/io";
import { BiTimer } from "react-icons/bi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { TbCurrentLocation } from "react-icons/tb";
import axios from "axios";
import moment from "moment";
import { jsPDF } from "jspdf";
import Autocomplete from "react-google-autocomplete";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { FaRegCircleDot } from "react-icons/fa6";
import { FaCheckCircle, FaEye, FaFileInvoice, FaPrint } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { TiEye } from "react-icons/ti";
const OrderDetails = () => {
  const userProfile = JSON.parse(sessionStorage.getItem("user"));
  const [error, setError] = useState(null);

  const [View, setView] = useState();
  const [View1, setView1] = useState();
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [show5, setShow5] = useState();
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const [show6, setShow6] = useState(false);
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  const [show7, setShow7] = useState(false);
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);

  const [show8, setShow8] = useState();
  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);

  const [show9, setShow9] = useState();
  const handleClose9 = () => setShow9(false);
  const handleShow9 = () => setShow9(true);

  const [completed, setCompleted] = useState(false);
  const [booked, setBooked] = useState(true);

  const [allbookings, setallbookings] = useState([]);
  const getAllBookings = () => {
    try {
      axios
        .get("https://coorgtour.in/api/admin/getUserbyid/" + userProfile?._id)
        .then(function (res) {
          setallbookings(res.data.success);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [data, setdata] = useState([]);
  const getSlotbooking = () => {
    axios
      .get("https://coorgtour.in/api/admin/getSlotbooking")
      .then(function (response) {
        setdata(response.data.Slotbooking);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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

  function checkCancel(item) {
    let timetwo2 = moment(moment(item?.createdAt).add(2, "hours")).format(
      "HH:MM"
    );
    const changeTime2 = timetwo2?.split(":").join("");
    if (
      moment(item?.createdAt).format("YYYY-MM-DD") ==
      moment().format("YYYY-MM-DD")
    ) {
      let time = moment().format("HH:MM");
      const amt = time?.split(":").join("");
      if (Number(amt) <= Number(changeTime2)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  //post for revisit
  const [HouseNum, setHouseNum] = useState("");
  const [AdType, setAdType] = useState("");
  const [mobile, setmobile] = useState("");
  const [Address, seAddress] = useState("");
  const [pincode, sepincode] = useState("");
  const [serviceTime, setserviceTime] = useState("");
  const [serviceDate, setserviceDate] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [bookLat, setbookLat] = useState("");
  const [BookLang, setBookLang] = useState("");
  const [revijitAmount, setrevijitAmount] = useState(0);

  const date1 = moment();

  // Second date
  const date2 = moment(View1?.serviceDate);
  const diffInDays = date1.diff(date2, "days");
  // console.log("diffInDays",diffInDays);
  const MakeRevisitJob = async () => {
    if (!bookLat || !serviceDate || !serviceTime)
      return alert("Please fill the form");
    try {
      const config = {
        url: "/api/admin/MakeRevisit",
        method: "put",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          id: View1?._id,
          revijitAmount: revijitAmount,
          pincode: pincode,
          userAddress: Address,
          houseno: HouseNum,
          landmark: AdType,
          longitude: BookLang,
          latitude: bookLat,
          serviceTime: serviceTime,
          serviceDate: serviceDate,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully send request");
        handleClose8();
        getAllBookings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  let timetwo = moment(moment().add(2, "hours")).format("HH:MM");
  const changeTime = timetwo?.split(":").join("");
  const navigator = useNavigate();

  const [AllAdress, setAllAdress] = useState([]);
  const getUserAddress = async () => {
    try {
      let res = await axios.get(
        "https://coorgtour.in/api/admin/getAddress/" + userProfile?._id
      );
      if (res.status == 200) {
        setAllAdress(res.data.Address);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [deleteId, setDeleteId] = useState("");
  const deleteUserAddrees = async (id) => {
    try {
      let res = await axios.delete(
        "https://coorgtour.in/api/admin/deleteaddress/" + deleteId
      );
      if (res.status == 200) {
        alert("Successfully deleted");
        handleClose2();
        getUserAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [selId, setselId] = useState("");
  const [selecAdd, setseleAdd] = useState("");
  const [lat, setlat] = useState("");
  const [lang, setlang] = useState("");
  const [pinc, setpinc] = useState("");
  const [houseN, setHouseN] = useState("");
  const [addressType, setaddressType] = useState("");

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
          userId: userProfile?._id,
          name: userProfile?.name,
          email: userProfile.email,
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
        handleShow1();
        handleShow8();
        handleShow3();
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getAllBookings();
    // getSlotbooking();
  }, []);

  const getLatlon = async () => {
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
        seAddress(data.display_name);
        sepincode(data?.address?.postcode);
      } catch (error) {
        setError("Error fetching address.");
        console.error("Error fetching address:", error);
      }
    }
  };
  useEffect(() => {
    fetchAddress();
  }, [latitude, longitude]);

  const createPDF = async () => {
    // dynamic image is also adding in the PDF
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await html2canvas(document.querySelector("#pdf"), {
      useCORS: true,
    });
    console.log("hhhh", data);
    const img = data.toDataURL("image/png");
    console.log("ddkd1", img);
    const imgProperties = pdf.getImageProperties(img);
    console.log("ddkd2", imgProperties);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    console.log("ddkd3", pdfWidth);
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    console.log("ddkd4", pdfHeight);
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ServiceInvoice.pdf");
  };

  const [jobD, setJobD] = useState({});
  const [rate, setrate] = useState("");
  const [comment, setcomment] = useState("");
  const makeRating = async () => {
    if (!rate) return alert("Please select rate");
    try {
      const config = {
        url: "/api/vendor/addRating",
        method: "put",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          vendorId: jobD?.vendorId,
          jobId: jobD?._id,
          userId: userProfile?._id,
          rate: rate,
          userName: userProfile?.name,
          comment: comment,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Thanks for give rating");
        const config1 = {
          url: "/api/admin/addRating",
          method: "put",
          baseURL: "https://coorgtour.in",
          headers: { "content-type": "application/json" },
          data: {
            vendorId: jobD?._id,
            userId: userProfile?._id,
            rate: rate,
            comment: comment,
            userName: userProfile?.name,
          },
        };
        await axios(config1);
        getAllBookings();
        handleClose7();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const makeAcceptQuation = async () => {
    try {
      const config = {
        url: "/makecotision",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        headers: { "content-type": "application/json" },
        data: {
          id: View?._id,
          RequestAmount: Number(View?.RequestAmount),
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully Accepted");
        setShow5(false);
        getAllBookings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RejectQuatation = async () => {
    try {
      const config = {
        url: "/rejectcotision",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        headers: { "content-type": "application/json" },
        data: {
          id: View?._id,
          RequestAmount: View?.RequestAmount,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully Rejected");
        setShow5(false);
        getAllBookings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [cancelMod, setcancelMod] = useState(false);
  const [refundable, setRefundble] = useState("");
  const [reason, setreason] = useState("");

  const MakeCancelJob = async () => {
    try {
      if (!reason) return alert("Please select reason");
      const config = {
        url: "/makeCancelJobByUser",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        headers: { "content-type": "application/json" },
        data: {
          id: View?._id,
          reason: reason,
          refouned: refundable,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully Canceled");
        setcancelMod(false);
        getAllBookings();
        setreason("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Allvbook", allbookings);
  return (
    <div>
      <div className="Booked-history-component p-0">
        <h3
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "bolder",
          }}
        >
          ORDER HISTORY
        </h3>
        <div className="Booked-history">
          <div className="Booked-history-buttons">
            <div
              className="booked-title"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCompleted(false);
                setBooked(true);
              }}
            >
              Booked Service
            </div>
            <div
              className="booked-title"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCompleted(true);
                setBooked(false);
              }}
            >
              Completed Service
            </div>
          </div>
        </div>

        {/* Conditions for completed orders  */}
        {completed ? (
          <>
            {allbookings
              ?.filter(
                (item) =>
                  item?.status == "Completed" &&
                  item?.VendorStatus == "Completed"
              )
              ?.map((item) => {
                return (
                  <div className="container-fluid">
                    <div className="first-box" style={{ display: "flex" }}>
                      <div className="order-details">
                        <div>
                          <h5>
                            Booked Date <br></br> Time
                          </h5>
                          <p>
                            {item?.serviceDate}, {item?.serviceTime}
                          </p>
                        </div>
                      </div>
                      <div className="order-details">
                        <div>
                          <h5>Booked ID</h5>
                          <p>{item?._id}</p>
                        </div>
                      </div>

                      <div className="order-details">
                        <div>
                          <h5>Service Location</h5>
                          <p style={{ width: "360px" }}>{item?.userAddress}</p>
                        </div>
                      </div>
                      <div className="order-details">
                        <div>
                          <h5>Price</h5>
                          <p>₹{item?.TotalAmount}</p>
                        </div>
                      </div>
                    </div>

                    <div className="order-display">
                      <div className="order-details">
                        <div>
                          <h5>{item?.serviceType[0]?.serviceId?.category}</h5>
                          <img
                            src={`https://coorgtour.in/Service/${item?.serviceType[0]?.serviceId?.img}`}
                            alt="logo"
                            className="booked-pooja-img"
                            style={{ height: "80px" }}
                          />
                        </div>
                      </div>
                      <div className="order-details">
                        <div>
                          {item?.serviceType?.map((ele) => {
                            return (
                              <p>
                                {ele?.name} {ele?.quntitity} quantity
                              </p>
                            );
                          })}
                        </div>
                      </div>
                      <div
                        className="order-details"
                        style={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div className="view-button">
                          <IoIosChatboxes
                            style={{
                              color: "white",
                              cursor: "pointer",
                              backgroundColor: "#080874",
                              borderRadius: "10px",
                              fontSize: "37px",
                            }}
                            onClick={() => navigator("/Chat", { state: item })}
                          />
                        </div>
                        <div className="view-button">
                          <LiaFileInvoiceSolid
                            style={{
                              color: "white",
                              cursor: "pointer",
                              backgroundColor: "#080874",
                              borderRadius: "10px",
                              fontSize: "37px",
                            }}
                            onClick={() => {
                              setView(item);
                              handleShow5();
                            }}
                          />
                        </div>
                        <div className="view-button">
                          <Button
                            className="view"
                            onClick={() => {
                              seAddress(item?.userAddress);
                              sepincode(item?.pincode);
                              setView1(item);
                              setbookLat(item?.location?.coordinates[1]);
                              setBookLang(item?.location?.coordinates[0]);
                              setHouseNum(item?.houseno);
                              setAdType(item?.landmark);
                              getUserAddress();
                              handleShow8();
                            }}
                          >
                            Revisit
                          </Button>
                        </div>
                        <br></br>
                        <div className="view-button">
                          <Button
                            className="view"
                            onClick={() => {
                              setJobD(item);
                              handleShow7();
                            }}
                          >
                            Rating
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        ) : (
          <>
            {booked ? (
              <>
                <div>
                  {allbookings
                    ?.filter((item) => item?.VendorStatus !== "Completed")
                    ?.map((item) => {
                      return (
                        <div className="container-fluid">
                          <div
                            className="first-box"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div className="order-details">
                              <div>
                                <h5>
                                  Booked Date <br></br> Time
                                </h5>
                                <p>
                                  {item?.serviceDate}, {item?.serviceTime}
                                </p>
                              </div>
                            </div>
                            <div className="order-details">
                              <div>
                                <h5>Booked ID</h5>
                                <p>{item?._id}</p>
                              </div>
                            </div>

                            <div className="order-details">
                              <div>
                                <h5>Service Location</h5>
                                <p style={{ width: "360px" }}>
                                  {item?.userAddress},{item?.pincode}
                                </p>
                              </div>
                            </div>
                            <div className="order-details">
                              <div>
                                <h5>Price</h5>
                                <p>₹{item?.TotalAmount}</p>
                              </div>
                            </div>
                            <div className="order-details">
                              <div>
                                <h5>Service Status</h5>
                                <p>
                                  {item?.status == "Cancel" ? (
                                    <span style={{ color: "red" }}>
                                      Cancelled
                                    </span>
                                  ) : (
                                    <span>
                                      {item?.revisitStatus == "Assigned" ? (
                                        <span style={{ color: "red" }}>
                                          Revisit
                                        </span>
                                      ) : (
                                        <span style={{ color: "yellow" }}>
                                          {item?.status}
                                        </span>
                                      )}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="order-display">
                            <div className="order-details">
                              <div>
                                <h5>
                                  {item?.serviceType[0]?.serviceId?.category}
                                </h5>
                                <img
                                  src={`https://coorgtour.in/Service/${item?.serviceType[0]?.serviceId?.img}`}
                                  alt="logo"
                                  className="booked-pooja-img"
                                  style={{ height: "80px" }}
                                />
                              </div>
                            </div>

                            <div className="order-details">
                              <div>
                                {item?.serviceType?.map((ele) => {
                                  return (
                                    <p>
                                      {ele?.name} {ele?.quntitity} quantity
                                    </p>
                                  );
                                })}
                              </div>
                            </div>
                            <div
                              className="order-details"
                              style={{
                                display: "flex",
                                gap: "5px",
                                alignItems: "center",
                                textAlign: "center",
                                justifyContent: "center",
                              }}
                            >
                              {item?.cotision == "Requested" && (
                                <div>
                                  <TiEye
                                    style={{
                                      color: "white",
                                      cursor: "pointer",
                                      backgroundColor: "#080874",
                                      borderRadius: "10px",
                                      fontSize: "37px",
                                    }}
                                    onClick={() => {
                                      setView(item);
                                      handleShow5();
                                    }}
                                  />
                                </div>
                              )}
                              <div className="view-button">
                                <IoIosChatboxes
                                  style={{
                                    color: "white",
                                    cursor: "pointer",
                                    backgroundColor: "#080874",
                                    borderRadius: "10px",
                                    fontSize: "37px",
                                  }}
                                  onClick={() =>
                                    navigator("/Chat", { state: item })
                                  }
                                />
                              </div>
                              <div className="view-button">
                                <LiaFileInvoiceSolid
                                  style={{
                                    color: "white",
                                    cursor: "pointer",
                                    backgroundColor: "#080874",
                                    borderRadius: "10px",
                                    fontSize: "37px",
                                  }}
                                  onClick={() => {
                                    setView(item);
                                    handleShow5();
                                  }}
                                />
                              </div>
                              {item?.status == "Cancel" ? null : (
                                <div className="view-button">
                                  {checkCancel(item) ? (
                                    <button
                                      type="button"
                                      class="btn btn-danger"
                                      onClick={() => {
                                        setView(item);
                                        setRefundble("Refundable");
                                        setcancelMod(true);
                                      }}
                                    >
                                      Free Cancel
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      class="btn btn-danger"
                                      onClick={() => {
                                        setView(item);
                                        setRefundble("Non-Refundable");
                                        setcancelMod(true);
                                      }}
                                    >
                                      Non-Refundable Cancel
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        )}

        {/* Invoice Moadl */}
        <Modal
          size="lg"
          show={show5}
          onHide={handleClose5}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton></Modal.Header>
          <h4 style={{ textAlign: "center", color: "#080874" }}>
            Order History
          </h4>
          <Modal.Body>
            <div id="pdf" className="p-3">
              <Row>
                <div
                  className="col-lg-12 mb-3"
                  style={{ display: "flex", height: "10rem" }}
                >
                  <div className="invoice-header">
                    {/* <img src={loginlogo} alt="" className='modal-logo' /> */}
                    <img
                      src="../images/logo.jpg"
                      alt="logo"
                      style={{ height: "165px" }}
                    />
                  </div>
                  <div className="invoice-header">
                    <p style={{ textAlign: "right" }}>
                      {" "}
                      #104, 1, Singapura Main Rd, <br></br>
                      Vidyaranyapura, Bengaluru, <br></br>
                      Karnataka 560097<br></br>
                      123@gmail.com <br></br>
                      valuepro.com{" "}
                    </p>
                  </div>
                </div>
              </Row>

              <Row>
                <div className="col-lg-12 mb-3 invoice-details">
                  <div className="invoice-header">
                    <div>
                      <h4>Bill To</h4>
                    </div>
                    <hr></hr>
                    <div>
                      <p>
                        {View?.userAddress}
                        <br></br>
                        +91 {userProfile?.phone}
                      </p>
                    </div>
                  </div>
                  <div className="invoice-header">
                    <div>
                      <h4>Booked Details</h4>
                    </div>
                    <hr></hr>
                    <div>
                      <b>Booked Service date:</b> {View?.serviceDate}
                      <br></br>
                      <b>Booked Service Time:</b> {View?.serviceTime}
                      <br></br>
                      <b>Booked Service Category:</b>
                      <span>{View?.serviceType[0]?.serviceId?.category}</span>;
                      <br></br>
                      <b>Status:</b> {View?.status}
                      <br></br>
                    </div>
                  </div>
                </div>
              </Row>
              <Row>
                <div>
                  <div>
                    <Table responsive className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Sl. No</th>
                          <th scope="col">Service Name</th>
                          <th scope="col">Quantity</th>

                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {View?.serviceType?.map((item, i) => {
                          return (
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <th scope="row">{item?.name}</th>
                              <td>{item?.quntitity}</td>

                              <td>
                                <b>₹ {item?.price}</b>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                  {View?.servecePoint?.length && (
                    <div>
                      <br></br>
                      <h4>Product Details</h4>
                      <Table responsive className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Sl. No</th>
                            <th scope="col">Part Name</th>
                            <th scope="col">Quantity</th>

                            <th scope="col">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {View?.servecePoint?.map((item, i) => {
                            return (
                              <tr>
                                <th scope="row">{i + 1}</th>
                                <th scope="row"> {item?.name}</th>
                                <td>{item?.quntitity}</td>
                                {/* <td>Bangalore</td> */}

                                <td>
                                  <b>₹ {item?.price}</b>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )}
                  {View?.RequestAmount && (
                    <div>
                      <h4>Extra Quatation</h4>
                      <div className="row" style={{ marginLeft: "20px" }}>
                        <h5>Vendor Remark : {View?.serviceRemark}</h5>
                        <h5>Amount : ₹ {View?.RequestAmount?.toFixed(2)}</h5>
                        <h5>
                          Status :{" "}
                          {View?.cotision == "Approved" ? (
                            <span style={{ color: "green" }}>Approved </span>
                          ) : (
                            <>
                              {View?.cotision == "rejected" ? (
                                <span style={{ color: "red" }}>Rejected </span>
                              ) : (
                                <span style={{ color: "#011f68" }}>
                                  Pending{" "}
                                </span>
                              )}
                            </>
                          )}
                        </h5>
                      </div>
                    </div>
                  )}
                  <div className="row">
                    <div className="col-md-7"></div>
                    <div className="col-md-5">
                      <div className="d-flex">
                        <h5>Tax : </h5>
                        <span>₹ {View?.gst?.toFixed(2)}</span>
                      </div>

                      <div className="d-flex">
                        <h5> Sub Amount : </h5>
                        <span>
                          ₹ {(View?.TotalAmount - View?.gst)?.toFixed(2)}
                        </span>
                      </div>
                      {View?.cotision == "Approved" && (
                        <div className="d-flex">
                          <h5>Quatation Amount : </h5>
                          <span>₹ {View?.RequestAmount?.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="d-flex">
                        <h5>Total Amount : </h5>
                        <span>₹ {View?.TotalAmount?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {View?.cotision == "Requested" && (
              <div>
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => makeAcceptQuation()}
                >
                  Accept Quatation
                </button>{" "}
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={RejectQuatation}
                >
                  Reject Quatation
                </button>
              </div>
            )}
            <Button className="download" onClick={createPDF}>
              Download Invoice
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Invoice Moadl after completed */}
        <Modal
          size="lg"
          show={show6}
          onHide={handleClose6}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton></Modal.Header>
          <h4 style={{ textAlign: "center", color: "#080874" }}>
            Order History
          </h4>
          <Modal.Body>
            <div id="pdf" className="p-3">
              <Row>
                <div
                  className="col-lg-12 mb-3"
                  style={{ display: "flex", height: "10rem" }}
                >
                  <div className="invoice-header">
                    {/* <img src={loginlogo} alt="" className='modal-logo' /> */}
                    <img
                      src="../images/logo.jpg"
                      alt="logo"
                      style={{ height: "165px" }}
                    />
                  </div>
                  <div className="invoice-header">
                    <p style={{ textAlign: "right" }}>
                      {" "}
                      #104, 1, Singapura Main Rd, <br></br>
                      Vidyaranyapura, Bengaluru, <br></br>
                      Karnataka 560097<br></br>
                      123@gmail.com <br></br>
                      valuepro.com{" "}
                    </p>
                  </div>
                </div>
              </Row>

              <Row>
                <div className="col-lg-12 mb-3 invoice-details">
                  <div className="invoice-header">
                    <div>
                      <h4>Bill To</h4>
                    </div>
                    <hr></hr>
                    <div>
                      <p>
                        Parnets 834,Tech Park,<br></br>karnataka, bangalore,
                        560097
                        <br></br>
                        +91 {userProfile?.phone}
                      </p>
                    </div>
                  </div>
                  <div className="invoice-header">
                    <div>
                      <h4>Booked Details</h4>
                    </div>
                    <hr></hr>
                    <div>
                      <b>Booked Service date:</b>{" "}
                      {moment(View?.createdAt)?.format("DD/MM/YYYY")}
                      <br></br>
                      <b>Booked Service Time:</b>{" "}
                      {moment(View?.createdAt)?.format("hh:mm:ss")}
                      <br></br>
                      <b>Booked Service Name:</b> {View?.name}
                      <br></br>
                      <b>Status:</b> Booked<br></br>
                    </div>
                  </div>
                </div>
              </Row>
              <Row>
                <div>
                  <div>
                    <Table responsive className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Sl. No</th>
                          <th scope="col">Booked Date</th>
                          <th scope="col">Booked Time</th>
                          {/* <th scope="col">Location</th> */}
                          <th scope="col">Booked Service Name</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <th scope="row">
                            {" "}
                            {moment(View?.createdAt)?.format("DD/MM/YYYY")}
                          </th>
                          <td>
                            {" "}
                            {moment(View?.createdAt)?.format("hh:mm:ss")}
                          </td>
                          {/* <td>Bangalore</td> */}
                          <td>{View?.name}</td>
                          <td>
                            <b>₹ {View?.price}</b>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="download" onClick={createPDF}>
              Download Invoice
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Review Modal  */}
        <Modal show={show7} onHide={handleClose7} style={{ zIndex: "9999999" }}>
          <Modal.Header closeButton></Modal.Header>
          <h4 style={{ textAlign: "center", color: "#080874" }}>Rating Here</h4>
          <Modal.Body>
            <div
              id="form"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="card-body text-center">
                    <img
                      src=" https://i.imgur.com/d2dKtI7.png"
                      height="100"
                      width="100"
                    />
                    <div className="comment-box text-center">
                      <h3 style={{ color: "#233C8E" }}>
                        <MdEngineering /> {jobD.vendorName}
                      </h3>
                      <div className="rating">
                        <input
                          type="radio"
                          name="rating"
                          value="5"
                          onChange={(e) => setrate(e.target.value)}
                          id="5"
                        />
                        <label for="5">☆</label>
                        <input
                          type="radio"
                          name="rating"
                          value="4"
                          onChange={(e) => setrate(e.target.value)}
                          id="4"
                        />
                        <label for="4">☆</label>
                        <input
                          type="radio"
                          name="rating"
                          value="3"
                          onChange={(e) => setrate(e.target.value)}
                          id="3"
                        />
                        <label for="3">☆</label>
                        <input
                          type="radio"
                          name="rating"
                          value="2"
                          onChange={(e) => setrate(e.target.value)}
                          id="2"
                        />
                        <label for="2">☆</label>
                        <input
                          type="radio"
                          name="rating"
                          value="1"
                          onChange={(e) => setrate(e.target.value)}
                          id="1"
                        />
                        <label for="1">☆</label>
                      </div>
                      <div className="comment-area">
                        {" "}
                        <textarea
                          class="form-control"
                          placeholder="Comments..."
                          onChange={(e) => setcomment(e.target.value)}
                          rows="4"
                        ></textarea>
                      </div>
                      <div className="text-center mt-4">
                        {" "}
                        <button
                          class="btn btn-success send px-5"
                          onClick={makeRating}
                        >
                          Send <i class="fa fa-long-arrow-right ml-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Revisit Modal  */}
        <Modal
          size="lg"
          show={show8}
          onHide={handleClose8}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-md-11">
                  <h8 style={{ color: "#083a87" }}>
                    <FaLocationDot onClick={handleShow3} />
                  </h8>{" "}
                  &nbsp;
                  <h8>
                    {Address},{pincode}
                  </h8>
                </div>

                <div className="col-md-1 text-end">
                  <h8 style={{ fontSize: "20px" }}>
                    <IoIosArrowForward onClick={handleShow3} />
                  </h8>
                </div>
                <div className="col-md-12">
                  <h2 style={{ borderBottom: "1px dotted black" }}></h2>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 mb-3">
                  <div>
                    <h4>When should the professional arrive?</h4>
                    <h7>Your service will take approx. 1 hr and 15 mins</h7>
                  </div>
                </div>
                <br />
              </div>

              <div className="col-md-12">
                <Card style={{ width: "100%" }}>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-6">
                        <h7>
                          {" "}
                          <BiTimer /> Express
                        </h7>
                        <br />
                        <h8>In 90-120 minutes</h8>
                        <br />
                      </div>

                      <div
                        className="col-md-6 "
                        style={{ textAlign: "center" }}
                      >
                        <h7>
                          {" "}
                          <BiTimer /> Revisit only 30 day or 2 visits free
                        </h7>
                        <br />
                        {diffInDays < 30 && View1?.revijitCount < 2 ? (
                          <h8 style={{ color: "green" }}>Free</h8>
                        ) : (
                          <h8 style={{ color: "red" }}>Paid</h8>
                        )}

                        <br />
                      </div>
                    </div>

                    <br />
                  </Card.Body>
                </Card>

                <Card style={{ width: "100%" }}>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-11 mb-4">
                        <h7 style={{ fontWeight: "bold" }}>
                          Get service later
                        </h7>
                        <br />

                        <input
                          className="vi_0"
                          type="date"
                          style={{ width: "35%" }}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setserviceDate(e.target.value)}
                        />
                        <br />
                      </div>

                      <div className="col-md-12 mb-3">
                        <h2 style={{ borderBottom: "1px dotted black" }}></h2>
                      </div>

                      <div className="row d-flex gap-3 mt-3">
                        <h5>Select start time of service</h5>
                        <select
                          style={{
                            width: "35%",
                            border: " 2px solid #dee2e6",
                            outlineWidth: "0px",
                            padding: "7px",
                            borderRadius: "5px",
                          }}
                          onChange={(e) => setserviceTime(e.target.value)}
                        >
                          <option>--select the time slot</option>
                          {timeSlots
                            ?.filter((ele) => {
                              if (
                                moment().format("YYYY-MM-DD") == serviceDate
                              ) {
                                return ele.value >= Number(changeTime);
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
                    <br />
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{
                backgroundColor: "#080874",
                color: "white",
                width: "100%",
                padding: "8px",
              }}
              onClick={MakeRevisitJob}
            >
              Confirm Revisit
            </Button>
          </Modal.Footer>
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
                        border: "1px solid #083a87",
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
                      <div className="col-md-2">
                        <div
                          className="time"
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
                      <div className="col-md-2">
                        <div
                          className="time"
                          style={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            padding: "8px",
                          }}
                        >
                          <h8>Other</h8>
                        </div>
                      </div>
                    </div>

                    <button
                      style={{
                        padding: "8px",
                        width: "100%",
                        marginTop: "2.5rem",
                        backgroundColor: "#080874",
                        color: "white",
                        width: "100%",
                        border: "none",
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

        {/* Delete  */}
        <Modal
          show={show2}
          onHide={handleClose2}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#080874" }}>
              Delete Address{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h7>Are you sure you want to delete address?</h7>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{
                backgroundColor: "white",
                border: "1px solid #083a87",
                // color: "white",
              }}
              onClick={handleClose2}
            >
              No, go back
            </Button>

            <Button
              variant=""
              style={{
                backgroundColor: "#083a87",
                border: "1px solid #083a87",
                color: "white",
              }}
              onClick={deleteUserAddrees}
            >
              Yes, delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Slot  */}

        {/* SavedAddress  */}
        <Modal
          show={show3}
          onHide={handleClose3}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#080874" }}>
              Saved Addresses{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h8 style={{ color: "#080874", cursor: "pointer" }}>
                    <FaPlus />
                  </h8>{" "}
                  &nbsp;
                  <h8
                    style={{ color: "#080874", cursor: "pointer" }}
                    onClick={() => {
                      handleShow1();
                      handleClose8();
                      handleClose3();
                    }}
                  >
                    Add another address
                  </h8>
                  {/* <h8 style={{justifyContent:"end"}}><IoArrowForward /></h8> */}
                </div>

                <div className="col-md-12 mt-3">
                  <h2 style={{ borderBottom: "1px dotted black" }}></h2>
                </div>
              </div>
              <br />
              {AllAdress?.map((item) => {
                return (
                  <div className="row mb-3">
                    <div className="col-md-1">
                      <Form.Check type="radio" aria-label="radio 1" />
                    </div>
                    <div className="col-md-9">
                      <h5>{item?.AddressType}</h5>
                      <h7>
                        {item?.houseno},{item?.village}, {item?.pincode}
                      </h7>
                    </div>
                    <div className="col-md-2 text-center mt-2 ">
                      {item?._id == selId ? (
                        <FaCheckCircle
                          style={{
                            color: "green",
                            fontSize: "25px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            seAddress("");
                            setselId("");
                            sepincode("");
                            setbookLat("");
                            setBookLang("");
                            setHouseNum("");
                            setAdType("");
                          }}
                        />
                      ) : (
                        <FaRegCircleDot
                          style={{
                            color: "blue",
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setselId(item?._id);
                            seAddress(item?.village);
                            sepincode(item?.pincode);
                            setbookLat(item?.lat);
                            setBookLang(item?.lang);
                            setHouseNum(item?.houseno);
                            setAdType(item?.AddressType);
                          }}
                        />
                      )}
                      <MdDeleteForever
                        style={{
                          color: "red",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setDeleteId(item?._id);
                          handleShow2();
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{
                backgroundColor: "#080874",
                color: "white",
              }}
              onClick={handleClose3}
            >
              Okay
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Address  */}
      <Modal
        show={show1}
        onHide={handleClose1}
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
                <div className="row" style={{ justifyContent: "space-around" }}>
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
                    fields: ["address_components", "geometry", "icon", "name"],
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
              </div>
            </div>
          </div>
          <br />

          <div className="row">
            <div
              onClick={() => {
                getLatlon();
                handleClose1();
                handleShow8();
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
            onClick={handleClose1}
          >
            Okay
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cancle Model */}
      <Modal
        show={cancelMod}
        onHide={() => setcancelMod(false)}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: "9999999" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#080874" }}>
            Your Cancel Service Amount {refundable}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h7>Are you sure you want to cancel service?</h7>
          <br />
          <div className="container">
            <select
              value={reason}
              className="vi_0"
              onChange={(e) => setreason(e.target.value)}
            >
              <option value={""}>Select Reason</option>
              <option value={"By mistake booked"}>By mistake booked</option>
              <option value={"Waiting time to long"}>
                Waiting time to long
              </option>
              <option value={"I booked wrong service"}>
                I booked wrong service
              </option>
              <option value={"Vendor want diffrent price"}>
                Vendor want diffrent price
              </option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            style={{
              backgroundColor: "white",
              border: "1px solid #083a87",
              // color: "white",
            }}
            onClick={() => setcancelMod(false)}
          >
            No, go back
          </Button>

          <Button
            variant=""
            style={{
              backgroundColor: "#083a87",
              border: "1px solid #083a87",
              color: "white",
            }}
            onClick={MakeCancelJob}
          >
            Yes, Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderDetails;

import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../Style/profile.css";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import useRazorpay from "react-razorpay";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";

// profile
import Offcanvas from "react-bootstrap/Offcanvas";
// import user from "../images/logo.png";
import { Container, Form, InputGroup, Modal } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  const userProfile = JSON.parse(sessionStorage.getItem("user"));
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");

  const [edit, setedit] = useState("");
  const [acc, setacc] = useState(true);
  const [acc1, setacc1] = useState("");
  const [acc3, setacc3] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    if (state?.book) {
      setacc(false);
      setacc1(false);
      setacc3(true);
    }
  }, [state]);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const [product, setproduct] = useState([]);
  const getUserbyId = () => {
    try {
      axios
        .get("https://coorgtour.in/api/admin/getUserbyid/" + user?._id)
        .then(function (response) {
          setproduct(response.data.success);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserbyId();
  }, []);
  const [payid, setpayid] = useState("");
  const [payAmount, setpayAmount] = useState("");
  const [id, setid] = useState("");
  const makePayment = async () => {
    try {
      const config = {
        url: "/api/admin/makecheckOutJobs",
        method: "put",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          id: id,
          payAmount: payAmount,
          paymentStatus: "Full Payment",
          payId: payid,
          paymentMethod: "Online",
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        getUserbyId();
        setpayid("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Razorpay = useRazorpay();

  const d = new Date();
  const [checkradio, setcheckradio] = useState("");

  const [paymentmethod, setpaymentmethod] = useState("");

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.error = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const posttransaction = async (amount) => {
    try {
      const config = {
        data: {
          key: "rzp_test_FAe0X6xLYXaXHe",
          amount: Math.round(amount) * 100,
          currency: "INR",
          name: "Urbon Company",
          description: "Order Amount",
          image: "../images/pc.png",
          customerId: userProfile?._id,
          handler: function (response) {
            alert(response.razorpay_payment_id);
            setpayid(response.razorpay_payment_id);
          },
          prefill: {
            name: userProfile?.name,
            email: userProfile?.email,
            contact: userProfile?.mobile,
          },
        },
      };
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Fail to load");
        return;
      }
      const paymentObject = new Razorpay(config.data);
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (payid) {
      makePayment();
    }
  }, [payid]);

  // User profile modal
  const [show5, setShow5] = useState();
  const [show6, setShow6] = useState();

  const [isVisible, setIsVisible] = useState(false);

  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  const editRegUser = async () => {
    try {
      const config = {
        url: "/user/edituser",
        method: "put",
        baseURL: "https://coorgtour.in/api",

        headers: { "content-type": "application/json" },
        data: {
          name: name,
          email: email,
          phone: phone,
          userId: userProfile?._id,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully Updated");
        // getUserbyId();
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        handleClose5();

        setname("");
        setphone("");
        setemail("");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const editRegUserPassword = async () => {
    try {
      const config = {
        url: "/user/edituser",
        method: "put",
        baseURL: "https://coorgtour.in/api",

        headers: { "content-type": "application/json" },
        data: {
          password: password,
          confirmpassword: confirmpassword,
          userId: userProfile?._id,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully Updated");
        // getUserbyId();
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        handleClose5();

        setpassword("");
        setconfirmpassword("");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  return (
    <>
      <div className="add-gr">
        {/* <div className="container-fluid">
          <div className="ad-b mt-4 mb-3"></div>
          <div className="main-body">
            <div className="row">
              <div className="col-lg-3">
                <div
                  className="profile-o"
                  style={{
                    width: "251px",
                    cursor: "pointer",
                  }}
                >
                  <ListGroup>
                    <ListGroup.Item
                      className={`${acc ? "active-list" : ""}`}
                      onClick={() => {
                        setacc(true);
                        setacc1(false);
                        setacc3(false);
                      }}
                    >
                      Profile
                    </ListGroup.Item>
                    <ListGroup.Item
                      className={`${acc1 ? "active-list" : ""}`}
                      onClick={() => {
                        setacc(false);
                        setacc1(true);
                        setacc3(false);
                      }}
                    >
                      Profile Settings
                    </ListGroup.Item>
                    <ListGroup.Item
                      className={`${acc3 ? "active-list" : ""}`}
                      onClick={() => {
                        setacc(false);
                        setacc1(false);
                        setacc3(true);
                      }}
                    >
                      Booking Service
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
              <div className="col-lg-8">
                {acc ? (
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-column ">
                        <div className="mt-3">
                          <p className="text-secondary mb-1">
                            <span
                              style={{
                                fontSize: "18px",
                                color: "#3b6f7c",
                                fontWeight: "600",
                              }}
                            >
                              NAME
                            </span>{" "}
                            : {userProfile.name}
                          </p>
                          <p className="text-muted font-size-sm mb-1">
                            <span
                              style={{
                                fontSize: "18px",
                                color: "#3b6f7c",
                                fontWeight: "600",
                              }}
                            >
                              EMAIL{" "}
                            </span>{" "}
                            : {userProfile.email}
                          </p>
                          <p className="text-muted font-size-sm mb-1">
                            <span
                              style={{
                                fontSize: "18px",
                                color: "#3b6f7c",
                                fontWeight: "600",
                              }}
                            >
                              PHONE NO{" "}
                            </span>
                            : {userProfile.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : acc1 ? (
                  <div className="card">
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="do-sear mb-2">
                            <label className="mb-0">Full Name</label>
                            <input
                              type="text"
                              placeholder={userProfile.name}
                              className="vi_0"
                              value={name}
                              onChange={(e) => setname(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="do-sear mb-2">
                            <label className="mb-0">Email</label>
                            <input
                              type="email"
                              placeholder={userProfile.email}
                              className="vi_0"
                              value={email}
                              onChange={(e) => setemail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="do-sear mb-2">
                            <label className="mb-0">Mobile Number</label>
                            <input
                              type="number"
                              placeholder={userProfile.phone}
                              className="vi_0"
                              value={phone}
                              onChange={(e) => setphone(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="do-sear mb-2">
                            <label className="mb-0">Password</label>
                            <input
                              type="text"
                              placeholder="Enter Password"
                              className="vi_0"
                              value={password}
                              onChange={(e) => setpassword(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="do-sear mb-2">
                            <label className="mb-0">Confirm Password</label>
                            <input
                              type="text"
                              placeholder="Enter Confirm Password"
                              className="vi_0"
                              value={confirmpassword}
                              onChange={(e) =>
                                setconfirmpassword(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="do-sear mb-2">
                          <Button onClick={edituser}>Save Changes</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {acc3 ? (
                      <div className="card">
                        <div className="card-body">
                          <div
                            style={{ overflow: "hidden", overflowX: "auto" }}
                          >
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>S.No</th>
                                  <th>bookId</th>
                                  <th>Service Details</th>
                                  <th>Vendor Added Products</th>
                              
                                  <th>Service Amount</th>
                                  <th>Total Amount</th>
                                  <th>PayId</th>
                                  <th>Payment Amount</th>
                                  <th>Remaining Amount</th>
                                  <th>Payment Method</th>
                                  <th>Payment Status</th>
                                  <th>Status</th>
                                  <th>Vendor Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {product?.map((e, index) => {
                                  return (
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{e._id}</td>
                                      <td>
                                        <Table striped bordered hover>
                                          <tbody>
                                            {e?.serviceType?.map((ele,i) => {
                                              return (
                                                <tr>
                                                <td>{i+1}</td>
                                                <td>{ele?.name}</td>
                                                <td>{ele?.quntitity}</td>
                                                <td>₹{ele?.price?.toFixed(2)}</td>
                                              </tr>
                                              );
                                            })}
                                          
                                          </tbody>
                                        </Table>
                                      </td>
                                      <td>
                                        <Table striped bordered hover>
                                          <tbody>
                                            {e?.servecePoint?.map((ele,i) => {
                                              return (
                                                <tr>
                                                <td>{i+1}</td>
                                                <td>{ele?.name}</td>
                                                <td>{ele?.quntitity}</td>
                                                <td>₹{ele?.price?.toFixed(2)}</td>
                                              </tr>
                                              );
                                            })}
                                          
                                          </tbody>
                                        </Table>
                                      </td>
                                      <td>₹{e?.serviceAmount?.toFixed(2)}</td>
                                      <td>₹{e?.TotalAmount?.toFixed(2)}</td>
                                      <td>{e?.payId}</td>
                                      <td>₹{e?.payAmount?.toFixed(2)}</td>
                                      <td>₹{(e?.TotalAmount-e?.payAmount)?.toFixed(2)}
                                      {(e?.TotalAmount-e?.payAmount)!==0 ? (<button type="button" class="btn btn-success" onClick={()=>{
                                        setpayAmount(e?.TotalAmount-e?.payAmount);
                                        setid(e._id);
                                        posttransaction(e?.TotalAmount-e?.payAmount)}}>Pay Now</button>):(<></>)}
                                      </td>
                                      <td>{e?.paymentMethod}</td>
                                      <td>{e?.paymentStatus}</td> 
                                       <td>{e?.status =="Pending" ? (<span style={{color:"blue"}}>{e?.status}</span>):(<span>{e?.status=="Cancel" ? (<span style={{color:"red"}}>{e?.status}</span>):(<span style={{color:"green"}}>{e?.status}</span>)}</span>)}</td>
                                      <td>{e?.VendorStatus =="Pending" ? (<span style={{color:"blue"}}>{e?.VendorStatus}</span>):(<span>{e?.VendorStatus=="Cancel"||e?.VendorStatus=="Assigned"  ? (<span style={{color:"red"}}>{e?.VendorStatus}</span>):(<span style={{color:"green"}}>{e?.VendorStatus}</span>)}</span>)}</td>

                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div> */}

        {/* User Profile */}
        <div>
          <div className="myaccount-component d-flex justify-content-center">
            {/* <div className="profile-container">
              <FaUserCircle style={{width:"100%", height:"200px"}}/>
              <p className='user-name'>{userProfile?.name}</p>
            
            </div> */}

            {/* <div className="profile-container-2 d-flex justify-content-center"> */}
            <div className="profile-container-2 ">
              <div className="profile-content-display">
                <div className="profile-user-deatils">
                  <p className="profile-user-title">Full Name</p>
                  <p className="profile-user-subtitle">{userProfile?.name}</p>
                </div>
                <div className="profile-user-deatils">
                  <p className="profile-user-title">Email</p>
                  <p className="profile-user-subtitle">{userProfile?.email}</p>
                </div>
              </div>
              <div className="profile-user-deatils">
                <p className="profile-user-title">Mobile Number</p>
                <p className="profile-user-subtitle">{userProfile?.phone}</p>
              </div>

              <div>
                <div className="edit-change-button">
                  <Button
                    variant=""
                    className="header-search"
                    onClick={handleShow5}
                    style={{ background: "#080874", color: "white" }}
                  >
                    Edit Profile
                  </Button>
                  {/* <Button
                    variant=""
                    className="header-search"
                    style={{
                      width: "auto",
                      background: "#080874",
                      color: "white",
                    }}
                    onClick={handleShow6}
                  >
                    Change Password
                  </Button> */}
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>

          {/* Edit profile modal */}
          <Modal
            show={show5}
            onHide={handleClose5}
            style={{ zIndex: "9999999" }}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <h4 style={{ textAlign: "center", color: "#080874" }}>
                Edit Your Profile
              </h4>
              <Row>
                <div className="col-lg-12 mb-3" name="edit-profile-details">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={userProfile?.name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="col-lg-12 mb-3" name="edit-profile-details">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={userProfile?.email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="col-lg-12 mb-3" name="edit-profile-details">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={userProfile?.phone}
                    onChange={(e) => setphone(e.target.value)}
                  />
                </div>
              </Row>

              <div className="mb-4">
                <Button
                  variant=" "
                  className="header-search"
                  style={{
                    background: "#080874",
                    color: "white",
                    width: "100%",
                  }}
                  onClick={() => {
                    editRegUser();
                  }}
                >
                  Update
                </Button>
                {isVisible && (
                  <div className="popup-content">
                    Profile Update Successfully
                  </div>
                )}
              </div>
            </Modal.Body>
          </Modal>

          {/* Set password modal  */}
          <Modal
            show={show6}
            onHide={handleClose6}
            style={{ zIndex: "9999999" }}
          >
            <Modal.Header closeButton>Change Password</Modal.Header>
            <Modal.Body>
              <h4 style={{ textAlign: "center", color: "#080874" }}>
                Set New Password
              </h4>
              <Row>
                <div className="col-lg-6 mb-3" name="edit-profile-details">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={userProfile?.password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div className="col-lg-6 mb-3" name="edit-profile-details">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={CryptoJS.AES.encrypt(
                      userProfile?.confirmpassword,
                      confirmpassword
                    ).toString()}
                    onChange={(e) => setconfirmpassword(e.target.value)}
                  />
                </div>
              </Row>

              <div className="mb-4">
                <Button
                  variant=" "
                  className="header-search"
                  style={{
                    background: "#080874",
                    color: "white",
                    width: "100%",
                  }}
                  onClick={() => editRegUserPassword()}
                >
                  Set Password
                </Button>
                {/* {isVisible && <div className="popup-content">Password Changed Successfully</div>} */}
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Profile;

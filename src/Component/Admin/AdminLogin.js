import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Modal from "react-bootstrap/Modal";
//  import logo from ""
function AdminLogin() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [passwordsee, setPasswordsee] = useState("");
  const handlePassword = () => {
    setPasswordsee(!passwordsee);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const Login = async () => {
    try {
      const config = {
        url: "/api/admin/signin",
        method: "post",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          email: Email,
          password: Password,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        // console.log(res.data);
        // console.log(res.data.success);
        alert("Login done succesfully");
        sessionStorage.setItem("admin", JSON.stringify(res.data.admin));
        window.location.assign("/admin/dashbord");
      }
    } catch (error) {
      // console.log(error.response);
      if (error.response) {
        alert(error.response.data.error);
      }
    }
  };

  // const [email1, setemail1] = useState("");

  // const sendOtp = async () => {
  //   try {
  //     const config = {
  //       url: "/api/admin/sendmail",
  //       method: "post",
  //       baseURL: "https://coorgtour.in",
  //       headers: { "content-type": "application/json" },
  //       data: {
  //         email: email1,
  //       },
  //     };
  //     let res = await axios(config);
  //     if (res.status === 200) {
  //       alert("Your email send otp successfully");
  //       handleClose();
  //       handleShow1();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Row>
        <Col md={4}>
          <img
            src="../images/logo.jpg"
            style={{ backgroundColor: "#3b6f7c", width: "100px" }}
          />
          <div
            style={{
              justifyContent: "center",
              display: "grid",
              marginTop: "25%",
            }}
          >
            <p style={{ fontWeight: "bold", color: "#3b6f7c" }}>
              Login to ValueProService Admin
            </p>
            <input
              placeholder="Enter your Email"
              style={{
                borderRadius: "3px",
                border: "1px solid #3b6f7c",
                fontSize: "12px",
                padding: "8px",
                textAlign: "center",
                width: "251px",
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <div>
              <input
                placeholder="Enter Your Password"
                type={passwordsee ? "text" : "password"}
                style={{
                  borderRadius: "3px",
                  border: "1px solid #3b6f7c",
                  fontSize: "12px",
                  padding: "8px",
                  textAlign: "center",
                  width: "251px",
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordsee ? (
                <>
                  {" "}
                  <IoIosEye
                    style={{
                      position: "absolute",
                      marginTop: "10px",
                      marginLeft: "-22px",
                    }}
                    onClick={handlePassword}
                  />
                </>
              ) : (
                <>
                  {" "}
                  <IoIosEyeOff
                    style={{
                      position: "absolute",
                      marginTop: "10px",
                      marginLeft: "-22px",
                    }}
                    onClick={handlePassword}
                  />
                </>
              )}
            </div>
            <button
              style={{
                marginTop: "30px",
                border: "none",
                borderRadius: "3px",
                fontSize: "15px",
                color: "white",
                fontWeight: "bold",
                height: "40px",
                backgroundColor: "#3b6f7c",
              }}
              onClick={Login}
            >
              LOGIN
            </button>
          </div>
          {/* <div
            style={{
              float: "right",
              cursor: "pointer",
              paddingRight: "100px",
              color: "red",
            }}
            onClick={handleShow}
          >
            {" "}
            <b>Forget Password</b>
          </div> */}
        </Col>
        <Col md={8}>
          <img
            style={{ width: "100%", height: "100vh" }}
            src="../images/background.jpg"
          />
        </Col>
      </Row>
      {/* email */}
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sent otp your email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={email1}
            placeholder="Enter your email id"
            onChange={(e) => setemail1(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={sendOtp}>
            Sent
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* otp verify */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          {/* <Modal.Title></Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <input type="number" placeholder="Enter your otp" />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose1();
              handleShow2();
            }}
            className="w-100"
          >
            Otp verify
          </Button>
        </Modal.Footer>
      </Modal>

      {/* new password */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          {/* <Modal.Title></Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <input type="text" placeholder="Enter your new password" />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter your confirm password"
              className="pb-3"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose1} className="w-100">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminLogin;

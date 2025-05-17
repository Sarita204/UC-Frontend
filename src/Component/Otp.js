import React, { useState } from "react";
import "../Style/register.css";
import { Button } from "react-bootstrap";
import OtpInput from "react-otp-input";
import "../Style/otp.css"
import { useLocation } from "react-router-dom";
import axios from "axios";
// import { display } from "html2canvas/dist/types/css/property-descriptors/display";

function Otp() {
  const [otp, setOtp] = useState("");
  const { state } = useLocation()
  if (!state) {
    return window.location.assign("/login")
  }
  // console.log(state,"whilgeri")
  const VerfiyOtp = async () => {
    try {
      if (!otp) return alert("Please enter otp")
      const config = {
        url: "/api/user/otpVarification",
        method: "post",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          phone: state,
          otp: otp
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert("Successfully login")
        sessionStorage.setItem("user", JSON.stringify(res.data.details))
        // alert("Otp Sent Your Mobile Number");
        window.location.assign("/");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        alert(error.response.data.error);
      }
    }
  };
  const signin = async () => {
    try {
      const config = {
        url: "/api/user/signinwithphone",
        method: "post",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          phone: state,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        console.log(res.data);
        console.log(res.data.success);
        return alert("Successfully resend otp your mobile");

      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="mt-5 item">
          <div className="log-0">
            <div
              className="urban-0"
              style={{
                backgroundImage: "url('../images/login.avif')",
                height: "400px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                paddingTop: "201px",
                width: "515px",
              }}
            >
              <div className="mobile-dif">
                <div
                  className="mb-2"
                  style={{ fontSize: "18px", fontWeight: "600", textAlign: "center" }}
                >
                  Enter your Otp
                </div>
                <div className="otp-diff differ-0 mb-4" style={{ display: "flex", justifyContent: "center" }}>
                  <OtpInput

                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} style={{ width: "2rem" }} />}

                  />
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <Button style={{ width: "100%" }} variant="danger" onClick={signin}>Resend Otp</Button>
                  </div>
                  <div className="col-md-4">
                  </div>
                  <div className="col-md-4">
                    <Button style={{ width: "100%" }} variant="success" onClick={VerfiyOtp}>Otp Verify</Button>
                  </div>

                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Otp;

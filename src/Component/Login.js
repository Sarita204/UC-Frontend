import React, { useState } from "react";
import "../Style/register.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setphone] = useState("");
  const history = useNavigate();
  const signin = async () => {
    try {
      if (!phone) return alert("Please enter mobile number");
      const config = {
        url: "/api/user/signinwithphone",
        method: "post",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          phone: phone,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        console.log(res.data);
        console.log(res.data.success);
        alert("Otp Sent Your Mobile Number");
        // window.location.assign("/otp");
        history("/otp", { state: phone });
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
                width: "421px",
              }}
            >
              <div className="mobile-dif">
                <div
                  className="mb-2"
                  style={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Enter your mobile number
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="+919898485834"
                    className="input-log mb-3"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                  />
                </div>
                <Button style={{ width: "100%" }} onClick={signin}>
                  <a style={{ color: "white" }}>Send OTP</a>
                </Button>
                <p>
                  Don't have account ? <a href="/register">Register</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

import React, { useState } from "react";
import "../Style/register.css";
import { Button } from "react-bootstrap";
import axios from "axios";

function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [phone, setphone] = useState("");
  const [houseno, sethouseno] = useState("");
  const [landmark, setlandmark] = useState("");
  const [completeAddress, setcompleteAddress] = useState("");
  const [fullAddress, setfullAddress] = useState("");

  const regex = /^[a-zA-Z\s'-]+$/;

  function createAddress() {
    let addressval = "";
    if (houseno) {
      addressval += houseno + " ";
    }
    if (landmark) {
      addressval += landmark + " ";
    }
    // if (!completeAddress) {
    //   return alert("Please fill the address");
    // }
    addressval += completeAddress;
    setfullAddress(addressval);
  }

  const signup = async () => {
    // createAddress();

    if (!name || !email || !phone) {
      return alert("Please Fill All The Field");
    }
    if (!name.match(regex)) {
      return alert("Please enter a valid name without numbers.");
    }
    if (phone.length !== 10) {
      return alert("Please enter a valid mobile numbers.");
    } else {
      try {
        const config = {
          url: "/api/user/signup",
          method: "post",
          baseURL: "https://coorgtour.in",
          headers: { "content-type": "application/json" },
          data: {
            name: name,
            email: email,
            phone: phone,
            // password: password,
            // confirmpassword: confirmpassword,
            // houseno: houseno,
            // landmark: landmark,
            // addressVal: completeAddress,
          },
        };
        let res = await axios(config);
        if (res.status === 200) {
          // console.log(res.data);
          // console.log(res.data.success);
          alert("Signup Success");
          window.location.assign("/login");
        }
      } catch (error) {
        console.log(error.response);
        if (error.response) {
          alert(error.response.data.error);
        }
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
                <div>
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    value={name}
                    className="input-log mb-3"
                    onChange={(e) => setname(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="input-log mb-3"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="+919898485834"
                    className="input-log mb-3"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                  />
                  {/* <input
                    type="password"
                    placeholder="Enter your password"
                    className="input-log mb-3"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Enter your confirm password"
                    className="input-log mb-3"
                    value={confirmpassword}
                    onChange={(e) => setconfirmpassword(e.target.value)}
                  /> */}
                  {/* <input
                    type="number"
                    placeholder="House No."
                    className="input-log mb-3"
                    value={houseno}
                    onChange={(e) => sethouseno(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Complete Address"
                    className="input-log mb-3"
                    value={completeAddress}
                    onChange={(e) => setcompleteAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Landmark"
                    className="input-log mb-3"
                    value={landmark}
                    onChange={(e) => setlandmark(e.target.value)}
                  /> */}
                </div>
                <Button style={{ width: "100%" }} onClick={signup}>
                  <a style={{ color: "white" }}>Sign up</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "../Style/cart.css";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { useEffect } from "react";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";

function Address() {
  const history = useNavigate();
  const [acc, setacc] = useState(true);
  const [SelectedAddress, setSelectedAddress] = useState({});
  const [cart, setcart] = useState([]);
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Email, setEmail] = useState("");
  const [State, setState] = useState("");
  const [city, setcity] = useState("");
  const [village, setvillage] = useState("");
  const [houseno, sethouseno] = useState("");

  const [TotalAmount, setTotalAmount] = useState("");
  const [discount, setdiscount] = useState("");
  const [serviceType, setserviceType] = useState("");

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    setcart(JSON.parse(localStorage.getItem("Cart")));
    getAddress();
  }, []);

  let addRess;
  const [payid, setpayid] = useState("");
  const addJobs = async () => {
    try {
      const config = {
        url: "/AddJobsService",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        headers: { "content-type": "application/json" },
        data: {
          userId: user?._id,
          userName: user?.name,
          userMobile: user?.phone,
          userEmail: user?.email,
          TotalAmount: cart?.reduce((i, e) => i + Number(e.price), 0),
          serviceAmount: cart?.reduce((i, e) => i + Number(e.price), 0),
          serviceType: cart,
          name: cart?.name,
          userAddress: addRess,
          payAmount: cart?.reduce((i, e) => i + Number(e.price), 0),
          paymentStatus: "Full Payment",
          payId: payid,
          paymentMethod: "Online",
          //  location:
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert("Service Booked");
          localStorage.removeItem("Cart");
          history("/profile", { state: { book: true } });
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
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
  const addAddress = async () => {
    try {
      const config = {
        url: "/addAddress",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        data: {
          userId: user._id,
          name: username,
          email: Email,
          phone: Mobile,
          state: State,
          city: city,
          village: village,
          houseno: houseno,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert("Address Added");
          window.location.reload(true);
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  const posttransaction = async (amount) => {
    try {
      if (Object.keys(SelectedAddress)?.length === 0) {
        return alert("Please select address first!!!");
      } else {
        addRess = `${SelectedAddress?.name}, 
        ${SelectedAddress?.phone}, 
        ${SelectedAddress?.email},
         ${SelectedAddress?.houseno},
          ${SelectedAddress?.village},
           ${SelectedAddress?.city}, 
           ${SelectedAddress?.state}. `;
      }
      const config = {
        data: {
          key: "rzp_test_FAe0X6xLYXaXHe",
          amount: Math.round(amount) * 100,
          currency: "INR",
          name: "Urbon Company",
          description: "Order Amount",
          image: "../images/pc.png",
          customerId: user?._id,
          handler: function (response) {
            alert(response.razorpay_payment_id);
            setpayid(response.razorpay_payment_id);
          },
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: user?.mobile,
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
  const [data, setdata] = useState([]);
  // console.log(data, "nfil");
  const getAddress = () => {
    try {
      axios
        .get("https://coorgtour.in/api/admin/getAddress/" + user?._id)
        .then(function (response) {
          setdata(response.data.Address);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (payid) {
      addJobs();
    }
  }, [payid]);
  return (
    <>
      <div className="add-p" style={{ padding: "50px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div>
                <Button
                  class="btn btn-style1 "
                  onClick={() => {
                    setacc(!acc);
                  }}
                >
                  Add Address
                </Button>
                {acc ? (
                  <></>
                ) : (
                  <>
                    <div className="row mt-2 mb-2">
                      <div className="col-md-12">
                        <div className="do-sear mb-2">
                          <label className="mb-0">Name</label>
                          <input
                            type="text"
                            placeholder="Name"
                            className="vi_0"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mb-2">
                          <label className="mb-0">Email</label>
                          <input
                            type="text"
                            placeholder="Email"
                            className="vi_0"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mb-2">
                          <label className="mb-0">Mobile Number</label>
                          <input
                            type="number"
                            placeholder="number"
                            className="vi_0"
                            value={Mobile}
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="do-sear mb-2">
                          <label className="mb-0">State</label>
                          <input
                            type="text"
                            placeholder="Address"
                            className="vi_0"
                            value={State}
                            onChange={(e) => setState(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mb-2">
                          <label className="mb-0">City</label>
                          <input
                            type="text"
                            placeholder="Address"
                            className="vi_0"
                            value={city}
                            onChange={(e) => setcity(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mb-2">
                          <label className="mb-0">Village</label>
                          <input
                            type="text"
                            placeholder="Address"
                            className="vi_0"
                            value={village}
                            onChange={(e) => setvillage(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mb-2">
                          <label className="mb-0">House No/Flat No</label>
                          <input
                            type="text"
                            placeholder="Address"
                            className="vi_0"
                            value={houseno}
                            onChange={(e) => sethouseno(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      class="btn btn-style1"
                      style={{ textAlign: "center" }}
                      onClick={addAddress}
                    >
                      Submit
                    </Button>
                  </>
                )}
                {data?.map((e) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "21px",
                      }}
                    >
                      <div>
                        <input
                          type="checkbox"
                          onClick={() => setSelectedAddress(e)}
                        />
                      </div>
                      <div className="aef">
                        {e.name}, <span>{e.phone}</span>,<br />
                        <span>{e.email}</span>,<br />
                        <span>{e.houseno}</span>,<span>{e.village}</span>,<br />
                        <span>{e.city}</span>,<span>{e.state}</span>,
                        <br />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-6">
              {cart?.map((item) => {
                return (
                  <div
                    className="ecommerce_cart"
                    style={{ borderTop: " 1px solid #eeeeee" }}
                  >
                    <div className="item-wrap">
                      <ul className="cart-wrap mt-2" style={{ padding: "0px" }}>
                        <li className="item-info" style={{ width: "50%" }}>
                          <div className="item-title">
                            <p className="fresh_hero"> {item?.name}</p>
                          </div>
                        </li>
                        <li className="item-qty">
                          <div className="product-quantity-action">
                            <div className="product-quantity">
                              <div
                                className="add-0 "
                                style={{
                                  position: "relative",
                                  bottom: "unset",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div className="add">{item?.quntitity}</div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="item-price">
                          <span class="money amount full-price-34766798487701">
                            ₹{item?.price}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
              <div className="cart-total-wrap mt-4">
                <div className="cart-sub_hero mt-2">
                  <div className="culculate-shipping">Item total</div>
                  <div className="culculate-shipping">
                    {" "}
                    ₹{cart?.reduce((i, e) => i + Number(e.price), 0)}
                  </div>
                </div>
                {/* <div className="cart-sub_hero mt-2">
                  <div className="culculate-shipping">Taxt and Fee</div>
                  <div className="culculate-shipping"> ₹59</div>
                </div> */}

                <div className="cart-sub-total">
                  <span className="subtotal-title">Total</span>
                  <span className="amount subtotal">
                    {" "}
                    ₹{cart?.reduce((i, e) => i + Number(e.price), 0)}
                  </span>
                </div>

                <Button style={{ textAlign: "center", width: "100%" }}>
                  <div
                    class="btn btn-style1"
                    onClick={() =>
                      posttransaction(
                        cart?.reduce((i, e) => i + Number(e.price), 0)
                      )
                    }
                  >
                    Buy Now
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Address;

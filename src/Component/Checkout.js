import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { GrCircleInformation } from "react-icons/gr";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";
import "../Style/checkout.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { connect } from "react-redux";
import { getBasketTotal } from "./StoreReducer";

const Checkout = (props) => {
  const [qty, setqty] = useState(1);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [Avoidcallingbefore, setAvoidcallingbefore] = useState(false);

  useEffect(() => {
    const userLogin = JSON.parse(sessionStorage.getItem("user"));
    setIsLoggedIn(!userLogin);
  }, []);

  const increment = (item) => {
    console.log("item", item);
    props.dispatch({
      type: "addquantity",
      item: item,
    });
    console.log("clicked", qty);
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

  return (
    <div>
      <div className="container">
        <div className="row text-center" style={{ fontWeight: "bold" }}>
          <div className="col-md-12">
            <div className="offered-title">YOUR CART</div>
          </div>
        </div>
        <br />
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="col-md-7">
            <Card style={{ width: "auto" }}>
              <Card.Body>
                <div className="row ">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <h5>Service Name</h5>
                  </div>
                  <div className="row">
                    {props.basket.map((item) => {
                      return (
                        <>
                          <div className="col-4 col-sm-4 col-md-4 col-lg-4 mb-2">
                            <h6>{item.Service?.name}</h6>
                          </div>

                          <div className="col-3 col-sm-3 col-md-3 col-lg-3 d-flex gap-1 mb-2">
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
                          <div className="col-3 col-sm-3 col-md-3 col-lg-3 mb-2">
                            <h5>₹ {item?.Service?.price}/-</h5>
                          </div>
                          <div className="col-2 col-sm-2 col-md-2 col-lg-2 mb-2">
                            <AiOutlineDelete
                              style={{ color: "red", fontSize: "27px" }}
                              onClick={() => RemovebasketItem(item?._id)}
                            />
                          </div>
                        </>
                      );
                    })}{" "}
                  </div>
                  <br />
                </div>

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
                            onChange={() =>
                              setAvoidcallingbefore(!Avoidcallingbefore)
                            }
                            type={type}
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
          </div>
          <div className="col-md-5 ">
            <div className="row" style={{ width: "auto" }}>
              <Card>
                <Card.Body>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                      <h5>Payment Summary</h5>
                    </div>
                  </div>
                  <br />

                  <div className="row mb-3">
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
                              Price : {item?.Service?.price * item?.quantity}/-
                            </h6>
                          </div>
                        </>
                      );
                    })}

                    <hr />
                  </div>

                  <div className="row">
                    <div className="col-9 col-sm-9 col-md-9 col-lg-9">
                      <h5>Grand Total</h5>
                    </div>

                    <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                      <h5>₹ {getBasketTotal(props.basket)}</h5>
                    </div>
                    <br />
                    <br />
                    <br />
                    {isLoggedIn ? (
                      <>
                        <div className="row justify-content-center gap-3">
                          <Card style={{ width: "auto" }}>
                            <Card.Body>
                              <h5>Account</h5>
                              <div style={{ display: "flex", gap: "20px" }}>
                                <h6 style={{ margin: "auto 0" }}>
                                  To book the service, please login or signup
                                </h6>
                                <button
                                  className="button"
                                  onClick={() => {
                                    navigate("/login");
                                  }}
                                  style={{
                                    background: "#080874",
                                    color: "white",
                                  }}
                                >
                                  Login
                                </button>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 d-block text-center">
                          <button
                            className="button"
                            onClick={() => {
                              navigate("/logincheckout", {
                                state: Avoidcallingbefore,
                              });
                            }}
                            style={{ background: "#080874", color: "white" }}
                          >
                            Go to Checkout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>

        <Modal
          show={show2}
          onHide={handleClose2}
          style={{ zIndex: "99999999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#080874" }}>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control type="email" placeholder="Enter mobile no" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>OTP</Form.Label>
                <Form.Control type="password" placeholder="Enter OTP" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div className="view-wrap">
              <a
                href="/logincheckout"
                style={{ color: "white", textDecoration: "none" }}
              >
                Login
              </a>
            </div>
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

export default connect(mapStateToProps)(Checkout);

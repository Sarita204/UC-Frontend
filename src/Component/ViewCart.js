import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
import "../Style/cart.css";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

function ViewCart() {
  const [cart, setcart] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );

  const user = JSON.parse(sessionStorage.getItem("user"));

  const request = () => {
    if (!user) {
      return alert("Please Login");
    }
  };

  // Delete
  const deleteTask = (item) => {
    const newTaskList = [...cart];
    newTaskList.splice(item, 1);
    setcart(newTaskList);
    localStorage.setItem("Cart", JSON.stringify(newTaskList));
  };

  // Increment
  const increment = (item, quntitity) => {
    const updatedTasks = cart.map((task) => {
      if (task.serviceId === item?.serviceId) {
        return {
          ...task,
          quntitity: quntitity,
          price: item?.actualPrice * quntitity,
        };
      }
      return task;
    });
    setcart(updatedTasks);
    localStorage.setItem("Cart", JSON.stringify(updatedTasks));
  };

  // Decrement
  const decrement = (item, quntitity) => {
    if (quntitity > 0) {
      const updatedTasks = cart.map((task) => {
        if (task.serviceId === item?.serviceId) {
          return {
            ...task,
            quntitity: quntitity,
            price: item?.actualPrice * quntitity,
          };
        }
        return task;
      });
      setcart(updatedTasks);

      localStorage.setItem("Cart", JSON.stringify(updatedTasks));
    }
  };

  return (
    <>
      <div className="cart">
        <Container>
          {cart?.length ? (
            <Row>
              <Col lg={8} md={8}>
                <div className="cart_hero">
                  <div className="cart-title">
                    <h2>My Cart:</h2>
                    <div class="cart-count">
                      <span className="bigcounter">{cart?.length}</span>
                      <span className="cart-item-title">Item</span>
                    </div>
                  </div>
                  {cart?.map((item) => {
                    return (
                      <div
                        className="ecommerce_cart"
                        style={{ borderTop: " 1px solid #eeeeee" }}
                      >
                        <div className="item-wrap">
                          <ul
                            className="cart-wrap mt-2"
                            style={{ padding: "0px" }}
                          >
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
                                      width: "100px",
                                    }}
                                  >
                                    <div className="add">
                                      <BsPlus
                                        onClick={() =>
                                          increment(item, item?.quntitity + 1)
                                        }
                                      />
                                    </div>
                                    <div className="add">{item?.quntitity}</div>
                                    <div className="add">
                                      <BiMinus
                                        onClick={() =>
                                          decrement(item, item?.quntitity - 1)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="item-remove">
                                <span
                                  className="remove-wrap text-center"
                                  onClick={deleteTask}
                                  style={{
                                    cursor: "pointer",
                                    color: "red",
                                    fontSize: "21px",
                                  }}
                                >
                                  <MdDeleteForever />
                                </span>
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

                  {/*  */}
                  {/* <div
                className="ecommerce_cart"
                style={{ borderTop: " 1px solid #eeeeee" }}
              >
                <div className="item-wrap">
                  <ul className="cart-wrap mt-2" style={{ padding: "0px" }}>
                    <li className="item-info">
                      <div className="item-title">
                        <p className="fresh_hero"> Window laptop repair</p>
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
                            <div className="add">
                              <BsPlus />
                            </div>
                            <div className="add">1</div>
                            <div className="add">
                              <BiMinus />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item-remove  mt-2">
                        <span className="remove-wrap">
                          <Link to="#">Remove</Link>
                        </span>
                      </div>
                    </li>
                    <li class="item-price">
                      <span class="money amount full-price-34766798487701">
                        ₹159
                      </span>
                    </li>
                  </ul>
                </div>
              </div> */}
                </div>
              </Col>
              <Col lg={4} md={4}>
                <div className="cart-total-wrap">
                  <div className="cart-sub-total">
                    <span className="subtotal-title">Payment Summary</span>
                  </div>
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
                  {user ? (
                    <>
                      <Button style={{ textAlign: "center", width: "100%" }}>
                        <a href="/address-slot" class="btn btn-style1">
                          Checkout
                        </a>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button style={{ textAlign: "center", width: "100%" }}>
                        <a
                          href="/login"
                          class="btn btn-style1"
                          onClick={request}
                        >
                          Login/Sign up to proceed
                        </a>
                      </Button>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          ) : (
            <>
              <div
                className=""
                style={{
                  paddingBottom: "150px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  <h4>Cart Is Empty</h4>
                </div>
              </div>
            </>
          )}
        </Container>
      </div>
    </>
  );
}

export default ViewCart;

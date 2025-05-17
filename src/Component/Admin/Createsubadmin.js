import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function Createsubadmin() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [contactnum, setcontactnum] = useState();
  const [password, setpassword] = useState("");

  const [User, setUser] = useState(false);
  const [Leads, setLeads] = useState(false);
  const [Createinvoice, setCreateinvoice] = useState(false);
  const [product, setproduct] = useState(false);
  const [Customer, setCustomer] = useState(false);
  const [Assignedleads, setAssignedleads] = useState(false);
  const [Salesdetails, setSalesdetails] = useState(false);
  const [Vendor, setVendor] = useState(false);
  const [Purchaseorder, setPurchaseorder] = useState(false);
  const [PurchaseEntry, setPurchaseEntry] = useState(false);
  const [SalesEntry, setSalesEntry] = useState(false);
  const [Stackmaintenance, setStackmaintenance] = useState(false);
  const [Leaves, setLeaves] = useState(false);
  const [Attendance, setAttendance] = useState(false);
  const [Expense, setExpense] = useState(false);
  const [CreditDebit, setCreditDebit] = useState(false);
  const [ProfitLoss, setProfitLoss] = useState(false);

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.target;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  function ValidateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  }

  function validatename(inputtxt) {
    var phoneno = /^[a-zA-Z]{2,30}$/; // var no = /^\d{10}$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      alert("You have entered an invalid name!");
      return false;
    }
  }

  function phonenumber(inputtxt) {
    var phoneno = /^[6-9]\d{9}$/; // var no = /^\d{10}$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      alert("You have entered an invalid mobile number!");
      return false;
    }
  }

  function CheckPassword(inputtxt) {
    var decimal =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    if (inputtxt.match(decimal)) {
      return true;
    } else {
      alert(
        "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character..!"
      );
      return false;
    }
  }

  const addMember = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !contactnum) {
      alert(
        "Sub-Admin Name, Email, Contact No. and Password are mandatory field"
      );
    } else if (
      User ||
      product ||
      Vendor ||
      Customer ||
      Purchaseorder ||
      PurchaseEntry ||
      SalesEntry ||
      Stackmaintenance ||
      Leads ||
      Createinvoice ||
      Assignedleads ||
      Salesdetails ||
      Leaves ||
      Attendance ||
      Expense ||
      CreditDebit ||
      ProfitLoss
    ) {
      try {
        if (
          validatename(name) &&
          ValidateEmail(email) &&
          phonenumber(contactnum) &&
          CheckPassword(password)
        ) {
          const config = {
            url: "/addsubadmin",
            method: "post",
            baseURL: "https://bdmtile.in/api/admin",
            data: {
              name: name,
              email: email,
              password: password,
              contactnum: contactnum,
              User: User,
              product: product,
              Vendor: Vendor,
              Customer: Customer,
              Purchaseorder: Purchaseorder,
              PurchaseEntry: PurchaseEntry,
              SalesEntry: SalesEntry,
              Stackmaintenance: Stackmaintenance,
              Leads: Leads,
              Createinvoice: Createinvoice,
              Assignedleads: Assignedleads,
              Salesdetails: Salesdetails,
              Leaves: Leaves,
              Attendance: Attendance,
              Expense: Expense,
              CreditDebit: CreditDebit,
              ProfitLoss: ProfitLoss,
            },
          };
          await axios(config).then(function (res) {
            if ((res.status = 200)) {
              console.log("success");
              alert("Details Added");
              window.location.reload();
            }
          });
        }
      } catch (error) {
        console.log(error.response);
        if (error.response) {
          alert(error.response.data.error);
        }
      }
    } else {
      alert("Please select the access details");
    }
  };

  return (
    <div style={{ paddingLeft: "30px" }}>
      <div
        style={{
          backgroundColor: "white",
          fontWeight: 600,
          padding: "22px",
          fontSize: "22px",
          color: "#3b6f7c",
        }}
      >
        Sub-Admin Creation
      </div>

      <Container>
        <div className="addsubadmin">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="addsubadmin1">
              <div>
                <Row className="mt-2">
                  <Col md={6}>
                    <label style={{ fontSize: "16px" }}>
                      Name <span style={{ color: "red" }}>*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    {" "}
                    <input
                      placeholder="Name"
                      onChange={(e) => setname(e.target.value)}
                      style={{
                        border: "1px solid",
                        padding: "2px",
                        borderRadius: "5px",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={6}>
                    <label style={{ fontSize: "16px" }}>
                      Email<span style={{ color: "red" }}>*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    <input
                      placeholder="Email ID"
                      onChange={(e) => setemail(e.target.value)}
                      style={{
                        border: "1px solid",
                        padding: "2px",
                        borderRadius: "5px",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={6}>
                    <label style={{ fontSize: "16px" }}>
                      Contact No.<span style={{ color: "red" }}>*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    {" "}
                    <input
                      placeholder="Contact No."
                      maxlength="10"
                      type="text"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      onChange={(e) => setcontactnum(e.target.value)}
                      style={{
                        border: "1px solid",
                        padding: "2px",
                        borderRadius: "5px",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={6}>
                    <label style={{ fontSize: "16px" }}>
                      Password<span style={{ color: "red" }}>*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    {" "}
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setpassword(e.target.value)}
                      style={{
                        border: "1px solid",
                        padding: "2px",
                        borderRadius: "5px",
                      }}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </Form>
          <div className="addsubadmincheckbox">
            <div>
              <input type="checkbox" onChange={() => setUser(!User)} />
              <label> &nbsp;Employee List</label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => setSalesEntry(!SalesEntry)}
              />
              <label> &nbsp;Sales-Entry</label>
            </div>
            <div>
              <input type="checkbox" onChange={() => setLeaves(!Leaves)} />
              <label> &nbsp;Leaves</label>
            </div>
          </div>
          <div className="addsubadminbtn">
            <Button onClick={(e) => addMember(e)}>Add</Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Createsubadmin;

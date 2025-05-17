import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import axios from "axios";
import exportFromJSON from "export-from-json";

function Subadmindetails() {
  const [data, setdata] = useState([]);
  // const [data1, setdata1] = useState([]);
  const [Slno, setSlno] = useState(1);
  const [show, setShow] = useState(false);
  const [modal, setmodal] = useState({});
  const [modaldataedit, setmodaldataedit] = useState({});
  const [Showedit, setShowedit] = useState(false);

  const [editt, seteditt] = useState(false);

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

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true);
    setmodal(data);
  };

  const handleCloseedit = () => setShowedit(false);
  const handleShowedit = (row) => {
    setShowedit(true);
    setmodaldataedit(row);
  };

  useEffect(() => {
    getallsubadmin();
  }, []);

  useEffect(() => {
    if (modal) {
      setUser(modal.User);
      setLeads(modal.Leads);
      setCreateinvoice(modal.Createinvoice);
      setproduct(modal.product);
      setCustomer(modal.Customer);
      setAssignedleads(modal.Assignedleads);
      setSalesdetails(modal.Salesdetails);
      setVendor(modal.Vendor);
      setPurchaseorder(modal.Purchaseorder);
      setPurchaseEntry(modal.PurchaseEntry);
      setSalesEntry(modal.SalesEntry);
      setStackmaintenance(modal.Stackmaintenance);
      setLeaves(modal.Leaves);
      setAttendance(modal.Attendance);
      setExpense(modal.Expense);
      setCreditDebit(modal.CreditDebit);
      setProfitLoss(modal.ProfitLoss);
    }
  }, [modal]);

  console.log("modaldataedit", modaldataedit, modal, User);

  const getallsubadmin = () => {
    axios
      .get("https://bdmtile.in/api/admin/getallsubadmin")
      .then(function (response) {
        console.log(response.data);
        setdata(response.data.subadmin);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteSubadmin = async (id) => {
    axios({
      method: "post",
      url: "https://bdmtile.in/api/admin/deletesubadmin/" + id,
    })
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };

  const editdetails = async () => {
    try {
      const config = {
        url: "/editsubadmin",
        method: "post",
        baseURL: "https://bdmtile.in/api/admin",
        data: {
          id: modaldataedit._id,
          name: name ? name : modaldataedit.name,
          email: email ? email : modaldataedit.email,
          contactnum: contactnum ? contactnum : modaldataedit.contactnum,
          password: password ? password : modaldataedit.password,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert(res.data.success);
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  const editaccess = async () => {
    try {
      const config = {
        url: "/editsubadminaccess",
        method: "post",
        baseURL: "https://bdmtile.in/api/admin",
        data: {
          id: modal._id,
          User: User,
          Leads: Leads,
          Createinvoice: Createinvoice,
          product: product,
          Customer: Customer,
          Assignedleads: Assignedleads,
          Salesdetails: Salesdetails,
          Vendor: Vendor,
          Purchaseorder: Purchaseorder,
          PurchaseEntry: PurchaseEntry,
          SalesEntry: SalesEntry,
          Stackmaintenance: Stackmaintenance,
          Leaves: Leaves,
          Attendance: Attendance,
          Expense: Expense,
          CreditDebit: CreditDebit,
          ProfitLoss: ProfitLoss,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert(res.data.success);
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  const customTotal = (from, to, size) => {
    setSlno(from);
    return (
      <span className="react-bootstrap-table-pagination-total">
        Showing {from} to {to} of {size} Results
      </span>
    );
  };

  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
  
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: data.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const columns = [
    {
      dataField: "name",
      text: "Name",
      formatter: (value, row) => <p>{row.name ? row.name : ""}</p>,
    },
    {
      dataField: "email",
      text: "Email ID",
      formatter: (value, row) => <p>{row.email ? row.email : ""}</p>,
    },
    {
      dataField: "contactnum",
      text: "Contact No.",
      formatter: (value, row) => <p>{row.contactnum ? row.contactnum : ""}</p>,
    },
    {
      dataField: "Access",
      text: "Access",
      formatter: (value, row) => (
        <button
          onClick={() => handleShow(row)}
          style={{
            padding: "8px 20px",
            fontSize: "15px",
            border: "none",
            backgroundColor: "transparent",
          }}
        >
          <i class="fas fa-eye" style={{ color: "#fc5121" }}></i>
        </button>
      ),
    },
    {
      dataField: "Delete",
      text: "Action",
      formatter: (value, row) => (
        <>
          {/* <button
            className="subadmindelbtn"
            onClick={() => deleteSubadmin(row._id)}
            style={{ padding: "8px 20px", fontSize: "15px" }}
          >
            Delete
          </button> */}
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => handleShowedit(row)}
          >
            <i class="fas fa-pen-nib" style={{ color: "#fc5121" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => deleteSubadmin(row._id)}
          >
            <i class="fas fa-trash" style={{ color: "#fc5121" }}></i>
          </button>
        </>
      ),
    },
  ];

  // if (data1?.length > 0) {
  //   for (let i = 0; i < data1?.length; i++) {
  //     data.push({
  //       Name: data1[i]?.name,
  //       EmailID: data1[i]?.email,
  //       ContactNo: data1[i]?.password,
  //       Assignedleads: data1[i]?.Assignedleads,
  //       Attendance: data1[i]?.Attendance,
  //       Createinvoice: data1[i]?.Createinvoice,
  //       CreditDebit: data1[i]?.CreditDebit,
  //       Customer: data1[i]?.Customer,
  //       Expense: data1[i]?.Expense,
  //       Leads: data1[i]?.Leads,
  //       Leaves: data1[i]?.Leaves,
  //       ProfitLoss: data1[i]?.ProfitLoss,
  //       PurchaseEntry: data1[i]?.PurchaseEntry,
  //       Purchaseorder: data1[i]?.Purchaseorder,
  //       SalesEntry: data1[i]?.SalesEntry,
  //       Salesdetails: data1[i]?.Salesdetails,
  //       Stackmaintenance: data1[i]?.Stackmaintenance,
  //       User: data1[i]?.User,
  //       Vendor: data1[i]?.Vendor,
  //       product: data1[i]?.product,
  //     });
  //   }
  // }

  const exportType = "xls";

  const [fileName, setfileName] = useState("Sub-Admin");

  const ExportToExcel = () => {
    if (fileName) {
      if (data.length != 0) {
        exportFromJSON({ data, fileName, exportType });
        // setfileName("");
      } else {
        alert("There is no data to export");
        // setfileName("");
      }
    } else {
      alert("Enter file name to export");
    }
  };

  return (
    <>
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
          Sub-Admin Details
        </div>

        <Container>
          <div style={{ overflow: "hidden", overflowY: "auto" }}>
            <ToolkitProvider
              keyField="id"
              data={data}
              columns={columns}
              // rowClasses={rowClasses}
              search
              exportCSV
            >
              {(props) => (
                <div>
                  {/* <input
                    id="search-bar-0"
                    type="text"
                    aria-labelledby="search-bar-0-label"
                    class="form-control "
                    placeholder="Search Donate"
                    onChange={handleFilter}
                    style={{
                      borderRadius: "50px",
                      border: "1px solid #ff7d26",
                    }}
                  /> */}
                  <SearchBar {...props.searchProps} />
                  {/* <ExportCSVButton
                    {...props.csvProps}
                    style={{
                      backgroundColor: "#fc5121",
                      color: "white",
                      marginLeft: "590px",
                    }}
                  >
                    Download Excel
                  </ExportCSVButton> */}
                  <button
                    style={{
                      padding: "5px",
                      color: "white",
                      backgroundColor: "#fc5121",
                      border: "none",
                      fontWeight: "600",
                      fontSize: "14px",
                      borderRadius: "10px",
                      margin: "0px 0px 0px 590px",
                    }}
                    onClick={() => ExportToExcel()}
                  >
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      {/* <AiFillFileWord /> */}
                    </span>
                    Download Excel
                  </button>
                  <hr></hr>
                  <br></br>
                  <div style={{ overflowX: "scroll", width: "934px" }}>
                    <BootstrapTable
                      striped
                      hover
                      condensed
                      {...props.baseProps}
                      pagination={paginationFactory(options)}
                    />
                  </div>
                </div>
              )}
            </ToolkitProvider>
          </div>

          <Modal show={show} onHide={handleClose}>
            {!editt ? (
              <>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "#fc5121",
                        color: "white",
                        borderRadius: "3px",
                      }}
                      onClick={() => seteditt(!editt)}
                    >
                      Edit
                    </button>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ alignItems: "center" }}>
                  <Row style={{ margin: "50px" }}>
                    <Col md={8}>
                      <p>Employee List</p>
                      <p>Products</p>
                      <p>Vendor</p>
                      <p>Customer</p>
                      <p>Purchase-Order</p>
                      <p>Purchase-Entry</p>
                      <p>Sales-Entry</p>
                      <p>Stack-Maintenance</p>
                      <p>Leads</p>
                      <p>Create-Invoice</p>
                      <p>Assigned-Leads</p>
                      <p>Sales-Details</p>
                      <p>Leaves</p>
                      <p>Attendance</p>
                      <p>Expense</p>
                      <p>Credit / Debit</p>
                      <p>Profit / Loss</p>
                    </Col>
                    <Col md={4}>
                      <p>
                        {modal.User === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.product === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.Vendor === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.Customer === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.Purchaseorder === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.PurchaseEntry === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.SalesEntry === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.Stackmaintenance === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.Leads === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.Createinvoice === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.Assignedleads === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.Salesdetails === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>

                      <p>
                        {modal.Leaves === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.Attendance === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.Expense === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.CreditDebit === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                      <p>
                        {modal.ProfitLoss === true ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="fas fa-times"></i>
                        )}
                      </p>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    style={{
                      padding: "8px 20px",
                      fontSize: "15px",
                      border: "none",
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "3px",
                      margin: "10px",
                    }}
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </Modal.Footer>
              </>
            ) : (
              <>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ alignItems: "center" }}>
                  <Row>
                    <Col md={8}>
                      <p>Employee List</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={User}
                        onChange={() => setUser(!User)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <p>Products</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={product}
                        onChange={() => setproduct(!product)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <p>Vendor</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={Vendor}
                        onChange={() => setVendor(!Vendor)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <p>Customer</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={Customer}
                        onChange={() => setCustomer(!Customer)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <p>Purchase-Order</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={Purchaseorder}
                        onChange={() => setPurchaseorder(!Purchaseorder)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <p>Purchase-Entry</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={PurchaseEntry}
                        onChange={() => setPurchaseEntry(!PurchaseEntry)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <p>Sales-Entry</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={SalesEntry}
                        onChange={() => setSalesEntry(!SalesEntry)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <p>Stack-Maintenance</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={Stackmaintenance}
                        onChange={() => setStackmaintenance(!Stackmaintenance)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <p>Leads</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={Leads}
                        onChange={() => setLeads(!Leads)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <p>Create-Invoice</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={Createinvoice}
                        onChange={() => setCreateinvoice(!Createinvoice)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <p>Assigned-Leads</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={Assignedleads}
                        onChange={() => setAssignedleads(!Assignedleads)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <p>Sales-Details</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={Salesdetails}
                        onChange={() => setSalesdetails(!Salesdetails)}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={8}>
                      <p>Leaves</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={Leaves}
                        onChange={() => setLeaves(!Leaves)}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={8}>
                      <p>Attendance</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={Attendance}
                        onChange={() => setAttendance(!Attendance)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <p>Expense</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={Expense}
                        onChange={() => setExpense(!Expense)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <p>Credit / Debit</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={CreditDebit}
                        onChange={() => setCreditDebit(!CreditDebit)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <p>Profit / Loss</p>
                    </Col>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        checked={ProfitLoss}
                        onChange={() => setProfitLoss(!ProfitLoss)}
                      />
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    style={{
                      padding: "8px 20px",
                      fontSize: "15px",
                      border: "none",
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "3px",
                      margin: "10px",
                    }}
                    onClick={() => seteditt(!editt)}
                  >
                    Cancel
                  </button>
                  <button
                    style={{
                      padding: "8px 20px",
                      fontSize: "15px",
                      border: "none",
                      backgroundColor: "#fc5121",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "3px",
                      margin: "10px",
                    }}
                    onClick={editaccess}
                  >
                    Update
                  </button>
                </Modal.Footer>
              </>
            )}
          </Modal>

          <Modal
            show={Showedit}
            onHide={handleCloseedit}
            className="modal1111111"
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Details</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: "center" }}>
              <div style={{ display: "grid" }}>
                <Row style={{ margin: "10px" }}>
                  <Col md={6}>
                    <Row>
                      <Col md={6}>
                        <label>Name</label>
                      </Col>
                      <Col md={6}>
                        <input
                          placeholder={modaldataedit.name}
                          onChange={(e) => setname(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Col md={6}>
                        <label>Email ID</label>
                      </Col>
                      <Col md={6}>
                        <input
                          placeholder={modaldataedit.email}
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row style={{ margin: "10px" }}>
                  <Col md={6}>
                    <Row>
                      <Col md={6}>
                        <label>Number</label>
                      </Col>
                      <Col md={6}>
                        <input
                          placeholder={modaldataedit.contactnum}
                          onChange={(e) => setcontactnum(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Col md={6}>
                        <label>Password</label>
                      </Col>
                      <Col md={6}>
                        <input
                          placeholder={modaldataedit.password}
                          onChange={(e) => setpassword(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                style={{
                  padding: "8px 20px",
                  fontSize: "15px",
                  border: "none",
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  margin: "10px",
                }}
                onClick={handleCloseedit}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: "8px 20px",
                  fontSize: "15px",
                  border: "none",
                  backgroundColor: "#fc5121",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  margin: "10px",
                }}
                onClick={editdetails}
              >
                Update
              </button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </>
  );
}

export default Subadmindetails;

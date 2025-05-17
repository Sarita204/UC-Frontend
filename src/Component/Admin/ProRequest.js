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
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Select, Option } from "@material-tailwind/react";
import parse from "html-react-parser";

const ProRequest = () => {
  //   //get for pro request
  const [data, setdata] = useState([]);
  const getProrequest = () => {
    axios
      .get("https://coorgtour.in/api/User/getProrequest")
      .then(function (res) {
        setdata(res.data.success);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [PName, setPName] = useState("");
  const [PEmail, setPEmail] = useState("");
  const [PNumber, setPNumber] = useState("");
  const [PType, setPType] = useState("");
  const [PMessage, setPMessage] = useState("");
  const [PName1, setPName1] = useState("");
  const [PEmail1, setPEmail1] = useState("");
  const [PNumber1, setPNumber1] = useState("");
  const [PType1, setPType1] = useState("");
  const [PMessage1, setPMessage1] = useState("");

  const addProrequest = async () => {
    if (!PName || !PEmail || !PNumber || !PMessage || !PType) {
      return alert("Please fill all the fields");
    }
    try {
      const config = {
        url: "/addProrequest",
        method: "post",
        baseURL: "https://coorgtour.in/api/User",
        data: {
          PName: PName,
          PEmail: PEmail,
          PNumber: PNumber,
          PType: PType,
          PMessage: PMessage,
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

  const [show4, setShow4] = useState(false);

  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const [editdata, seteditdata] = useState({});
  console.log(editdata, "wijgoejri");
  const editProrequest = async () => {
    try {
      const config = {
        url: "/editProrequest",
        method: "put",
        baseURL: "https://coorgtour.in/api/User",
        data: {
          id: editdata?._id,
          PName: PName1,
          PEmail: PEmail1,
          PNumber: PNumber1,
          PType: PType1,
          PMessage: PMessage1,
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

  const deleteProrequest = async (id) => {
    axios({
      method: "delete",
      url: "https://coorgtour.in/api/User/deleteProrequest/" + id,
    })
      .then(function (response) {
        window.location.reload();
        alert(response.data.success);
      })
      .catch(function (error) {
        console.log(error.response.data.error);
      });
  };

  const Input = styled("input")({
    display: "none",
  });

  const [Slno, setSlno] = useState(1);

  const customTotal = (from, to, size) => {
    setSlno(from);
    return (
      <></>
      // <span className="react-bootstrap-table-pagination-total">
      //   Showing {from} to {to} of {size} Results
      // </span>
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
        text: "15",
        value: 15,
      },
      {
        text: "All",
        value: data.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  const columns8 = [
    {
      dataField: "PName",
      text: "Name",
      formatter: (value, row) => <p>{row.PName ? row.PName : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },

    {
      dataField: "PEmail",
      text: "Email",
      formatter: (value, row) => <p>{row?.PEmail ? row?.PEmail : ""}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "300px",
      },
    },

    {
      dataField: "PNumber",
      text: "Phone Number",
      formatter: (value, row) => <p>{row?.PNumber ? row?.PNumber : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },

    {
      dataField: "PType",
      text: "Type",
      formatter: (value, row) => <p>{row?.PType ? row?.PType : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },

    {
      dataField: "PMessage",
      text: "Message",
      formatter: (value, row) => <p>{row?.PMessage ? row?.PMessage : ""}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "200px",
      },
    },

    {
      dataField: "Delete",
      text: "Action",
      formatter: (value, row) => (
        <>
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => {
              seteditdata(row);
              handleShow4();
            }}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => deleteProrequest(row._id)}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
  ];

  useEffect(() => {
    getProrequest();
  }, []);

  return (
    <div>
      <div style={{ paddingLeft: "30px" }}>
        <div
          style={{
            backgroundColor: "white",
            fontWeight: 600,
            padding: "22px",
            fontSize: "22px",
            color: "#080874 ",
          }}
        >
          Pro Request
        </div>

        <Container>
          <div style={{ overflow: "hidden", overflowY: "auto" }}>
            <ToolkitProvider
              keyField="id"
              data={data}
              columns={columns8}
              // rowClasses={rowClasses}
              search
              exportCSV
            >
              {(props) => (
                <div>
                  {/* <SearchBar {...props.searchProps} /> */}
                  <div></div>
                  <Button
                    onClick={() => setShow(true)}
                    style={{
                      right: "20px",
                      position: "absolute",
                      top: "20%",
                    }}
                  >
                    + Add Pro Request
                  </Button>

                  <hr></hr>
                  <br></br>
                  <div style={{ overflowX: "scroll" }}>
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

          <Modal show={show} onHide={handleClose} className="modal1111111">
            <Modal.Header closeButton>
              <Modal.Title
                style={{
                  fontWeight: 600,
                  fontSize: "22px",
                  color: "#080874 ",
                }}
              >
                Add Pro Request
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: "center" }}>
              <div>
                <div className="add-pick mb-2">
                  <label>Name</label>
                  <br />
                  <input
                    type="text"
                    placeholder=" Enter your Name"
                    onChange={(e) => setPName(e.target.value)}
                  />
                </div>
                <div className="add-pick mb-2">
                  <label>Phone Number</label>
                  <br />
                  <input
                    type="text"
                    placeholder=" Enter your Phone Number"
                    onChange={(e) => setPNumber(e.target.value)}
                  />
                </div>
                <div className="add-pick mb-2">
                  <label>E-Mail ID</label>
                  <br />
                  <input
                    type="text"
                    placeholder=" Enter your E-mail Id"
                    onChange={(e) => setPEmail(e.target.value)}
                  />
                </div>
                <div className="col-lg-12 mb-3">
                  <label>Looking for :</label>
                  <select
                    className="form-control"
                    onChange={(e) => setPType(e.target.value)}
                  >
                    <option>Select Job Type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                </div>
                <div className="col-lg-12 mb-3">
                  <label className="fw-bold">Message :</label>
                  <textarea
                    className="form-control"
                    placeholder="Tell Us Why You want to be a Pro.."
                    id="floatingTextarea"
                    onChange={(e) => setPMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant=""
                style={{
                  border: "1px solid #080874 ",
                  color: "#080874",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button onClick={addProrequest}>Add</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={show4} onHide={handleClose4} className="modal1111111">
            <Modal.Header closeButton>
              <Modal.Title
                style={{
                  fontWeight: 600,
                  fontSize: "22px",
                  color: "#080874 ",
                }}
              >
                Edit Pro Request
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: "center" }}>
              <div>
                <div className="add-pick mb-2">
                  <label>Name</label>
                  <br />
                  <input
                    type="text"
                    placeholder={editdata?.PName}
                    onChange={(e) => setPName1(e.target.value)}
                  />
                </div>
                <div className="add-pick mb-2">
                  <label>Phone Number</label>
                  <br />
                  <input
                    type="text"
                    placeholder={editdata?.PNumber}
                    onChange={(e) => setPNumber1(e.target.value)}
                  />
                </div>
                <div className="add-pick mb-2">
                  <label>E-Mail ID</label>
                  <br />
                  <input
                    type="text"
                    placeholder={editdata?.PEmail}
                    onChange={(e) => setPEmail1(e.target.value)}
                  />
                </div>
                <div className="col-lg-12 mb-3">
                  <label>Looking for :</label>
                  <select
                    className="form-control"
                    onChange={(e) => setPType1(e.target.value)}
                  >
                    <option>Select Job Type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                </div>
                <div className="col-lg-12 mb-3">
                  <label className="fw-bold">Message :</label>
                  <textarea
                    className="form-control"
                    placeholder={editdata?.PMessage}
                    id="floatingTextarea"
                    onChange={(e) => setPMessage1(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant=""
                style={{
                  border: "1px solid #080874 ",
                  color: "#080874",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button onClick={editProrequest}>Update</Button>
            </Modal.Footer>
          </Modal>

          {/* <Modal
                        show={editshow}
                        onHide={handleeditClose}
                        className="modal1111111"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title
                                style={{
                                    fontWeight: 600,
                                    fontSize: "22px",
                                    color: "#080874 ",
                                }}
                            >
                                Edit Pro Request
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ alignItems: "center" }}>
                            <div>
                                <div className="add-pick mb-2">
                                    <label>Name</label>
                                    <br />
                                    <input
                                        type="text"
                                        placeholder=" Enter your Name"
                                        // value={name}
                                    />
                                </div>
                                <div className="add-pick mb-2">
                                    <label>Phone Number</label>
                                    <br />
                                    <input
                                        type="text"
                                        placeholder=" Enter your Phone Number"
                                        // value={name}
                                    />
                                </div>
                                <div className="add-pick mb-2">
                                    <label>E-Mail ID</label>
                                    <br />
                                    <input
                                        type="text"
                                        placeholder=" Enter your E-mail Id"
                                        // value={name}
                                    />
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <label>Looking for :</label>
                                    <select className="form-control">
                                        <option>Select Job Type</option>
                                        <option>Full Time</option>
                                        <option>Part Time</option>
                                    </select>
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <label className="fw-bold">Message :</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Tell Us Why You want to be a Pro.."
                                        id="floatingTextarea"
                                    ></textarea>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="" style={{
                                border: "1px solid #080874 ",
                                color: "#080874",
                            }} onClick={handleeditClose}>
                                Cancel
                            </Button>
                            <Button onClick={handleeditClose}>Update</Button>
                        </Modal.Footer>
                    </Modal> */}
        </Container>
      </div>
    </div>
  );
};

export default ProRequest;

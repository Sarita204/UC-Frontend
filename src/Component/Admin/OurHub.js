import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Modal,
  Row,
  Table,
  Form,
} from "react-bootstrap";
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
import { FaSearch } from "react-icons/fa"

const OurHub = () => {
  const Input = styled("input")({
    display: "none",
  });
  const formdata = new FormData();

  const [tagline, settagline] = useState("");
  const [url, seturl] = useState("");

  const [img, setimg] = useState("");
  const [tagline1, settagline1] = useState("");
  const [url1, seturl1] = useState("");
  const [img1, setimg1] = useState();
  const [Slno, setSlno] = useState(1);
  const [data, setdata] = useState([]);

  const [pagenumber, setPagenumber] = useState(1);
  console.log("pagenumber", pagenumber);

  const [hub, sethub] = useState([]);
  const getCreatehub = () => {
    axios
      .get("https://coorgtour.in/api/admin/getCreatehub")
      .then(function (response) {
        sethub(response.data.Createhub);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [Pincode, setPincode] = useState([]);
  const getPincode = () => {
    axios
      .get("https://coorgtour.in/api/admin/getPincode")
      .then(function (response) {
        setPincode(response.data.Pincode);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [editshow, seteditShow] = useState(false);
  const [editdata, seteditdata] = useState({});
  const handleeditClose = () => seteditShow(false);
  const handleeditShow = (row) => {
    seteditShow(true);
    seteditdata(row);
  };

  // delete modal
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = (row) => {
    setShow1(true);
    seteditdata(row);
  };

  useEffect(() => {
    getOurhub();
    getCreatehub();
    getPincode();
  }, []);

  const [name, setname] = useState("");
  const [pincodeid, setpincodeid] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [area, setarea] = useState("");
  const [pincode, setpincode] = useState("");
  const [name1, setname1] = useState("");
  const [state1, setstate1] = useState("");
  const [city1, setcity1] = useState("");
  const [area1, setarea1] = useState("");
  const [pincode1, setpincode1] = useState("");

  const addOurhub = async () => {
    if (!name) {
      return alert("Please select Hub ")
    }
    if (!pincodeid) {
      return alert("Please select pincode ")
    }
    try {
      const config = {
        url: "/addOurhub",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        header: "Content-type:application/json",
        data: {
          name: name,
          // state: state,
          // city: city,
          // area: area,
          pincodeid: pincodeid,
          pincode: pincode,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          handleClose();
          getOurhub();
          alert("Details Added");
          setname("");
          setpincodeid("");
          setpincode("");
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  const editOurhub = async () => {
    try {
      const config = {
        url: "/editOurhub",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        data: {
          id: editdata?._id,
          name: name1,
          pincodeid: pincodeid,
          pincode: pincode1,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert("Details updated");
          window.location.reload();
          setname1("");
          setstate1("");
          setpincodeid("");
          setcity1("");
          setarea("");
          setpincode1("");
          getOurhub();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  const getOurhub = () => {
    axios
      .get("https://coorgtour.in/api/admin/getOurhub")
      .then(function (response) {
        setdata(response.data.Ourhub);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteOurhub = async () => {
    axios
      .delete("https://coorgtour.in/api/admin/deleteOurhub/" + editdata?._id)
      .then(function (response) {
        getOurhub();
        handleClose1();
        alert(response.data.Success);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

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
    ],
    // A numeric array is also available. the purpose of above example is custom the text
  };

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const columns = [
    {
      dataField: "name",
      text: "Hub Name",
      formatter: (value, row) => <p>{row.name ? row.name : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "pincode",
      text: "Pincode",
      formatter: (value, row) => <p>{row.pincode ? row.pincode : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },

    {
      dataField: "state",
      text: "State",
      formatter: (value, row) => (
        <p>{row?.pincodeid?.state ? row?.pincodeid?.state : ""}</p>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },

    {
      dataField: "city",
      text: "City",
      formatter: (value, row) => (
        <p>{row?.pincodeid?.city ? row?.pincodeid?.city : ""}</p>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },

    {
      dataField: "area",
      text: "Area",
      formatter: (value, row) => (
        <p>{row?.pincodeid?.area ? row?.pincodeid?.area : ""}</p>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },

    {
      dataField: "Delete",
      text: "Action",
      formatter: (value, row) => (
        <>
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => {
              getOurhub(row);
              handleeditShow(row);
            }}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => {
              getOurhub(row);
              handleShow1(row);
            }}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
  ];

  // console.log("data", data);
  return (
    <div style={{ paddingLeft: "30px" }}>
      <div
        style={{
          backgroundColor: "white",
          fontWeight: 600,
          padding: "22px",
          fontSize: "22px",
          color: "#080874",
        }}
      >
        Our Hub
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
                <div className="d-flex">
                  <SearchBar {...props.searchProps} style={{ width: "300px" }} />
                  <FaSearch style={{ position: "absolute", marginTop: "14px", marginLeft: "-28px" }} />
                  &nbsp;
                  <Button
                    variant=""
                    onClick={() => setShow(true)}
                    style={{
                      right: "20px",
                      position: "absolute",
                      background: "#080874 ",
                      color: "white",
                    }}
                  >
                    + Add Our Hub
                  </Button>
                </div>

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

        {/* add the hub */}
        <Modal show={show} onHide={handleClose} className="modal1111111">
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontWeight: 600,
                fontSize: "22px",
                color: "#080874 ",
              }}
            >
              Add Our Hubs
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="urban-o mb-2">
                <label>Select Hub Name</label>
                <br />
                <select
                  className="form-control"
                  onChange={(e) => setname(e.target.value)}
                >
                  <option>--select the hub--</option>
                  {hub?.map((item) => {
                    return <option value={item?.name}>{item?.name}</option>;
                  })}
                </select>
              </div>

              <div className="urban-o mb-2">
                <label>Enter Pincode</label>
                <br />
                <select
                  className="form-control"
                  onChange={(e) => {
                    setpincodeid(JSON.parse(e.target.value)?._id);
                    setpincode(JSON.parse(e.target.value)?.pincode);
                  }}
                >
                  <option>--select the pincode--</option>
                  {Pincode?.map((item) => {
                    return (
                      <option value={JSON.stringify(item)}>
                        {item?.pincode}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              style={{
                border: "1px solid #080874 ",
                color: "#080874",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant=""
              onClick={addOurhub}
              style={{
                background: "#080874 ",
                color: "white",
              }}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>

        {/* edit hub */}
        <Modal
          show={editshow}
          onHide={handleeditClose}
          className="modal1111111"
        >
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontWeight: 600,
                fontSize: "22px",
                color: "#080874",
              }}
            >
              Edit Our Hub
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="urban-o mb-2">
                <label>Select Hub Name</label>
                <br />
                <select
                  className="form-control"
                  onChange={(e) => setname1(e.target.value)}
                >
                  <option>--select the hub--</option>
                  {hub?.map((item) => {
                    return <option value={item?.name}>{item?.name}</option>;
                  })}
                </select>
              </div>

              <div className="urban-o mb-2">
                <label>Enter Pincode</label>
                <br />
                <select
                  className="form-control"
                  onChange={(e) => {
                    setpincodeid(JSON.parse(e.target.value)?._id);
                    setpincode1(JSON.parse(e.target.value)?.pincode);
                  }}
                >
                  {Pincode?.map((item) => {
                    return (
                      <option value={JSON.stringify(item)}>
                        {item?.pincode}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              onClick={handleeditClose}
              style={{
                border: "1px solid #080874 ",
                color: "#080874",
              }}
            >
              Cancel
            </Button>
            <Button
              variant=""
              onClick={() => editOurhub(editdata)}
              style={{
                background: "#080874 ",
                color: "white",
              }}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* delete hub */}
        <Modal show={show1} onHide={handleClose1} className="modal1111111">
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontWeight: 600,
                fontSize: "22px",
                color: "#080874",
              }}
            >
              Delete Our Hub
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <h4>
                Are you sure, You want to{" "}
                <span style={{ color: "red" }}>DELETE</span> details:{" "}
              </h4>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              onClick={handleClose1}
              style={{
                border: "1px solid #080874 ",
                color: "#080874",
              }}
            >
              Cancel
            </Button>
            <Button
              variant=""
              onClick={() => deleteOurhub()}
              style={{
                background: "red ",
                color: "white",
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default OurHub;

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
// import IndianCities from "indian-cities"
import { State, City } from "country-state-city";
import { FaSearch } from "react-icons/fa";

const PincodeList = () => {
  const Input = styled("input")({
    display: "none",
  });

  const formdata = new FormData();
  const [name, setname] = useState("");
  const [name1, setname1] = useState("");
  const [tagline, settagline] = useState("");

  const [Slno, setSlno] = useState(1);
  const [data, setdata] = useState([]);

  const [state, setState] = useState("");
  const [state1, setState1] = useState("");
  const [city, setcity] = useState("");
  const [city1, setcity1] = useState("");
  const [area, setarea] = useState("");
  const [area1, setarea1] = useState("");
  const [pincode, setpincode] = useState("");
  const [pincode1, setpincode1] = useState("");

  const [pagenumber, setPagenumber] = useState(1);
  console.log("pagenumber", pagenumber);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [editshow, seteditShow] = useState(false);
  const [editdata, seteditdata] = useState({});
  const handleeditClose = () => seteditShow(false);
  const handleeditShow = (row) => {
    seteditShow(true);
    seteditdata(row);
  };

  const [StateCodeVal, setStateCodeVal] = useState("");
  const [StateNameVal, setStateNameVal] = useState("");
  const [CityNameVal, setCityNameVal] = useState("");

  const getPincode = () => {
    axios
      .get("https://coorgtour.in/api/admin/getPincode")
      .then(function (response) {
        setdata(response.data.Pincode);

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPincode();
  }, []);





  const addPincode = async () => {
    if (!StateCodeVal) {
      return alert("Please select State");
    }
    if (!CityNameVal) {
      return alert("Please select City");
    }
    if (!area) {
      return alert("Area name is required !");
    }
    if (!pincode) {
      return alert("Pincode required !");
    }
    if (pincode.length !== 6) {
      return alert("Pincode 6 digits required !");
    }
    try {
      const config = {
        url: "/addPincode",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        header: { "Content-type": "application/json" },
        data: {
          state: StateNameVal,
          city: CityNameVal,
          area: area,
          pincode: pincode,
        },
      };

      await axios(config).then(function (res) {
        if (res.status == 200) {
          alert("Details Added");
          setStateCodeVal("");
          setStateNameVal("");
          setCityNameVal("");
          setarea("");
          setarea1("");
          setpincode("");
          setpincode1("");
          handleClose();
          setState("");
          getPincode();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  const [update, setUpdate] = useState("");
  const editPincode = async () => {
    try {
      const config = {
        url: "/editPincode",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        headers: { "Content-type": "application/json" },
        data: {
          id: update?._id,
          state: state1,
          city: city1,
          area: area1,
          pincode: pincode1,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert("Details Updated");

          handleeditClose();
          setState1("");
          setcity1("");
          setarea1("");
          setpincode1("");
          getPincode();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  // delete modal
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const deletePincode = async () => {
    axios
      .delete("https://coorgtour.in/api/admin/deletePincode/" + update?._id)
      .then(function (response) {
        getPincode();
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
      dataField: "state",
      text: "State",
      formatter: (value, row) => <p>{row.state ? row.state : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "city",
      text: "City",
      formatter: (value, row) => <p>{row.city ? row.city : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },

    {
      dataField: "area",
      text: "Area",
      formatter: (value, row) => <p>{row.area ? row.area : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "pincode",
      text: "Pincode",
      formatter: (value, row) => <p>{row.pincode ? row.pincode : ""}</p>,
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
              setUpdate(row);
              handleeditShow(row);
            }}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => {
              setUpdate(row);
              setShow1(true);
            }}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
  ];

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
        Pin Code
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
                  <FaSearch style={{ position: "absolute", marginTop: "14px", marginLeft: "270px" }} />
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
                    + Add Pin Code
                  </Button>
                </div>

                <hr></hr>
                <br></br>
                <div
                  style={{
                    overflowX: "scroll",
                  }}
                >
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
              Add Pin Code
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="urban-o mb-2">
                <label>Select State</label>
                <br />

                <select
                  onChange={(e) => {
                    setStateCodeVal(JSON.parse(e.target.value)?.isoCode);
                    setStateNameVal(JSON.parse(e.target.value)?.name);
                  }}
                  style={{
                    padding: "8px",
                    border: "2px solid #DEE2E6",
                    borderRadius: "5px",
                  }}
                >
                  {State.getAllStates()
                    ?.filter((data) => data?.countryCode === "IN")
                    ?.map((statename) => {
                      return (
                        <option value={JSON.stringify(statename)}>
                          {statename?.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="urban-o mb-2">
                <label>Select City</label>
                <br />

                <select
                  style={{
                    padding: "8px",
                    border: "2px solid #DEE2E6",
                    borderRadius: "5px",
                  }}
                  onChange={(e) => {
                    setCityNameVal(JSON.parse(e.target.value)?.name);
                  }}
                >
                  {City?.getAllCities()
                    ?.filter(
                      (data) =>
                        data?.countryCode === "IN" &&
                        data?.stateCode === StateCodeVal
                    )
                    ?.map((cityname) => {
                      return (
                        <option value={JSON.stringify(cityname)}>
                          {cityname?.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="urban-o mb-2">
                <label>Enter Area</label>
                <br />

                <input
                  placeholder="Enter the area"
                  onChange={(e) => setarea(e.target.value)}
                />
              </div>

              <div className="urban-o mb-2">
                <label>Enter Pincode</label>
                <br />

                <input
                  type="number"
                  placeholder="Enter the pincode"
                  onChange={(e) => setpincode(e.target.value)}
                />
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
              onClick={addPincode}
              style={{
                background: "#080874 ",
                color: "white",
              }}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>

        {/* edit modal */}
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
              Edit Pin Code
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="urban-o mb-2">
                <label>Select State</label>
                <br />

                <select
                  onChange={(e) => {
                    setStateCodeVal(JSON.parse(e.target.value)?.isoCode);
                    setState1(JSON.parse(e.target.value)?.name);
                  }}
                  style={{
                    padding: "8px",
                    border: "2px solid #DEE2E6",
                    borderRadius: "5px",
                  }}
                >
                  {State.getAllStates()
                    ?.filter((data) => data?.countryCode === "IN")
                    ?.map((statename) => {
                      return (
                        <option value={JSON.stringify(statename)}>
                          {statename?.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="urban-o mb-2">
                <label>Select City</label>
                <br />

                <select
                  style={{
                    padding: "8px",
                    border: "2px solid #DEE2E6",
                    borderRadius: "5px",
                  }}
                  onChange={(e) => {
                    setcity1(JSON.parse(e.target.value)?.name);
                  }}
                >
                  {City?.getAllCities()
                    ?.filter(
                      (data) =>
                        data?.countryCode === "IN" &&
                        data?.stateCode === StateCodeVal
                    )
                    ?.map((cityname) => {
                      return (
                        <option value={JSON.stringify(cityname)}>
                          {cityname?.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="urban-o mb-2">
                <label>Enter Area</label>
                <br />

                <input
                  placeholder={editdata?.area}
                  onChange={(e) => setarea1(e.target.value)}
                />
              </div>

              <div className="urban-o mb-2">
                <label>Enter Pincode</label>
                <br />

                <input
                  placeholder={editdata?.pincode}
                  onChange={(e) => setpincode1(e.target.value)}
                />
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
              onClick={() => editPincode(editdata)}
              style={{
                background: "#080874 ",
                color: "white",
              }}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* delete modal */}
        <Modal show={show1} onHide={handleClose1} className="modal1111111">
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontWeight: 600,
                fontSize: "22px",
                color: "#080874",
              }}
            >
              Delete Details
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
              onClick={() => deletePincode()}
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

export default PincodeList;

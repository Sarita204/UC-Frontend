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
import { FaSearch } from "react-icons/fa";

const CreateHub = () => {
  const Input = styled("input")({
    display: "none",
  });
  const formdata = new FormData();
  const [name, setname] = useState("");

  const [name1, setname1] = useState("");
  const [tagline1, settagline1] = useState("");
  const [url1, seturl1] = useState("");
  const [img1, setimg1] = useState();
  const [Slno, setSlno] = useState(1);
  const [data, setdata] = useState([]);

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
  const getCreatehub = () => {
    axios
      .get("https://coorgtour.in/api/admin/getCreatehub")
      .then(function (response) {
        setdata(response.data.Createhub);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getCreatehub();
  }, []);

  const addCreatehub = async () => {
    if (!name) {
      return alert("Please enter the name");
    }
    try {
      const config = {
        url: "/addCreatehub",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        header: "Content-type:application/json",
        data: {
          name: name,

        },
      };
      await axios(config).then(function (res) {
        if (res.status == 200) {
          alert("Details Added");
          handleClose();
          setname("");
          getCreatehub();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  const [update, setUpdate] = useState("");
  const editCreatehub = async () => {
    try {
      const config = {
        url: "/editCreatehub",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        headers: { "Content-type": "application/json" },
        data: {
          id: update?._id,
          name: name1,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert("Details Added");
          handleeditClose();
          setname1("");
          getCreatehub();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  const deleteCreatehub = async (id) => {
    axios({
      method: "post",
      url: "https://coorgtour.in/api/admin/deleteCreatehub/" + id,
    })
      .then(function (response) {
        window.location.reload();
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
      text: "Sl.No",
      formatter: (value, row, i) => <p>{i + 1}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "name",
      text: "Hub Name",
      formatter: (value, row) => <p>{row.name ? row.name : ""}</p>,
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
            onClick={() => deleteCreatehub(row._id)}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
  ];

  console.log("data", data);
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
        Create Hub
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
                    + Create Hub
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

        {/* add modal */}
        <Modal show={show} onHide={handleClose} className="modal1111111">
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontWeight: 600,
                fontSize: "22px",
                color: "#080874 ",
              }}
            >
              Create Hub
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="urban-o mb-2">
                <label>Hub Name</label>
                <br />

                <input
                  placeholder="Hub Name"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              {/* <div className="urban-o mb-2">
                <label>Pincode</label>
                <br />

                <input
                  placeholder="Hub Name"
                  onChange={(e) => setname(e.target.value)}
                />
              </div> */}
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
              onClick={addCreatehub}
              style={{
                background: "#080874 ",
                color: "white",
              }}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>

        {/* edit madal  */}
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
              Edit Hub
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="urban-o mb-2">
                <label>Hub Name</label>
                <br />

                <input
                  placeholder={editdata?.name}
                  onChange={(e) => setname1(e.target.value)}
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
              onClick={() => editCreatehub(editdata)}
              style={{ background: "#080874 ", color: "white" }}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default CreateHub;

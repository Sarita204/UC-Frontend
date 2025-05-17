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

const StaticCount = () => {
  const [Contact, setContact] = useState(true);
  const [Faq, setFaq] = useState("");
  const [Social, setSocial] = useState("");

  const Input = styled("input")({
    display: "none",
  });

  const [Counts, setCounts] = useState("");
  const [Counts1, setCounts1] = useState("");
  const [Text, setText] = useState("");
  const [Text1, setText1] = useState("");

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

  useEffect(() => {
    getCounts();
  }, []);

  const addCounts = async () => {
    try {
      const config = {
        url: "/addCounts",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        data: {
          Counts: Counts,
          Text: Text,
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

  const editCounts = async () => {
    try {
      const config = {
        url: "/editCounts",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        data: {
          id: editdata?._id,
          Counts: (Counts1 ? Counts1 : editdata?.Counts),
          Text: (Text1 ? Text1 : editdata?.Text),
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert("Details Updated");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  const getCounts = () => {
    axios
      .get("https://coorgtour.in/api/admin/getCounts")
      .then(function (response) {
        setdata(response.data.getCounts);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteCounts = async (id) => {
    axios({
      method: "delete",
      url: "https://coorgtour.in/api/admin/deleteCounts/" + id,
    })
      .then(function (response) {
        window.location.reload();
        alert(response.data.success);
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
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  const columns4 = [

    {
      dataField: "Text",
      text: "Title",
      formatter: (value, row) => (
        <p>
          {parse(`<div>${row?.Text}</div>`)
            ? parse(`<div>${row?.Text}</div>`)
            : ""}
        </p>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "Counts",
      text: "Count",
      formatter: (value, row) => (
        <p>
          {parse(`<div>${row?.Counts}</div>`)
            ? parse(`<div>${row?.Counts}</div>`)
            : ""}
        </p>
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
              seteditdata(row);
              handleeditShow(row);
            }}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => deleteCounts(row._id)}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
  ];

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
          Counts
        </div>

        <Container>
          <div style={{ overflow: "hidden", overflowY: "auto" }}>
            <ToolkitProvider
              keyField="id"
              data={data}
              columns={columns4}
              // rowClasses={rowClasses}
              search
              exportCSV
            >
              {(props) => (
                <div>
                  {/* <SearchBar {...props.searchProps} /> */}
                  <div></div>
                  {data?.length !== 4 ? (<>
                    <Button
                      onClick={() => setShow(true)}
                      style={{
                        right: "20px",
                        position: "absolute",
                        top: "20%",
                      }}
                    >
                      + Add Counts
                    </Button>
                  </>) : (<>
                  </>)}


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
                Add Counts
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: "center" }}>
              <div>
                <div className="add-pick mb-2">
                  <label>Count</label>
                  <br />
                  <input
                    type="text"
                    placeholder="enter the count"
                    //   accept="image/x-png,image/gif,image/jpeg,image/jpg"
                    onChange={(e) => setCounts(e.target.value)}
                  />
                </div>
                <div className="add-pick mb-2">
                  <label>Title</label>
                  <br />
                  <input
                    type="text"
                    placeholder="enter the title"
                    //   accept="image/x-png,image/gif,image/jpeg,image/jpg"
                    onChange={(e) => setText(e.target.value)}
                  />
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
              <Button onClick={addCounts}>Add</Button>
            </Modal.Footer>
          </Modal>

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
                  color: "#080874 ",
                }}
              >
                Edit Counts
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: "center" }}>
              <div>
                <div className="add-pick mb-2">
                  <label>Count</label>
                  <br />
                  <input
                    type="text"
                    placeholder={editdata?.Counts}
                    //   accept="image/x-png,image/gif,image/jpeg,image/jpg"
                    onChange={(e) => setCounts1(e.target.value)}
                  />
                </div>
                <div className="add-pick mb-2">
                  <label>Title</label>
                  <br />
                  <input
                    type="text"
                    placeholder={editdata?.Text}
                    //   accept="image/x-png,image/gif,image/jpeg,image/jpg"
                    onChange={(e) => setText1(e.target.value)}
                  />
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
                onClick={handleeditClose}
              >
                Cancel
              </Button>
              <Button onClick={editCounts}>Update</Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </div>
  );
};

export default StaticCount;

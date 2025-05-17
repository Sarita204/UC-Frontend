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

const Trusted = () => {

    const [Contact, setContact] = useState(true);
    const [Faq, setFaq] = useState("");
    const [Social, setSocial] = useState("");


    const Input = styled("input")({
        display: "none",
    });
    const formdata = new FormData();

    const [img, setimg] = useState("");
    const [img1, setimg1] = useState();

    const [Slno, setSlno] = useState(1);

    const [data, setdata] = useState([]);
  
    const [pagenumber, setPagenumber] = useState(1)
    console.log("pagenumber", pagenumber)
  
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
      getTrusted();
    }, []);
  
    const addTrusted= async () => {
    if (!img) {
        alert("Please Select the Image");
      } else {
        formdata.append("img", img);
        try {
          const config = {
            url: "/addTrusted",
            method: "post",
            baseURL: "https://coorgtour.in/api/admin",
            data: formdata,
          };
          await axios(config).then(function (res) {
            if ((res.status = 200)) {
              alert("Details Added");
              window.location.reload();
            }
          });
        } catch (error) {
          console.log(error);
          alert("Unable to add Details");
        }
      }
    };
  
    const editTrusted = async () => {
      formdata.append("id", editdata?._id);
      formdata.append("img", img1 ? img1 : editdata?.img);
      try {
        const config = {
          url: "/editTrusted",
          method: "post",
          baseURL: "https://coorgtour.in/api/admin",
          data: formdata,
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
  
    const getTrusted = () => {
      axios
        .get("https://coorgtour.in/api/admin/getTrusted")
        .then(function (response) {
          setdata(response.data.Trusted);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
    const deleteTrusted = async (id) => {
      axios({
        method: "post",
        url: "https://coorgtour.in/api/admin/deleteTrusted/" + id,
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
        ], // A numeric array is also available. the purpose of above example is custom the text
    };

    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;

    const columns4 = [
        {
            dataField: "img",
            text: "Image",
            formatter: (value, row) => (
                <img
                    src={"https://coorgtour.in/Trusted/" + row?.img}
                    alt=""
                    width="50px"
                    height="50px"
                    onClick={() =>
                        window.open("https://coorgtour.in/Trusted/" + row?.img)
                    }
                />
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
                            handleeditShow(row)
                        }}
                    >
                        <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
                    </button>
                    /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => deleteTrusted(row._id)}
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
                    Trusted
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
                                    <Button
                                        onClick={() => setShow(true)}
                                        style={{
                                            right: "20px",
                                            position: "absolute",
                                            top: "20%"
                                        }}
                                    >
                                        + Add Trusted
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
                                Add Trusted
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ alignItems: "center" }}>
                            <div>
                                <div className="add-pick mb-2">
                                    <label>Select Image</label>
                                    <br />
                                    <input
                                        type="file"
                                        accept="image/x-png,image/gif,image/jpeg,image/jpg"
                                        style={{ border: "none" }}
                                      onChange={(e) => setimg(e.target.files[0])}
                                    />
                                </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="" style={{
                            border: "1px solid #080874 ",
                            color: "#080874",
                        }} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={addTrusted}>Add</Button>
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
                            Edit  Trusted
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ alignItems: "center" }}>
                        <div>
                        <div>
                                <div className="add-pick mb-2">
                                    <label>Select Image</label>
                                    <br />
                                    <input
                                        type="file"
                                        accept="image/x-png,image/gif,image/jpeg,image/jpg"
                                        style={{ border: "none" }}
                                      onChange={(e) => setimg1(e.target.files[0])}
                                    />
                                </div>
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
                        <Button onClick={editTrusted}>Update</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
        </div >
    )
}

export default Trusted;

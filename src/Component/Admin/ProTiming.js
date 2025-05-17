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

const ProTiming = () => {

    const [Contact, setContact] = useState(true);
    const [Faq, setFaq] = useState("");
    const [Social, setSocial] = useState("");


    const Input = styled("input")({
        display: "none",
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
  
    const [editshow, seteditShow] = useState(false);
    const [editdata, seteditdata] = useState({});
    const handleeditClose = () => seteditShow(false);
    const handleeditShow = (row) => {
      seteditShow(true);
      seteditdata(row);
    };

    const [data,setdata] = useState([]);
    const getprotiming = () => {
      axios
        .get("https://coorgtour.in/api/admin/getProtiming")
        .then(function (response) {
          setdata(response.data.Protiming);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
    useEffect(() => {
        getprotiming();
    }, []);
  

    const [name,setname] = useState("");
    const [namee,setnamee] = useState("");
    const [name1,setname1] = useState("");
    const [namee1,setnamee1] = useState("");
    const addprotiming = async () => {
     
        try {
          const config = {
            url: "/addProtiming",
            method: "post",
            baseURL: "https://coorgtour.in/api/admin",
            header:"Content-type:application/json",
            data:{
              name:name,
              name1:name1,
            }
          };
          await axios(config).then(function (res) {
            if ((res.status == 200)) {
              alert("Details Added");
              handleClose();
              getprotiming()
            
            }
          });
        } catch (error) {
          console.log(error);
          alert("Unable to add Details");
        }
      
    };
  
   
    const editprotiming = async () => {
     
      try {
        const config = {
          url: "/editProtiming",
          method: "put",
          baseURL: "https://coorgtour.in/api/admin",
          headers:{"Content-type":"application/json"},
            data:{
              id:editdata?._id,
              name:namee,
              name1:namee1,
            }
        };
        await axios(config).then(function (res) {
          if ((res.status == 200)) {
            alert("Details updated");
         handleeditClose()
         setname("");
         setname1("");
         getprotiming()
          }
        });
      } catch (error) {
        console.log(error);
        alert("Unable to add Details");
      }
    };
  
  
    const deleteprotiming = async (id) => {
        axios({
          method: "delete",
          url: "https://coorgtour.in/api/admin/deleteProtiming/" + id,
        })
          .then(function (response) {
            window.location.reload();
            alert(response.data.Success);
          })
          .catch(function (error) {
            console.log(error.response.data);
          });
      };


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

    const columns4 = [
        {
            dataField: "name",
            text: "From Time",
            formatter: (value, row) => (
                <p>
                    {row.name ? row.name : ""}
                   
                </p>
            ),
            headerStyle: { backgroundColor: "#080874", color: "white" },
        },

        {
            dataField: "name1",
            text: "To Time",
            formatter: (value, row) => <p>
                {row?.name1 ? row?.name1 : ""}
               
            </p>,
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
                            seteditdata(row)
                            handleeditShow(row)
                        }}
                    >
                        <i
                         class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
                    </button>
                    /
                    <button
                        style={{ border: "none", backgroundColor: "transparent" }}
                        onClick={()=>{deleteprotiming(row._id)}}
                    >
                        <i class="fas fa-trash" style={{ color: "#080874" }} ></i>
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
                    Pro Timing
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
                                        + Add Pro Timing
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
                                Add Pro Timing
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ alignItems: "center" }}>
                            <div>
                                <div className="add-pick mb-2">
                                    <label>Select Time</label>
                                    <br />
                                    <Row>
                                        <div style={{ display: "flex", gap: "30px" }}>
                                            <div className="col-sm-3 mb-2">
                                                <label>From</label>
                                                <input
                                                    type="time"
                                                    onChange={(e)=>setname(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-sm-3 mb-2">
                                                <label>To</label>
                                                <input
                                                    type="time"
                                                    onChange={(e)=>setname1(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </Row>
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
                            <Button onClick={addprotiming}>Add</Button>
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
                                Edit Pro Timing
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ alignItems: "center" }}>
                            <div>
                                <div className="add-pick mb-2">
                                    <label>Select Time</label>
                                    <br />
                                    <Row>
                                        <div style={{ display: "flex", gap: "30px" }}>
                                            <div className="col-sm-3 mb-2">
                                                <label>From</label>
                                                <input
                                                    type="time"
                                                    onChange={(e)=>setnamee(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-sm-3 mb-2">
                                                <label>To</label>
                                                <input
                                                    type="time"
                                                    onChange={(e)=>setnamee1(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </Row>
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
                            <Button onClick={()=>{editprotiming(editdata)}}>Update</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        </div>
    )
}

export default ProTiming

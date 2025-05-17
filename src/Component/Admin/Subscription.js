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

function Subscription() {
  const Input = styled("input")({
    display: "none",
  });
  const formdata = new FormData();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [totaljob, settotaljob] = useState("");
  const [minKm, setminKm] = useState("");
  const [maxKm, setmaxKm] = useState("");
  const [minhr, setminhr] = useState("");
  const [warrantyperiod, setwarrantyperiod] = useState("");
  const [commission, setcommission] = useState("");


  const [description1, setdescription1] = useState("");
 
  const [Slno, setSlno] = useState(1);
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState([]);

  const [servicedata, setservicedata] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [editshow, seteditShow] = useState(false);
  const [editdata, seteditdata] = useState({});
  const handleeditClose = () => seteditShow(false);
  const handleeditShow = (row) => {
 
    seteditdata(row);
    setname(row?.packageName)
    setdescription(row?.description)
    setprice(row?.price)
    settotaljob(row?.totalJob)
    setminKm(row?.packageMinKm)
    setmaxKm(row?.packageMaxKm)
    setminhr(row?.packageMinHr)
    setwarrantyperiod(row?.packageDays)
    setcommission(row?.commision)
    seteditShow(true);
  };

  const addService = async () => {
   
      try {
        const config = {
          url: "/AddJobpackage",
          method: "post",
          baseURL: "https://coorgtour.in/api/vendor",
          headers:{"content-type":"application/json"},
          data: {
            totalJob:totaljob,packageName:name,packageMinKm:minKm,packageMaxKm:maxKm,packageDays:warrantyperiod,packageMinHr:minhr,price:price,commision:commission,description:description
          },
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
   
  };

  const editService = async () => {

    try {
      const config = {
        url: "/updateJobPackage",
        method: "put",
        baseURL: "https://coorgtour.in/api/vendor",
        headers:{"content-type":"application/json"},
        data: {
            id:editdata?._id,
          totalJob:totaljob,packageName:name,packageMinKm:minKm,packageMaxKm:maxKm,packageDays:warrantyperiod,packageMinHr:minhr,price:price,commision:commission,description:description
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert("Details Edit");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to Edit Details");
    }
  };

  const getAllJobsPackage = () => {
    axios
      .get("https://coorgtour.in/api/vendor/getAllJobsPackage")
      .then(function (response) {
        setdata(response.data.success);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllJobsPackage();
    getCategory();
  }, []);

  const getCategory = () => {
    axios
      .get("https://coorgtour.in/api/admin/getCategory")
      .then(function (response) {
        setdata1(response.data.Category);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // console.log("data1", data1);
  const [cancelId,setcancelId]=useState("");
const [ShowCancel,setShowCancel]=useState(false);
const handleShoWc=()=>setShowCancel(true);
const closeCancel=()=>setShowCancel(false);

  const deleteService = async (id) => {
    axios({
      method: "delete",
      url: "https://coorgtour.in/api/vendor/JobsPackageDelete/" + cancelId,
    })
      .then(function (response) {
        window.location.reload();
        alert(response.data.success);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getsubCategory();
    getsubCategory();
  }, []);

  console.log(servicedata, "j'fjrw");
  const getsubCategory = () => {
    try {
        axios
      .get("https://coorgtour.in/api/admin/getsubcategory")
      .then(function (response) {
        setservicedata(response.data.SubCategory);
      })
      .catch(function (error) {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  
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
  const columns = [
    {
    
        text: "S.No",
        formatter: (value, row,i) => <p>{i+1}</p>,
        headerStyle: { backgroundColor: "#080874", color: "white" },

      },
    {
      dataField: "packageName",
      text: "Package Name",
      headerStyle: { backgroundColor: "#080874", color: "white" },

    //   formatter: (value, row) => <p>{row.category ? row.category : ""}</p>,
    },
    {
      dataField: "totalJob",
      text: "Total Jobs",
      headerStyle: { backgroundColor: "#080874", color: "white" },

    },

    {
      dataField: "packageMinKm",
      text: "Minmum km",
      formatter: (value, row) => <p>{row?.packageMinKm }{" "}Km</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },

    },
   
    {
        dataField: "packageMaxKm",
        text: "Minimun km",
        formatter: (value, row) => <p>{row.packageMaxKm ? row.packageMaxKm : ""}{" "}km</p>,
        headerStyle: { backgroundColor: "#080874", color: "white" },

      },
      {
        dataField: "packageMinHr",
        text: "Minimun Hours",
        formatter: (value, row) => <p>{row.packageMinHr ? row.packageMinHr : ""}{" "}Hours</p>,
        headerStyle: { backgroundColor: "#080874", color: "white" },

      },
    {
    
      text: "Valid period",
      formatter: (value, row) => (
        <p>{row.packageDays ? row.packageDays : ""} days</p>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },

    },
    {
        text: "Commission",
        formatter: (value, row) => (
          <p>{row.commision ? row.commision : ""} %</p>
        ),
        headerStyle: { backgroundColor: "#080874", color: "white" },

      },
      {
        text: "Price",
        formatter: (value, row) => (
          <p>₹ {row.price ? row.price?.toFixed(2) : ""} </p>
        ),
        headerStyle: { backgroundColor: "#080874", color: "white" },

      },
     {
      text: " Description",
      formatter: (value, row) => (
        <p>
          {parse(`<div>${row?.description}</div>`)
            ? parse(`<div>${row?.description}</div>`)
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
            onClick={() => handleeditShow(row)}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() =>{ 
                setcancelId(row._id)
                handleShoWc()}}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
  ];

  // CKSEditor
  const handleChange = (e, editor) => {
    const data = editor.getData();
    setdescription(data);
  };
  const handleChange1 = (e, editor) => {
    const data = editor.getData();
    setdescription1(data);
  };

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
        Job Packages
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
                <SearchBar {...props.searchProps} />
                <Button
                  onClick={() => {
                    setname("")
                    setdescription("")
                    setprice("")
                    settotaljob("")
                    setminKm("")
                    setmaxKm("")
                    setminhr("")
                    setwarrantyperiod("")
                    setcommission("")
                    setShow(true)}}
                  style={{
                    right: "20px",
                    position: "absolute",
                  }}
                >
                  + Add
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
                color: "#080874",
              }}
            >
              Add Job Package
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
            
              <div className="add-pick mb-2">
                <label>Package Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Package Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Total Job</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="200"
                  value={totaljob}
                  onChange={(e) => settotaljob(e.target.value)}
                />
              </div>

              <div className="add-pick mb-2">
                <label>Minimun km</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="10"
                  value={minKm}
                  onChange={(e) => setminKm(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Maximum km</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="10"
                  value={maxKm}
                  onChange={(e) => setmaxKm(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Minimun Hours</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="10"
                  value={minhr}
                  onChange={(e) => setminhr(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Valid period Days</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="10"
                  value={warrantyperiod}
                  onChange={(e) => setwarrantyperiod(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Commission/Job %</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="10"
                  value={commission}
                  onChange={(e) => setcommission(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Package Price</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="1000"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Description</label>
                <br />
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={handleChange}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" style={{background:"white", color:"#080874", border:"1px solid #080874"}}onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={addService}>Add</Button>
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
                color: "#080874",
              }}
            >
              Edit Job Package
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
            
              <div className="add-pick mb-2">
                <label>Package Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Package Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Total Job</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="200"
                  value={totaljob}
                  onChange={(e) => settotaljob(e.target.value)}
                />
              </div>

              <div className="add-pick mb-2">
                <label>Minimun km</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="10"
                  value={minKm}
                  onChange={(e) => setminKm(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Maximum km</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="10"
                  value={maxKm}
                  onChange={(e) => setmaxKm(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Minimun Hours</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="10"
                  value={minhr}
                  onChange={(e) => setminhr(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Valid period Days</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="10"
                  value={warrantyperiod}
                  onChange={(e) => setwarrantyperiod(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Commission/Job %</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="10"
                  value={commission}
                  onChange={(e) => setcommission(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Package Price</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="1000"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Description</label>
                <br />
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={handleChange}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" style={{background:"white", color:"#080874", border:"1px solid #080874"}} onClick={handleeditClose}>
              Cancel
            </Button>
            <Button onClick={() => editService(editdata)}>Update</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={ShowCancel}
          onHide={closeCancel}
          className="modal1111111"
        >
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontWeight: 600,
                fontSize: "22px",
                color: "#3b6f7c",
              }}
            >
              Are you sure delete ??
            </Modal.Title>
          </Modal.Header>
         
          <Modal.Footer>
            <Button variant="danger" onClick={closeCancel}>
              Cancel
            </Button>
            <Button variant="success" onClick={() => deleteService()}>Ok</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Subscription;

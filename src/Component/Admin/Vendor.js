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
import StarRatings from "react-star-ratings";
import { FaUserCircle } from "react-icons/fa";
import moment from "moment/moment";
function Vendor() {
  const formdata = new FormData();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [warrantyperiod, setwarrantyperiod] = useState("");
  const [img, setimg] = useState("");

  const [name1, setname1] = useState("");
  const [img1, setimg1] = useState();
  const [description1, setdescription1] = useState("");
  const [price1, setprice1] = useState("");
  const [warrantyperiod1, setwarrantyperiod1] = useState("");
  const [category1, setcategory1] = useState("");
  const [Slno, setSlno] = useState(1);
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState([]);
  const [category, setcategory] = useState("");

  const [servicedata, setservicedata] = useState([]);
  const [subcate, setsubcat] = useState("");
  // console.log("ca", category);

  // TextEditor

  //

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [editshow, seteditShow] = useState(false);
  const [editdata, seteditdata] = useState({});
  const handleeditClose = () => seteditShow(false);
  const handleeditShow = (row) => {
    seteditShow(true);
    seteditdata(row);
  };

  const addService = async () => {
    if (!name) {
      alert("Please select the name");
    } else if (!img) {
      alert("Please Select the Image");
    } else {
      formdata.append("name", name);
      formdata.append("price", price);
      formdata.append("warrantyperiod", warrantyperiod);
      formdata.append("description", description);
      formdata.append("category", category);
      formdata.append("subcategory", subcate);
      formdata.append("img", img);
      try {
        const config = {
          url: "/addService",
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

  const getAllVendorsData = async () => {
    try {
      let res = await axios.get(
        "https://coorgtour.in/api/vendor/getAllVendors"
      );
      if (res.status == 200) {
        setdata(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);

  const [AllHub, setAllHub] = useState([]);
  const getAllHub = async () => {
    try {
      axios
        .get("https://coorgtour.in/api/admin/getOurhub")
        .then(function (response) {
          setAllHub(response.data.Ourhub);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllVendorsData();
    getAllHub();
  }, []);

  const customTotal = (from, to, size) => {
    setSlno(from);
    return (
      // <span className="react-bootstrap-table-pagination-total">
      //   Showing {from} to {to} of {size} Results
      // </span>
      <></>
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

  const makeApproveAndHoldVendor = async (id, status) => {
    try {
      const config = {
        url: "/api/vendor/makeApproveAndHoldVendor",
        method: "put",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          id: id,
          status: status,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert(res.data.success);
        getAllVendorsData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [ShowAs, setShowAs] = useState(false);
  const [vendorD, setvendorD] = useState({});

  const MakeAssignHubtoVendor = async (pincode, Hub) => {
    try {
      const config = {
        url: "/api/vendor/makeAssignedHubVendor",
        method: "put",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          id: vendorD?._id,
          assignmentHubPincode: pincode,
          Hub: Hub,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert(res.data.success);
        setShowAs(false);
        getAllVendorsData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const columns = [
    {
      text: "S.No",
      formatter: (value, row, i) => <p>{i + 1}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "50px",
      },
    },
    {
      dataField: "_id",
      text: "Vendor Id",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "230px",
      },
    },
    {
      dataField: "img",
      text: "Profile",
      formatter: (value, row) => (
        <>
          {row?.profile ? (
            <img
              src={"https://coorgtour.in/Vendor/" + row?.img}
              alt=""
              width="50px"
              height="50px"
              onClick={() =>
                window.open("https://coorgtour.in/Vendor/" + row?.img)
              }
            />
          ) : (
            <FaUserCircle
              style={{
                color: "rgb(59 111 124)",
                textAlign: "center",
                width: "25px",
                height: "25px",
              }}
            />
          )}
        </>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },
    },
    {
      dataField: "name",
      text: "Vendor Name",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "130px",
      },
    },

    {
      dataField: "mobile",
      text: "Mobile No.",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "130px",
      },
    },
    {
      dataField: "toRefNum",
      text: "RefNum",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "130px",
      },
    },
    {
      dataField: "email",
      text: "Email",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "230px",
      },
    },
    {
      dataField: "Register date",
      text: "Register date",
      formatter: (value, row) => (
        <p>{moment(row?.createdAt).format("MMM Do YY")}</p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "150px",
      },
    },
    {
      dataField: "Aadhar Number",
      text: "Aadhar Number",
      formatter: (value, row) => <p>{row?.addhar}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "250px",
      },
    },
    {
      dataField: "Pan Number",
      text: "Pan Number",
      formatter: (value, row) => <p>{row?.pancard}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "250px",
      },
    },
    {
      dataField: "GST Number",
      text: "GST Number",
      formatter: (value, row) => <p>{row?.gst}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "150px",
      },
    },
    {
      dataField: "Address",
      text: "Address",
      formatter: (value, row) => <p>{row?.area}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "150px",
      },
    },
    {
      dataField: "assignmentHubPincode",
      text: "Assigned Hub Pincode",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "130px",
      },
    },
    {
      dataField: "BankName",
      text: "BankName",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "130px",
      },
    },
    {
      dataField: "ACHoldName",
      text: "ACHoldName",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "130px",
      },
    },
    {
      dataField: "AcNo",
      text: "AcNo",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "130px",
      },
    },
    {
      dataField: "ifceCode",
      text: "IFSC Code",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "130px",
      },
    },
    {
      dataField: "Branch",
      text: "Branch",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "130px",
      },
    },
    {
      dataField: "residential",
      text: "Residential",
      formatter: (value, row) => (
        <img
          src={"https://coorgtour.in/Vendor/" + row?.residential}
          alt=""
          width="50px"
          height="50px"
          onClick={() =>
            window.open("https://coorgtour.in/Vendor/" + row?.residential)
          }
        />
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "6rem",
      },
    },
    {
      dataField: "police",
      text: "Police verification",
      formatter: (value, row) => (
        <img
          src={"https://coorgtour.in/Vendor/" + row?.police}
          alt=""
          width="50px"
          height="50px"
          onClick={() =>
            window.open("https://coorgtour.in/Vendor/" + row?.police)
          }
        />
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "6rem",
      },
    },
    {
      dataField: "",
      text: "Rating",
      formatter: (value, row) => (
        <p>
          <StarRatings
            rating={row?.AvRating}
            starDimension="20px"
            // changeRating={setratting}
            starSpacing="2px"
            starRatedColor="#fcca0b"
          />
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "150px",
      },
    },

    {
      dataField: "",
      text: "Response Rate",
      formatter: (value, row) => (
        <p>
          <StarRatings
            rating={row?.ResponseRate}
            starDimension="20px"
            // changeRating={setratting}
            starSpacing="2px"
            starRatedColor="#fcca0b"
          />
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "150px",
      },
    },
    {
      dataField: "status",
      text: "Status",
      formatter: (value, row) => (
        <p>
          {row?.status == "Approved" ? (
            <span style={{ color: "green" }}>{row?.status}</span>
          ) : (
            <span style={{ color: "red" }}>{row?.status}</span>
          )}
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },
    },
    {
      dataField: "Delete",
      text: "Action",
      formatter: (value, row) => (
        <>
          {row?.status !== "Approved" ? (
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <button
                type="button"
                class="btn btn-success"
                onClick={() => makeApproveAndHoldVendor(row?._id, "Approved")}
              >
                Approve
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => makeApproveAndHoldVendor(row?._id, "Hold")}
              >
                Hold
              </button>
            </div>
          ) : (
            <></>
          )}
          <button
            type="button"
            class="btn btn-info"
            onClick={() => {
              setvendorD(row);
              setShowAs(true);
            }}
          >
            Assigned Hub
          </button>
        </>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "170px",
      },
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
        Vendors
      </div>

      <Container>
        <div style={{ overflow: "hidden", overflowY: "auto" }}>
          <ToolkitProvider
            keyField="id"
            data={data}
            columns={columns}
            search
            exportCSV
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} />

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

        <Modal
          show={ShowAs}
          onHide={() => setShowAs(false)}
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
              Assign Vendor Name :{vendorD?.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            {AllHub?.map((item) => {
              return (
                <div className="row mb-2">
                  <div className="col-md-10">
                    {item?.name},{item?.pincodeid?.state},
                    {item?.pincodeid?.city},{item?.pincodeid?.area}-
                    {item?.pincode}
                  </div>
                  <div className="col-md-2">
                    {vendorD?.assignmentHubPincode == item?.pincode ? (
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={() =>
                          MakeAssignHubtoVendor(
                            item?.pincode,
                            JSON.stringify(item?.pincodeid)
                          )
                        }
                      >
                        Selected
                      </button>
                    ) : (
                      <button
                        type="button"
                        class="btn btn-warning"
                        onClick={() =>
                          MakeAssignHubtoVendor(
                            item?.pincode,
                            JSON.stringify(item?.pincodeid)
                          )
                        }
                      >
                        Assign
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={() => setShowAs(false)}>
              Cancel
            </Button>
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
                color: "#3b6f7c",
              }}
            >
              Edit Service
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="add-pick mb-2">
                <label>Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Name"
                  value={name1}
                  onChange={(e) => setname1(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Price</label>
                <br />
                <input
                  type="number"
                  placeholder="200"
                  value={price1}
                  onChange={(e) => setprice1(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Warranty Period</label>
                <br />
                <input
                  type="text"
                  placeholder="Name"
                  value={warrantyperiod1}
                  onChange={(e) => setwarrantyperiod1(e.target.value)}
                />
              </div>

              <div className="add-pick mb-2">
                <label>Image</label>
                <br />
                <input
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg,image/jpg"
                  style={{ border: "none" }}
                  onChange={(e) => setimg1(e.target.files[0])}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Description</label>
                <br />
                <CKEditor
                  editor={ClassicEditor}
                  data={description1}
                  onChange={handleChange1}
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
            <Button variant="dark" onClick={handleeditClose}>
              Cancel
            </Button>
            <Button onClick={() => editService(editdata)}>Update</Button>
          </Modal.Footer>
        </Modal> */}
      </Container>
    </div>
  );
}

export default Vendor;

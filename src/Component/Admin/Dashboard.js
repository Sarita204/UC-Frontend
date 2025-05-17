import React, { useEffect, useState } from "react";
import { FaComputer } from "react-icons/fa";

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
import { BsCheckCircleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import moment from "moment/moment";

function Dashboard() {
  const Input = styled("input")({
    display: "none",
  });

  const [Slno, setSlno] = useState(1);
  const [data, setdata] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [editshow, seteditShow] = useState(false);
  const [editdata, seteditdata] = useState({});

  const getAllJobs = () => {
    axios
      .get("https://coorgtour.in/api/admin/getAllJobs")
      .then(function (res) {
        setdata(res.data.success);
        console.log(res.data.success);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [selData, setselData] = useState({});
  const [AllVendor, setAllVenodor] = useState([]);
  const [nochVendort, setnochangeVendor] = useState([]);
  const getAllVendorsData = async () => {
    try {
      let res = await axios.get(
        "https://coorgtour.in/api/vendor/getAllVendors"
      );
      if (res.status == 200) {
        setAllVenodor(res.data.success);
        setnochangeVendor(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllJobs();
    getAllVendorsData();
  }, []);
  const [EnterfilenameModal1, setEnterfilenameModal1] = useState(false);

  // console.log(data);
  const customTotal = (from, to, size) => {
    setSlno(from);
    return (
      <></>
      // <span className="react-bootstrap-table-pagination-total">
      //   Showing {from} to {to} of {size} Results
      // </span>
    );
  };

  const [datauser, setdatauser] = useState([]);

  const getallusers = async () => {
    try {
      let res = await axios.get("https://coorgtour.in/api/user/alluser");
      if (res.status == 200) {
        setdatauser(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallusers();
    getService();
  }, []);

  const [allservice, setAllservice] = useState([]);
  const getService = () => {
    axios
      .get("https://coorgtour.in/api/admin/getService")
      .then(function (response) {
        setAllservice(response.data.Service);
      })
      .catch(function (error) {
        console.log(error);
      });
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

  const assignVendorJobs = async (data) => {
    try {
      const config = {
        url: "/api/admin/assignVendorJobs",
        method: "put",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          id: editdata?._id,
          vendorName: data?.name,
          vendorMobile: data?.mobile,
          vendorId: data?._id,
          VendorStatus: "Assigned",
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        seteditdata(res.data.success);
        getAllJobs();
      }
    } catch (error) {
      alert(error.response.data.error);
      console.log(error);
    }
  };
  const assignVendorJobsCancel = async (data) => {
    try {
      const config = {
        url: "/api/admin/assignVendorJobs",
        method: "put",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          id: editdata?._id,
          vendorName: "",
          vendorMobile: "",
          vendorId: editdata?._id,
          VendorStatus: "Pending",
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        seteditdata(res.data.success);
        getAllJobs();
      }
    } catch (error) {
      alert(error.response.data.error);
      console.log(error);
    }
  };
  const abcHandel = (e) => {
    if (e.target.value != "") {
      const filterTable = nochVendort.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setAllVenodor([...filterTable]);
    } else {
      setAllVenodor([...nochVendort]);
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
        width: "100px",
      },
    },
    // {
    //   dataField: "User id",
    //   text: "User id",
    //   formatter: (value, row) => <p>{row._id ? row._id : ""}</p>,
    //   headerStyle: { backgroundColor: "#080874", color: "white", },
    // },
    {
      dataField: "User_Id",
      text: "User_Id",
      formatter: (value, row) => <p>{row._id ? row._id : ""}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "280px",
      },
    },
    {
      dataField: "userName",
      text: "UserName",
      formatter: (value, row) => <p>{row.userName ? row.userName : ""}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },
    },
    {
      dataField: "userMobile",
      text: "User Mobile",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },

      // formatter: (value, row) => <p>{row.vendorId ? row.vendorId : ""}</p>,
    },
    {
      dataField: "userEmail",
      text: "User Email",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "200px",
      },

      // formatter: (value, row) => <p>{row.vendorId ? row.vendorId : ""}</p>,
    },

    {
      text: "Service Details",
      formatter: (value, row) => (
        <p>
          <Table striped bordered hover>
            <tbody>
              {row?.serviceType?.map((ele, i) => {
                return (
                  <tr>
                    <div style={{ width: "100px" }}>
                      <td>{i + 1}</td>
                    </div>
                    <td style={{ width: "100px" }}>
                      <div>{ele?.name}</div>
                    </td>
                    <td>{ele?.quntitity}</td>
                    <td style={{ width: "100px" }}>
                      <div>₹{ele?.price?.toFixed(2)}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "250px",
      },
    },
    // {
    //   text: "Vendor Added Products",
    //   formatter: (value, row) => (
    //     <p>
    //       <Table striped bordered hover>
    //         <tbody>
    //           {row?.serviceType?.map((ele, i) => {
    //             return (
    //               <tr>
    //                 <td>{i + 1}</td>
    //                 <td>{ele?.name}</td>
    //                 <td>{ele?.quntitity}</td>
    //                 <td>₹{ele?.price?.toFixed(2)}</td>
    //               </tr>
    //             );
    //           })}
    //         </tbody>
    //       </Table>
    //     </p>
    //   ),
    //   headerStyle: { backgroundColor: "#080874", color: "white", width: "100px" },

    // },
    {
      dataField: "totalamount",
      text: "TotalAmount",
      formatter: (value, row) => (
        <p>₹{row.TotalAmount ? row.TotalAmount?.toFixed(2) : "0"}</p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "150px",
      },
    },
    {
      dataField: "payId",
      text: "PayId",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "200px",
      },
    },
    {
      text: "Payment Amount",
      formatter: (value, row) => (
        <p>₹{row.TotalAmount ? row.TotalAmount?.toFixed(2) : "0"}</p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },
    },
    {
      text: "Remaining Amount",
      formatter: (value, row) => (
        <p>₹{row?.TotalAmount - row?.payAmount?.toFixed(2)}</p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },
    },
    {
      dataField: "paymentStatus",
      text: "Payment Status",
      formatter: (value, row) => (
        <p>{row.paymentStatus ? row.paymentStatus : ""}</p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },
    },
    {
      dataField: "userAddress",
      text: "Address",
      formatter: (value, row) => (
        <p>{row.userAddress ? row.userAddress : ""}</p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },
    },

    {
      dataField: "vendorName",
      text: "VendorName",
      formatter: (value, row) => <p>{row.vendorName ? row.vendorName : ""}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "150px",
      },
    },
    {
      dataField: "vendorMobile",
      text: "VendorMobile",
      formatter: (value, row) => (
        <p>{row.vendorMobile ? row.vendorMobile : ""}</p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "150px",
      },
    },
    {
      dataField: "Booking service Date",
      text: "Booking service Date",
      formatter: (value, row) => (
        <p>
          {moment(row.createdAt).subtract(10, "days").calendar()
            ? moment(row.createdAt).subtract(10, "days").calendar()
            : ""}
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "150px",
      },
    },
    {
      dataField: "Status",
      text: "Status",
      formatter: (value, row) => (
        <p>
          {row?.status == "Pending" ? (
            <span style={{ color: "blue" }}>{row?.status}</span>
          ) : (
            <span>
              {row?.status == "Cancel" ? (
                <span style={{ color: "red" }}>{row?.status}</span>
              ) : (
                <span style={{ color: "green" }}>{row?.status}</span>
              )}
            </span>
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
      text: "Vendor Status",
      formatter: (value, row) => (
        <p>
          {row?.VendorStatus == "Pending" ? (
            <span style={{ color: "blue" }}>{row?.VendorStatus}</span>
          ) : (
            <span>
              {row?.VendorStatus == "Cancel" ||
              row?.VendorStatus == "Assigned" ? (
                <span style={{ color: "red" }}>{row?.VendorStatus}</span>
              ) : (
                <span style={{ color: "green" }}>{row?.VendorStatus}</span>
              )}
            </span>
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
      text: "Action",
      formatter: (value, row) => (
        <>
          {row?.status == "Cancel" || row.status == "Complete" ? (
            <></>
          ) : (
            <button
              className="btn"
              style={{ color: "white", background: "#080874" }}
              onClick={() => {
                seteditdata(row);
                setEnterfilenameModal1(true);
              }}
            >
              Assign Vendor
            </button>
          )}
        </>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },
    },
  ];

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          backgroundColor: "white",
          fontWeight: 600,
          padding: "22px",
          fontSize: "22px",
          color: "#080874",
        }}
      >
        Dashboard
      </div>
      <div style={{ display: "flex" }}>
        <a href="/admin/users">
          <div
            style={{
              backgroundColor: "white",
              width: "250px",
              height: "150px",
              alignItems: "center",
              justifyContent: "center",
              display: "grid",
              margin: "8px",
              lineHeight: 0,
              border: "1px solid lightgray",
              boxShadow: "0px 0px 9px 0px #cdcdcd",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/3893/3893160.png"
              style={{ width: "50px", marginLeft: "auto", marginRight: "auto" }}
            />
            <p
              style={{
                color: "#080874",
                marginBottom: "0px",
                textAlign: "center",
              }}
            >
              Total Users
            </p>
            <p style={{ color: "#080874", textAlign: "center" }}>
              {datauser?.length}
            </p>
          </div>
        </a>
        <a href="/admin/vendors">
          <div
            style={{
              backgroundColor: "white",
              width: "250px",
              height: "150px",
              alignItems: "center",
              justifyContent: "center",
              display: "grid",
              margin: "8px",
              lineHeight: 0,
              border: "1px solid lightgray",
              boxShadow: "0px 0px 9px 0px #cdcdcd",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2704/2704434.png"
              style={{ width: "50px", marginLeft: "auto", marginRight: "auto" }}
            />
            <p
              style={{
                color: "#080874",
                marginBottom: "0px",
                textAlign: "center",
              }}
            >
              Total Vendor
            </p>
            <p style={{ color: "#080874", textAlign: "center" }}>
              {AllVendor?.length}
            </p>
          </div>
        </a>
        <a href="/admin/order">
          <div
            style={{
              backgroundColor: "white",
              width: "250px",
              height: "150px",
              alignItems: "center",
              justifyContent: "center",
              display: "grid",
              margin: "8px",
              lineHeight: 0,
              border: "1px solid lightgray",
              boxShadow: "0px 0px 9px 0px #cdcdcd",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2504/2504884.png"
              style={{ width: "50px", marginLeft: "auto", marginRight: "auto" }}
            />
            <p
              style={{
                color: "#080874",
                marginBottom: "0px",
                textAlign: "center",
              }}
            >
              Total Booking
            </p>
            <p style={{ color: "#080874", textAlign: "center" }}>
              {data?.length}
            </p>
          </div>
        </a>
        <a href="/admin/Service">
          <div
            style={{
              backgroundColor: "white",
              width: "250px",
              height: "150px",
              alignItems: "center",
              justifyContent: "center",
              display: "grid",
              margin: "8px",
              lineHeight: 0,
              border: "1px solid lightgray",
              boxShadow: "0px 0px 9px 0px #cdcdcd",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/8093/8093405.png"
              style={{ width: "50px", marginLeft: "auto", marginRight: "auto" }}
            />

            <p
              style={{
                color: "#080874",
                textAlign: "center",
                marginBottom: "0px",
              }}
            >
              Total Service
            </p>

            <p
              style={{
                color: "#080874",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {allservice?.length}
            </p>
          </div>
        </a>
      </div>

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
          Booked Service
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
                  <SearchBar
                    {...props.searchProps}
                    style={{ width: "300px" }}
                  />
                  <FaSearch
                    style={{
                      position: "absolute",
                      marginTop: "14px",
                      marginLeft: "-28px",
                    }}
                  />
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
        </Container>

        <Modal
          show={EnterfilenameModal1}
          onHide={() => setEnterfilenameModal1(false)}
          style={{ marginTop: "2%" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#080874" }}>
              {" "}
              Assign Vendor
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>
                <div class="position-relative mt-2" style={{ display: "flex" }}>
                  <input
                    id="search-bar-0"
                    type="text"
                    aria-labelledby="search-bar-0-label"
                    class="form-control "
                    onChange={(e) => abcHandel(e)}
                    placeholder="Search Vendor"
                    style={{
                      borderRadius: "50px",
                      border: "1px solid #fdd12d",
                      marginBottom: "5px",
                    }}
                  />
                </div>
                {AllVendor.filter((item) => item?.status == "Approved")?.map(
                  (data1) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        key={data1?._id}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            margin: "10px",
                            flexWrap: "wrap",
                          }}
                        >
                          {/* <input type="checkbox"/> */}
                          {data1?._id == editdata?.vendorId ? (
                            <BsCheckCircleFill
                              style={{
                                color: "green",
                                textAlign: "center",
                                width: "25px",
                                height: "25px",
                              }}
                            />
                          ) : (
                            <></>
                          )}
                          {data1?.profile ? (
                            <img
                              src={`https://coorgtour.in/Vendor/${data1?.profile}`}
                              alt="#"
                              width="30px"
                              height="30px"
                              style={{ borderRadius: 10 }}
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
                          <span style={{ color: "black" }}>{data1?.name} </span>{" "}
                          <span style={{ color: "black" }}>
                            {data1?.mobile}{" "}
                          </span>
                        </div>

                        <div className="">
                          {data1?._id == editdata?.vendorId ? (
                            <Button
                              variant=""
                              style={{
                                background: "white",
                                color: "#080874",
                                border: "1px solid #080874",
                              }}
                              onClick={() => assignVendorJobsCancel(data1)}
                            >
                              Cancel{" "}
                            </Button>
                          ) : (
                            <Button
                              variant=""
                              style={{ background: "#080874", color: "white" }}
                              onClick={() => assignVendorJobs(data1)}
                            >
                              Assign{" "}
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Dashboard;

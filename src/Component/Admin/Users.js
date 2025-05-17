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
function Users() {
  const Input = styled("input")({
    display: "none",
  });


  const [data, setdata] = useState([]);

  const getallusers = async () => {
    try {
      let res = await axios.get("https://coorgtour.in/api/user/alluser");
      if (res.status == 200) {

        setdata(res.data.success)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getallusers();

  }, []);







  const customTotal = (from, to, size) => {

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

  const makeApproveAndHoldVendor = async (id, isBlock) => {
    try {
      const config = {
        url: "/api/user/makeBlockUnblockUser",
        method: "put",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          id: id, isBlock: isBlock
        }
      }
      let res = await axios(config);
      if (res.status == 200) {
        alert(res.data.success);
        getallusers()
      }
    } catch (error) {
      console.log(error);
    }
  }
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const columns = [

    {
      text: "S.No",
      formatter: (value, row, i) => (<p>{i + 1}</p>),
      headerStyle: { backgroundColor: "#080874", color: "white", width: "50px" },
    },
    {
      dataField: "_id",
      text: "User Id",
      headerStyle: { backgroundColor: "#080874", color: "white", width: "230px" },
    },
    {
      dataField: "name",
      text: "User Name",
      headerStyle: { backgroundColor: "#080874", color: "white", width: "230px" },
    },

    {
      dataField: "isBlock",
      text: "Email",
      headerStyle: { backgroundColor: "#080874", color: "white", width: "230px" },
    },
    {
      dataField: "phone",
      text: "Mobile No.",
      headerStyle: { backgroundColor: "#080874", color: "white", width: "230px" },
    },
    {
      dataField: 'Register Date',
      text: "Register Date",
      formatter: (value, row, i) => (<p>{moment(row?.createdAt).format('MMMM Do YYYY')}</p>),
      headerStyle: { backgroundColor: "#080874", color: "white", width: "230px" },
    },

    {
      dataField: "status",
      text: "Status",
      formatter: (value, row) => (<p>{row?.isBlock == false ? (<span style={{ color: "green" }}>Un-Blocked</span>) : (<span style={{ color: "red" }}>Blocked</span>)}</p>),
      headerStyle: { backgroundColor: "#080874", color: "white", width: "100px" },

    },
    {
      dataField: "Delete",
      text: "Action",
      formatter: (value, row) => (
        <>
          {row?.isBlock == true ? (

            <button
              type="button"
              class="btn btn-success" onClick={() => makeApproveAndHoldVendor(row?._id, false)}>UnBlock</button>

          ) : (<button
            type="button"
            class="btn btn"
            style={{ background: "#080874", color: "white" }}
            onClick={() => makeApproveAndHoldVendor(row?._id, true)}> Block</button>)}
        </>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white", width: "100px" },
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
        Users
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
                <span style={{ marginLeft: "10px" }}>
                  <lale>From</lale>
                  <input type="date" style={{ width: "auto", marginLeft: "6px" }} />
                </span>
                <span style={{ marginLeft: "10px" }}>
                  <lale>To</lale>
                  <input type="date" style={{ width: "auto", marginLeft: "6px" }} />
                </span>
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

        {/* <Modal show={show} onHide={handleClose} className="modal1111111">
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontWeight: 600,
                fontSize: "22px",
                color: "#3b6f7c",
              }}
            >
              Add Service
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="add-pick mb-2">
                <label>Category</label>
                <div
                  className="w-72"
                  style={{
                    width: "100%",
                    border: "2px solid #dee2e6",
                  }}
                >
                  <Select
                    label="Select Category"
                    onChange={(e) => {
                      setcategory(e);
                    }}
                  >
                    {data1?.map((item) => {
                      return <Option value={item?.name}>{item?.name}</Option>;
                    })}
                  </Select>
                </div>
              </div>
              <div className="add-pick mb-2">
                <label>Sub Category</label>
                <div
                  className="w-72"
                  style={{
                    width: "100%",
                    border: "2px solid #dee2e6",
                  }}
                >
                  <Select
                    label="Select Category"
                    onChange={(e) => {
                      setsubcat(e);
                    }}
                  >
                    {servicedata
                      ?.filter((e) => e.categoryid.name == category)
                      ?.map((item) => {
                        return <Option value={item?.name}>{item?.name}</Option>;
                      })}
                  </Select>
                </div>
              </div>
              <div className="add-pick mb-2">
                <label>Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Price</label>
                <br />
                <input
                  type="number"
                  placeholder="200"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>

              <div className="add-pick mb-2">
                <label>Warranty Period</label>
                <br />
                <input
                  type="text"
                  placeholder="Name"
                  value={warrantyperiod}
                  onChange={(e) => setwarrantyperiod(e.target.value)}
                />
              </div>

              <div className="add-pick mb-2">
                <label>Image</label>
                <br />
                <input
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg,image/jpg"
                  style={{ border: "none" }}
                  onChange={(e) => setimg(e.target.files[0])}
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
            <Button variant="dark" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={addService}>Add</Button>
          </Modal.Footer>
        </Modal> */}

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

export default Users;

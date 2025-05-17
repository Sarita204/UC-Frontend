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

function Service() {
  const Input = styled("input")({
    display: "none",
  });
  const formdata = new FormData();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [tax, settax] = useState("");
  const [warrantyperiod, setwarrantyperiod] = useState("");
  const [img, setimg] = useState("");

  const [name1, setname1] = useState("");
  const [img1, setimg1] = useState();
  const [description1, setdescription1] = useState("");
  const [price1, setprice1] = useState("");
  const [tax1, settax1] = useState("");
  const [warrantyperiod1, setwarrantyperiod1] = useState("");
  const [category1, setcategory1] = useState("");
  const [Slno, setSlno] = useState(1);
  const [Allservice, setAllservice] = useState([]);
  // console.log("data>>>>>>>>>>>>",data)
  const [data1, setdata1] = useState([]);
  const [category, setcategory] = useState("");

  const [servicedata, setservicedata] = useState([]);
  const [subcate, setsubcat] = useState("");
  // console.log("ca", category);

  // TextEditor

  const [show10, setShow10] = useState(false);

  const handleClose10 = () => setShow10(false);
  const handleShow10 = () => setShow10(true);
  const [deletdata, setdeletedata] = useState('')

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [editshow, seteditShow] = useState(false);
  const [editdata, seteditdata] = useState({});
  console.log(editdata, "sgv0fij0")
  const handleeditClose = () => seteditShow(false);
  const handleeditShow = () => seteditShow(true);



  const addService = async () => {
    if (!category || !name || !price || !tax || !warrantyperiod || !description) {
      alert("Please fill all fields");
    }
    else if (!img) {
      alert("Please Select the Image");
    } else {
      formdata.append("name", name);
      formdata.append("price", price);
      formdata.append("tax", tax);
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

  const editService = async () => {
    formdata.append("category", category1 ? category1 : editdata?.category1);
    formdata.append("name", name1 ? name1 : editdata?.name);
    formdata.append("img", img1 ? img1 : editdata?.img);
    formdata.append("price", price1 ? price1 : editdata?.price);
    formdata.append("tax", tax1 ? tax1 : editdata?.tax);
    formdata.append(
      "description",
      description1 ? description1 : editdata?.description
    );
    formdata.append(
      "warrantyperiod",
      warrantyperiod1 ? warrantyperiod1 : editdata?.warrantyperiod
    );

    try {
      const config = {
        url: "/editService/" + editdata?._id,
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert("Details Edited");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to Edit Details");
    }
  };

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
  useEffect(() => {
    getService();
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


  console.log(deletdata?._id, "efw0eko9d")
  const deleteService = async () => {
    axios({
      method: "put",
      url: "https://coorgtour.in/api/admin/deleteService/" + deletdata?._id,
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
        value: Allservice.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const columns = [
    {
      dataField: " category",
      text: " Category Name",
      formatter: (value, row) => <p>{row.category ? row.category : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },

    {
      dataField: "name",
      text: "Service name",
      // formatter: (value, row) => <p>{row?.name ? row?.name : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "price",
      text: "Price",
      formatter: (value, row) => <p>{row?.price ? row?.price : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "tax",
      text: "Tax",
      formatter: (value, row) => <p>{row?.tax ? row?.tax : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },

    {
      dataField: "warrantyperiod",
      text: "Warranty period",
      formatter: (value, row) => (
        <p>{row.warrantyperiod ? row.warrantyperiod : ""}</p>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "img",
      text: "Image",
      formatter: (value, row) => (
        <img
          src={"https://coorgtour.in/Service/" + row?.img}
          alt=""
          width="50px"
          height="50px"
          onClick={() =>
            window.open("https://coorgtour.in/Service/" + row?.img)
          }
        />
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "description",
      text: " Description",
      formatter: (value, row) => (
        <p style={{
          overflow: "hidden",
          overflowY: "scroll",
          height: "100px",
          width: "200px",
        }}>
          {parse(`<div>${row?.description}</div>`)
            ? parse(`<div>${row?.description}</div>`)
            : ""}
        </p>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white", width: "14rem" },
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
              handleeditShow()
            }}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => { setdeletedata(row); handleShow10() }}
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
          color: "#080874 ",
        }}
      >
        Services
      </div>

      <Container>
        <div style={{ overflow: "hidden", overflowY: "auto" }}>
          <ToolkitProvider
            keyField="id"
            data={Allservice}
            columns={columns}
            // rowClasses={rowClasses}
            search
            exportCSV
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} />
                <Button
                  onClick={() => setShow(true)}
                  style={{
                    right: "20px",
                    position: "absolute",
                  }}
                >
                  + Add Services
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
              Add Services
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="add-pick mb-2">
                <label>Category Name</label>
                <div className="w-72">
                  <select
                    label="Select Category"
                    onChange={(e) => {
                      setcategory(e.target.value);
                    }}
                    style={{
                      width: "100%",
                      border: "2px solid #dee2e6",
                      height: "40px",
                      borderRadius: "5px",
                    }}
                  >
                    <option>Select</option>
                    {data1?.map((item) => {
                      return <option value={item?.name}>{item?.name}</option>;
                    })}
                  </select>
                </div>
              </div>
              {/* <div className="add-pick mb-2">
                <label>Sub Category</label>
                <div className="w-72">
                  <select
                    label="Select Category"
                    onChange={(e) => {
                      setsubcat(e.target.value);
                    }}
                    style={{
                      width: "100%",
                      border: "2px solid #dee2e6",
                      height: "40px",
                      borderRadius: "5px",
                    }}
                  >
                    <option>Select</option>
                    {servicedata
                      ?.filter((e) => e?.name == category)
                      ?.map((item) => {
                        return <option value={item?.name}>{item?.name}</option>;
                      })}
                  </select>
                </div>
              </div> */}
              <div className="add-pick mb-2">
                <label>Service Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Service Name"
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
                <label>Tax</label>
                <br />
                <input
                  type="number"
                  placeholder="15"
                  value={tax}
                  onChange={(e) => settax(e.target.value)}
                />
              </div>


              <div className="add-pick mb-2">
                <label>Warranty Period</label>
                <br />
                <input
                  type="text"
                  placeholder="Warranty Period"
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
            <Button variant="" style={{
              border: "1px solid #080874 ",
              color: "#080874",
            }} onClick={handleClose}>
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
                color: "#080874 ",
              }}
            >
              Edit Services
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="w-72">
                <select
                  label="Select Category"
                  onChange={(e) => {
                    setcategory1(e.target.value);
                  }}
                  style={{
                    width: "100%",
                    border: "2px solid #dee2e6",
                    height: "40px",
                    borderRadius: "5px",
                  }}
                >
                  <option>{editdata?.category}</option>
                  {data1?.map((item) => {
                    return <option value={item?.name1}>{item?.name}</option>;
                  })}
                </select>
              </div>
              {/* <div className="add-pick mb-2">
                <label> Category Name</label>
                <br />
                <input
                  type="text"
                  placeholder={editdata?.category}
                  value={name1}
                  onChange={(e) => setname1(e.target.value)}
                />
              </div> */}

              <div className="add-pick mb-2">
                <label> Service Name</label>
                <br />
                <input
                  type="text"
                  placeholder={editdata?.name}
                  value={name1}
                  onChange={(e) => setname1(e.target.value)}
                />
              </div>

              <div className="add-pick mb-2">
                <label>Price</label>
                <br />
                <input
                  type="number"
                  placeholder={editdata?.price}
                  value={price1}
                  onChange={(e) => setprice1(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Tax</label>
                <br />
                <input
                  type="number"
                  placeholder={editdata?.tax}
                  value={tax1}
                  onChange={(e) => settax1(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Warranty Period</label>
                <br />
                <input
                  type="text"
                  placeholder={editdata?.warrantyperiod}
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
                  data={editdata?.description}
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
            <Button variant="" style={{
              border: "1px solid #080874 ",
              color: "#080874",
            }} onClick={handleeditClose}>
              Cancel
            </Button>
            <Button onClick={() => editService(editdata)}>Update</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show10} onHide={handleClose10}>
          <Modal.Header closeButton>

          </Modal.Header>
          <Modal.Body>Are sure want to Delete ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose10}>
              Close
            </Button>
            <Button variant="danger" onClick={() => { deleteService(); handleClose10() }}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Service;

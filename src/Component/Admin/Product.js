import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import * as XLSX from "xlsx";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { useDownloadExcel } from "react-export-table-to-excel";
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
import { RxCrossCircled } from "react-icons/rx";
import moment from "moment/moment";

function Product() {
  const Input = styled("input")({
    display: "none",
  });

  const formdata = new FormData();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [gst, setgst] = useState(0);
  const [discount, setdiscount] = useState(0);
  const [totalStock, settotalStock] = useState("");
  const [hsncode, sethsncode] = useState("");
  const [img, setimg] = useState("");
  const [img2, setimg2] = useState("");
  const [img3, setimg3] = useState("");
  const [img4, setimg4] = useState("");
  const [specification, setspecification] = useState([]);
  const [HowToUse, setHowToUse] = useState([]);
  const [point, setpoint] = useState("");
  const [point1, setpoint1] = useState("");
  const AddSpecification = () => {
    if (!point) return alert("Please enter your specefication");
    specification.push({ point: point });
    setpoint("");
    return alert("Successfully added");
  };

  const addHowtouse = () => {
    if (!point1) return alert("Please enter how to use");
    HowToUse.push({ point1: point1 });
    setpoint1("");
    return alert("Successfully Added");
  };
  const [name1, setname1] = useState("");
  const [img1, setimg1] = useState();
  const [description1, setdescription1] = useState("");
  const [price1, setprice1] = useState("");
  const [gst1, setgst1] = useState("");
  const [brand, setbrand] = useState("");
  const [pmodel, setpmodel] = useState("");
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState([]);
  const [category, setcategory] = useState("");

  const [servicedata, setservicedata] = useState([]);
  const [subcate, setsubcat] = useState("");
  // console.log("ca", category);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setname("");
    setdescription("");
    settotalStock("");
    setgst("");
    setprice("");
    setdiscount("");
    sethsncode("");
    setbrand("");
    setpmodel("");
    setShow(true);
  };

  const [editshow, seteditShow] = useState(false);
  const [editdata, seteditdata] = useState({});
  // console.log(editdata);
  const handleeditClose = () => seteditShow(false);
  const handleeditShow = () => seteditShow(true);

  // const handleeditShow = (row) => {
  //   seteditdata(row);
  //   setname(row?.productName);
  //   setdescription(row?.productDiscription);
  //   settotalStock(row?.totalStock);
  //   setgst(row?.gst);
  //   setprice(row?.price);
  //   setdiscount(row?.discount);
  //   sethsncode(row?.hsnCode);

  //   setbrand(row?.brand);
  //   setpmodel(row?.productModel);
  //   seteditShow(true);
  // };

  const addProducts = async () => {
    if (!category) return alert("Please select category");
    // if (!subcate) return alert("Please select sub-category");
    if (!name) return alert("Please enter product");
    if (!price) return alert("Please enter price");
    if (!img) return alert("Please select imgages");
    if (!description) return alert("Please write description");
    //   let totalPrice=(Number(price)+Number(price*(gst/100)))-Number(price*(discount/100))
    try {
      const config = {
        url: "/AddProduct",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        headers: { "content-type": "multipart/form-data" },
        data: {
          productName: name,
          category: category,
          productDiscription: description,
          subcategory: subcate,
          remaingStock: totalStock,
          totalStock: totalStock,
          addedBy: "Urban Company",
          specification: specification,
          howToUse: HowToUse,
          gst: gst,
          price: price,
          discount: discount,
          hsnCode: hsncode,
          image1: img,
          image2: img2,
          image3: img3,
          image4: img4,
          brand: brand,
          productModel: pmodel,
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
        url: "/updateProduct",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        headers: { "content-type": "multipart/form-data" },
        data: {
          id: editdata?._id,
          productName: name,
          category: category,
          productDiscription: description,
          subcategory: subcate,
          remaingStock: totalStock,
          totalStock: totalStock,
          addedBy: "Urban Company",
          gst: gst,
          price: price,
          discount: discount,
          hsnCode: hsncode,
          image1: img,
          image2: img2,
          image3: img3,
          image4: img4,
          brand: brand,
          productModel: pmodel,
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

  const ActiveProduct = async (id, status) => {
    try {
      const config = {
        url: "/productstatus",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        headers: { "content-type": "application/json" },
        data: {
          id: id,
          status: status,
        },
      };

      const res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  const getAllPruducts = () => {
    try {
      axios
        .get("https://coorgtour.in/api/admin/getAllProduct")
        .then(function (response) {
          setdata(response.data.success);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPruducts();
    getCategory();
  }, []);

  const getCategory = () => {
    try {
      axios
        .get("https://coorgtour.in/api/admin/getCategory")
        .then(function (response) {
          setdata1(response.data.Category);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("data1", data1);
  const [deleteId, setdeleteId] = useState("");
  const [deleteShow, setdeleteShow] = useState(false);
  const showDeleteH = () => setdeleteShow(true);
  const closeDeleteH = () => setdeleteShow(false);
  const deleteProduct = async () => {
    axios({
      method: "delete",
      url: "https://coorgtour.in/api/admin/deleteProduct/" + deleteId,
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

  const getsubCategory = () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  const AddOneByOneSep = async () => {
    if (!point) return alert("Please enter specification");
    try {
      const config = {
        url: "/AddspecificationProduct",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        headers: { "content-type": "application/json" },
        data: {
          id: editdata?._id,
          point: point,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully Added");
        seteditdata(res.data.success);
        setpoint("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const AddOneByOneHowtouse = async () => {
    if (!point1) return alert("Please enter how to use");
    try {
      const config = {
        url: "/AddHowToUseProduct",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        headers: { "content-type": "application/json" },
        data: {
          id: editdata?._id,
          point1: point1,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully Added");
        seteditdata(res.data.success);
        setpoint1("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const RemoveSpecification = async (removeId) => {
    try {
      const config = {
        url: "/RemoveSpecificationProduct",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        headers: { "content-type": "application/json" },
        data: {
          id: editdata?._id,
          removeId: removeId,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully removed");
        seteditdata(res.data.success);
        setpoint1("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const RemoveHowToUse = async (removeId) => {
    try {
      const config = {
        url: "/RemoveHowToUseProduct",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        headers: { "content-type": "application/json" },
        data: {
          id: editdata?._id,
          removeId: removeId,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully removed");
        seteditdata(res.data.success);
        setpoint1("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const customTotal = (from, to, size) => {
    return (
      <span className="react-bootstrap-table-pagination-total">
        Showing {from} to {to} of {size} Results
      </span>
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
        text: "All",
        value: data?.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  const { SearchBar } = Search;

  const { ExportCSVButton } = CSVExport;
  const columns = [
    {
      dataField: " category",
      text: "S.No",
      formatter: (value, row, i) => <p>{i + 1}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "3rem",
      },
    },
    {
      dataField: " category",
      text: " Category",
      formatter: (value, row) => <p>{row.category ? row.category : ""}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "6rem",
      },
    },
    // {
    //   dataField: "subcategory",
    //   text: "Sub Category",
    //   formatter: (value, row) => (
    //     <p>{row.subcategory ? row.subcategory : ""}</p>
    //   ),
    //   headerStyle: { backgroundColor: "#080874", color: "white",width:"6rem" },

    // },

    {
      dataField: "productName",
      text: "Product Name",
      formatter: (value, row) => (
        <p>{row.productName ? row.productName : ""}</p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "6rem",
      },
    },
    {
      dataField: "price",
      text: "Price",
      formatter: (value, row) => <p>₹{row?.price?.toFixed(2)}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "7rem",
      },
    },

    {
      dataField: "img",
      text: "Image1",
      formatter: (value, row) => (
        <img
          src={"https://coorgtour.in/Product/" + row?.image1}
          alt=""
          width="50px"
          height="50px"
          onClick={() =>
            window.open("https://coorgtour.in/Product/" + row?.image1)
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
      dataField: "img",
      text: "Image2",
      formatter: (value, row) => (
        <img
          src={"https://coorgtour.in/Product/" + row?.image2}
          alt=""
          width="50px"
          height="50px"
          onClick={() =>
            window.open("https://coorgtour.in/Product/" + row?.image2)
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
      dataField: "img",
      text: "Image3",
      formatter: (value, row) => (
        <img
          src={"https://coorgtour.in/Product/" + row?.image3}
          alt=""
          width="50px"
          height="50px"
          onClick={() =>
            window.open("https://coorgtour.in/Product/" + row?.image3)
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
      dataField: "img",
      text: "Image4",
      formatter: (value, row) => (
        <img
          src={"https://coorgtour.in/Product/" + row?.image4}
          alt=""
          width="50px"
          height="50px"
          onClick={() =>
            window.open("https://coorgtour.in/Product/" + row?.image4)
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
      dataField: "gst",
      text: "Gst",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "6rem",
      },

      // formatter: (value, row) => <p>₹{row?.price?.toFixed(2)}</p>,
    },
    {
      dataField: "totalStock",
      text: "Total Stock",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "6rem",
      },

      // formatter: (value, row) => <p>₹{row?.price?.toFixed(2)}</p>,
    },
    {
      dataField: "remaingStock",
      text: "Remaining Stock",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "6rem",
      },
      // formatter: (value, row) => <p>₹{row?.price?.toFixed(2)}</p>,
    },
    {
      dataField: "discount",
      text: "Discount",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "6rem",
      },
      // formatter: (value, row) => <p>₹{row?.price?.toFixed(2)}</p>,
    },

    {
      dataField: "brand",
      text: "Brand Name",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "10rem",
      },
      // formatter: (value, row) => <p>₹{row?.price?.toFixed(2)}</p>,
    },
    {
      dataField: "Create date",
      text: "Create Date",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "10rem",
      },
      formatter: (value, row) => (
        <p>{moment(row?.createdAt).format("MMM Do YY")}</p>
      ),
    },
    {
      dataField: "productModel",
      text: "Product Model",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "10rem",
      },
      // formatter: (value, row) => <p>₹{row?.price?.toFixed(2)}</p>,
    },
    {
      dataField: "hsnCode",
      text: "HSN Code",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "10rem",
      },
      // formatter: (value, row) => <p>₹{row?.price?.toFixed(2)}</p>,
    },
    {
      dataField: "description",
      text: " Description",
      formatter: (value, row) => (
        <p
          style={{
            overflow: "hidden",
            overflowY: "scroll",
            height: "100px",
            width: "200px",
          }}
        >
          {parse(`<div>${row?.productDiscription}</div>`)
            ? parse(`<div>${row?.productDiscription}</div>`)
            : ""}
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "14rem",
      },
    },
    {
      dataField: "specification",
      text: "Specification",
      formatter: (value, row) => (
        <p
          style={{
            overflow: "hidden",
            overflowY: "scroll",
            height: "100px",
            width: "200px",
          }}
        >
          {row?.specification?.map((item, i) => {
            return (
              <p style={{ color: "red" }}>
                {i + 1}:- <span style={{ color: "green" }}>{item?.point}</span>
              </p>
            );
          })}
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "14rem",
      },
    },
    {
      dataField: "howToUse",
      text: " HowToUse",
      formatter: (value, row) => (
        <p
          style={{
            overflow: "hidden",
            overflowY: "scroll",
            height: "100px",
            width: "200px",
          }}
        >
          {row?.howToUse?.map((item, i) => {
            return (
              <p style={{ color: "red" }}>
                {i + 1}:- <span style={{ color: "green" }}>{item?.point1}</span>
              </p>
            );
          })}
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "14rem",
      },
    },
    {
      dataField: "status",
      text: "Status",
      formatter: (value, row) => (
        <p>
          {row?.status === "Inactive" ? (
            <>
              <button
                style={{
                  backgroundColor: "red",
                  border: "1px solid red",
                  borderRadius: "5px",
                  color: "white",
                  padding: "4px 10px",
                }}
                onClick={() => {
                  ActiveProduct(row?._id, "Active");
                }}
              >
                Inactive
              </button>
            </>
          ) : (
            <>
              <button
                style={{
                  backgroundColor: "green",
                  border: "1px solid green",
                  borderRadius: "5px",
                  color: "white",
                  padding: "4px 10px",
                }}
                onClick={() => {
                  ActiveProduct(row?._id, "Inactive");
                }}
              >
                Active
              </button>
            </>
          )}
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "6rem",
      },
    },
    {
      dataField: "Delete",
      text: "Action",
      formatter: (value, row) => (
        <p style={{ display: "flex", gap: "3px" }}>
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              fontSize: "25px",
            }}
            onClick={() => {
              handleeditShow();
              seteditdata(row);
            }}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>

          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              fontSize: "25px",
            }}
            onClick={() => {
              setdeleteId(row?._id);
              showDeleteH();
            }}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "6rem",
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

  // Excel Download
  const Exceldownload = () => {
    // Your array of objects
    const allproduct = data;

    // Convert array of objects to worksheet
    const worksheet = XLSX.utils.json_to_sheet(allproduct);

    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, "products.xlsx");
  };
  // console.log("data", data);

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
        Products
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
                <Button onClick={Exceldownload} className="mx-3">
                  {" "}
                  Export excel{" "}
                </Button>
                <Button
                  onClick={() => handleShow()}
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

        <Modal
          show={show}
          onHide={handleClose}
          className="modal1111111"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontWeight: 600,
                fontSize: "22px",
                color: "#080874",
              }}
            >
              Add Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div className="row">
              <div className="col-md-6">
                <label>Category</label>
                <div className="w-72">
                  <select
                    label="Select Category"
                    onChange={(e) => {
                      setcategory(e.target.value);
                    }}
                    style={{
                      width: "98%",
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

              <div className="col-md-6">
                <label>Product Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  style={{ width: "98%" }}
                />
              </div>
              <div className="col-md-6">
                <label>Price</label>
                <br />
                <input
                  type="number"
                  placeholder="200"
                  style={{ margin: "0px 2px 0px 2px", width: "98%" }}
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label>Gst %</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="18"
                  value={gst}
                  style={{ width: "98%" }}
                  onChange={(e) => setgst(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Total Stock</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="200"
                  style={{ margin: "0px 2px 0px 2px", width: "98%" }}
                  value={totalStock}
                  onChange={(e) => settotalStock(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Discount %</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="2"
                  value={discount}
                  style={{ width: "98%" }}
                  onChange={(e) => setdiscount(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>HSN code</label>
                <br />
                <input
                  type="text"
                  placeholder="UC00234"
                  style={{ margin: "0px 2px 0px 2px", width: "98%" }}
                  value={hsncode}
                  onChange={(e) => sethsncode(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Brand Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Dell"
                  style={{ width: "98%" }}
                  value={brand}
                  onChange={(e) => setbrand(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Product Modal</label>
                <br />
                <input
                  type="text"
                  placeholder="Dell 2322"
                  style={{ margin: "0px 2px 0px 2px", width: "98%" }}
                  value={pmodel}
                  onChange={(e) => setpmodel(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="upload1">Image1</label>
                <br />
                <input
                  type="file"
                  id="upload1"
                  name="file"
                  accept="image/x-png,image/gif,image/jpeg,image/jpg"
                  style={{ border: "none", width: "98%" }}
                  onChange={(e) => setimg(e.target.files[0])}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="upload2">Image2</label>
                <br />
                <input
                  type="file"
                  id="upload2"
                  name="file"
                  accept="image/x-png,image/gif,image/jpeg,image/jpg"
                  style={{ border: "none", width: "98%" }}
                  onChange={(e) => setimg2(e.target.files[0])}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="upload1">Image3</label>
                <br />
                <input
                  type="file"
                  id="upload3"
                  name="file"
                  accept="image/x-png,image/gif,image/jpeg,image/jpg"
                  style={{ border: "none", width: "98%" }}
                  onChange={(e) => setimg3(e.target.files[0])}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="upload4">Image4</label>
                <br />
                <input
                  type="file"
                  id="upload4"
                  name="file"
                  accept="image/x-png,image/gif,image/jpeg,image/jpg"
                  style={{ border: "none", width: "98%" }}
                  onChange={(e) => setimg4(e.target.files[0])}
                />
              </div>
              <div className="col-md-12">
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
                  style={{ width: "98%" }}
                />
              </div>
              <div className="col-md-9">
                <label>Specification</label>
                <br />
                <input
                  type="text"
                  placeholder="Add specification one by one"
                  value={point}
                  onChange={(e) => setpoint(e.target.value)}
                  style={{ width: "98%" }}
                />
                {specification?.map((ele, i) => {
                  return (
                    <p>
                      {i + 1}
                      {". "}
                      <span>{ele?.point}</span>
                    </p>
                  );
                })}
              </div>
              <div className="col-md-3">
                <br />
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => AddSpecification()}
                  style={{ margin: "9px 0px 0px 8px", width: "98%" }}
                >
                  Add
                </button>{" "}
                {specification?.length !== 0 ? (
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => {
                      setspecification([]);
                    }}
                    style={{ margin: "9px 0px 0px 8px", width: "98%" }}
                  >
                    Clear
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-md-9">
                <label>How To Use</label>
                <br />
                <input
                  type="text"
                  placeholder="Add How To Use one by one"
                  value={point1}
                  onChange={(e) => setpoint1(e.target.value)}
                />
                {HowToUse?.map((ele, i) => {
                  return (
                    <p>
                      {i + 1}
                      {". "}
                      <span>{ele?.point1}</span>
                    </p>
                  );
                })}
              </div>
              <div className="col-md-3">
                <br />
                <button
                  type="button"
                  class="btn btn-success"
                  style={{ margin: "9px 0px 0px 8px", width: "98%" }}
                  onClick={addHowtouse}
                >
                  Add
                </button>{" "}
                {HowToUse?.length !== 0 ? (
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => setHowToUse([])}
                    style={{ margin: "9px 0px 0px 8px" }}
                  >
                    Clear
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{
                background: "white",
                color: "#080874",
                border: "1px solid #080874",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button onClick={addProducts}>Add</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={editshow}
          onHide={handleeditClose}
          className="modal1111111"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontWeight: 600,
                fontSize: "22px",
                color: "#080874",
              }}
            >
              Edit Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div className="row">
              <div className="col-md-6">
                <label>Category</label>
                <div
                  className="w-72"
                  style={{
                    width: "100%",
                    border: "2px solid #dee2e6",
                  }}
                >
                  <Select
                    label={editdata?.category}
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
              {/* <div className="col-md-6">
                <label>Sub Category</label>
                <div
                  className="w-72"
                  style={{
                    width: "100%",
                    border: "2px solid #dee2e6",
                    margin: "0px 2px 0px 2px",
                  }}
                >
                  <Select
                    label={editdata?.subcategory}
                    onChange={(e) => {
                      setsubcat(e);
                    }}
                  >
                    {servicedata
                      // ?.filter((e) => e.categoryid.name == category)
                      ?.map((item) => {
                        return <Option value={item?.name}>{item?.name}</Option>;
                      })}
                  </Select>
                </div>
              </div> */}
              <div className="col-md-6">
                <label>Product Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Price</label>
                <br />
                <input
                  type="number"
                  placeholder="200"
                  style={{ margin: "0px 2px 0px 2px" }}
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label>Gst %</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="18"
                  value={gst}
                  onChange={(e) => setgst(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Total Stock</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="200"
                  style={{ margin: "0px 2px 0px 2px" }}
                  value={totalStock}
                  onChange={(e) => settotalStock(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Discount %</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="2"
                  value={discount}
                  onChange={(e) => setdiscount(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>HSN code</label>
                <br />
                <input
                  type="text"
                  placeholder="UC00234"
                  style={{ margin: "0px 2px 0px 2px" }}
                  value={hsncode}
                  onChange={(e) => sethsncode(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Brand Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Dell"
                  value={brand}
                  onChange={(e) => setbrand(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Product Modal</label>
                <br />
                <input
                  type="text"
                  placeholder="Dell 2322"
                  style={{ margin: "0px 2px 0px 2px" }}
                  value={pmodel}
                  onChange={(e) => setpmodel(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="upload1">Image1</label>
                <br />
                <input
                  type="file"
                  id="upload1"
                  name="file"
                  accept="image/x-png,image/gif,image/jpeg,image/jpg"
                  style={{ border: "none" }}
                  onChange={(e) => setimg(e.target.files[0])}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="upload2">Image2</label>
                <br />
                <input
                  type="file"
                  id="upload2"
                  name="file"
                  accept="image/x-png,image/gif,image/jpeg,image/jpg"
                  style={{ border: "none" }}
                  onChange={(e) => setimg2(e.target.files[0])}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="upload1">Image3</label>
                <br />
                <input
                  type="file"
                  id="upload3"
                  name="file"
                  accept="image/x-png,image/gif,image/jpeg,image/jpg"
                  style={{ border: "none" }}
                  onChange={(e) => setimg3(e.target.files[0])}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="upload4">Image4</label>
                <br />
                <input
                  type="file"
                  id="upload4"
                  name="file"
                  accept="image/x-png,image/gif,image/jpeg,image/jpg"
                  style={{ border: "none" }}
                  onChange={(e) => setimg4(e.target.files[0])}
                />
              </div>
              <div className="col-md-12">
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
              <div className="col-md-9">
                <label>Specification</label>
                <br />
                <input
                  type="text"
                  placeholder="Add specification one by one"
                  value={point}
                  onChange={(e) => setpoint(e.target.value)}
                />
                {editdata?.specification?.map((ele, i) => {
                  return (
                    <p style={{ display: "flex" }}>
                      {i + 1}
                      {". "}
                      <span>{ele?.point}</span>{" "}
                      <span>
                        <RxCrossCircled
                          style={{
                            color: "red",
                            cursor: "pointer",
                            marginTop: "5px",
                          }}
                          onClick={() => RemoveSpecification(ele?._id)}
                        />
                      </span>
                    </p>
                  );
                })}
              </div>
              <div className="col-md-3">
                <br />
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => AddOneByOneSep()}
                  style={{ margin: "9px 0px 0px 8px" }}
                >
                  Add
                </button>
              </div>
              <div className="col-md-9">
                <label>How To Use</label>
                <br />
                <input
                  type="text"
                  placeholder="Add How To Use one by one"
                  value={point1}
                  onChange={(e) => setpoint1(e.target.value)}
                />
                {editdata?.howToUse?.map((ele, i) => {
                  return (
                    <p style={{ display: "flex" }}>
                      {i + 1}
                      {". "}
                      <span>{ele?.point1}</span>{" "}
                      <span>
                        <RxCrossCircled
                          style={{
                            color: "red",
                            cursor: "pointer",
                            marginTop: "5px",
                          }}
                          onClick={() => RemoveHowToUse(ele?._id)}
                        />
                      </span>
                    </p>
                  );
                })}
              </div>
              <div className="col-md-3">
                <br />
                <button
                  type="button"
                  class="btn btn-success"
                  style={{ margin: "9px 0px 0px 8px" }}
                  onClick={AddOneByOneHowtouse}
                >
                  Add
                </button>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{
                background: "white",
                color: "#080874",
                border: "1px solid #080874",
              }}
              onClick={handleeditClose}
            >
              Cancel
            </Button>
            <Button onClick={() => editService(editdata)}>Update</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={deleteShow} onHide={closeDeleteH} className="modal1111111">
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
            <Button variant="danger" onClick={closeDeleteH}>
              Cancel
            </Button>
            <Button variant="success" onClick={() => deleteProduct()}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Product;

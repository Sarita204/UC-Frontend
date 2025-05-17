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
import { Select, Option } from "@material-tailwind/react";

function Category1() {
  const Input = styled("input")({
    display: "none",
  });

  const [name, setname] = useState("");
  const [categoryid, setcategoryid] = useState("");

  const addSubcategory = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/addsubcategory",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        data: {
          name: name,
          categoryid: categoryid,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          getsubCategory();
          handleClose();
          alert("Sub Category Added");
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  const [Slno, setSlno] = useState(1);
  const [data1, setdata1] = useState([]);
  const [category, setcategory] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [editshow, seteditShow] = useState(false);
  const [editdata, seteditdata] = useState({});
  const handleeditClose = () => seteditShow(false);
  const handleeditShow = (row) => {
    seteditShow(true);
    seteditdata(row);
  };

  const getsubCategory = () => {
    axios
      .get("https://coorgtour.in/api/admin/getsubcategory")
      .then(function (response) {
        setdata1(response.data.SubCategory);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getsubCategory();
  }, []);

  //   console.log("nnnnvmvn", data1);

  const [cat, setcat] = useState([]);
  const getCategory = () => {
    axios
      .get("https://coorgtour.in/api/admin/getCategory")
      .then(function (response) {
        setcat(response.data.Category);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getCategory();
  }, []);

  const deleteCategory = async (id) => {
    axios({
      method: "delete",
      url: "https://coorgtour.in/api/admin/removesubcategory/" + id,
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
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: data1.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const columns = [
    {
      dataField: "categoryid.name",
      text: "Category",
      formatter: (value, row) => (
        <p>{row?.categoryid?.name ? row?.categoryid?.name : ""}</p>
      ),
    },
    {
      dataField: "name",
      text: "Sub Category",
      formatter: (value, row) => <p>{row.name ? row.name : ""}</p>,
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
            <i class="fas fa-pen-nib" style={{ color: "green" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => deleteCategory(row._id)}
          >
            <i class="fas fa-trash" style={{ color: "red" }}></i>
          </button>
        </>
      ),
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
          color: "#3b6f7c",
        }}
      >
        Sub Category
      </div>

      <Container>
        <div style={{ overflow: "hidden", overflowY: "auto" }}>
          <ToolkitProvider
            keyField="id"
            data={data1}
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
                  + Sub Category
                </Button>

                <hr></hr>
                <br></br>
                <div style={{ overflowX: "scroll", width: "934px" }}>
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
                color: "#3b6f7c",
              }}
            >
              Add Sub Category
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="add-pick mb-2">
                <label>Category</label>
                <div className="w-72">
                  <select
                    label="Select Category"
                    onChange={(e) => {
                      setcategoryid(e.target.value);
                    }}
                    style={{
                      width: "100%",
                      border: "2px solid #dee2e6",
                      height: "40px",
                      borderRadius: "5px",
                    }}
                  >
                    <option>Select</option>
                    {cat?.map((item) => {
                      return <option value={item?._id}>{item?.name}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="urban-o mb-2">
                <label>Sub Category</label>
                <br />

                <input
                  placeholder="Sub Category"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={(e) => addSubcategory(e)}>Add</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Category1;

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

function Category1() {
  const Input = styled("input")({
    display: "none",
  });
  const formdata = new FormData();
  const [name, setname] = useState("");
  const [img, setimg] = useState("");
  const [name1, setname1] = useState("");
  const [img1, setimg1] = useState();
  const [Slno, setSlno] = useState(1);
  const [data, setdata] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [url, seturl] = useState("");
  const [url1, seturl1] = useState("");

  const [editshow, seteditShow] = useState(false);
  const [editdata, seteditdata] = useState({});
  const handleeditClose = () => seteditShow(false);
  const handleeditShow = (row) => {
    seteditShow(true);
    seteditdata(row);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const addCategory = async () => {
    if (!name) {
      alert("Please enter the category name");
    } else if (!img) {
      alert("Please Select the Image");
    } else {
      formdata.append("name", name);
      formdata.append("url", url);
      formdata.append("img", img);
      try {
        const config = {
          url: "/addCategory",
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

  const editCategory = async () => {
    formdata.append("id", editdata?._id);
    formdata.append("name", name1 ? name1 : editdata?.name);
    formdata.append("url", url1 ? url1 : editdata?.ur);
    formdata.append("img", img1 ? img1 : editdata?.img);
    try {
      const config = {
        url: "/editCategory",
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
  };

  const getCategory = () => {
    axios
      .get("https://coorgtour.in/api/admin/getCategory")
      .then(function (response) {
        setdata(response.data.Category);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteCategory = async (id) => {
    axios({
      method: "post",
      url: "https://coorgtour.in/api/admin/deleteCategory/" + id,
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
  const columns = [
    {
      dataField: "name",
      text: "Category Name",
      formatter: (value, row) => <p>{row.name ? row.name : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },

    },


    {
      dataField: "img",
      text: "Image",
      formatter: (value, row) => (
        <img
          src={"https://coorgtour.in/Category/" + row?.img}
          alt=""
          width="50px"
          height="50px"
          onClick={() =>
            window.open("https://coorgtour.in/Category/" + row?.img)
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
            onClick={() => handleeditShow(row)}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => deleteCategory(row._id)}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },

    },
  ];

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
        Category
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
                  onClick={() => setShow(true)}
                  style={{
                    right: "20px",
                    position: "absolute",
                  }}
                >
                  + Add Category
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
              Add Category
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="urban-o mb-2">
                <label>Category Name</label>
                <br />

                <input
                  placeholder="Category Name"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>

              {/* <div className="urban-o mb-2">
                <label>URL</label>
                <br />
                <input
                  placeholder="URL"
                  onChange={(e)=>seturl(e.target.value)}
                />
              </div> */}

              <div className="urban-o mb-2">
                <label>Image</label>
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
            <Button onClick={addCategory}>Add</Button>
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
              Edit Category
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="urban-o mb-2">
                <label>Category Name</label>

                <input
                  placeholder={editdata?.name}
                  onChange={(e) => setname1(e.target.value)}
                />
              </div>

              {/* <div className="urban-o mb-2">
                <label>URL</label>
                <br />
                <input
                  placeholder="url"
                  onChange={(e)=>seturl1(e.target.value)}
                />
              </div> */}

              <Row className="mt-3">
                <div className="urban-o mb-2">Image</div>

                <div>
                  <label htmlFor="icon-button-file9">
                    <Input
                      accept="image/x-png,image/gif,image/jpeg,image/jpg"
                      id="icon-button-file9"
                      name="profilePic"
                      type="file"
                      required
                      onChange={(e) => setimg1(e.target.files[0])}
                    />
                    <img
                      src={
                        img1 === undefined
                          ? "https://coorgtour.in/Category/" + editdata?.img
                          : URL?.createObjectURL(img1)
                      }
                      alt=""
                      style={{
                        borderRadius: "50%",
                        width: "80px",
                        height: "80px",
                      }}
                    />
                    <IconButton
                      aria-label="upload picture"
                      component="span"
                      style={{ marginLeft: "55px", bottom: "40px" }}
                    >
                      <PhotoCameraIcon />*
                    </IconButton>
                  </label>
                </div>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" style={{
              border: "1px solid #080874 ",
              color: "#080874",
            }} onClick={handleeditClose}>
              Cancel
            </Button>
            <Button onClick={() => editCategory(editdata)}>Update</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Category1;

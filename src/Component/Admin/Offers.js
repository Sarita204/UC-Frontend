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
import moment from "moment/moment";

function Offers() {
  const Input = styled("input")({
    display: "none",
  });
  const formdata = new FormData();
  const [Msg, setMsg] = useState("");
  const [Discription, setDiscription] = useState("");
  const [type, settype] = useState("%");
  const [amount, setamount] = useState();
  const [Discription1, setDiscription1] = useState("");
  const [Msg1, setMsg1] = useState("");
  const [type1, settype1] = useState("");
  const [amount1, setamount1] = useState();
  const [Slno, setSlno] = useState(1);
  const [data, setdata] = useState([]);

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
    getOffers();
  }, []);

  const addOffers = async () => {
    if (!Msg || !Discription || !type || !amount) {
      alert("Please fill all the Details");
    } else {
      try {
        const config = {
          url: "/addOffers",
          method: "post",
          baseURL: "https://coorgtour.in/api/admin",
          data: {
            Msg: Msg,
            Discription: Discription,
            type: type,
            amount: amount,
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
    }
  };

  const editbaner = async () => {
    try {
      const config = {
        url: "/editOffers",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        data: {
          Msg: Msg1 ? Msg1 : editdata?.Msg,
          id: editdata?._id,
          Discription: Discription1 ? Discription1 : editdata?.Discription,
          type: type1 ? type1 : editdata?.type,
          amount: amount1 ? amount1 : editdata?.amount,
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

  const getOffers = () => {
    axios
      .get("https://coorgtour.in/api/admin/getOffers")
      .then(function (response) {
        setdata(response.data.Offers);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteOffers = async (id) => {
    axios({
      method: "post",
      url: "https://coorgtour.in/api/admin/deleteOffers/" + id,
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
      // <span classMsg="react-bootstrap-table-pagination-total">
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
      dataField: "createdAt",
      text: "Created Date",
      formatter: (value, row) => (
        <p>{row.createdAt ? moment(row.createdAt).format("DD/MM/YYYY") : ""}</p>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "Msg",
      text: "Msg",
      formatter: (value, row) => <p>{row.Msg ? row.Msg : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "Description",
      text: "Description",
      formatter: (value, row) => (
        <p>{row.Discription ? row.Discription : ""}</p>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "amount",
      text: "Amount",
      formatter: (value, row) => <p>{row.amount ? row.amount : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },

    },
    {
      dataField: "type",
      text: "Type",
      formatter: (value, row) => <p>{row.type ? row.type : ""}</p>,
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
            onClick={() => deleteOffers(row._id)}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },

    },
  ];

  console.log("data", Msg, Discription, type, amount);
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
        Offers
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
                  + Add Offers
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

        <Modal show={show} onHide={handleClose} classMsg="modal1111111">
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontWeight: 600,
                fontSize: "22px",
                color: "#080874",
              }}
            >
              Add Offers
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="urban-o mb-2">
                <label>Offers</label>
                <br />

                <input
                  placeholder="Msg"
                  onChange={(e) => setMsg(e.target.value)}
                />
              </div>
              <div className="urban-o mb-2">
                <label>Description</label>
                <br />

                <input
                  placeholder="Description"
                  onChange={(e) => setDiscription(e.target.value)}
                />
              </div>
              <div className="urban-o mb-2">
                <label>Amount</label> <br />
                <input
                  style={{
                    width: "80%",
                    borderRadius: "5px 0px 0px 5px",
                    borderRight: "none",
                  }}
                  placeholder="Amount"
                  onChange={(e) => setamount(e.target.value)}
                />
                <select
                  onChange={(e) => settype(e.target.value)}
                  style={{
                    borderRadius: "0px 5px 5px 0px",
                    padding: "9px 0px",
                    border: "2px solid #dee2e6",
                  }}
                >
                  <option value="%">%</option>
                  <option value="Rs">Rs</option>
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" style={{ background: "white", color: "#080874", border: "1px solid #080874" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={addOffers}>Add</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={editshow} onHide={handleeditClose} classMsg="modal1111111">
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontWeight: 600,
                fontSize: "22px",
                color: "#080874",
              }}
            >
              Edit Offers
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div>
                <label>Offers</label>
                <br />

                <input
                  placeholder={editdata?.Msg}
                  onChange={(e) => setMsg1(e.target.value)}
                />
              </div>
              <div className="urban-o mb-2">
                <label>Discription</label>
                <br />

                <input
                  placeholder={editdata?.Discription}
                  onChange={(e) => setDiscription1(e.target.value)}
                />
              </div>
              <div className="urban-o mb-2">
                <label>Amount</label> <br />
                <input
                  style={{
                    width: "80%",
                    borderRadius: "5px 0px 0px 5px",
                    borderRight: "none",
                  }}
                  placeholder={editdata?.amount}
                  onChange={(e) => setamount1(e.target.value)}
                />
                <select
                  onChange={(e) => settype1(e.target.value)}
                  style={{
                    borderRadius: "0px 5px 5px 0px",
                    padding: "9px 0px",
                    border: "2px solid #dee2e6",
                  }}
                >
                  <option value="%">%</option>
                  <option value="Rs">Rs</option>
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" style={{ background: "white", color: "#080874", border: "1px solid #080874" }} onClick={handleeditClose}>
              Cancel
            </Button>
            <Button onClick={() => editbaner(editdata)}>Update</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Offers;

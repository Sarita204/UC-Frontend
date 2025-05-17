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
import { FaEye, FaUserCircle } from "react-icons/fa";
import moment from "moment";

function VendorWallet() {
  const Input = styled("input")({
    display: "none",
  });


  const [data, setdata] = useState([]);

  const getallWallet = async () => {
    try {
      let res = await axios.get("https://coorgtour.in/api/vendor/allWalletOfdriver");
      if (res.status == 200) {

        setdata(res.data.success)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getallWallet();

  }, []);


  const [show1, setshow1] = useState(false);
  const showHandle1 = () => setshow1(true);
  const handleClose1 = () => setshow1(false);

  const [show2, setshow2] = useState(false);
  const showHandle2 = () => setshow2(true);
  const handleClose2 = () => setshow2(false);
  const [title, settitle] = useState("");
  const [amount, setamount] = useState("");
  const addAmountWallet = async (status) => {
    try {
      if (!title) return alert("Please enter title");
      if (!amount) return alert("Please enter amount")
      const config = {
        url: "/api/vendor/addTransaction",
        method: "put",
        baseURL: "https://coorgtour.in",
        headers: { "content-type": "application/json" },
        data: {
          vendorId: allTransaction?.vendorId, title: title, payId: `UC000${allTransaction?.transaction?.length + 1}`, amount: amount, status: status
        }
      }
      let res = await axios(config);
      if (res.status == 200) {
        alert(res.data.success);
        getallWallet()
        handleClose1()
        handleClose2()
        settitle("")
        setamount("")
      }
    } catch (error) {
      console.log(error);
    }
  }




  const customTotal = (from, to, size) => {

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
  const [allTransaction, setallTransaction] = useState({});
  const [show, setshow] = useState(false);
  const handleShow = () => setshow(true);
  const handleClose = () => setshow(false);




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
        getallWallet()
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
      dataField: "vendorId",
      text: "vendor Id",
      headerStyle: { backgroundColor: "#080874", color: "white", width: "250px" },

    },
    {
      dataField: "img",
      text: "Profile",
      formatter: (value, row) => (<>
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
        ) : (<FaUserCircle style={{
          color: "rgb(59 111 124)",
          textAlign: "center",
          width: "25px",
          height: "25px",
        }} />)}

      </>),
      headerStyle: { backgroundColor: "#080874", color: "white", width: "100px" },

    },
    {
      dataField: "vendorName",
      text: "Vendor Name",
      headerStyle: { backgroundColor: "#080874", color: "white", width: "300px" },

    },

    {
      dataField: "mobile",
      text: "Mobile No.",
      headerStyle: { backgroundColor: "#080874", color: "white", width: "200px" },

    },
    {

      text: "Total Amount",
      formatter: (value, row) => (<p>₹{row?.totalAmount?.toFixed(2)}</p>),
      headerStyle: { backgroundColor: "#080874", color: "white", width: "200px" },

    },

    {

      text: "Transaction",
      formatter: (value, row) => (<button type="button" class="btn btn" onClick={() => {
        setallTransaction(row);
        handleShow()
      }}><FaEye /></button>),
      headerStyle: { backgroundColor: "#080874", color: "white", width: "200px" },

    },
    {
      dataField: "Delete",
      text: "Action",
      formatter: (value, row) => (
        <div style={{ display: "flex", gap: "3px" }} >

          <button type="button" class="btn btn" style={{ background: "#080874", color: "white" }} onClick={() => {
            setallTransaction(row)
            showHandle1()
          }}>Add Amount</button>

          <button type="button" class="btn btn" style={{ background: "white", color: "#080874", border: "1px solid #080874 " }} onClick={() => {
            setallTransaction(row)
            showHandle2()
          }}>Deduct Amount</button>
        </div>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white", width: "185px" },

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
        Vendor Wallet
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

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontWeight: 600,
                fontSize: "22px",
                color: "#3b6f7c",
              }}
            >
              Transaction
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            {allTransaction?.transaction ? allTransaction.transaction.slice().reverse().map((item) => {
              return (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    {item?.status == "CR" ? (<h5 style={{ color: "green" }}>{item?.title}</h5>) : <h5 style={{ color: "red" }}>{item?.title}</h5>}
                    {item?.payId ? (<p>PayId:-{item?.payId}</p>) : (<></>)}

                  </div>
                  <div>
                    <p>{moment(item?.date).format("lll")}</p>
                  </div>
                  {item?.status == "CR" ? (<div style={{ color: "green" }}>
                    <h5> + {item?.amount?.toFixed(2)} Cr</h5>
                  </div>) : (<div style={{ color: "red" }}>
                    <h5> - {item?.amount?.toFixed(2)} Dr</h5>
                  </div>)}

                </div>
              )
            }) : []}

          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>
              Cancel
            </Button>

          </Modal.Footer>
        </Modal>

        <Modal
          show={show1}
          onHide={handleClose1}
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
              Add money to wallet
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="add-pick mb-2">
                <label>Title</label>
                <br />
                <input
                  type="text"
                  placeholder="Eg:-Add By Urban Company"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Price</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="Eg:-100"
                  value={amount}
                  onChange={(e) => setamount(e.target.value)}
                />
              </div>



            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose1}>
              Cancel
            </Button>
            <Button onClick={() => addAmountWallet("CR")}>Add Now</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={show2}
          onHide={handleClose2}
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
              Deduct money from wallet
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <div>
              <div className="add-pick mb-2">
                <label>Title</label>
                <br />
                <input
                  type="text"
                  placeholder="Eg:-Job Charge deduct by urban"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                />
              </div>
              <div className="add-pick mb-2">
                <label>Price</label>
                <br />
                <input
                  type="number"
                  min="1"
                  placeholder="Eg:-100"
                  value={amount}
                  onChange={(e) => setamount(e.target.value)}
                />
              </div>



            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose2}>
              Cancel
            </Button>
            <Button onClick={() => addAmountWallet("DR")}>Deduct Now</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default VendorWallet;

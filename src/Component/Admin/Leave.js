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
function Leave() {
  const Input = styled("input")({
    display: "none",
  });

  const [selectedLeaveDays, setSelectedLeaveDays] = useState([]);
  console.log(selectedLeaveDays);
  const leaveupdate = async () => {
    try {
      let res = await axios.get(
        "https://coorgtour.in/api/admin/getvendorleave"
      );
      if (res.status === 200) {
        setSelectedLeaveDays(res.data.success);
      }
    } catch (error) {
      console.error("Error fetching leave data", error);
    }
  };

  useEffect(() => {
    leaveupdate();
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
        value: selectedLeaveDays.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  //   const makeApproveAndHoldVendor = async (id, isBlock) => {
  //     try {
  //       const config = {
  //         url: "/api/user/makeBlockUnblockUser",
  //         method: "put",
  //         baseURL: "https://coorgtour.in",
  //         headers: { "content-type": "application/json" },
  //         data: {
  //           id: id,
  //           isBlock: isBlock,
  //         },
  //       };
  //       let res = await axios(config);
  //       if (res.status == 200) {
  //         alert(res.data.success);
  //         getallusers();
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
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
      dataField: "VendorName",
      text: "VendorName",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "230px",
      },
    },
    {
      dataField: "Fromdate",
      text: "Fromdate",
      formatter: (value, row, i) => (
        <p>{moment(row?.Fromdate).format("MMMM Do YYYY")}</p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "230px",
      },
    },

    {
      dataField: "Todate",
      text: "Todate",
      formatter: (value, row, i) => (
        <p>{moment(row?.Todate).format("MMMM Do YYYY")}</p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "230px",
      },
    },
    {
      dataField: "days",
      text: "days",
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "230px",
      },
    },
    {
      dataField: "Reason",
      text: "Reason",
      formatter: (value, row, i) => <p>{row?.Reason}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "230px",
      },
    },

    // {
    //   dataField: "status",
    //   text: "Status",
    //   formatter: (value, row) => (
    //     <p>
    //       {row?.isBlock == false ? (
    //         <span style={{ color: "green" }}>Un-Blocked</span>
    //       ) : (
    //         <span style={{ color: "red" }}>Blocked</span>
    //       )}
    //     </p>
    //   ),
    //   headerStyle: {
    //     backgroundColor: "#080874",
    //     color: "white",
    //     width: "100px",
    //   },
    // },
    // {
    //   dataField: "Delete",
    //   text: "Action",
    //   formatter: (value, row) => (
    //     <>
    //       {row?.isBlock == true ? (
    //         <button
    //           type="button"
    //           class="btn btn-success"
    //           onClick={() => makeApproveAndHoldVendor(row?._id, false)}
    //         >
    //           UnBlock
    //         </button>
    //       ) : (
    //         <button
    //           type="button"
    //           class="btn btn"
    //           style={{ background: "#080874", color: "white" }}
    //           onClick={() => makeApproveAndHoldVendor(row?._id, true)}
    //         >
    //           {" "}
    //           Block
    //         </button>
    //       )}
    //     </>
    //   ),
    //   headerStyle: {
    //     backgroundColor: "#080874",
    //     color: "white",
    //     width: "100px",
    //   },
    // },
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
        Leave
      </div>

      <Container>
        <div style={{ overflow: "hidden", overflowY: "auto" }}>
          <ToolkitProvider
            keyField="id"
            data={selectedLeaveDays}
            columns={columns}
            // rowClasses={rowClasses}
            search
            exportCSV
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} />
                {/* <span style={{ marginLeft: "10px" }}>
                  <lale>From</lale>
                  <input
                    type="date"
                    style={{ width: "auto", marginLeft: "6px" }}
                  />
                </span>
                <span style={{ marginLeft: "10px" }}>
                  <lale>To</lale>
                  <input
                    type="date"
                    style={{ width: "auto", marginLeft: "6px" }}
                  />
                </span> */}
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
    </div>
  );
}

export default Leave;

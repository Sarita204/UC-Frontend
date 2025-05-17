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
import { contextType } from "react-star-ratings";

function WebManagement() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
  };

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => {
    setShow3(true);
  };

  const [about, setAbout] = useState(true);
  const [Vision, setVision] = useState("");
  const [Choose, setChoose] = useState("");
  const [People, setPeople] = useState("");

  //get for About us
  const [data, setdata] = useState([]);
  const getAbout = () => {
    axios
      .get("https://coorgtour.in/api/admin/getAbout")
      .then(function (response) {
        setdata(response.data.About);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //get for visionmission and what we do
  const [data1, setdata1] = useState([]);
  const getvisionMission_WhatWeDo = async () => {
    try {
      let res = await axios.get(
        "https://coorgtour.in/api/admin/getAllVisionMission"
      );
      if (res.status == 200) {
        setdata1(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get for why choose us
  const [data2, setdata2] = useState([]);
  const getWhychooseus = () => {
    axios
      .get("https://coorgtour.in/api/admin/getWhychooseus")
      .then(function (response) {
        setdata2(response.data.Whychooseus);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //get for what people say
  const [data3, setdata3] = useState([]);
  const getWhatpeoplesay = () => {
    axios
      .get("https://coorgtour.in/api/admin/getWhatpeoplesay")
      .then(function (response) {
        setdata3(response.data.Whatpeoplesay);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // console.log("data", data);

  //Post for About
  const formdata = new FormData();
  const [editdata, seteditdata] = useState("");

  const [editshow, seteditShow] = useState(false);
  const handleeditClose = () => seteditShow(false);

  const handleeditShow = (row) => {
    seteditShow(true);
  };

  console.log("editdata", editdata);
  const [abtheader, setabtheader] = useState("");
  const [abtheader1, setabtheader1] = useState("");
  const [abtimg, setabtimg] = useState("");
  const [abtimg1, setabtimg1] = useState();
  const [abticon, setabticon] = useState("");
  const [abticon1, setabticon1] = useState("");
  const [abtdesc, setabtdesc] = useState("");
  const [abtdesc1, setabtdesc1] = useState("");

  const addAbout = async () => {
    formdata.append("abtheader", abtheader);
    formdata.append("abtimg", abtimg);
    formdata.append("abticon", abticon);
    formdata.append("abtdesc", abtdesc);
    try {
      const config = {
        url: "/addAbout",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert(res.data.success);
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  const editAbout = async () => {
    try {
      const config = {
        url: "/editAbout",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          id: editdata?._id,
          abtheader: abtheader1,
          abtimg: abtimg1,
          abticon: abticon1,
          abtdesc: abtdesc1,
        },
      };

      await axios(config).then(function (res) {
        if (res.status === 200) {
          alert("About Details Update");
          setabtheader1("");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to update Details");
    }
  };

  const deleteAbout = async (id) => {
    axios({
      method: "delete",
      url: "https://coorgtour.in/api/admin/deleteAbout/" + id,
    })
      .then(function (response) {
        window.location.reload();
        alert(response.data.Success);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  //post and put for VisionMission and What We Do
  const [visionMission, setvisionMission] = useState("");
  const [WhatWeDo, setWhatWeDo] = useState("");

  const [editdata1, seteditdata1] = useState({});
  // console.log(editdata1, "ifor")
  const [show10, setShow10] = useState(false);

  const handleClose10 = () => setShow10(false);
  const handleShow10 = () => setShow10(true);

  const addVisionWhatwedo = async () => {
    try {
      const config = {
        url: "/addVisionMission",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        data: {
          visionMission: visionMission,
          WhatWeDo: WhatWeDo,
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
  const editVisionWhatwedo = async () => {
    try {
      const config = {
        url: "/editVisionMission",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        data: {
          id: editdata1?._id,
          visionMission: visionMission,
          WhatWeDo: WhatWeDo,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert("Details Updated");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  const deleteVisionWhatwedo = async (id) => {
    axios({
      method: "delete",
      url: "https://coorgtour.in/api/admin/deleteVisionMission/" + id,
    })
      .then(function (response) {
        window.location.reload();
        alert(response.data.Success);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const [Header, setHeader] = useState("");
  const [Header1, setHeader1] = useState("");
  const [img, setimg] = useState("");
  const [img1, setimg1] = useState();
  const [title, settitle] = useState("");
  const [title1, settitle1] = useState("");
  const [desc, setdesc] = useState("");
  const [desc1, setdesc1] = useState("");

  const addWhychooseus = async () => {
    if (!Header || !img || !title || !desc) {
      return alert("Please fill all the fields");
    }
    try {
      const config = {
        url: "/addWhychooseus",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          Header: Header,
          title: title,
          desc: desc,
          img: img,
        },
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          alert(res.data.success);
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  //post and put for why choose us
  const [editshow2, seteditShow2] = useState(false);
  const [editdata2, seteditdata2] = useState({});
  // console.log(editdata2);
  const handleeditClose2 = () => seteditShow2(false);
  const handleeditShow2 = () => seteditShow2(true);

  const editWhychooseus = async () => {
    try {
      const formData = new FormData();
      formData.append("id", editdata2?._id);
      formData.append("Header", Header1);
      formData.append("title", title1);
      formData.append("desc", desc1);
      formData.append("img", img1);

      const config = {
        method: "put",
        url: "/editWhychooseus",
        baseURL: "https://coorgtour.in/api/admin",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };

      const response = await axios(config);
      if (response.status === 200) {
        alert("Details updated successfully");
        window.location.reload();
      } else {
        throw new Error("Failed to update details");
      }
    } catch (error) {
      console.error("Error while updating details:", error);
      alert("Unable to update details. Please try again later.");
    }
  };

  const deleteWhychooseus = async (id) => {
    axios({
      method: "delete",
      url: "https://coorgtour.in/api/admin/deleteWhychooseus/" + id,
    })
      .then(function (response) {
        window.location.reload();
        alert(response.data.Success);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const [Header9, setHeader9] = useState("");
  const [Header10, setHeader10] = useState("");
  const [img9, setimg9] = useState("");
  const [img10, setimg10] = useState();
  const [title9, settitle9] = useState("");
  const [title10, settitle10] = useState("");
  const [desc9, setdesc9] = useState("");
  const [desc10, setdesc10] = useState("");

  const addWhatpeoplesay = async () => {
    if (!Header9 || !title9 || !desc9 || !img9) {
      return alert("Please fill all the fields");
    }
    formdata.append("Header9", Header9);
    formdata.append("title9", title9);
    formdata.append("desc9", desc9);
    formdata.append("img9", img9);
    try {
      const config = {
        url: "/addWhatpeoplesay",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert(res.data.success);
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add Details");
    }
  };

  //post and put for What people say
  const [editshow3, seteditShow3] = useState(false);
  const [editdata3, seteditdata3] = useState({});
  // console.log(editdata3, "rgoerpge")
  const handleeditClose3 = () => seteditShow3(false);
  const handleeditShow3 = () => seteditShow3(true);

  const editWhatpeoplesay = async () => {
    try {
      const config = {
        url: "/editWhatpeoplesay",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          id: editdata3?._id,
          Header9: Header10,
          title9: title10,
          desc9: desc10,
          img9: img10,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          alert("Details update");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to update Details");
    }
  };

  const deleteWhatpeoplesay = async (id) => {
    axios({
      method: "delete",
      url: "https://coorgtour.in/api/admin/deleteWhatpeoplesay/" + id,
    })
      .then(function (response) {
        window.location.reload();
        alert(response.data.Success);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const [Slno, setSlno] = useState(1);

  useEffect(() => {
    getAbout();
    getvisionMission_WhatWeDo();
    getWhychooseus();
    getWhatpeoplesay();
  }, []);

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
  const options1 = {
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
        value: data1.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };
  const options2 = {
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
        value: data2.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };
  const options3 = {
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
        value: data3.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const columns = [
    {
      dataField: "abtimg",
      text: "Image",
      formatter: (value, row) => (
        <img
          src={"https://coorgtour.in/About/" + row?.abtimg}
          alt=""
          width="50px"
          height="50px"
          onClick={() =>
            window.open("https://coorgtour.in/About/" + row?.abtimg)
          }
        />
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },
    },
    {
      dataField: "abticon",
      text: "Icon",
      formatter: (value, row) => (
        <img
          src={"https://coorgtour.in/About/" + row?.abticon}
          alt=""
          width="50px"
          height="50px"
          onClick={() =>
            window.open("https://coorgtour.in/About/" + row?.abticon)
          }
        />
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },
    },
    {
      dataField: "abtheader",
      text: "Title",
      formatter: (value, row) => (
        <p>
          {parse(`<div>${row?.abtheader}</div>`)
            ? parse(`<div>${row?.abtheader}</div>`)
            : ""}
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },
    },
    {
      dataField: "abtdesc",
      text: " Description",
      formatter: (value, row) => (
        <p>
          {parse(`<div>${row?.abtdesc}</div>`)
            ? parse(`<div>${row?.abtdesc}</div>`)
            : ""}
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "300px",
      },
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
              handleeditShow(row);
            }}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => deleteAbout(row._id)}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },
    },
  ];

  const columns1 = [
    // {
    //   dataField: "visionMission",
    //   text: "Our Vision & Mission",
    //   formatter: (value, row) => (
    //     <p>
    //     Vision and Mission
    //     </p>
    //   ),
    //   headerStyle: { backgroundColor: "#080874", color: "white" },
    // },
    {
      dataField: "visionMission",
      text: "visionMission-Description",
      formatter: (value, row) => (
        <p>
          {parse(`<div>${row?.visionMission}</div>`)
            ? parse(`<div>${row?.visionMission}</div>`)
            : ""}
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "350px",
      },
    },

    // {
    //   dataField: "WhatWeDo",
    //   text: "What we do",
    //   formatter: (value, row) => (
    //     <p>

    //       What we do
    //     </p>
    //   ),
    //   headerStyle: { backgroundColor: "#080874", color: "white" },
    // },
    {
      dataField: "WhatWeDo",
      text: "What We Do-Description",
      formatter: (value, row) => (
        <p>
          {parse(`<div>${row?.WhatWeDo}</div>`)
            ? parse(`<div>${row?.WhatWeDo}</div>`)
            : ""}
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "350px",
      },
    },

    {
      dataField: "Delete",
      text: "Action",
      formatter: (value, row) => (
        <>
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => {
              seteditdata1(row);
              handleShow10(row);
            }}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => deleteVisionWhatwedo(row._id)}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "50px",
      },
    },
  ];

  const columns2 = [
    // {
    //   dataField: "Header",
    //   text: "Header",
    //   formatter: (value, row) => <p>{row?.Header ? row?.Header : ""}</p>,
    //   headerStyle: { backgroundColor: "#080874", color: "white" },
    // },
    {
      dataField: "img",
      text: "Image",
      formatter: (value, row) => (
        <img
          src={"https://coorgtour.in/Whychooseus/" + row?.img}
          alt=""
          width="50px"
          height="50px"
          onClick={() =>
            window.open("https://coorgtour.in/Whychooseus/" + row?.img)
          }
        />
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "title",
      text: " Title",
      formatter: (value, row) => (
        <p>
          {parse(`<div>${row?.title}</div>`)
            ? parse(`<div>${row?.title}</div>`)
            : ""}
        </p>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },

    {
      dataField: "desc",
      text: "Description",
      formatter: (value, row) => (
        <p>
          {parse(`<div>${row?.desc}</div>`)
            ? parse(`<div>${row?.desc}</div>`)
            : ""}
        </p>
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
            onClick={() => {
              seteditdata2(row);
              handleeditShow2();
            }}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => deleteWhychooseus(row._id)}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
  ];

  const columns3 = [
    {
      dataField: "Header9",
      text: "Name",
      formatter: (value, row) => <p>{row?.Header9 ? row?.Header9 : ""}</p>,
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },
    },
    {
      dataField: "title9",
      text: " Title",
      formatter: (value, row) => (
        <p>
          {parse(`<div>${row?.title9}</div>`)
            ? parse(`<div>${row?.title9}</div>`)
            : ""}
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "100px",
      },
    },
    {
      dataField: "img",
      text: "Image",
      formatter: (value, row) => (
        <img
          src={"https://coorgtour.in/Whatpeoplesay/" + row?.img9}
          alt=""
          width="50px"
          height="50px"
          onClick={() =>
            window.open("https://coorgtour.in/Whatpeoplesay/" + row?.img9)
          }
        />
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "50px",
      },
    },
    {
      dataField: "desc9",
      text: "Description",
      formatter: (value, row) => (
        <p>
          {parse(`<div>${row?.desc9}</div>`)
            ? parse(`<div>${row?.desc9}</div>`)
            : ""}
        </p>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "350px",
      },
    },

    {
      dataField: "Delete",
      text: "Action",
      formatter: (value, row) => (
        <>
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => {
              seteditdata3(row);
              handleeditShow3();
            }}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => deleteWhatpeoplesay(row._id)}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </>
      ),
      headerStyle: {
        backgroundColor: "#080874",
        color: "white",
        width: "50px",
      },
    },
  ];
  // CKSEditor
  const handleChange2 = (e, editor) => {
    const data = editor.getData();
    setabtdesc(data);
  };
  const handleChange = (e, editor) => {
    const data = editor.getData();
    setvisionMission(data);
  };
  const handleChange1 = (e, editor) => {
    const data = editor.getData();
    setWhatWeDo(data);
  };

  const handleChange3 = (e, editor) => {
    const data = editor.getData();
    setdesc(data);
  };
  const handleChange4 = (e, editor) => {
    const data = editor.getData();
    setdesc1(data);
  };
  const handleChange5 = (e, editor) => {
    const data = editor.getData();
    setdesc9(data);
  };
  const handleChange6 = (e, editor) => {
    const data = editor.getData();
    setdesc10(data);
  };
  const handleChange7 = (e, editor) => {
    const data = editor.getData();
    setabtdesc1(data);
  };

  return (
    <div>
      <Row>
        <div className="p-3 d-flex gap-3">
          <Button
            variant=""
            style={{ background: "#080874 ", color: "white" }}
            onClick={() => {
              setAbout(true);
              setVision(false);
              setChoose(false);
              setPeople(false);
            }}
          >
            About Us
          </Button>
          <Button
            variant=""
            style={{ background: "#080874 ", color: "white" }}
            onClick={() => {
              setAbout(false);
              setVision(true);
              setChoose(false);
              setPeople(false);
            }}
          >
            Vision and Mission
          </Button>
          <Button
            variant=""
            style={{ background: "#080874 ", color: "white" }}
            onClick={() => {
              setAbout(false);
              setVision(false);
              setChoose(true);
              setPeople(false);
            }}
          >
            Why Choose Us
          </Button>
          <Button
            variant=""
            style={{ background: "#080874 ", color: "white" }}
            onClick={() => {
              setAbout(false);
              setVision(false);
              setChoose(false);
              setPeople(true);
            }}
          >
            What People Say
          </Button>
        </div>
      </Row>

      {/* Considions */}

      {/* About us modal  */}
      {about ? (
        <>
          <div>
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
                About Us
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
                        {/* <SearchBar {...props.searchProps} /> */}
                        <Button
                          onClick={() => setShow(true)}
                          style={{
                            right: "20px",
                            position: "absolute",
                          }}
                        >
                          + Add About us
                        </Button>

                        <hr></hr>
                        <br></br>
                        <div style={{ overflowX: "scroll" }}>
                          <BootstrapTable
                            striped
                            hover
                            condensed
                            {...props.baseProps}
                            // pagination={paginationFactory(options)}
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
                >
                  <Modal.Header closeButton>
                    <Modal.Title
                      style={{
                        fontWeight: 600,
                        fontSize: "22px",
                        color: "#080874 ",
                      }}
                    >
                      Add About us
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ alignItems: "center" }}>
                    <div>
                      <div className="add-pick mb-2">
                        <label>Image</label>
                        <br />
                        <input
                          type="file"
                          accept="image/x-png,image/gif,image/jpeg,image/jpg"
                          style={{ border: "none" }}
                          onChange={(e) => setabtimg(e.target.files[0])}
                        />
                      </div>
                      <div className="add-pick mb-2">
                        <label>Icon</label>
                        <br />
                        <input
                          type="file"
                          accept="image/x-png,image/gif,image/jpeg,image/jpg"
                          style={{ border: "none" }}
                          onChange={(e) => setabticon(e.target.files[0])}
                        />
                      </div>
                      <div className="add-pick mb-2">
                        <label>Title</label>
                        <br />
                        <input
                          type="text"
                          placeholder="Enter the title"
                          //   accept="image/x-png,image/gif,image/jpeg,image/jpg"
                          style={{ border: "none" }}
                          onChange={(e) => setabtheader(e.target.value)}
                        />
                      </div>
                      <div className="add-pick mb-2">
                        <label>Description</label>
                        <br />
                        <CKEditor
                          editor={ClassicEditor}
                          data={editdata?.abtdesc}
                          onChange={handleChange2}
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
                    <Button
                      variant=""
                      style={{
                        border: "1px solid #080874 ",
                        color: "#080874",
                      }}
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button onClick={addAbout}>Add</Button>
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
                      Edit About us
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ alignItems: "center" }}>
                    <div>
                      <div className="add-pick mb-2">
                        <label>Image</label>
                        <br />
                        <input
                          type="file"
                          accept="image/x-png,image/gif,image/jpeg,image/jpg"
                          style={{ border: "none" }}
                          onChange={(e) => setabtimg1(e.target.files[0])}
                        />
                      </div>
                      <div className="add-pick mb-2">
                        <label>Icon</label>
                        <br />
                        <input
                          type="file"
                          accept="image/x-png,image/gif,image/jpeg,image/jpg"
                          style={{ border: "none" }}
                          onChange={(e) => setabticon1(e.target.files[0])}
                        />
                      </div>
                      <div className="add-pick mb-2">
                        <label>Title</label>
                        <br />
                        <input
                          type="text"
                          placeholder={editdata?.abtheader}
                          //   accept="image/x-png,image/gif,image/jpeg,image/jpg"

                          onChange={(e) => setabtheader1(e.target.value)}
                        />
                      </div>
                      <div className="add-pick mb-2">
                        <label>Description</label>
                        <br />
                        <CKEditor
                          editor={ClassicEditor}
                          data={editdata?.abtdesc}
                          onChange={handleChange7}
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
                    <Button
                      variant=""
                      style={{
                        border: "1px solid #080874 ",
                        color: "#080874",
                      }}
                      onClick={handleeditClose}
                    >
                      Cancel
                    </Button>
                    <Button onClick={editAbout}>Update</Button>
                  </Modal.Footer>
                </Modal>
              </Container>
            </div>
          </div>
        </>
      ) : (
        <>
          {Vision ? (
            <>
              <div>
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
                    Our Vision and Mission & What We Do
                  </div>

                  <Container>
                    <div style={{ overflow: "hidden", overflowY: "auto" }}>
                      <ToolkitProvider
                        keyField="id"
                        data={data1}
                        columns={columns1}
                        // rowClasses={rowClasses}
                        search
                        exportCSV
                      >
                        {(props) => (
                          <div>
                            {/* <SearchBar {...props.searchProps} /> */}

                            {data1?.length < 1 ? (
                              <>
                                {" "}
                                <Button
                                  onClick={() => setShow(true)}
                                  style={{
                                    right: "20px",
                                    position: "absolute",
                                  }}
                                >
                                  + Vision & Mission and What we
                                </Button>
                              </>
                            ) : (
                              <></>
                            )}

                            <hr></hr>
                            <br></br>
                            <div style={{ overflowX: "scroll" }}>
                              <BootstrapTable
                                striped
                                hover
                                condensed
                                {...props.baseProps}
                                // pagination={paginationFactory(options1)}
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
                    >
                      <Modal.Header closeButton>
                        <Modal.Title
                          style={{
                            fontWeight: 600,
                            fontSize: "22px",
                            color: "#080874 ",
                          }}
                        >
                          Add Our Vision and Mission
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ alignItems: "center" }}>
                        <div>
                          <div className="add-pick mb-2">
                            <label>Our Vision and Mission Description</label>
                            <br />
                            <CKEditor
                              editor={ClassicEditor}
                              data={editdata1?.visionMission}
                              onChange={handleChange}
                              onBlur={(event, editor) => {
                                console.log("Blur.", editor);
                              }}
                              onFocus={(event, editor) => {
                                console.log("Focus.", editor);
                              }}
                            />
                          </div>

                          <div className="add-pick mb-2">
                            <label>What We Do Description</label>
                            <br />
                            <CKEditor
                              editor={ClassicEditor}
                              data={editdata1?.WhatWeDo}
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
                        <Button
                          variant=""
                          style={{
                            border: "1px solid #080874 ",
                            color: "#080874",
                          }}
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                        <Button onClick={addVisionWhatwedo}>Add</Button>
                      </Modal.Footer>
                    </Modal>

                    <Modal
                      show={show10}
                      onHide={handleClose10}
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
                          Edit Our Vision and Mission
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ alignItems: "center" }}>
                        <div>
                          <div className="add-pick mb-2">
                            <label>Vision and Mission Description</label>
                            <br />
                            <CKEditor
                              editor={ClassicEditor}
                              data={editdata1?.visionMission}
                              onChange={handleChange}
                              onBlur={(event, editor) => {
                                console.log("Blur.", editor);
                              }}
                              onFocus={(event, editor) => {
                                console.log("Focus.", editor);
                              }}
                            />
                          </div>

                          <div className="add-pick mb-2">
                            <label>What We Do Description</label>
                            <br />
                            <CKEditor
                              editor={ClassicEditor}
                              data={editdata1?.WhatWeDo}
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
                        <Button
                          variant=""
                          style={{
                            border: "1px solid #080874 ",
                            color: "#080874",
                          }}
                          onClick={handleClose10}
                        >
                          Cancel
                        </Button>
                        <Button onClick={editVisionWhatwedo}>Update</Button>
                      </Modal.Footer>
                    </Modal>
                  </Container>
                </div>
              </div>
            </>
          ) : (
            <>
              {Choose ? (
                <>
                  <div>
                    <div>
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
                          Why Choose Us
                        </div>

                        <Container>
                          <div
                            style={{ overflow: "hidden", overflowY: "auto" }}
                          >
                            <ToolkitProvider
                              keyField="id"
                              data={data2}
                              columns={columns2}
                              // rowClasses={rowClasses}
                              search
                              exportCSV
                            >
                              {(props) => (
                                <div>
                                  <SearchBar {...props.searchProps} />

                                  {data.length >= 4 ? (
                                    <>
                                      <Button
                                        onClick={() => setShow(true)}
                                        style={{
                                          right: "20px",
                                          position: "absolute",
                                        }}
                                      >
                                        + Add Why Choose us
                                      </Button>
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  <hr></hr>
                                  <br></br>
                                  <div style={{ overflowX: "scroll" }}>
                                    <BootstrapTable
                                      striped
                                      hover
                                      condensed
                                      {...props.baseProps}
                                      pagination={paginationFactory(options2)}
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
                          >
                            <Modal.Header closeButton>
                              <Modal.Title
                                style={{
                                  fontWeight: 600,
                                  fontSize: "22px",
                                  color: "#080874 ",
                                }}
                              >
                                Add Why Choose us
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ alignItems: "center" }}>
                              <div>
                                <div className="add-pick mb-2">
                                  <label>Why Choose Us</label>
                                  <br />
                                  <input
                                    type="text"
                                    placeholder="Enter the Header"
                                    onChange={(e) => setHeader(e.target.value)}
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
                                  <label>Title</label>
                                  <br />
                                  <input
                                    type="text"
                                    placeholder="Enter the title"
                                    onChange={(e) => settitle(e.target.value)}
                                    //   value={name}
                                  />
                                </div>
                                <div className="add-pick mb-2">
                                  <label>Description</label>
                                  <br />
                                  <CKEditor
                                    editor={ClassicEditor}
                                    data={desc}
                                    onChange={handleChange3}
                                    onBlur={(event, editor) => {
                                      console.log("Blur.", editor);
                                    }}
                                    onFocus={(event, editor) => {
                                      console.log("Focus.", editor);
                                    }}
                                  />
                                </div>
                                {/* <div style={{ border: "1px solid lightgray" }}>
                                <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                      padding: "4px 0px",
                                    }}
                                  >
                                    <Button onClick={addWhychooseus}>+ Add</Button>
                                  </div>
                                </div>
                                <br /> */}
                                {/* <div>
                                  <table class="table table-bordered">
                                    <thead>
                                      <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Small heading</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <img src="/" alt="" />
                                        </td>
                                        <td>Small heading</td>
                                        <td>Description</td>
                                        <td>
                                          <button
                                            style={{
                                              border: "none",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <i
                                              class="fas fa-pen-nib"
                                              onClick={handleShow3}
                                              style={{ color: "#3B707F" }}
                                            ></i>
                                          </button>
                                          /
                                          <button
                                            style={{
                                              border: "none",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <i
                                              class="fas fa-trash"
                                              style={{ color: "#080874" }}
                                            ></i>
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div> */}
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant=""
                                style={{
                                  border: "1px solid #080874 ",
                                  color: "#080874",
                                }}
                                onClick={handleClose}
                              >
                                Cancel
                              </Button>
                              <Button onClick={addWhychooseus}>Add</Button>
                            </Modal.Footer>
                          </Modal>

                          <Modal
                            show={editshow2}
                            onHide={handleeditClose2}
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
                                Edit Why Choose us
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ alignItems: "center" }}>
                              <div>
                                {/* <div className="add-pick mb-2">
                                  <label>Why Choose Us</label>
                                  <br />
                                  <input
                                    type="text"
                                    placeholder={editdata2?.Header}
                                    // value={name}
                                    onChange={(e) => setHeader1(e.target.value)}
                                  />
                                </div> */}
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
                                  <label>Title</label>
                                  <br />
                                  <input
                                    type="text"
                                    placeholder={editdata2?.title}
                                    // value={name}
                                    onChange={(e) => settitle1(e.target.value)}
                                  />
                                </div>
                                <div className="add-pick mb-2">
                                  <label>Description</label>
                                  <br />
                                  <CKEditor
                                    editor={ClassicEditor}
                                    data={editdata2?.desc}
                                    onChange={handleChange4}
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
                              <Button
                                variant=""
                                style={{
                                  border: "1px solid #080874 ",
                                  color: "#080874",
                                }}
                                onClick={handleeditClose2}
                              >
                                Cancel
                              </Button>
                              <Button onClick={editWhychooseus}>Update</Button>
                            </Modal.Footer>
                          </Modal>
                        </Container>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {People ? (
                    <>
                      <div>
                        <div>
                          <div>
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
                                What People Say
                              </div>

                              <Container>
                                <div
                                  style={{
                                    overflow: "hidden",
                                    overflowY: "auto",
                                  }}
                                >
                                  <ToolkitProvider
                                    keyField="id"
                                    data={data3}
                                    columns={columns3}
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
                                          + Add What People Say
                                        </Button>

                                        <hr></hr>
                                        <br></br>
                                        <div style={{ overflowX: "scroll" }}>
                                          <BootstrapTable
                                            striped
                                            hover
                                            condensed
                                            {...props.baseProps}
                                            pagination={paginationFactory(
                                              options3
                                            )}
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
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title
                                      style={{
                                        fontWeight: 600,
                                        fontSize: "22px",
                                        color: "#080874 ",
                                      }}
                                    >
                                      Add What People Say
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body style={{ alignItems: "center" }}>
                                    <div>
                                      <div className="add-pick mb-2">
                                        <label>Name</label>
                                        <br />
                                        <input
                                          type="text"
                                          placeholder="Enter the Name"
                                          //   value={name}
                                          onChange={(e) =>
                                            setHeader9(e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="add-pick mb-2">
                                        <label>Title</label>
                                        <br />
                                        <input
                                          type="text"
                                          placeholder="Enter the Title"
                                          //   value={name}
                                          onChange={(e) =>
                                            settitle9(e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="add-pick mb-2">
                                        <label>Image</label>
                                        <br />
                                        <input
                                          type="file"
                                          accept="image/x-png,image/gif,image/jpeg,image/jpg"
                                          style={{ border: "none" }}
                                          onChange={(e) =>
                                            setimg9(e.target.files[0])
                                          }
                                        />
                                      </div>
                                      <div className="add-pick mb-2">
                                        <label>Description</label>
                                        <br />
                                        <CKEditor
                                          editor={ClassicEditor}
                                          data={desc9}
                                          onChange={handleChange5}
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
                                    <Button
                                      variant=""
                                      style={{
                                        border: "1px solid #080874 ",
                                        color: "#080874",
                                      }}
                                      onClick={handleClose}
                                    >
                                      Cancel
                                    </Button>
                                    <Button onClick={addWhatpeoplesay}>
                                      Add
                                    </Button>
                                  </Modal.Footer>
                                </Modal>

                                <Modal
                                  show={editshow3}
                                  onHide={handleeditClose3}
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
                                      Edit What people say
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body style={{ alignItems: "center" }}>
                                    <div>
                                      <div className="add-pick mb-2">
                                        <label>Name</label>
                                        <br />
                                        <input
                                          type="text"
                                          placeholder={editdata3?.Header9}
                                          //   value={name}
                                          onChange={(e) =>
                                            setHeader10(e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="add-pick mb-2">
                                        <label>Title</label>
                                        <br />
                                        <input
                                          type="text"
                                          placeholder={editdata3?.title9}
                                          //   value={name}
                                          onChange={(e) =>
                                            settitle10(e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="add-pick mb-2">
                                        <label>Image</label>
                                        <br />
                                        <input
                                          type="file"
                                          accept="image/x-png,image/gif,image/jpeg,image/jpg"
                                          style={{ border: "none" }}
                                          onChange={(e) =>
                                            setimg10(e.target.files[0])
                                          }
                                        />
                                      </div>
                                      <div className="add-pick mb-2">
                                        <label>Description</label>
                                        <br />
                                        <CKEditor
                                          editor={ClassicEditor}
                                          data={editdata3?.desc9}
                                          onChange={handleChange6}
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
                                    <Button
                                      variant=""
                                      style={{
                                        border: "1px solid #080874 ",
                                        color: "#080874",
                                      }}
                                      onClick={handleeditClose3}
                                    >
                                      Cancel
                                    </Button>
                                    <Button onClick={editWhatpeoplesay}>
                                      Update
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </Container>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default WebManagement;

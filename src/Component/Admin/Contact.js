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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Select, Option } from "@material-tailwind/react";
import parse from "html-react-parser";

const Contact = () => {
  const [Contact, setContact] = useState(true);
  const [Faq, setFaq] = useState("");
  const [Social, setSocial] = useState("");

  const [Slno, setSlno] = useState(1);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //get for contact
  const [data, setdata] = useState([]);
  const getContact = async () => {
    try {
      let res = await axios.get(
        "https://coorgtour.in/api/admin/getAllContactPage"
      );
      if (res.status == 200) {
        setdata(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get for faq
  const [data1, setdata1] = useState([]);
  const getFAQ = async () => {
    try {
      let res = await axios.get("https://coorgtour.in/api/admin/getAllFaq");
      if (res.status == 200) {
        setdata1(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get for SocialMedias
  const [data2, setdata2] = useState([]);
  const getSocialMedias = async () => {
    try {
      let res = await axios.get(
        "https://coorgtour.in/api/admin/getAllSocialMedias"
      );
      if (res.status == 200) {
        setdata2(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //post and put for contact
  const [Adress, setAdress] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");

  const [editshow, seteditShow] = useState(false);
  const [editdata, seteditdata] = useState({});
  const handleeditClose = () => seteditShow(false);
  const handleeditShow = () => seteditShow(true);

  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (input) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setemail(inputValue);
    setIsValidEmail(validateEmail(inputValue));
  };

  const addContact = async () => {
    if (!Adress) {
      return alert("Address is required !");
    }
    if (!mobile) {
      return alert("Mobile number is required !");
    }
    if (mobile.length !== 10) {
      return alert("Mobile number 10 digits is required !");
    }
    if (!isValidEmail) {
      return alert("Please enter a valid email address !");
    }
    try {
      const config = {
        url: "/addContactPage",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        data: {
          Adress: Adress,
          email: email,
          mobile: mobile,
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
  const editContact = async () => {
    // formdata.append("id", editdata?._id);
    // formdata.append("name", name1 ? name1 : editdata?.name);
    // formdata.append("tagline", tagline1 ? tagline1 : editdata?.tagline);
    // formdata.append("img", img1 ? img1 : editdata?.img);
    try {
      const config = {
        url: "/updatecontact",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        data: {
          id: editdata?._id,
          Adress: Adress,
          email: email,
          mobile: mobile,
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
  //post and put for FAQ
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");

  const [editshow1, seteditShow1] = useState(false);
  const [editdata1, seteditdata1] = useState({});
  const handleeditClose1 = () => seteditShow(false);
  const handleeditShow1 = (row) => {
    seteditShow1(true);
  };

  const addFaq = async () => {
    if (!question) {
      return alert("Question required !");
    }
    if (!answer) {
      return alert("Answer required !");
    }
    try {
      const config = {
        url: "/addFaq",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        data: {
          question: question,
          answer: answer,
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
  const editFaq = async () => {
    // formdata.append("id", editdata?._id);
    // formdata.append("name", name1 ? name1 : editdata?.name);
    // formdata.append("tagline", tagline1 ? tagline1 : editdata?.tagline);
    // formdata.append("img", img1 ? img1 : editdata?.img);
    try {
      const config = {
        url: "/updateFaq",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        data: {
          id: editdata1,
          question: question,
          answer: answer,
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
  //post and put for Social Medias
  const [MediaName, setMediaName] = useState("");
  const [MediaURL, setMediaURL] = useState("");

  const [editshow2, seteditShow2] = useState(false);
  const [editdata2, seteditdata2] = useState({});
  const handleeditClose2 = () => seteditShow2(false);
  const handleeditShow2 = (row) => {
    seteditShow2(true);
  };

  const addSocialMedias = async () => {
    if (!MediaName || !MediaURL) {
      return alert("Please all the fields");
    }
    try {
      const config = {
        url: "/addSocialMedias",
        method: "post",
        baseURL: "https://coorgtour.in/api/admin",
        data: {
          MediaName: MediaName,
          MediaURL: MediaURL,
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
  const editSocialMedias = async () => {
    // formdata.append("id", editdata?._id);
    // formdata.append("name", name1 ? name1 : editdata?.name);
    // formdata.append("tagline", tagline1 ? tagline1 : editdata?.tagline);
    // formdata.append("img", img1 ? img1 : editdata?.img);
    try {
      const config = {
        url: "/updateSocialMedias",
        method: "put",
        baseURL: "https://coorgtour.in/api/admin",
        data: {
          id: editdata2,
          MediaName: MediaName,
          MediaURL: MediaURL,
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

  const deleteContact = async (id) => {
    axios({
      method: "delete",
      url: "https://coorgtour.in/api/admin/deletecontact/" + id,
    })
      .then(function (response) {
        window.location.reload();
        alert(response.data.Success);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const deleteFAQ = async (id) => {
    axios({
      method: "delete",
      url: "https://coorgtour.in/api/admin/deleteFaq/" + id,
    })
      .then(function (response) {
        window.location.reload();
        alert(response.data.Success);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const deleteSocialMedia = async (id) => {
    axios({
      method: "delete",
      url: "https://coorgtour.in/api/admin/deleteSocialMedias/" + id,
    })
      .then(function (response) {
        window.location.reload();
        alert(response.data.Success);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getContact();
    getFAQ();
    getSocialMedias();
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

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  const columns = [
    {
      dataField: "Adress",
      text: "Address",
      formatter: (value, row) => <p>{row.Adress ? row.Adress : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },

    {
      dataField: "mobile",
      text: "Phone Number",
      formatter: (value, row) => <p>{row?.mobile ? row?.mobile : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },

    {
      dataField: "email",
      text: "E-Mail ID",
      formatter: (value, row) => <p>{row?.email ? row?.email : ""}</p>,
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
              seteditdata(row);
              handleeditShow();
            }}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => deleteContact(row._id)}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
  ];

  const columns1 = [
    {
      dataField: "question",
      text: "Question",
      formatter: (value, row) => (
        <p>
          {parse(`<div>${row?.question}</div>`)
            ? parse(`<div>${row?.question}</div>`)
            : ""}
        </p>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "answer",
      text: " Answer",
      formatter: (value, row) => (
        <p>
          {parse(`<div>${row?.answer}</div>`)
            ? parse(`<div>${row?.answer}</div>`)
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
              seteditdata1(row);
              handleeditShow1(row?._id);
            }}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => deleteFAQ(row._id)}
          >
            <i class="fas fa-trash" style={{ color: "#080874" }}></i>
          </button>
        </>
      ),
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
  ];

  const columns2 = [
    {
      dataField: "MediaName",
      text: "Social Media Name",
      formatter: (value, row) => <p>{row?.MediaName ? row?.MediaName : ""}</p>,
      headerStyle: { backgroundColor: "#080874", color: "white" },
    },
    {
      dataField: "MediaURL",
      text: "URL",
      formatter: (value, row) => <p>{row?.MediaURL ? row?.MediaURL : ""}</p>,
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
              handleeditShow2(row?._id);
            }}
          >
            <i class="fas fa-pen-nib" style={{ color: "#3B707F" }}></i>
          </button>
          /
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => deleteSocialMedia(row._id)}
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
    setquestion(data);
  };
  const handleChange1 = (e, editor) => {
    const data = editor.getData();
    setanswer(data);
  };

  // console.log("data", data);
  return (
    <div>
      <Row>
        <div className="p-3 d-flex gap-3">
          <Button
            variant=""
            style={{ background: "#080874 ", color: "white" }}
            onClick={() => {
              setContact(true);
              setFaq(false);
              setSocial(false);
            }}
          >
            Contact Us
          </Button>
          <Button
            variant=""
            style={{ background: "#080874 ", color: "white" }}
            onClick={() => {
              setContact(false);
              setFaq(true);
              setSocial(false);
            }}
          >
            FAQ
          </Button>
          <Button
            variant=""
            style={{ background: "#080874 ", color: "white" }}
            onClick={() => {
              setContact(false);
              setFaq(false);
              setSocial(true);
            }}
          >
            Social Media
          </Button>
          {/* <Button variant="" style={{ background: "#080874 ", color: "white" }} onClick={() => {
                        setAbout(false);
                        setVision(false);
                        setChoose(false);
                        setPeople(true);
                    }}>What People Say</Button> */}
        </div>
      </Row>

      {/* Considions */}

      {/* About us modal  */}
      {Contact ? (
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
                    Contact Us
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
                            <div></div>

                            {data.length < 1 ? (
                              <>
                                {" "}
                                <Button
                                  onClick={() => setShow(true)}
                                  style={{
                                    right: "20px",
                                    position: "absolute",
                                    top: "30%",
                                  }}
                                >
                                  + Add Contact Us
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
                    >
                      <Modal.Header closeButton>
                        <Modal.Title
                          style={{
                            fontWeight: 600,
                            fontSize: "22px",
                            color: "#080874 ",
                          }}
                        >
                          Add Contact Us
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ alignItems: "center" }}>
                        <div>
                          <div className="add-pick mb-2">
                            <label>Address</label>
                            <br />
                            <input
                              type="text"
                              placeholder=" Enter your Address"
                              onChange={(e) => setAdress(e.target.value)}
                            />
                          </div>

                          <div className="add-pick mb-2">
                            <label>Phone Number</label>
                            <br />
                            <input
                              type="number"
                              placeholder=" Enter your Phone Number"
                              onChange={(e) => setmobile(e.target.value)}
                            />
                          </div>

                          <div className="add-pick mb-2">
                            <label>E-Mail ID</label>
                            <br />
                            <input
                              type="email"
                              placeholder="Enter your E-mail Id"
                              onChange={handleEmailChange}
                              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                              required
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
                        <Button onClick={addContact}>Add</Button>
                      </Modal.Footer>
                    </Modal>

                    <Modal
                      show={editshow}
                      onHide={handleeditClose1}
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
                          Edit Contact Us
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ alignItems: "center" }}>
                        <div>
                          <div className="add-pick mb-2">
                            <label>Address</label>
                            <br />
                            <input
                              type="text"
                              placeholder={editdata?.Adress}
                              value={Adress}
                              onChange={(e) => setAdress(e.target.value)}
                            />
                          </div>

                          <div className="add-pick mb-2">
                            <label>Phone Number</label>
                            <br />
                            <input
                              type="text"
                              placeholder={editdata?.mobile}
                              value={mobile}
                              onChange={(e) => setmobile(e.target.value)}
                            />
                          </div>

                          <div className="add-pick mb-2">
                            <label htmlFor="email">E-Mail ID</label>
                            <br />
                            <input
                              type="email"
                              id="email"
                              size="30"
                              required
                              placeholder={editdata?.email}
                              value={email}
                              onChange={(e) => setemail(e.target.value)}
                            />
                          </div>

                          {/* <div className="add-pick mb-2">
                                                    <label>Message</label>
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
                          onClick={handleeditClose}
                        >
                          Cancel
                        </Button>
                        <Button onClick={editContact}>Update</Button>
                      </Modal.Footer>
                    </Modal>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {Faq ? (
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
                    FAQ
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
                            <Button
                              onClick={() => setShow(true)}
                              style={{
                                right: "20px",
                                position: "absolute",
                              }}
                            >
                              + Add FAQ
                            </Button>

                            <hr></hr>
                            <br></br>
                            <div style={{ overflowX: "scroll" }}>
                              <BootstrapTable
                                striped
                                hover
                                condensed
                                {...props.baseProps}
                                pagination={paginationFactory(options1)}
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
                          Add FAQ
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ alignItems: "center" }}>
                        <div>
                          <div className="add-pick mb-2">
                            <label>Question</label>
                            <br />
                            <CKEditor
                              editor={ClassicEditor}
                              data={question}
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
                            <label>Answer</label>
                            <br />
                            <CKEditor
                              editor={ClassicEditor}
                              data={answer}
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
                        <Button onClick={addFaq}>Add</Button>
                      </Modal.Footer>
                    </Modal>

                    <Modal
                      show={editshow1}
                      onHide={handleeditClose1}
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
                          Edit FAQ
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ alignItems: "center" }}>
                        <div>
                          <div className="add-pick mb-2">
                            <label>Question</label>
                            <br />
                            <CKEditor
                              editor={ClassicEditor}
                              data={editdata1?.question}
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
                            <label>Answer</label>
                            <br />
                            <CKEditor
                              editor={ClassicEditor}
                              data={editdata1?.answer}
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
                          onClick={handleeditClose}
                        >
                          Cancel
                        </Button>
                        <Button onClick={editFaq}>Update</Button>
                      </Modal.Footer>
                    </Modal>
                  </Container>
                </div>
              </div>
            </>
          ) : (
            <>
              {Social ? (
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
                        Social Media
                      </div>

                      <Container>
                        <div style={{ overflow: "hidden", overflowY: "auto" }}>
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
                                <Button
                                  onClick={() => setShow(true)}
                                  style={{
                                    right: "20px",
                                    position: "absolute",
                                  }}
                                >
                                  + Add Social Media
                                </Button>

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
                              Add Social Media
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body style={{ alignItems: "center" }}>
                            <div>
                              <div className="add-pick mb-2">
                                <label>Select Social Media</label>
                                <br />
                                <select
                                  className="form-control"
                                  onChange={(e) => setMediaName(e.target.value)}
                                >
                                  <option>Select</option>
                                  <option value="Whatsapp">Whatsapp</option>
                                  <option value="FaceBook">FaceBook</option>
                                  <option value="Twitter">Twitter</option>
                                  <option value="Instagram">Instagram</option>
                                </select>
                              </div>
                              <div className="add-pick mb-2">
                                <label>URL</label>
                                <br />
                                <input
                                  type="text"
                                  placeholder="Social media url"
                                  onChange={(e) => setMediaURL(e.target.value)}
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
                            <Button onClick={addSocialMedias}>Add</Button>
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
                              Edit Social Media
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body style={{ alignItems: "center" }}>
                            <div>
                              <div className="add-pick mb-2">
                                <label>Select Social Media</label>
                                <br />
                                <select
                                  className="form-control"
                                  onChange={(e) => setMediaName(e.target.value)}
                                >
                                  <option>Select</option>
                                  <option value="Whatsapp">Whatsapp</option>
                                  <option value="FaceBook">FaceBook</option>
                                  <option value="Twitter">Twitter</option>
                                  <option value="Instagram">Instagram</option>
                                </select>
                              </div>
                              <div className="add-pick mb-2">
                                <label>URL</label>
                                <br />
                                <input
                                  type="text"
                                  placeholder="Social media url"
                                  value={MediaURL}
                                  onChange={(e) => setMediaURL(e.target.value)}
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
                            <Button onClick={editSocialMedias}>Update</Button>
                          </Modal.Footer>
                        </Modal>
                      </Container>
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
    </div>
  );
};

export default Contact;

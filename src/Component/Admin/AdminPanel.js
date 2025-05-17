import React from "react";
import Header from "./Header";
import { Box } from "@mui/material";
import Sidebar1 from "./Sidebar1";
import { Col, Container, Row } from "react-bootstrap";

function AdminPanel({ children }) {
  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Sidebar1 />
        <Container>
          <Row>
            <Col>
              <div>{children}</div>
              {/* <div
                style={{
                  color: "#fff",
                  bottom: "0",
                  position: "fixed",
                  //   backgroundColor: "#f8f8f8",
                  backgroundColor: "#3b6f7c ",
                  width: "84%",
                  padding: "10px",
                  margin: "10px",
                  textAlign: "center",
                  zIndex: "999",
                }}
              >
                Copyright © 2023 Designed & Developed By Parnets Group
              </div> */}
            </Col>
          </Row>
        </Container>
      </Box>
    </>
  );
}

export default AdminPanel;

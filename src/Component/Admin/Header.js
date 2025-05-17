import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

function Header() {
  


  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const AdminLogout = () => {
    sessionStorage.removeItem("admin");
    window.location.assign("/admin");
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#080874",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img
          src="/Images/logo.jpg"
          style={{ width: "153px", height: "84px", padding:"10px 30px"}}
        />
        <div style={{ backgroundColor: "", padding: "22px 20px" }}>
          {/* <img
            style={{ width: "40px", height: "40px", borderRadius: "75px" }}
            onClick={handleClick}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ0q_kXbyLuTCYZ4-shDACysWtJ7uTxakzigjMw7bKa_HZeiumEjjPBelTPTT5fx5yOsg&usqp=CAU"
          /> */}
          <button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{
              color: "#080874",
              backgroundColor: "#fffeea",
              border: "none",
              fontWeight: "bold",
              padding:"6px 10px",
              borderRadius:"4px"
            }}
          >
            {admin?.name}
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {/* <MenuItem style={{ fontSize: "14px" }}>My Profile</MenuItem> */}
            <MenuItem style={{ fontSize: "14px" }} onClick={AdminLogout}>
              Log out
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
}

export default Header;

import React, { useState } from "react";
import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { TfiLayoutSlider } from "react-icons/tfi";
import { LuNetwork } from "react-icons/lu";
import { MdOutlineMyLocation } from "react-icons/md";
import { MdHub } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { MdCategory } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { RiServiceFill } from "react-icons/ri";
import { IoTime } from "react-icons/io5";
import { FaCheckToSlot } from "react-icons/fa6";
import { SiTrustedshops } from "react-icons/si";
import { MdWorkspacePremium } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa6";
import { MdContactPage } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { TiVendorAndroid } from "react-icons/ti";
import { TbBrandBooking } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaWallet } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";

function Sidebar1() {
  return (
    <ProSidebarProvider>
      <Sidebar>
        <Menu>
          <MenuItem
            component={<Link to="/admin/dashbord" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <img
              src="../images/logo.jpg"
              style={{
                width: "25px",
                margin: "0px 5px 0 auto",
                alignItems: "center",
                textAlign: "center",
              }}
            />
            Dashbord
          </MenuItem>
          <div
            style={{ display: "flex", padding: "0px 20px" }}
            className="sub-menu"
          >
            <span style={{ margin: "7px -20px 0px 0px" }}>
              <MdAdminPanelSettings
                style={{
                  width: " 25px",
                  height: "25px",
                  margin: "0px 5px 0 -8px",
                  alignItems: "center",
                  color: "white",
                  textAlign: "center",
                }}
              />
            </span>
            <SubMenu
              label="Sub-Admin"
              style={{
                color: "transparent",
                textShadow: "0 0 0 red",
                color: "white",
                fontWeight: "bold",
              }}
            >
              <MenuItem
                component={<Link to="/admin/Createsubadmin" />}
                // style={{ color: "white", fontWeight: "bold" }}
              >
                Creation
              </MenuItem>
              <MenuItem
                component={<Link to="/admin/Subadmindetails" />}
                // style={{ color: "white", fontWeight: "bold" }}
              >
                Details
              </MenuItem>
            </SubMenu>
          </div>
          <MenuItem
            component={<Link to="/admin/Banner" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <TfiLayoutSlider
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Banner
          </MenuItem>

          <MenuItem
            component={<Link to="/admin/Createhub" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <LuNetwork
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Create Hub
          </MenuItem>

          <MenuItem
            component={<Link to="/admin/Pincodelist" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <MdOutlineMyLocation
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Pincode List
          </MenuItem>

          <MenuItem
            component={<Link to="/admin/Ourhub" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <MdHub
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Our Hub
          </MenuItem>

          <MenuItem
            component={<Link to="/admin/webmanagement" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <RxDashboard
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Web Management
          </MenuItem>

          <MenuItem
            component={<Link to="/admin/Category" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <MdCategory
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Category
          </MenuItem>
          {/* <MenuItem
            component={<Link to="/admin/sub-category" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            Sub-Category
          </MenuItem> */}
          <MenuItem
            component={<Link to="/admin/Offers" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <BiSolidOffer
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Offers
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/Service" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <RiServiceFill
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Service
          </MenuItem>
          {/* <MenuItem
            component={<Link to="/admin/Protiming" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
           <IoTime style={{margin: "0px 4px 0 0px",width:" 25px",height: "20px"}}/>
           Pro Timing
          </MenuItem> */}
          {/* <MenuItem
            component={<Link to="/admin/Slotbooking" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
          <FaCheckToSlot style={{margin: "0px 4px 0 0px",width:" 25px",height: "20px"}}/>
           Slot Booking
          </MenuItem> */}
          <MenuItem
            component={<Link to="/admin/Trusted" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <SiTrustedshops
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Trusted
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/Counts" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <SiTrustedshops
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Statistics Count
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/Prorequest" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <IoMdContact
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Pro Request
          </MenuItem>
          {/* <MenuItem
            component={<Link to="/admin/job-packages" />}
            style={{ color: "white", fontWeight: "bold" }}
          > 
          <MdWorkspacePremium style={{margin: "0px 4px 0 0px",width:" 25px",height: "20px"}}/>
            Job Package
          </MenuItem> */}
          <MenuItem
            component={<Link to="/admin/Products" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <FaProductHunt
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Products
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/users" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <IoMdContact
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Users
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/Contact" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <MdContactPage
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Contact us
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/vendors" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <TiVendorAndroid
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Vendors
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/leave" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <TiVendorAndroid
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Leave
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/order" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <TbBrandBooking
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Service Booking
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/product-orders" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <MdProductionQuantityLimits
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Product Booking
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/vendor-wallet" />}
            style={{ color: "white", fontWeight: "bold" }}
          >
            <FaWallet
              style={{
                margin: "0px 4px 0 0px",
                width: " 25px",
                height: "20px",
              }}
            />
            Vendor Wallets
          </MenuItem>
        </Menu>
      </Sidebar>
    </ProSidebarProvider>
  );
}

export default Sidebar1;

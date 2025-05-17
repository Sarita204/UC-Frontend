import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Header from "./Component/Header";
import "animate.css";
import Category from "./Component/Category";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Component/Login";
import Otp from "./Component/Otp";
import Register from "./Component/Register";
import Profile from "./Component/Profile";
import ViewCart from "./Component/ViewCart";
import About from "./Component/About";
import Footer from "./Component/Footer";
import AdminLogin from "./Component/Admin/AdminLogin";
import AdminPanel from "./Component/Admin/AdminPanel";
import Dashboard from "./Component/Admin/Dashboard";
import Createsubadmin from "./Component/Admin/Createsubadmin";
import Subadmindetails from "./Component/Admin/Subadmindetails";
import Banner from "./Component/Admin/Banner";
import Category1 from "./Component/Admin/Category1";
import Offers from "./Component/Admin/Offers";
import Service from "./Component/Admin/Service";
import SubCategory from "./Component/Admin/SubCategory";
import Address from "./Component/Address";
import Order from "./Component/Admin/Order";
import TermsCondition from "./Component/TermsCondition";
import Vendor from "./Component/Admin/Vendor";
import Users from "./Component/Admin/Users";
import VendorWallet from "./Component/Admin/VendorWallet";
import Product from "./Component/Admin/Product";
import ProductOrder from "./Component/Admin/ProductOrder";
import Subscription from "./Component/Admin/Subscription";
import Services from "./Component/Services";
import Contactus from "./Component/Contactus";
import Checkout from "./Component/Checkout";
import LoginCheckout from "./Component/LoginCheckout";
import OrderDetails from "./Component/OrderDetails";
import CreateHub from "./Component/Admin/CreateHub";
import PincodeList from "./Component/Admin/PincodeList";
import OurHub from "./Component/Admin/OurHub";
import WebManagement from "./Component/Admin/WebManagement";
import Contact from "./Component/Admin/Contact";
import ProTiming from "./Component/Admin/ProTiming";
import SlotBooking from "./Component/Admin/SlotBooking";
import Trusted from "./Component/Admin/Trusted";
import ProRequest from "./Component/Admin/ProRequest";
import StaticCount from "./Component/Admin/StaticCount";
import DemoDescription from "./Component/DemoDescription";
import StoreReducer from "./Component/StoreReducer";
import PrivacyPolicy from "./Component/PrivacyPolicy";
import Chat from "./Component/Chat";
import AdminChat from "./Component/Admin/AdminChat";
import Leave from "./Component/Admin/Leave";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <Header />
                <Home />
                <Category />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            exact
            element={
              <>
                <Header />
                <Login />
              </>
            }
          />
          <Route
            path="/Privacy_Policy"
            exact
            element={
              <>
                <PrivacyPolicy />
              </>
            }
          />
          <Route
            path="/otp"
            exact
            element={
              <>
                <Header />
                <Otp />
              </>
            }
          />
          <Route
            path="/register"
            exact
            element={
              <>
                <Header />
                <Register />
              </>
            }
          />
          <Route
            path="/profile"
            exact
            element={
              <>
                <Header />
                <Profile />
                <Footer />
              </>
            }
          />
          <Route
            path="/Chat"
            exact
            element={
              <>
                <Header />
                <Chat />
                <Footer />
              </>
            }
          />
          <Route
            path="/orderdetails"
            exact
            element={
              <>
                <Header />
                <OrderDetails />
                <Footer />
              </>
            }
          />
          <Route
            path="/services"
            exact
            element={
              <>
                <Header />
                <Services />
                <Footer />
              </>
            }
          />
          <Route
            path="/contactus"
            exact
            element={
              <>
                <Header />
                <Contactus />
                <Footer />
              </>
            }
          />
          <Route
            path="/checkout"
            exact
            element={
              <>
                <Header />
                <Checkout />
                <Footer />
              </>
            }
          />
          <Route
            path="/logincheckout"
            exact
            element={
              <>
                <Header />
                <LoginCheckout />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            exact
            element={
              <>
                <Header />
                <About />
                <Footer />
              </>
            }
          />
          <Route
            path="/view-cart"
            exact
            element={
              <>
                <Header />
                <ViewCart />
                <Footer />
              </>
            }
          />
          <Route
            path="/address-slot"
            exact
            element={
              <>
                <Header />
                <Address />
                <Footer />
              </>
            }
          />
          <Route
            path="/termsconditions"
            exact
            element={
              <>
                <Header />
                <TermsCondition />
                <Footer />
              </>
            }
          />

          {/* Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/adminPanel" element={<AdminPanel />}></Route>
          <Route
            path="admin/dashbord"
            element={<AdminPanel children={<Dashboard />} />}
          ></Route>
          <Route
            path="admin/Createsubadmin"
            element={<AdminPanel children={<Createsubadmin />} />}
          ></Route>
          <Route
            path="admin/Chat"
            element={<AdminPanel children={<AdminChat />} />}
          ></Route>
          <Route
            path="admin/Subadmindetails"
            element={<AdminPanel children={<Subadmindetails />} />}
          ></Route>
          <Route
            path="admin/Banner"
            element={<AdminPanel children={<Banner />} />}
          ></Route>
          <Route
            path="admin/CreateHub"
            element={<AdminPanel children={<CreateHub />} />}
          ></Route>
          <Route
            path="admin/PincodeList"
            element={<AdminPanel children={<PincodeList />} />}
          ></Route>
          <Route
            path="admin/OurHub"
            element={<AdminPanel children={<OurHub />} />}
          ></Route>
          <Route
            path="admin/WebManagement"
            element={<AdminPanel children={<WebManagement />} />}
          ></Route>
          <Route
            path="admin/vendors"
            element={<AdminPanel children={<Vendor />} />}
          ></Route>
          <Route
            path="admin/users"
            element={<AdminPanel children={<Users />} />}
          ></Route>
          <Route
            path="admin/vendor-wallet"
            element={<AdminPanel children={<VendorWallet />} />}
          ></Route>
          <Route
            path="admin/Category"
            element={<AdminPanel children={<Category1 />} />}
          ></Route>
          <Route
            path="admin/Sub-category"
            element={<AdminPanel children={<SubCategory />} />}
          ></Route>
          <Route
            path="admin/Products"
            element={<AdminPanel children={<Product />} />}
          ></Route>
          <Route
            path="admin/Contact"
            element={<AdminPanel children={<Contact />} />}
          ></Route>
          <Route
            path="admin/Offers"
            element={<AdminPanel children={<Offers />} />}
          ></Route>
          <Route
            path="admin/Service"
            element={<AdminPanel children={<Service />} />}
          ></Route>
          <Route
            path="admin/Protiming"
            element={<AdminPanel children={<ProTiming />} />}
          ></Route>
          <Route
            path="admin/Slotbooking"
            element={<AdminPanel children={<SlotBooking />} />}
          ></Route>
          <Route
            path="admin/Trusted"
            element={<AdminPanel children={<Trusted />} />}
          ></Route>
          <Route
            path="admin/Counts"
            element={<AdminPanel children={<StaticCount />} />}
          ></Route>
          <Route
            path="admin/Prorequest"
            element={<AdminPanel children={<ProRequest />} />}
          ></Route>
          <Route
            path="admin/job-packages"
            element={<AdminPanel children={<Subscription />} />}
          ></Route>
          <Route
            path="admin/order"
            element={<AdminPanel children={<Order />} />}
          ></Route>
          <Route
            path="admin/product-orders"
            element={<AdminPanel children={<ProductOrder />} />}
          ></Route>
          <Route
            path="admin/leave"
            element={<AdminPanel children={<Leave />} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

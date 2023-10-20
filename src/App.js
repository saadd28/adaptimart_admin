import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Screens/Login/Login";
import AdminDashboard from "./Screens/AdminDashboard/AdminDashboard";
// import Navbar from "./Compnents/Navbar/Navbar";
import Products from "./Screens/Products/Products";
import ProductDetails from "./Screens/ProductDetails/ProductDetails";
import Users from "./Screens/Users/Users";
import Orders from "./Screens/Orders/Orders";
import Inventory from "./Screens/Inventory/Inventory";
import Suppliers from "./Screens/Suppliers/Suppliers";
import Coupons from "./Screens/Coupons/Coupons";
import Shipments from "./Screens/Shipments/Shipments";
import Returns from "./Screens/Returns/Returns";
import ScrollToTop from "./Compnents/ScrollToTop/ScrollToTop";

function App() {
  // const currentPath = window.location.pathname;

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin_dashboard" element={<AdminDashboard />} />
          <Route path="/manage_products" element={<Products />} />
          <Route path="/product_details" element={<ProductDetails />} />
          <Route path="/manage_users" element={<Users />} />
          <Route path="/manage_orders" element={<Orders />} />
          <Route path="/manage_inventory" element={<Inventory />} />
          <Route path="/manage_supplier" element={<Suppliers />} />
          <Route path="/manage_coupons" element={<Coupons />} />
          <Route path="/manage_shipments" element={<Shipments />} />
          <Route path="/manage_returns" element={<Returns />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

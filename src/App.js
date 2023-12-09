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
import SupplierDetails from "./Screens/SupplierDetails/SupplierDetails";
import ShipmentDetails from "./Screens/ShipmentDetails/ShipmentDetails";
import OrderDetailsView from "./Screens/OrderDetailsView/OrderDetailsView";
import EditOrderDetails from "./Screens/EditOrderDetails/EditOrderDetails";
import EditInventory from "./Screens/EditInventory/EditInventory";
import CouponDetails from "./Screens/CouponDetails/CouponDetails";
import EditReturnDetails from "./Screens/EditReturnDetails/EditReturnDetails";

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
          <Route path="/view_order_details" element={<OrderDetailsView />} />
          <Route path="/edit_order_details" element={<EditOrderDetails />} />
          <Route path="/manage_inventory" element={<Inventory />} />
          <Route path="/edit_inventory" element={<EditInventory />} />
          <Route path="/manage_supplier" element={<Suppliers />} />
          <Route path="/supplier_details" element={<SupplierDetails />} />
          <Route path="/manage_coupons" element={<Coupons />} />
          <Route path="/coupon_details" element={<CouponDetails />} />
          <Route path="/manage_shipments" element={<Shipments />} />
          <Route path="/shipment_details" element={<ShipmentDetails />} />
          <Route path="/manage_returns" element={<Returns />} />
          <Route path="/edit_return_details" element={<EditReturnDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

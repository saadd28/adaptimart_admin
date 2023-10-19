import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Screens/Login/Login";
import AdminDashboard from "./Screens/AdminDashboard/AdminDashboard";
// import Navbar from "./Compnents/Navbar/Navbar";
import Products from "./Screens/Products/Products";
import ProductDetails from "./Screens/ProductDetails/ProductDetails";

function App() {
  // const currentPath = window.location.pathname;

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin_dashboard" element={<AdminDashboard />} />
          <Route path="/manage_products" element={<Products />} />
          <Route path="/product_details" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

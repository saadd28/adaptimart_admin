import Navbar from "../../Compnents/Navbar/Navbar";
import "./ProductDetails.css";

import React from "react";
// import ProductDetailsHeader from "./ProductDetailsHeader/ProductDetailsHeader";
import ProductDetailsForm from "./ProductDetailsForm/ProductDetailsForm";

export default function ProductDetails() {
  return (
    <>
      <div className="dashboard_box">
        {/* MANAGE PRODUCTS IS NOT BEING HIGHLIGHTED */}
        <Navbar />

        <div className="product_details_main_container">
          {/* <ProductDetailsHeader /> */}
          <ProductDetailsForm />
        </div>
      </div>
    </>
  );
}

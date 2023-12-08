import Navbar from "../../Compnents/Navbar/Navbar";
import "./SupplierDetails.css";

import React from "react";
import SupplierDetailsForm from "./SupplierDetailsForm/SupplierDetailsForm";

export default function SupplierDetails() {
  return (
    <>
      <div className="dashboard_box">
        {/* MANAGE PRODUCTS IS NOT BEING HIGHLIGHTED */}
        <Navbar />

        <div className="product_details_main_container">
          {/* <ProductDetailsHeader /> */}
          <SupplierDetailsForm />
        </div>
      </div>
    </>
  );
}

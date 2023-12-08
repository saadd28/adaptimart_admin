import React from "react";
import Navbar from "../../Compnents/Navbar/Navbar";
import ShipmentDetailsForm from "./ShipmentDetailsForm/ShipmentDetailsForm";

export default function ShipmentDetails() {
  return (
    <>
      <div className="dashboard_box">
        {/* MANAGE PRODUCTS IS NOT BEING HIGHLIGHTED */}
        <Navbar />

        <div className="product_details_main_container">
          {/* <ProductDetailsHeader /> */}
          <ShipmentDetailsForm />
        </div>
      </div>
    </>
  );
}

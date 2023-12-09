import Navbar from "../../Compnents/Navbar/Navbar";
import "./CouponDetails.css";

import React from "react";
import CouponDetailsForm from "./CouponDetailsForm/CouponDetailsForm";

export default function CouponDetails() {
  return (
    <>
      <div className="dashboard_box">
        {/* MANAGE PRODUCTS IS NOT BEING HIGHLIGHTED */}
        <Navbar />

        <div className="product_details_main_container">
          {/* <ProductDetailsHeader /> */}
          <CouponDetailsForm />
        </div>
      </div>
    </>
  );
}

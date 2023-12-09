import React from "react";
import Navbar from "../../Compnents/Navbar/Navbar";
import CouponsTable from "./CouponsTable/CouponsTable";

export default function Coupons() {
  return (
    <>
      <div className="dashboard_box">
        <Navbar />
        
        <div className="products_main_container">
            {/* <ProductHeader /> */}

            <CouponsTable />
        </div>

      </div>
    </>
  );
}

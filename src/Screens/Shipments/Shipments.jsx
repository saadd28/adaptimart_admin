import React from "react";
import Navbar from "../../Compnents/Navbar/Navbar";
import ShipmentsTable from "./ShipmentsTable/ShipmentsTable";

export default function Shipments() {
  return (
    <>
      <div className="dashboard_box">
        <Navbar />

        <div className="products_main_container">
          {/* <ProductHeader /> */}

          <ShipmentsTable />
        </div>
      </div>
    </>
  );
}

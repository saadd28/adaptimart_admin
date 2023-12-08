import React from "react";
import Navbar from "../../Compnents/Navbar/Navbar";
import SuppliersTable from "./SuppliersTable/SuppliersTable";

export default function Suppliers() {
  return (
    <>
      <div className="dashboard_box">
        <Navbar />

        <div className="products_main_container">
          {/* <ProductHeader /> */}

          <SuppliersTable />
        </div>
      </div>
    </>
  );
}

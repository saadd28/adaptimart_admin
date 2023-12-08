import React from "react";
import Navbar from "../../Compnents/Navbar/Navbar";
import InventoryTable from "./InventoryTable/InventoryTable";

export default function Inventory() {
  return (
    <>
      <div className="dashboard_box">
        <Navbar />

        <div className="products_main_container">
          {/* <ProductHeader /> */}

          <InventoryTable />
        </div>
      </div>
    </>
  );
}

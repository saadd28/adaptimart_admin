import React from "react";
import Navbar from "../../Compnents/Navbar/Navbar";

export default function Returns() {
  return (
    <>
      <div className="dashboard_box">
        <Navbar />

        <div className="products_main_container">
            {/* <ProductHeader /> */}

            <ProductTable />
        </div>
      </div>
    </>
  );
}

import Navbar from "../../Compnents/Navbar/Navbar";
import ProductHeader from "./ProductHeader/ProductHeader";
import ProductTable from "./ProductTable/ProductTable";
import "./Products.css";

import React from "react";

export default function Products() {
  return (
    <>
      <div className="dashboard_box">
        <Navbar />

        <div className="products_main_container">
            <ProductHeader />

            <ProductTable />
        </div>
      </div>
    </>
  );
}

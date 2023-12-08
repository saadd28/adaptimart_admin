import React from "react";
import Navbar from "../../Compnents/Navbar/Navbar";
import OrdersTable from "./OrdersTable/OrdersTable";

export default function Orders() {
  return (
    <>
      <div className="dashboard_box">
        <Navbar />

        <div className="products_main_container">
          {/* <ProductHeader /> */}

          <OrdersTable />
        </div>
      </div>
    </>
  );
}

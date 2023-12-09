import React from "react";
import Navbar from "../../Compnents/Navbar/Navbar";
import UsersTable from "./UsersTable/UsersTable";

export default function Users() {
  return (
    <>
      <div className="dashboard_box">
        <Navbar />

        <div className="products_main_container">
          {/* <ProductHeader /> */}

          <UsersTable />
        </div>
      </div>
    </>
  );
}

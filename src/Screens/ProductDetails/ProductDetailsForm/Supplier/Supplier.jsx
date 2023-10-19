import "./Supplier.css";

import React from "react";

export default function Supplier() {
  return (
    <>
      <div className="product_details_form_general_section">
        <div className="product_details_form_heading">Supplier</div>

        <div className="product_details_form_body">
          <div className="product_details_form_input_container">
            <div className="product_details_form_input_label">
              Supplier Name
            </div>

            <input type="text" className="product_details_form_input" />
          </div>
        </div>
      </div>
    </>
  );
}

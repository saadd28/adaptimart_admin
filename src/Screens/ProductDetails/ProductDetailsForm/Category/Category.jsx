import "./Category.css";

import React from "react";

export default function Category() {
  return (
    <>
      <div className="product_details_form_general_section">
        <div className="product_details_form_heading">Category</div>

        <div className="product_details_form_body">
          <div className="product_details_form_input_container">
            <div className="product_details_form_input_label">
              Category Name
            </div>

            <input type="text" className="product_details_form_input" />
          </div>
          <div className="product_details_form_input_container">
            <div className="product_details_form_input_label">
              Sub Category (if any)
            </div>

            <input type="text" className="product_details_form_input" />
          </div>
        </div>
      </div>
    </>
  );
}

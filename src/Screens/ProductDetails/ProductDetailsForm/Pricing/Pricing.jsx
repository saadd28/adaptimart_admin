import "./Pricing.css";

import React from "react";

export default function Pricing() {
  return (
    <>
      <div className="product_details_form_general_section">
        <div className="product_details_form_heading">Pricing</div>

        <div className="product_details_form_body">
          <div className="product_details_form_input_container">
            <div className="product_details_form_input_label">Base Price</div>

            <input type="number" className="media_image_upload_input" />
          </div>
          <div className="product_details_form_input_container">
            <div className="product_details_form_input_label">Item Discount</div>

            <input type="number" className="media_image_upload_input" />
          </div>
        </div>
      </div>
    </>
  );
}

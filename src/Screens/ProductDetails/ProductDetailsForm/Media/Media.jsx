import { AdminAddProductMediaBG } from "../../../../Assets";
import "./Media.css";

import React from "react";

export default function Media() {
  return (
    <>
      <div className="product_details_form_general_section">
        <div className="product_details_form_heading">Media</div>

        <div className="product_details_form_body">
          <div className="product_details_form_input_container">
            <div className="product_details_form_input_label">Photo</div>

            <div className="media_image_upload_container">
              <img
                src={AdminAddProductMediaBG}
                alt=""
                className="media_image_upload_bg_img"
              />

              <input type="file" className="media_image_upload_input" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

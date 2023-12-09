import { useNavigate } from "react-router-dom";
import { AdminDirectoryPathArrow, AdminProfilePic } from "../../../Assets";
import "./CouponDetailsForm.css";

import React from "react";
import { Fade } from "react-reveal";

export default function CouponDetailsForm() {
  const navigate = useNavigate();
  return (
    <>
      <Fade top>
        {/* Product Details Header */}
        <div className="prod_head_title_container">
          <div className="prod_head_title">Coupon Details</div>

          <img
            src={AdminProfilePic}
            alt=""
            className="prod_head_profile_pic_img"
          />
        </div>

        <div className="prod_head_add_prod_container">
          <div className="prod_head_dir_path_container">
            <div className="prod_head_dir_path_content">Dashboard</div>

            <img
              src={AdminDirectoryPathArrow}
              alt=""
              className="prod_head_dir_path_arrow_img"
            />

            <div className="prod_head_dir_path_content">Manage Coupons</div>
            <img
              src={AdminDirectoryPathArrow}
              alt=""
              className="prod_head_dir_path_arrow_img"
            />
            <div
              className="prod_head_dir_path_content"
              style={{
                color: "#667085",
              }}
            >
              Coupon Details
            </div>
          </div>

          <div className="product_details_header_buttons_container">
            <button
              className="product_details_header_cancel_btn"
              onClick={() => {
                navigate("/manage_coupons");
              }}
            >
              Cancel
            </button>

            <button
              className="prod_head_add_product_btn"
              onClick={() => {
                // saveproduct();
                navigate("/manage_coupons");
              }}
            >
              Save Coupon
            </button>
          </div>
        </div>
        {/* End Coupon Details Header */}
      </Fade>
      <Fade right>
        <div className="product_details_form_box">
          <div className="product_details_form_general_section">
            <div className="product_details_form_heading">
              Coupon Information
            </div>

            <div className="product_details_form_body">
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Coupon Code
                </div>

                <input
                  type="text"
                  className="product_details_form_input"
                  // value={Name}
                  // onChange={(event) => {
                  //     //   console.log("scsc");
                  //     //   const { name, value } = event.target;
                  //   //   setProduct({
                  //   //     ...product,
                  //   //     [name]: value,
                  //   //   });

                  //   setName((Name = event.target.value));
                  //   // data.name = Name;
                  //   // console.log("Name", data.name);
                  //   // onDataUpdate(data);
                  // }}
                />
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Discount Percentage
                </div>

                <input type="number" className="product_details_form_input" />
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Coupon Description
                </div>

                <textarea
                  name="description"
                  id="description"
                  // cols="30"
                  rows="8"
                  className="product_details_form_input"
                  // value={Description}
                  // onChange={(e) => {
                  //   setDescription((Description = e.target.value));
                  //   // data.description = Description;
                  //   // console.log("Description", data.description);
                  //   // onDataUpdate(data);
                  // }}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}

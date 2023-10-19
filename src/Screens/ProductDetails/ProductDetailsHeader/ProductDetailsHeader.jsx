import { useNavigate } from "react-router-dom";
import { AdminDirectoryPathArrow, AdminProfilePic } from "../../../Assets";
import "./ProductDetailsHeader.css";

import React from "react";

export default function ProductDetailsHeader() {
  const navigate = useNavigate();
  return (
    <>
      <div className="prod_head_title_container">
        <div className="prod_head_title">Product Details</div>

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

          <div className="prod_head_dir_path_content">Manage Products</div>
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
            Product Details
          </div>
        </div>

        <div className="product_details_header_buttons_container">
          <button
            className="product_details_header_cancel_btn"
            onClick={() => {
              navigate("/manage_products");
            }}
          >
            Cancel
          </button>

          <button
            className="prod_head_add_product_btn"
            onClick={() => {
              navigate("/product_details");
            }}
          >
            Save Product
          </button>
        </div>
      </div>
    </>
  );
}

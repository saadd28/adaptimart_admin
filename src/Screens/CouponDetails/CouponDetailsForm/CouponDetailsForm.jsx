import { useLocation, useNavigate } from "react-router-dom";
import { AdminDirectoryPathArrow, AdminProfilePic } from "../../../Assets";
import "./CouponDetailsForm.css";

import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import { addcoupon, updatecoupon } from "../../../api/apis";

export default function CouponDetailsForm() {
  let [CouponCode, setCouponCode] = useState("");
  let [CouponDescription, setCouponDescription] = useState("");
  let [DiscountPercentage, setDiscountPercentage] = useState(0.0);
  let [CouponID, setCouponID] = useState(0);

  const [UpdateCoupon, setUpdateCoupon] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let edit_coupon_data = null;

  useEffect(() => {
    edit_coupon_data = location.state ? location.state.datatosend : null;

    if (edit_coupon_data !== null) {
      console.log("edit_coupon_data", edit_coupon_data);

      setUpdateCoupon(true);
      setCouponCode((CouponCode = edit_coupon_data.code));
      setCouponDescription((CouponDescription = edit_coupon_data.description));
      setDiscountPercentage(
        (DiscountPercentage = edit_coupon_data.discount_percentage)
      );

      setCouponID((CouponID = edit_coupon_data.id));
    }
  }, [location.state]);

  const savecoupon = () => {
    
    if (UpdateCoupon === true) {
      let formData = {
        code: CouponCode,
        description: CouponDescription,
        discount_percentage: DiscountPercentage,
        id: CouponID,
      };
      console.log("formData", formData);
      updatecoupon(formData)
        .then((response) => {
          if (response.status === 200) {
            navigate("/manage_coupons");
            alert("Coupon Updated Successfully");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error Updating Coupon:", error);
        });
      setUpdateCoupon(false);
    } else {
      let formData = {
        code: CouponCode,
        description: CouponDescription,
        discount_percentage: DiscountPercentage,
      };
      console.log("formData", formData);
      addcoupon(formData)
        .then((response) => {
          if (response.status === 200) {
            navigate("/manage_coupons");
            alert("Coupon Added Successfully");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error adding coupon:", error);
        });
    }
  };

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
                savecoupon();
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
                  value={CouponCode}
                  onChange={(event) => {
                    setCouponCode((CouponCode = event.target.value));
                  }}
                />
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Discount Percentage
                </div>

                <input
                  type="number"
                  className="product_details_form_input"
                  value={DiscountPercentage}
                  onChange={(event) => {
                    setDiscountPercentage(
                      (DiscountPercentage = event.target.value)
                    );
                  }}
                />
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Coupon Description
                </div>

                <textarea
                  name="description"
                  id="description"
                  rows="8"
                  className="product_details_form_input"
                  value={CouponDescription}
                  onChange={(e) => {
                    setCouponDescription((CouponDescription = e.target.value));
                  }}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}

import { useLocation, useNavigate } from "react-router-dom";
import {
  AdaptiMartLogoCart,
  AdminDirectoryPathArrow,
  AdminProfilePic,
  ViewOrderCustomerIcon,
  ViewOrderDateIcon,
  ViewOrderEmailIcon,
  ViewOrderLocationIcon,
  ViewOrderPaymentIcon,
  ViewOrderPhoneIcon,
  ViewOrderShippingIcon,
} from "../../Assets";
import Navbar from "../../Compnents/Navbar/Navbar";
import "./EditInventory.css";

import React, { useState } from "react";
import { Fade } from "react-reveal";
import { updateproductstock } from "../../api/apis";

export default function EditInventory() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state ? location.state.datatosend : null;
  let [AvailableStock, setAvailableStock] = useState(0);

  const saveInventory = () => {
    let formData = {
      available: AvailableStock,
      id: data.id ? data.id : 0,
    };
    console.log("formData", formData);
    updateproductstock(formData)
      .then((response) => {
        if (response.status === 200) {
          navigate("/manage_inventory");
          alert("Inventory Updated Successfully");
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error In Updating Inventory:", error);
      });
  };

  return (
    <>
      <div className="dashboard_box">
        <Navbar />

        <div className="products_main_container">
          {/* Order Details Header */}
          <Fade top>
            <div className="prod_head_box">
              <div className="prod_head_title_container">
                <div className="prod_head_title">Edit Inventory</div>

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

                  <div
                    className="prod_head_dir_path_content"
                    style={{
                      color: "#667085",
                    }}
                  >
                    Manage Inventory
                  </div>

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
                    Edit Inventory
                  </div>
                </div>

                <div className="product_details_header_buttons_container">
                  <button
                    className="product_details_header_cancel_btn"
                    onClick={() => {
                      navigate("/manage_inventory");
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    className="prod_head_add_product_btn"
                    onClick={() => {
                      saveInventory();

                      navigate("/manage_inventory");
                    }}
                  >
                    Save Inventory
                  </button>
                </div>
              </div>
            </div>
          </Fade>

          {/* End Product Header */}
          <Fade right>
            <div className="edit_inventory_main_container">
              <div className="edit_inventory_product_details">
                <div className="edit_inventory_product_details_title">
                  Product Details
                </div>

                <div className="edit_inventory_product_details_header">
                  <img
                    src={AdaptiMartLogoCart}
                    alt=""
                    className="edit_inventory_product_details_img"
                  />

                  <div className="edit_inventory_product_details_header_title_container">
                    <div className="edit_inventory_product_details_header_title_container_product_name">
                      {data.name}
                    </div>
                    <div className="edit_inventory_product_details_header_title_container_skuid">
                      SKU ID: {data.id}
                    </div>
                  </div>
                </div>

                <div className="edit_inventory_stock_container">
                  <div className="edit_inventory_stock_infocard_container">
                    <div className="edit_inventory_stock_infocard_title">
                      Available
                    </div>
                    <div className="edit_inventory_stock_infocard_count">
                      {data.available}
                    </div>
                  </div>
                  <div className="edit_inventory_stock_infocard_container">
                    <div className="edit_inventory_stock_infocard_title">
                      Pending
                    </div>
                    <div className="edit_inventory_stock_infocard_count">
                      {data.pending}
                    </div>
                  </div>
                  <div className="edit_inventory_stock_infocard_container">
                    <div className="edit_inventory_stock_infocard_title">
                      In Delivery
                    </div>
                    <div className="edit_inventory_stock_infocard_count">
                      {data.in_delivery}
                    </div>
                  </div>
                  <div className="edit_inventory_stock_infocard_container">
                    <div className="edit_inventory_stock_infocard_title">
                      Delivered
                    </div>
                    <div className="edit_inventory_stock_infocard_count">
                      {data.delivered}
                    </div>
                  </div>
                  <div className="edit_inventory_stock_infocard_container">
                    <div className="edit_inventory_stock_infocard_title">
                      Returning
                    </div>
                    <div className="edit_inventory_stock_infocard_count">
                      {data.returning}
                    </div>
                  </div>
                  <div className="edit_inventory_stock_infocard_container">
                    <div className="edit_inventory_stock_infocard_title">
                      Damaged
                    </div>
                    <div className="edit_inventory_stock_infocard_count">
                      {data.damaged}
                    </div>
                  </div>
                </div>
              </div>
              <div className="edit_inventory_update_container">
                <div className="edit_inventory_product_details_title">
                  Update Inventory
                </div>
                <div className="product_details_form_input_container">
                  <div className="product_details_form_input_label">
                    Available
                  </div>

                  <input
                    type="number"
                    className="product_details_form_input"
                    value={AvailableStock}
                    onChange={(e) => {
                      setAvailableStock((AvailableStock = e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
}

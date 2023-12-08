import { Fade } from "react-reveal";
import { AdminDirectoryPathArrow, AdminProfilePic } from "../../../Assets";
import "./ShipmentDetailsForm.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShipmentDetailsForm() {
  const navigate = useNavigate();
  let [Name, setName] = useState("");
  let [SupplierName, setSupplierName] = useState("");
  let [Status, setStatus] = useState("");



  const saveshipment = () => {
    // const formData = new FormData();
    // formData.append("id", ID);
    // formData.append("name", Name);
    // formData.append("description", Description);
    // formData.append("image", Image);
    // formData.append("price", Price);
    // formData.append("discount", Discount);
    // formData.append("category", Category);
    // formData.append("sub_category", SubCategory);
    // console.log("formData", formData);
    // if (UpdateProduct === true) {
    //   updateproduct(formData)
    //     .then((response) => {
    //       // Handle the response from the server if needed
    //       // console.log("response", response);
    //       // console.log("File uploaded successfully");
    //       if (response.status === 200) {
    //         navigate(-1);
    //         alert("Product Updated Successfully");
    //       }
    //     })
    //     .catch((error) => {
    //       // Handle any errors
    //       console.error("Error uploading file:", error);
    //     });
    //   setUpdateProduct(false);
    // } else {
    //   addproduct(formData)
    //     .then((response) => {
    //       // Handle the response from the server if needed
    //       // console.log("response", response);
    //       // console.log("File uploaded successfully");
    //       if (response.status === 200) {
    //         navigate(-1);
    //         alert("Product Added Successfully");
    //       }
    //     })
    //     .catch((error) => {
    //       // Handle any errors
    //       console.error("Error uploading file:", error);
    //     });
    // }
  };

  return (
    <>
      <Fade top>
        {/* Product Details Header */}
        <div className="prod_head_title_container">
          <div className="prod_head_title">Shipment Details</div>

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

            <div className="prod_head_dir_path_content">Manage Shipments</div>
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
              Shipment Details
            </div>
          </div>

          <div className="product_details_header_buttons_container">
            <button
              className="product_details_header_cancel_btn"
              onClick={() => {
                navigate("/manage_shipments");
              }}
            >
              Cancel
            </button>

            <button
              className="prod_head_add_product_btn"
              onClick={() => {
                saveshipment();

                //   navigate("/product_details");
              }}
            >
              Save Shipment
            </button>
          </div>
        </div>
        {/* End Product Details Header */}
      </Fade>

      <Fade right>
        {/* GENERAL */}
        <div className="product_details_form_box">
          <div className="product_details_form_general_section">
            <div className="product_details_form_heading">
              General Information
            </div>

            <div className="product_details_form_body">
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Shipment Name
                </div>

                <input
                  type="text"
                  value={Name}
                  className="product_details_form_input"
                  onChange={(event) => {
                    //   console.log("scsc");
                    //   const { name, value } = event.target;
                    //   setProduct({
                    //     ...product,
                    //     [name]: value,
                    //   });

                    setName((Name = event.target.value));
                    // data.name = Name;
                    // console.log("Name", data.name);
                    // onDataUpdate(data);
                  }}
                />
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Supplier Name
                </div>

                <input
                  name="supplier_name"
                  id="supplier_name"
                  // cols="30"
                  value={SupplierName}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setSupplierName((SupplierName = e.target.value));
                    // data.description = Description;
                    // console.log("Description", data.description);
                    // onDataUpdate(data);
                  }}
                />
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Shipment Status
                </div>

                <input
                  name="shipment_status"
                  id="shipment_status"
                  // cols="30"
                  value={Status}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setStatus(
                      (Status = e.target.value)
                    );
                    // data.description = Description;
                    // console.log("Description", data.description);
                    // onDataUpdate(data);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}

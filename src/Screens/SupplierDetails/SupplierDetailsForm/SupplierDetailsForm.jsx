import { Fade } from "react-reveal";
import { AdminDirectoryPathArrow, AdminProfilePic } from "../../../Assets";
import "./SupplierDetailsForm.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SupplierDetailsForm() {
    const navigate = useNavigate();
    let [Name, setName] = useState("");
    let [ContactName, setContactName] = useState("");
    let [ContactDesignation, setContactDesignation] = useState("");
    let [Address, setAddress] = useState("");
    let [City, setCity] = useState("");
    let [State, setState] = useState("");
    let [Country, setCountry] = useState("");
    let [PostalCode, setPostalCode] = useState("");



    const savesupplier = () => {
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
          <div className="prod_head_title">Supplier Details</div>

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

            <div className="prod_head_dir_path_content">Manage Suppliers</div>
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
              Supplier Details
            </div>
          </div>

          <div className="product_details_header_buttons_container">
            <button
              className="product_details_header_cancel_btn"
              onClick={() => {
                navigate("/manage_supplier");
              }}
            >
              Cancel
            </button>

            <button
              className="prod_head_add_product_btn"
              onClick={() => {
                savesupplier();

                //   navigate("/product_details");
              }}
            >
              Save Supplier
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
                  Supplier Name
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
                  Contact Name
                </div>

                <input
                  name="contact_name"
                  id="contact_name"
                  // cols="30"
                  value={ContactName}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setContactName((ContactName = e.target.value));
                    // data.description = Description;
                    // console.log("Description", data.description);
                    // onDataUpdate(data);
                  }}
                />
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Contact Designation
                </div>

                <input
                  name="contact_designation"
                  id="contact_designation"
                  // cols="30"
                  value={ContactDesignation}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setContactDesignation((ContactDesignation = e.target.value));
                    // data.description = Description;
                    // console.log("Description", data.description);
                    // onDataUpdate(data);
                  }}
                />
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Address
                </div>

                <input
                  name="address"
                  id="address"
                  // cols="30"
                  value={Address}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setAddress((Address = e.target.value));
                    // data.description = Description;
                    // console.log("Description", data.description);
                    // onDataUpdate(data);
                  }}
                />
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  City
                </div>

                <input
                  name="city"
                  id="city"
                  // cols="30"
                  value={City}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setCity((City = e.target.value));
                    // data.description = Description;
                    // console.log("Description", data.description);
                    // onDataUpdate(data);
                  }}
                />
              </div>

              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  State
                </div>

                <input
                  name="state"
                  id="state"
                  // cols="30"
                  value={State}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setState((State = e.target.value));
                    // data.description = Description;
                    // console.log("Description", data.description);
                    // onDataUpdate(data);
                  }}
                />
              </div>


              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Country
                </div>

                <input
                  name="country"
                  id="country"
                  // cols="30"
                  value={Country}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setCountry((Country = e.target.value));
                    // data.description = Description;
                    // console.log("Description", data.description);
                    // onDataUpdate(data);
                  }}
                />
              </div>


              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Postal Code
                </div>

                <input
                  name="postal_code"
                  id="postal_code"
                  // cols="30"
                  value={PostalCode}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setPostalCode((PostalCode = e.target.value));
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

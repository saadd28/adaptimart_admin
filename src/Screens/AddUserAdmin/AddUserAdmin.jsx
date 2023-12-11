import "./AddUserAdmin.css";

import React, { useEffect, useState } from "react";
// import Supplier from "./Supplier/Supplier";
import {
  AdminAddProductMediaBG,
  AdminDirectoryPathArrow,
  AdminProfilePic,
} from "../../Assets";
import { useLocation, useNavigate } from "react-router-dom";
import { addadmin, addproduct, updateproduct } from "../../api/apis";
import { Fade } from "react-reveal";
import Navbar from "../../Compnents/Navbar/Navbar";

export default function AddUserAdmin() {
  const navigate = useNavigate();
  let [FirstName, setFirstName] = useState("");
  let [LastName, setLastName] = useState("");
  let [Email, setEmail] = useState("");
  let [Phone, setPhone] = useState("");
  let [Password, setPassword] = useState("");
  let [Image, setImage] = useState(null);

  const saveAdmin = () => {
    const formData = new FormData();

    formData.append("first_name", FirstName);
    formData.append("last_name", LastName);
    formData.append("email", Email);
    formData.append("phone", Phone);
    formData.append("password", Password);
    formData.append("profile_pic", Image);

    console.log("formData", formData);
    addadmin(formData)
      .then((response) => {
        if (response.status === 200) {
          navigate("/manage_users");
          alert("User Admin Added Successfully");
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error adding admin user:", error);
      });
  };

  return (
    <>
      <div className="dashboard_box">
        {/* MANAGE PRODUCTS IS NOT BEING HIGHLIGHTED */}
        <Navbar />

        <div className="product_details_main_container">
          {/* <ProductDetailsHeader /> */}
          <Fade top>
            {/* Product Details Header */}
            <div className="prod_head_title_container">
              <div className="prod_head_title">Add User Admin</div>

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

                <div className="prod_head_dir_path_content">Manage Users</div>
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
                  Create User Admin
                </div>
              </div>

              <div className="product_details_header_buttons_container">
                <button
                  className="product_details_header_cancel_btn"
                  onClick={() => {
                    navigate("/manage_users");
                  }}
                >
                  Cancel
                </button>

                <button
                  className="prod_head_add_product_btn"
                  onClick={() => {
                    saveAdmin();

                    navigate("/manage_users");
                  }}
                >
                  Create Admin
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
                      First Name
                    </div>

                    <input
                      type="text"
                      value={FirstName}
                      className="product_details_form_input"
                      onChange={(event) => {
                        setFirstName((FirstName = event.target.value));
                      }}
                    />
                  </div>
                  <div className="product_details_form_input_container">
                    <div className="product_details_form_input_label">
                      Last Name
                    </div>

                    <input
                      type="text"
                      value={LastName}
                      className="product_details_form_input"
                      onChange={(event) => {
                        setLastName((LastName = event.target.value));
                      }}
                    />
                  </div>
                  <div className="product_details_form_input_container">
                    <div className="product_details_form_input_label">
                      Email
                    </div>

                    <input
                      type="email"
                      value={Email}
                      className="product_details_form_input"
                      onChange={(event) => {
                        setEmail((Email = event.target.value));
                      }}
                    />
                  </div>
                  <div className="product_details_form_input_container">
                    <div className="product_details_form_input_label">
                      Phone
                    </div>

                    <input
                      type="text"
                      value={Phone}
                      className="product_details_form_input"
                      onChange={(event) => {
                        setPhone((Phone = event.target.value));
                      }}
                    />
                  </div>
                  <div className="product_details_form_input_container">
                    <div className="product_details_form_input_label">
                      Password
                    </div>

                    <input
                      type="password"
                      value={Password}
                      className="product_details_form_input"
                      onChange={(event) => {
                        setPassword((Password = event.target.value));
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* MEDIA */}

              <div className="product_details_form_general_section">
                <div className="product_details_form_heading">Media</div>

                <div className="product_details_form_body">
                  <div className="product_details_form_input_container">
                    <div className="product_details_form_input_label">
                      Photo
                    </div>

                    <div className="media_image_upload_container">
                      <img
                        src={Image ? Image : AdminAddProductMediaBG}
                        alt=""
                        className="media_image_upload_bg_img"
                      />

                      <input
                        type="file"
                        className="media_image_upload_input"
                        onChange={(e) => {
                          console.log("image", e.target.files[0]);
                          setImage((Image = e.target.files[0]));
                          console.log("image", Image);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
}

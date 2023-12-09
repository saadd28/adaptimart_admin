import "./AddUserAdmin.css";

import React, { useEffect, useState } from "react";
// import Supplier from "./Supplier/Supplier";
import {
  AdminAddProductMediaBG,
  AdminDirectoryPathArrow,
  AdminProfilePic,
} from "../../Assets";
import { useLocation, useNavigate } from "react-router-dom";
import { addproduct, updateproduct } from "../../api/apis";
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
                    // saveproduct();

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
                        //   console.log("scsc");
                        //   const { name, value } = event.target;
                        //   setProduct({
                        //     ...product,
                        //     [name]: value,
                        //   });

                        setFirstName((FirstName = event.target.value));
                        // data.name = Name;
                        // console.log("Name", data.name);
                        // onDataUpdate(data);
                      }}
                    />
                  </div>
                  <div className="product_details_form_input_container">
                    <div className="product_details_form_input_label">
                      LastName
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
                        //   value={Image}
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

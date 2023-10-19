// import Category from "./Category/Category";
// import GeneralInformation from "./GeneralInformation/GeneralInformation";
// import Media from "./Media/Media";
// import Pricing from "./Pricing/Pricing";
import "./ProductDetailsForm.css";

import React, { useState } from "react";
// import Supplier from "./Supplier/Supplier";
import {
  AdminAddProductMediaBG,
  AdminDirectoryPathArrow,
  AdminProfilePic,
} from "../../../Assets";
import { useNavigate } from "react-router-dom";
import { addproduct } from "../../../api/apis";

export default function ProductDetailsForm() {
  //   const [ProductData, setProductData] = useState(null);
  let [Name, setName] = useState("");
  let [Description, setDescription] = useState("");
  let [Image, setImage] = useState(null);
  let [Price, setPrice] = useState(0);
  const navigate = useNavigate();

  const saveproduct = () => {
    // let reqObj = {
    //   name: Name,
    //   description: Description,
    //   image: Image,
    //   price: Price,
    // };

    const formData = new FormData();

    formData.append("name", Name);
    formData.append("description", Description);
    formData.append("image", Image);
    formData.append("price", Price);

    console.log("formData", formData);
    addproduct(formData)
      .then((response) => {
        // Handle the response from the server if needed
        // console.log("response", response);
        // console.log("File uploaded successfully");
        if (response.status === 200)
        {
            navigate(-1);
            alert("Product Added Successfully")

        }
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error uploading file:", error);
      });

    //   .then((res) => {
    //     if (res.data.success) {
    //       console.log("res", res);
    //       navigate(-1);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //     alert("Please check your connection");
    //   });
  };

  //   const handleSectionOneData = (data) => {
  //     setProductData(data);
  //     console.log("data", data);
  //   };
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
              saveproduct();
              //   navigate("/product_details");
            }}
          >
            Save Product
          </button>
        </div>
      </div>
      {/* GENERAL */}
      <div className="product_details_form_box">
        <div className="product_details_form_general_section">
          <div className="product_details_form_heading">
            General Information
          </div>

          <div className="product_details_form_body">
            <div className="product_details_form_input_container">
              <div className="product_details_form_input_label">
                Product Name
              </div>

              <input
                type="text"
                value={Name}
                className="product_details_form_input"
                onChange={(e) => {
                  setName((Name = e.target.value));
                  // data.name = Name;
                  // console.log("Name", data.name);
                  // onDataUpdate(data);
                }}
              />
            </div>
            <div className="product_details_form_input_container">
              <div className="product_details_form_input_label">
                Description
              </div>

              <textarea
                name="description"
                id="description"
                // cols="30"
                rows="8"
                value={Description}
                className="product_details_form_input"
                onChange={(e) => {
                  setDescription((Description = e.target.value));
                  // data.description = Description;
                  // console.log("Description", data.description);
                  // onDataUpdate(data);
                }}
              ></textarea>
            </div>
          </div>
        </div>

        {/* MEDIA */}

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

        {/* PRICING */}

        <div className="product_details_form_general_section">
          <div className="product_details_form_heading">Pricing</div>

          <div className="product_details_form_body">
            <div className="product_details_form_input_container">
              <div className="product_details_form_input_label">Base Price</div>

              <input
                type="number"
                className="media_image_upload_input"
                value={Price}
                onChange={(e) => {
                  setPrice((Price = e.target.value));
                }}
              />
            </div>
            <div className="product_details_form_input_container">
              <div className="product_details_form_input_label">
                Item Discount
              </div>

              <input type="number" className="media_image_upload_input" />
            </div>
          </div>
        </div>

        {/* CATEGORY */}

        <div className="product_details_form_general_section">
          <div className="product_details_form_heading">Category</div>

          <div className="product_details_form_body">
            <div className="product_details_form_input_container">
              <div className="product_details_form_input_label">
                Category Name
              </div>

              <input type="text" className="product_details_form_input" />
            </div>
            <div className="product_details_form_input_container">
              <div className="product_details_form_input_label">
                Sub Category (if any)
              </div>

              <input type="text" className="product_details_form_input" />
            </div>
          </div>
        </div>

        {/* SUPPLIER */}

        <div className="product_details_form_general_section">
          <div className="product_details_form_heading">Supplier</div>

          <div className="product_details_form_body">
            <div className="product_details_form_input_container">
              <div className="product_details_form_input_label">
                Supplier Name
              </div>

              <input type="text" className="product_details_form_input" />
            </div>
          </div>
        </div>

        {/* <GeneralInformation onDataUpdate={handleSectionOneData} />

        <Media />

        <Pricing />

        <Category />

        <Supplier /> */}
      </div>
    </>
  );
}

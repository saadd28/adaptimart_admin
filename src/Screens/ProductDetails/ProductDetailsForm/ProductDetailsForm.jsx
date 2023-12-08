// import Category from "./Category/Category";
// import GeneralInformation from "./GeneralInformation/GeneralInformation";
// import Media from "./Media/Media";
// import Pricing from "./Pricing/Pricing";
import "./ProductDetailsForm.css";

import React, { useEffect, useState } from "react";
// import Supplier from "./Supplier/Supplier";
import {
  AdminAddProductMediaBG,
  AdminDirectoryPathArrow,
  AdminProfilePic,
} from "../../../Assets";
import { useLocation, useNavigate } from "react-router-dom";
import { addproduct, updateproduct } from "../../../api/apis";
import { Fade } from "react-reveal";

export default function ProductDetailsForm() {
  //   const [ProductData, setProductData] = useState(null);
  let [ID, setID] = useState(0);
  let [Name, setName] = useState("");
  let [Description, setDescription] = useState("");
  let [Image, setImage] = useState(null);
  let [Price, setPrice] = useState(0);
  let [Discount, setDiscount] = useState(0);
  let [Category, setCategory] = useState("");
  let [SubCategory, setSubCategory] = useState("");

  let [UpdateProduct, setUpdateProduct] = useState(false);
  const navigate = useNavigate();

  //   let [product, setProduct] = useState({
  //     name: "",
  //     description: "",
  //     image: null,
  //     price: 0,
  //   });
  const location = useLocation();
  let edit_product_data = null;
  // setName(edit_product_data?edit_product_data.name:"");
  //   let [EditProductData, setEditProductData] = useState(null);

  useEffect(() => {
    edit_product_data = location.state ? location.state.datatosend : null;
    if (edit_product_data !== null) {
      console.log("edit_product_data", edit_product_data);
      setUpdateProduct(true);
      setID((ID = edit_product_data.id));
      setName((Name = edit_product_data.name));
      setDescription((Description = edit_product_data.description));
      setImage((Image = "http://localhost:4000/" + edit_product_data.image));
      setPrice((Price = edit_product_data.price));
      setDiscount((Discount = edit_product_data.discount));
      setCategory((Category = edit_product_data.category));
      setSubCategory((SubCategory = edit_product_data.sub_category));
    }
  }, [location.state]);

  const saveproduct = () => {
    const formData = new FormData();

    formData.append("id", ID);
    formData.append("name", Name);
    formData.append("description", Description);
    formData.append("image", Image);
    formData.append("price", Price);
    formData.append("discount", Discount);
    formData.append("category", Category);
    formData.append("sub_category", SubCategory);

    console.log("formData", formData);

    if (UpdateProduct === true) {
      updateproduct(formData)
        .then((response) => {
          // Handle the response from the server if needed
          // console.log("response", response);
          // console.log("File uploaded successfully");
          if (response.status === 200) {
            navigate(-1);
            alert("Product Updated Successfully");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error uploading file:", error);
        });
      setUpdateProduct(false);
    } else {
      addproduct(formData)
        .then((response) => {
          // Handle the response from the server if needed
          // console.log("response", response);
          // console.log("File uploaded successfully");
          if (response.status === 200) {
            navigate(-1);
            alert("Product Added Successfully");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error uploading file:", error);
        });
    }

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
                  Product Name
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

          {/* PRICING */}

          <div className="product_details_form_general_section">
            <div className="product_details_form_heading">Pricing</div>

            <div className="product_details_form_body">
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Base Price
                </div>

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

                <input
                  type="number"
                  value={Discount}
                  className="media_image_upload_input"
                  onChange={(e) => {
                    setDiscount((Discount = e.target.value));
                  }}
                />
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

                <input
                  type="text"
                  className="product_details_form_input"
                  value={Category}
                  onChange={(e) => {
                    setCategory((Category = e.target.value));
                  }}
                />
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Sub Category (if any)
                </div>

                <input
                  type="text"
                  className="product_details_form_input"
                  value={SubCategory}
                  onChange={(e) => {
                    setSubCategory((SubCategory = e.target.value));
                  }}
                />
              </div>
            </div>
          </div>

          {/* SUPPLIER */}

          {/* <div className="product_details_form_general_section">
            <div className="product_details_form_heading">Supplier</div>

            <div className="product_details_form_body">
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Supplier Name
                </div>

                <input type="text" className="product_details_form_input" />
              </div>
            </div>
          </div> */}

          {/* <GeneralInformation onDataUpdate={handleSectionOneData} />

        <Media />

        <Pricing />

        <Category />

        <Supplier /> */}
        </div>
      </Fade>
    </>
  );
}

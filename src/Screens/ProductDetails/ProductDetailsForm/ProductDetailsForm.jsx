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
import {
  addproduct,
  getallcategorys,
  getallsuppliers,
  updateproduct,
} from "../../../api/apis";
import { Fade } from "react-reveal";

export default function ProductDetailsForm() {
  //   const [ProductData, setProductData] = useState(null);
  let [ID, setID] = useState(0);
  let [Name, setName] = useState("");
  let [Description, setDescription] = useState("");
  let [Image, setImage] = useState(null);
  let [Price, setPrice] = useState(0);
  let [ItemDiscount, setItemDiscount] = useState(0);
  let [SupplierName, setSupplierName] = useState("");
  let [CategoryName, setCategoryName] = useState("");

  let [SupplierList, setSupplierList] = useState(null);
  let [CategoryList, setCategoryList] = useState(null);
  let [UpdateProduct, setUpdateProduct] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let edit_product_data = null;
  //   let [product, setProduct] = useState({
  //     name: "",
  //     description: "",
  //     image: null,
  //     price: 0,
  //   });
  // setName(edit_product_data?edit_product_data.name:"");
  //   let [EditProductData, setEditProductData] = useState(null);

  useEffect(() => {
    getAllSuppliers(setSupplierList);
    getAllCategorys(setCategoryList);

    edit_product_data = location.state ? location.state.datatosend : null;
    if (edit_product_data !== null) {
      console.log("edit_product_data", edit_product_data);
      setUpdateProduct(true);
      setID((ID = edit_product_data.id));
      setName((Name = edit_product_data.name));
      setDescription((Description = edit_product_data.description));
      setImage((Image = "http://localhost:4000/" + edit_product_data.image));
      setPrice((Price = edit_product_data.price));
      setItemDiscount((ItemDiscount = edit_product_data.item_discount));
      setCategoryName((CategoryName = edit_product_data.category_name));
      setSupplierName((SupplierName = edit_product_data.supplier_name));
    }
  }, [location.state]);
  // }, []);

  const handleSupplierNameChange = (event) => {
    setSupplierName(event.target.value);
  };
  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const saveproduct = () => {
    if (UpdateProduct === true) {
      const formData = new FormData();

      formData.append("name", Name);
      formData.append("description", Description);
      formData.append("image", Image);
      formData.append("price", Price);
      formData.append("item_discount", ItemDiscount);
      formData.append("categoryName", CategoryName);
      formData.append("supplierName", SupplierName);
      formData.append("id", ID);

      console.log("formData", formData);
      updateproduct(formData)
        .then((response) => {
          // Handle the response from the server if needed
          // console.log("response", response);
          // console.log("File uploaded successfully");
          if (response.status === 200) {
            navigate("/manage_products");
            alert("Product Updated Successfully");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error uploading file:", error);
        });
      setUpdateProduct(false);
    } else {
      const formData = new FormData();

      formData.append("name", Name);
      formData.append("description", Description);
      formData.append("image", Image);
      formData.append("price", Price);
      formData.append("item_discount", ItemDiscount);
      formData.append("categoryName", CategoryName);
      formData.append("supplierName", SupplierName);

      console.log("formData", formData);
      addproduct(formData)
        .then((response) => {
          if (response.status === 200) {
            navigate("/manage_products");
            alert("Product Added Successfully");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error uploading file:", error);
        });
    }
  };

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
                    setName((Name = event.target.value));
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
                  value={ItemDiscount}
                  className="media_image_upload_input"
                  onChange={(e) => {
                    setItemDiscount((ItemDiscount = e.target.value));
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

                <select
                  id="dropdown"
                  className="product_details_form_input"
                  value={CategoryName}
                  onChange={handleCategoryNameChange}
                >
                  <option
                    value={
                      edit_product_data ? edit_product_data.category_name : ""
                    }
                  >
                    {edit_product_data ? CategoryName : "Select a Category..."}
                  </option>
                  {CategoryList
                    ? CategoryList.map((item, index) => (
                        <option value={item.name}>{item.name}</option>
                      ))
                    : ""}
                </select>
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Supplier Name
                </div>

                <select
                  id="dropdown"
                  className="product_details_form_input"
                  value={SupplierName}
                  onChange={handleSupplierNameChange}
                >
                  <option
                    value={
                      edit_product_data ? edit_product_data.supplier_name : ""
                    }
                  >
                    {edit_product_data
                      ? SupplierName
                      : "Select a Supplier Name..."}
                  </option>
                  {SupplierList
                    ? SupplierList.map((item, index) => (
                        <option value={item.name}>{item.name}</option>
                      ))
                    : ""}
                </select>
              </div>
              {/* <div className="product_details_form_input_container">
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
              </div> */}
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

export const getAllSuppliers = (setSupplierList) => {
  getallsuppliers()
    .then((res) => {
      console.log("Updated suppliers list retrieved", res.data);
      setSupplierList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching suppliers:", err);
    });
};

export const getAllCategorys = (setCategoryList) => {
  getallcategorys()
    .then((res) => {
      console.log("Updated Categorys list retrieved", res.data);
      setCategoryList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching Categorys:", err);
    });
};

import { Fade } from "react-reveal";
import { AdminDirectoryPathArrow, AdminProfilePic } from "../../../Assets";
import "./SupplierDetailsForm.css";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addsupplier, updatesupplier } from "../../../api/apis";

export default function SupplierDetailsForm() {
  let [Name, setName] = useState("");
  let [ContactName, setContactName] = useState("");
  let [ContactDesignation, setContactDesignation] = useState("");
  let [Address, setAddress] = useState("");
  let [City, setCity] = useState("");
  let [State, setState] = useState("");
  let [Country, setCountry] = useState("");
  let [PostalCode, setPostalCode] = useState("");
  let [SupplierID, setSupplierID] = useState(0);

  let [UpdateSupplier, setUpdateSupplier] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let edit_supplier_data = null;

  useEffect(() => {
    edit_supplier_data = location.state ? location.state.datatosend : null;

    if (edit_supplier_data !== null) {
      console.log("edit_supplier_data", edit_supplier_data);

      setUpdateSupplier(true);
      setName((Name = edit_supplier_data.name));
      setContactName((ContactName = edit_supplier_data.contact_name));
      setContactDesignation(
        (ContactDesignation = edit_supplier_data.contact_designation)
      );
      setAddress((Address = edit_supplier_data.address));
      setCity((City = edit_supplier_data.city));
      setState((State = edit_supplier_data.state));
      setCountry((Country = edit_supplier_data.country));
      setPostalCode((PostalCode = edit_supplier_data.postal_code));

      setSupplierID((SupplierID = edit_supplier_data.id));
    }
  }, [location.state]);

  const savesupplier = () => {
    if (UpdateSupplier === true) {
      let formData = {
        name: Name,
        contact_name: ContactName,
        contact_designation: ContactDesignation,
        address: Address,
        city: City,
        state: State,
        postal_code: PostalCode,
        id: SupplierID,
      };
      console.log("formData", formData);
      updatesupplier(formData)
        .then((response) => {
          if (response.status === 200) {
            navigate("/manage_supplier");
            alert("Supplier Updated Successfully");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error Updating Supplier:", error);
        });
      setUpdateSupplier(false);
    } else {
      let formData = {
        name: Name,
        contact_name: ContactName,
        contact_designation: ContactDesignation,
        address: Address,
        city: City,
        state: State,
        postal_code: PostalCode,
      };
      console.log("formData", formData);
      addsupplier(formData)
        .then((response) => {
          if (response.status === 200) {
            navigate("/manage_supplier");
            alert("Supplier Added Successfully");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error adding Supplier:", error);
        });
    }
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
                    setName((Name = event.target.value));
                  }}
                />
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Contact Name
                </div>

                <input
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
                  // cols="30"
                  value={ContactDesignation}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setContactDesignation(
                      (ContactDesignation = e.target.value)
                    );
                  }}
                />
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">Address</div>

                <input
                  // cols="30"
                  value={Address}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setAddress((Address = e.target.value));
                  }}
                />
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">City</div>

                <input
                  // cols="30"
                  value={City}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setCity((City = e.target.value));
                  }}
                />
              </div>

              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">State</div>

                <input
                  // cols="30"
                  value={State}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setState((State = e.target.value));
                  }}
                />
              </div>

              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">Country</div>

                <input
                  // cols="30"
                  value={Country}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setCountry((Country = e.target.value));
                  }}
                />
              </div>

              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Postal Code
                </div>

                <input
                  // cols="30"
                  value={PostalCode}
                  className="product_details_form_input"
                  onChange={(e) => {
                    setPostalCode((PostalCode = e.target.value));
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

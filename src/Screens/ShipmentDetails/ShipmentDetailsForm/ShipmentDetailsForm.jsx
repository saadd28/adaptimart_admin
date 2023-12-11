import { Fade } from "react-reveal";
import { AdminDirectoryPathArrow, AdminProfilePic } from "../../../Assets";
import "./ShipmentDetailsForm.css";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addshipment,
  getallsuppliers,
  getshipmentstatuslist,
  updateshipment,
} from "../../../api/apis";

export default function ShipmentDetailsForm() {
  let [Name, setName] = useState("");
  let [SupplierName, setSupplierName] = useState("");
  let [ShipmentStatus, setShipmentStatus] = useState("");
  let [ShipmentID, setShipmentID] = useState(0);

  const [SupplierList, setSupplierList] = useState(null);
  const [ShipmentStatusList, setShipmentStatusList] = useState(null);
  const [UpdateShipment, setUpdateShipment] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let edit_shipment_data = null;

  useEffect(() => {
    getAllSuppliers(setSupplierList);
    getShipmentStatusList(setShipmentStatusList);
    console.log("SupplierList:", SupplierList);

    edit_shipment_data = location.state ? location.state.datatosend : null;

    if (edit_shipment_data !== null) {
      console.log("edit_shipment_data", edit_shipment_data);

      setUpdateShipment(true);
      setName((Name = edit_shipment_data.name));
      setSupplierName((SupplierName = edit_shipment_data.supplier_name));
      setShipmentStatus(
        (ShipmentStatus =
          edit_shipment_data.status === 19
            ? "In-transit"
            : edit_shipment_data.status === 20
            ? "Received"
            : edit_shipment_data.status === 21
            ? "Defected"
            : ""));
      setShipmentID((ShipmentID = edit_shipment_data.id))      
    }
  }, [location.state]);

  // Handler function to update the selected value
  const handleSupplierNameChange = (event) => {
    setSupplierName(event.target.value);
  };
  // Handler function to update the selected value
  const handleShipmentStatusChange = (event) => {
    setShipmentStatus(event.target.value);
  };

  const saveshipment = () => {
    // console.log("formData", formData);
    if (UpdateShipment === true) {
      let formData = {
        name: Name,
        supplier_name: SupplierName,
        status:
          ShipmentStatus === "In-transit"
            ? 19
            : ShipmentStatus === "Received"
            ? 20
            : ShipmentStatus === "Defected"
            ? 21
            : 19,
        id:ShipmentID   
      };
      console.log("formData", formData);
      updateshipment(formData)
        .then((response) => {
          if (response.status === 200) {
            navigate("/manage_shipments");
            alert("Shipment Updated Successfully");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error uploading file:", error);
        });
      setUpdateShipment(false);
    } else {
      let formData = {
        name: Name,
        supplier_name: SupplierName,
        status:
          ShipmentStatus === "In-transit"
            ? 19
            : ShipmentStatus === "Received"
            ? 20
            : ShipmentStatus === "Defected"
            ? 21
            : 19,
      };
      addshipment(formData)
        .then((response) => {
          if (response.status === 200) {
            navigate("/manage_shipments");
            alert("Shipment Added Successfully");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error adding shipment:", error);
        });
    }
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

                navigate("/manage_shipments");

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
                    console.log("name changing");
                    setName((Name = event.target.value));
                  }}
                />
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
                      edit_shipment_data ? edit_shipment_data.supplier_name : ""
                    }
                  >
                    {edit_shipment_data
                      ? edit_shipment_data.supplier_name
                      : "Status..."}
                  </option>
                  {SupplierList
                    ? SupplierList.map((item, index) => (
                        <option value={item.name}>{item.name}</option>
                      ))
                    : ""}
                </select>
              </div>
              <div className="product_details_form_input_container">
                <div className="product_details_form_input_label">
                  Shipment Status
                </div>

                <select
                  id="dropdown"
                  className="product_details_form_input"
                  value={ShipmentStatus}
                  onChange={handleShipmentStatusChange}
                >
                  <option value={edit_shipment_data ? ShipmentStatus : ""}>
                    {edit_shipment_data ? ShipmentStatus : ""}
                  </option>
                  {ShipmentStatusList
                    ? ShipmentStatusList.map((item, index) => (
                        <option value={item.name}>{item.name}</option>
                      ))
                    : ""}
                </select>
              </div>
            </div>
          </div>
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
export const getShipmentStatusList = (setShipmentStatusList) => {
  getshipmentstatuslist(18)
    .then((res) => {
      console.log("Updated shipment status list retrieved", res.data);
      setShipmentStatusList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching shipment status list:", err);
    });
};

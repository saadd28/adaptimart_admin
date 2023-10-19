import "./GeneralInformation.css";

import React, { useState } from "react";

export default function GeneralInformation() {
  let [Name, setName] = useState("");
  let [Description, setDescription] = useState("");

  // let data = {
  //   name: "",
  //   description: "",
  // };

  return (
    <>
      <div className="product_details_form_general_section">
        <div className="product_details_form_heading">General Information</div>

        <div className="product_details_form_body">
          <div className="product_details_form_input_container">
            <div className="product_details_form_input_label">Product Name</div>

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
            <div className="product_details_form_input_label">Description</div>

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
    </>
  );
}

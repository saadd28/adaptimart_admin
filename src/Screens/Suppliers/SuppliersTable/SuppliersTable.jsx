import { Fade } from "react-reveal";
import {
  AdminDirectoryPathArrow,
  AdminProductEditIcon,
  AdminProductTrashIcon,
  AdminProfilePic,
  AdminSearchIcon,
} from "../../../Assets";
import "./SuppliersTable.css";

import React, { useEffect, useState } from "react";
// import moment from "moment/moment";
import { deletesupplier, getallproducts, getallsuppliers, getsupplierbyid, getsupplierbyname } from "../../../api/apis";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const SupplierTableRow = ({ data, setSuppliersList, index }) => {
  const navigate = useNavigate();

  const editSupplier = (data) => {
    navigate("/supplier_details", {
      state: {
        datatosend: data,
      },
    });
  };
  const deleteSupplier = (data) => {
    console.log("delete Supplier called");

    let delObj = {
      id: data ? data.id : 0,
    };
    deletesupplier(delObj)
      .then((res) => {
        console.log("resp", res);

        if (res.status === 200) {
          if (res.data.affectedRows === 1) {
            console.log("resp", res);
            alert("Supplier Deleted Successfully");
            getAllSuppliers(setSuppliersList);
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert("Supplier Deletion Failed");
      });
  };

  return (
    <>
      <tr className="product_table_row">
        <td className="product_table_data">{index + 1}</td>
        <td className="product_table_data">
          <div className="product_table_data_name_container">
            <div>{data.name}</div>
          </div>
        </td>
        <td
          className="product_table_data"
          style={{
            color: "#52C1C5",
          }}
        >
          {data.id}
        </td>
        <td className="product_table_data">{data.contact_name}</td>
        <td className="product_table_data">
          {data.address}, {data.city}
        </td>
        <td className="product_table_data">
          {moment(data.created_on.split(".")[0]).format("D MMM YY")}
        </td>
        <td className="product_table_data">
          <div className="product_table_data_actions_container">
            <img
              src={AdminProductEditIcon}
              alt=""
              className="product_table_data_edit_action_img"
              onClick={(event) => {
                editSupplier(data);
              }}
            />
            <img
              src={AdminProductTrashIcon}
              alt=""
              className="product_table_data_edit_action_img"
              onClick={(event) => {
                deleteSupplier(data);
              }}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default function SuppliersTable() {
  const [SuppliersList, setSuppliersList] = useState(null);
  const [SearchType, setSearchType] = useState(1); // 1 for name, 2 for id
  let [SearchName, setSearchName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllSuppliers(setSuppliersList);
    console.log("Suppliers List:", SuppliersList);
  }, []);

  return (
    <>
      {/* Product Header */}
      <Fade top>
        <div className="prod_head_box">
          <div className="prod_head_title_container">
            <div className="prod_head_title">Manage Suppliers</div>

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

              <div
                className="prod_head_dir_path_content"
                style={{
                  color: "#667085",
                }}
              >
                Manage Suppliers
              </div>
            </div>

            <button
              className="prod_head_add_product_btn"
              onClick={() => {
                navigate("/supplier_details");
              }}
            >
              + Add Supplier
            </button>
          </div>

          <div className="prod_head_search_row_container">
            <div className="prod_head_search_container">
              <img
                src={AdminSearchIcon}
                alt=""
                className="prod_head_search_img"
              />
              <input
                type="text"
                placeholder="Search Supplier..."
                className="prod_head_search"
                value={SearchName}
                onChange={(event) => {
                  setSearchName((SearchName = event.target.value));

                    SearchType === 1
                  ? getSupplierByName(setSuppliersList, SearchName)
                  : getSupplierById(setSuppliersList, SearchName);
                }}
              />
            </div>

            <div className="prod_head_search_type_btn_container">
              <button
                className={
                  SearchType === 1
                    ? "prod_head_search_btn_selected prod_head_search_btn_text"
                    : "prod_head_search_btn_unselected prod_head_search_btn_text"
                }
                onClick={() => {
                  setSearchType(1);
                }}
              >
                Search By Name
              </button>
              <button
                className={
                  SearchType === 2
                    ? "prod_head_search_btn_selected prod_head_search_btn_text"
                    : "prod_head_search_btn_unselected prod_head_search_btn_text"
                }
                onClick={() => {
                  setSearchType(2);
                }}
              >
                Search By ID
              </button>
            </div>
          </div>
        </div>
      </Fade>

      {/* End Product Header */}

      <Fade right>
        <div className="product_table_container">
          <table
            className="product_table"
            style={{
              // borderSpacing: "0 10px",
              borderCollapse: "separate",
            }}
          >
            <thead>
              <tr className="table_heading_row">
                <th className="table_heading">No.</th>
                <th className="table_heading">Supplier Name</th>
                <th className="table_heading">Supplier ID</th>
                <th className="table_heading">Contact Name</th>
                <th className="table_heading">Address</th>
                <th className="table_heading">Date Added</th>
                <th className="table_heading">Action</th>
              </tr>
            </thead>

            <tbody>
              {SuppliersList
                ? SuppliersList.map((item, index) => (
                    <SupplierTableRow
                      data={item}
                      setSuppliersList={setSuppliersList}
                      index={index}
                    />
                  ))
                : ""}
              {/* {data
                ? data.map((item, index) => (
                    <SupplierTableRow
                      data={item}
                      setSuppliersList={setSuppliersList}
                      index={index}
                    />
                  ))
                : ""} */}
            </tbody>
          </table>
        </div>
      </Fade>
    </>
  );
}

export const getAllSuppliers = (setSuppliersList) => {
  getallsuppliers()
    .then((res) => {
      console.log("Updated Suppliers list retrieved");
      setSuppliersList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching Suppliers:", err);
    });
};

export const getSupplierByName = (setSuppliersList, SearchName) => {
  let reqObj = {
    name: SearchName,
  };
  console.log("reqObj", reqObj);
  getsupplierbyname(SearchName)
    .then((res) => {
      console.log("Searched Supplier list retrieved");
      setSuppliersList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching suppliers:", err);
    });
};

export const getSupplierById = (setSuppliersList, SearchName) => {
  let reqObj = {
    id: SearchName,
  };
  console.log("reqObj", reqObj);
  getsupplierbyid(SearchName)
    .then((res) => {
      console.log("Searched Supplier list retrieved");
      console.log("res", res);
      setSuppliersList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching Suppliers:", err);
    });
};



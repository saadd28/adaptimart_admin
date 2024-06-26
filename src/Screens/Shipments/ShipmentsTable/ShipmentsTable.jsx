import { Fade } from "react-reveal";
import {
  AdminDirectoryPathArrow,
  AdminProductEditIcon,
  AdminProductTrashIcon,
  AdminProfilePic,
  AdminSearchIcon,
} from "../../../Assets";
import "./ShipmentsTable.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteshipment, getallshipments, getshipmentsbyid, getshipmentsbyname } from "../../../api/apis";
import moment from "moment";

const ShipmentTableRow = ({ data, setShipmentList, index }) => {
  const navigate = useNavigate();

  const editShipment = (data) => {
    navigate("/shipment_details", {
      state: {
        datatosend: data,
      },
    });
  };

  const deleteShipment = (data) => {
      console.log("delete shipment called");

      let delObj = {
        id: data ? data.id : 0,
      };
      deleteshipment(delObj)
        .then((res) => {
          console.log("resp", res);

          if (res.status === 200) {
            if (res.data.affectedRows === 1) {
              console.log("resp", res);
              alert("Shipment Deleted Successfully");
              getAllShipments(setShipmentList);
            }
          }
        })
        .catch((err) => {
          console.log("err", err);
          alert("Please check your connection");
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
        <td className="product_table_data">{data.supplier_name}</td>
        <td className="product_table_data" 
        style={{
          color:data.status === 19
            ? "#18ABB1"
            : data.status === 20
            ? "Green"
            : data.status === 21
            ? "Red"
            : ""
        }}
        >
          {data.status === 19
            ? "In-transit"
            : data.status === 20
            ? "Received"
            : data.status === 21
            ? "Defected"
            : ""}
        </td>
        <td className="product_table_data">
          {moment(data.created_on.split(".")[0]).format("D MMM YY")}
          {/* {data.created_on} */}
        </td>
        <td className="product_table_data">
          <div className="product_table_data_actions_container">
            <img
              src={AdminProductEditIcon}
              alt=""
              className="product_table_data_edit_action_img"
              onClick={(event) => {
                editShipment(data);
              }}
            />
            <img
              src={AdminProductTrashIcon}
              alt=""
              className="product_table_data_edit_action_img"
              onClick={(event) => {
                deleteShipment(data);
              }}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default function ShipmentsTable() {
  const [ShipmentList, setShipmentList] = useState(null);
  const [SearchType, setSearchType] = useState(1); // 1 for name, 2 for id
  let [SearchName, setSearchName] = useState("");
  const navigate = useNavigate();

  // let data = [
  //   {
  //       id: 1,
  //       name:"XYZ",
  //       supplier_id:3,
  //       status:"Processing",
  //       created_on: "20-10-2023"
  //   },
  //   {
  //       id: 2,
  //       name:"XYZ",
  //       supplier_id:3,
  //       status:"Processing",
  //       created_on: "20-10-2023"
  //   },
  //   {
  //       id: 3,
  //       name:"XYZ",
  //       supplier_id:3,
  //       status:"Processing",
  //       created_on: "20-10-2023"
  //   },
  //   {
  //       id: 4,
  //       name:"XYZ",
  //       supplier_id:3,
  //       status:"Processing",
  //       created_on: "20-10-2023"
  //   },
  // ]

  useEffect(() => {
    getAllShipments(setShipmentList);
    console.log("ShipmentList:", ShipmentList);
  }, []);

  return (
    <>
      {/* Product Header */}
      <Fade top>
        <div className="prod_head_box">
          <div className="prod_head_title_container">
            <div className="prod_head_title">Manage Shipments</div>

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
                Manage Shipments
              </div>
            </div>

            <button
              className="prod_head_add_product_btn"
              onClick={() => {
                navigate("/shipment_details");
              }}
            >
              + Add Shipments
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
                placeholder="Search Shipments..."
                className="prod_head_search"
                value={SearchName}
                onChange={(event) => {
                  setSearchName((SearchName = event.target.value));

                    SearchType === 1
                  ? getShipmentsByName(setShipmentList, SearchName)
                  : getShipmentsById(setShipmentList, SearchName);
                  // : getProductsById(setShipmentList, SearchName);
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
                <th className="table_heading">Shipment Name</th>
                <th className="table_heading">Shipment ID</th>
                <th className="table_heading">Supplier Name</th>
                <th className="table_heading">Shipment Status</th>
                <th className="table_heading">Date Added</th>
                <th className="table_heading">Action</th>
              </tr>
            </thead>

            <tbody>
              {ShipmentList
                ? ShipmentList.map((item, index) => (
                    <ShipmentTableRow
                      data={item}
                      setShipmentList={setShipmentList}
                      index={index}
                    />
                  ))
                : ""}
              {/* {data
                ? data.map((item, index) => (
                    <ShipmentTableRow
                      data={item}
                      setShipmentList={setShipmentList}
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

export const getAllShipments = (setShipmentList) => {
  getallshipments()
    .then((res) => {
      console.log("Updated shipments list retrieved");
      setShipmentList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching shipments:", err);
    });
};

export const getShipmentsByName = (setShipmentList, SearchName) => {
  let reqObj = {
    name: SearchName,
  };
  console.log("reqObj", reqObj);
  getshipmentsbyname(SearchName)
    .then((res) => {
      console.log("Searched shipments list retrieved", res.data);
      setShipmentList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching shipments:", err);
    });
};

export const getShipmentsById = (setShipmentList, SearchName) => {
  let reqObj = {
    id: SearchName,
  };
  console.log("reqObj", reqObj);
  getshipmentsbyid(SearchName)
    .then((res) => {
      console.log("Searched Shipments list retrieved");
      console.log("res", res);
      setShipmentList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching shipments:", err);
    });
};

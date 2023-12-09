import "./UsersTable.css";
import moment from "moment/moment";
import {
  AdaptiMartLogoCart,
  AdminDirectoryPathArrow,
  AdminProductEditIcon,
  AdminProductTrashIcon,
  AdminProductViewIcon,
  AdminProfilePic,
  AdminSearchIcon,
  BlockUserIcon,
  UnBlockUserIcon,
  ViewOrderCustomerIcon,
} from "../../../Assets";
import {
  deleteproduct,
  getallproducts,
  getproductsbyid,
  getproductsbyname,
} from "../../../api/apis";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";

const UserTableRow = ({ data, setProductsList, index }) => {
  const navigate = useNavigate();

  // const deleteProduct = (data) => {
  //   console.log("delete product called");

  //   let delObj = {
  //     id: data ? data.id : 0,
  //   };
  //   deleteproduct(delObj)
  //     .then((res) => {
  //       console.log("resp", res);

  //       if (res.status === 200) {
  //         if (res.data.affectedRows === 1) {
  //           console.log("resp", res);
  //           alert("Product Deleted Successfully");
  //           getAllProducts(setProductsList);
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //       alert("Please check your connection");
  //     });
  // };

  // const editProduct = (data) => {
  //   navigate("/product_details", {
  //     state: {
  //       datatosend: data,
  //     },
  //   });
  // };

  return (
    <>
      <tr className="product_table_row">
        <td className="product_table_data">{index + 1}</td>
        <td className="product_table_data">
          <div className="product_table_data_name_container">
            <img
              src={
                data.image
                  ? "http://localhost:4000/" + data.image
                  : AdaptiMartLogoCart
              }
              alt=""
              className="product_table_data_img"
            />
            <div>{data.first_name + " " + data.last_name}</div>
          </div>
        </td>
        <td className="product_table_data">{data.phone}</td>
        <td className="product_table_data">{data.orders}</td>
        <td className="product_table_data">
          {data.status === 1 ? "Active" : "Blocked"}
        </td>
        <td className="product_table_data">
          {/* {moment(data.created_on.split(".")[0]).format("D MMM YY")} */}
          {data.created_on}
        </td>
        <td className="product_table_data">
          <div className="product_table_data_actions_container">
            <img
              src={AdminProductViewIcon}
              alt=""
              className="product_table_data_edit_action_img svg_color"
              onClick={(event) => {
                // deleteProduct(data);
                navigate("/view_user_details", {
                  state: {
                    datatosend: data,
                  },
                });
              }}
            />
            <img
              src={BlockUserIcon}
              alt=""
              className="product_table_data_edit_action_img svg_color"
              onClick={(event) => {
                // editProduct(data);
              }}
            />
            <img
              src={UnBlockUserIcon}
              alt=""
              className="product_table_data_edit_action_img svg_color"
              onClick={(event) => {
                // deleteProduct(data);
              }}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default function UsersTable() {
  const [UsersList, setUsersList] = useState(null);
  const [SearchType, setSearchType] = useState(1); // 1 for name, 2 for id
  let [SearchName, setSearchName] = useState("");
  const navigate = useNavigate();

  let data = [
    {
      id: 1,
      first_name: "Saad",
      last_name: "Khan",
      phone: "123456789",
      orders: 12,
      status: 1,
      created_on: "12-2-2023",
    },
    {
      id: 2,
      first_name: "Saad",
      last_name: "Khan",
      phone: "123456789",
      orders: 12,
      status: 1,
      created_on: "12-2-2023",
    },
    {
      id: 3,
      first_name: "Saad",
      last_name: "Khan",
      phone: "123456789",
      orders: 12,
      status: 1,
      created_on: "12-2-2023",
    },
    {
      id: 4,
      first_name: "Saad",
      last_name: "Khan",
      phone: "123456789",
      orders: 12,
      status: 1,
      created_on: "12-2-2023",
    },
  ];

  return (
    <>
      {/* Product Header */}
      <Fade top>
        <div className="prod_head_box">
          <div className="prod_head_title_container">
            <div className="prod_head_title">Manage Users</div>

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
                Manage Users
              </div>
            </div>

            <button
              className="prod_head_add_product_btn"
              onClick={() => {
                navigate("/add_user_admin");
              }}
            >
              + Add Admin
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
                placeholder="Search User..."
                className="prod_head_search"
                value={SearchName}
                onChange={(event) => {
                  setSearchName((SearchName = event.target.value));

                  //   SearchType === 1
                  //     ? getProductsByName(setUsersList, SearchName)
                  //     : getProductsById(setUsersList, SearchName);
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
                <th className="table_heading">User Name</th>
                <th className="table_heading">Phone</th>
                <th className="table_heading">Orders</th>
                <th className="table_heading">Status</th>
                <th className="table_heading">Date Added</th>
                <th className="table_heading">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* {UsersList
                ? UsersList.map((item, index) => (
                    <ProductTableRow
                      data={item}
                      setUsersList={setUsersList}
                      index={index}
                    />
                  ))
                : ""} */}
              {data
                ? data.map((item, index) => (
                    <UserTableRow
                      data={item}
                      setUsersList={setUsersList}
                      index={index}
                    />
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </Fade>
    </>
  );
}

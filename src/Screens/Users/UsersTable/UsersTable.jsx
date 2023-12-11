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
  blockuser,
  deleteproduct,
  getallproducts,
  getallusers,
  getproductsbyid,
  getproductsbyname,
  getusersbyid,
  getusersbyname,
  unblockuser,
} from "../../../api/apis";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";

const UserTableRow = ({ data, setUsersList, index }) => {
  const navigate = useNavigate();

  const blockUser = (data) => {
    console.log("block user called");
    const userID = data ? data.user_id : 0;

    blockuser(userID)
      .then((res) => {
        if (res.status === 200) {
          console.log("resp", res);
          alert("User Blocked Successfully");
          getAllUsers(setUsersList);
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert("Please check your connection");
      });
  };

  const unBlockUser = (data) => {
    console.log("unblock user called");
    const userID = data ? data.user_id : 0;

    unblockuser(userID)
      .then((res) => {
        if (res.status === 200) {
          console.log("resp", res);
          alert("User UnBlocked Successfully");
          getAllUsers(setUsersList);
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert("Please check your connection");
      });
  };



  const orders_count = Object.keys(data.orders).length;
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
        <td
          className="product_table_data"
          style={{
            color: "#52C1C5",
          }}
        >
          {data.user_id}
        </td>
        <td className="product_table_data">{data.phone}</td>
        <td className="product_table_data">{orders_count}</td>
        <td className="product_table_data"
        style={{
          color:
          data.user_status === 2
          ? "Green"
          : "Red"
        }}
        >
          {data.user_status === 2 ? "Active" : "Blocked"}
        </td>
        <td className="product_table_data">
          {moment(data.created_on.split(".")[0]).format("D MMM YY")}
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
                    orders_count: orders_count,
                  },
                });
              }}
            />
            <img
              src={BlockUserIcon}
              alt=""
              className="product_table_data_edit_action_img svg_color"
              onClick={(event) => {
                blockUser(data);
                // editProduct(data);
              }}
            />
            <img
              src={UnBlockUserIcon}
              alt=""
              className="product_table_data_edit_action_img svg_color"
              onClick={(event) => {
                // deleteProduct(data);
                unBlockUser(data);
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

  useEffect(() => {
    getAllUsers(setUsersList);
  }, []);

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

                  SearchType === 1
                    ? getUsersByName(setUsersList, SearchName)
                    : getUsersById(setUsersList, SearchName);
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
                <th className="table_heading">User ID</th>
                <th className="table_heading">Phone</th>
                <th className="table_heading">Orders</th>
                <th className="table_heading">Status</th>
                <th className="table_heading">Date Added</th>
                <th className="table_heading">Action</th>
              </tr>
            </thead>

            <tbody>
              {UsersList
                ? UsersList.map((item, index) => (
                    <UserTableRow
                      key={item.id}
                      data={item}
                      setUsersList={setUsersList}
                      index={index}
                    />
                  ))
                : ""}
              {/* {data
                ? data.map((item, index) => (
                    <UserTableRow
                      data={item}
                      setUsersList={setUsersList}
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

export const getAllUsers = (setUsersList) => {
  getallusers()
    .then((res) => {
      console.log("Updated users list retrieved");
      setUsersList(res.data);
      console.log("res.data", res.data);
    })
    .catch((err) => {
      console.log("Error fetching users:", err);
    });
};

export const getUsersByName = (setUsersList, SearchName) => {
  let reqObj = {
    name: SearchName,
  };
  console.log("reqObj", reqObj);
  getusersbyname(SearchName)
    .then((res) => {
      console.log("Searched users list retrieved");
      setUsersList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching users:", err);
    });
};

export const getUsersById = (setUsersList, SearchName) => {
  let reqObj = {
    id: SearchName,
  };
  console.log("reqObj", reqObj);
  getusersbyid(SearchName)
    .then((res) => {
      console.log("Searched users list retrieved");
      console.log("res", res);
      setUsersList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching users:", err);
    });
};

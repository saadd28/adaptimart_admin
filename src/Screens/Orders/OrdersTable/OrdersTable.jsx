import { Fade } from "react-reveal";
import "./OrdersTable.css";

import React, { useEffect, useState } from "react";
import {
  AdminDirectoryPathArrow,
  AdminProductEditIcon,
  AdminProductTrashIcon,
  AdminProductViewIcon,
  AdminProfilePic,
  AdminSearchIcon,
} from "../../../Assets";
import { useNavigate } from "react-router-dom";
import {
  getallorders,
  getordersbyid,
  getordersbyname,
} from "../../../api/apis";
import moment from "moment";

const OrderTableRow = ({ data, setOrdersList, index }) => {
  const navigate = useNavigate();

  const editOrder = (data) => {
    navigate("/edit_order_details", {
      state: {
        datatosend: data,
      },
    });
  };

  const viewOrder = (data) => {
    navigate("/view_order_details", {
      state: {
        datatosend: data,
      },
    });
  };

  //   const deleteProduct = (data) => {
  //     console.log("delete product called");

  //     let delObj = {
  //       id: data ? data.id : 0,
  //     };
  //     deleteproduct(delObj)
  //       .then((res) => {
  //         console.log("resp", res);

  //         if (res.status === 200) {
  //           if (res.data.affectedRows === 1) {
  //             console.log("resp", res);
  //             alert("Product Deleted Successfully");
  //             getAllProducts(setOrdersList);
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("err", err);
  //         alert("Please check your connection");
  //       });
  //   };

  return (
    <>
      <tr className="product_table_row">
        <td className="product_table_data">{index + 1}</td>
        <td className="product_table_data">
          <div className="product_table_data_name_container">
            <div>{data.first_name + " " + data.last_name}</div>
          </div>
        </td>
        <td
          className="product_table_data"
          style={{
            color: "#52C1C5",
          }}
        >
          {data.order_id}
        </td>
        <td className="product_table_data">
          {data.order_status === 5
            ? "Placed"
            : data.order_status === 6
            ? "Processed"
            : data.order_status === 7
            ? "Shipped"
            : data.order_status === 8
            ? "Delivered"
            : data.order_status === 9
            ? "Returned"
            : data.order_status === 10
            ? "Catered"
            : ""}
        </td>
        <td className="product_table_data">${data.total_price}</td>
        <td
          className="product_table_data"
          style={{
            color: "Green",
          }}
        >
          Paid
        </td>
        <td className="product_table_data">
          {moment(data.created_on.split(".")[0]).format("D MMM YY")}
        </td>
        <td className="product_table_data">
          <div className="product_table_data_actions_container">
            <img
              src={AdminProductViewIcon}
              alt=""
              className="product_table_data_edit_action_img"
              onClick={(event) => {
                viewOrder(data);
              }}
            />

            {data.order_status === 9 ? (
              ""
            ) : (
              <img
                src={AdminProductEditIcon}
                alt=""
                className="product_table_data_edit_action_img"
                onClick={(event) => {
                  editOrder(data);
                }}
              />
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default function OrdersTable() {
  const [OrdersList, setOrdersList] = useState(null);
  const [SearchType, setSearchType] = useState(1); // 1 for name, 2 for id
  let [SearchName, setSearchName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllOrders(setOrdersList);
  }, []);
  return (
    <>
      {/* Product Header */}
      <Fade top>
        <div className="prod_head_box">
          <div className="prod_head_title_container">
            <div className="prod_head_title">Manage Orders</div>

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
                Manage Orders
              </div>
            </div>
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
                placeholder="Search Orders..."
                className="prod_head_search"
                value={SearchName}
                onChange={(event) => {
                  setSearchName((SearchName = event.target.value));

                  SearchType === 1
                    ? getOrdersByName(setOrdersList, SearchName)
                    : getOrdersById(setOrdersList, SearchName);
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
                <th className="table_heading">Customer Name</th>
                <th className="table_heading">Order ID</th>
                <th className="table_heading">Status</th>
                <th className="table_heading">Total</th>
                <th className="table_heading">Payment Status</th>
                <th className="table_heading">Date Added</th>
                <th className="table_heading">Action</th>
              </tr>
            </thead>

            <tbody>
              {OrdersList
                ? OrdersList.map((item, index) => (
                    <OrderTableRow
                      data={item}
                      setOrdersList={setOrdersList}
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

export const getAllOrders = (setOrdersList) => {
  getallorders()
    .then((res) => {
      console.log("Updated orders list retrieved", res.data);
      setOrdersList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching orders:", err);
    });
};

export const getOrdersByName = (setOrdersList, SearchName) => {
  let reqObj = {
    name: SearchName,
  };
  console.log("reqObj", reqObj);
  getordersbyname(SearchName)
    .then((res) => {
      console.log("Searched Orders list retrieved");
      setOrdersList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching Orders:", err);
    });
};

export const getOrdersById = (setOrdersList, SearchName) => {
  let reqObj = {
    id: SearchName,
  };
  console.log("reqObj", reqObj);
  getordersbyid(SearchName)
    .then((res) => {
      console.log("Searched Orders list retrieved");
      console.log("res", res);
      setOrdersList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching Orders:", err);
    });
};

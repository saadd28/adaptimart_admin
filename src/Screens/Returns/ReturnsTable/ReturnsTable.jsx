import { useNavigate } from "react-router-dom";
import "./ReturnsTable.css";

import React, { useEffect, useState } from "react";
import {
  AdminDirectoryPathArrow,
  AdminProductEditIcon,
  AdminProductViewIcon,
  AdminProfilePic,
  AdminSearchIcon,
} from "../../../Assets";
import { Fade } from "react-reveal";
import {
  getallreturns,
  getreturnsbyid,
  getreturnsbyname,
} from "../../../api/apis";
import moment from "moment";

const ReturnsTableRow = ({ data, setReturnsList, index }) => {
  const navigate = useNavigate();

  const editReturn = (data) => {
    navigate("/edit_return_details", {
      state: {
        datatosend: data,
      },
    });
  };

  //   const viewOrder = (data) => {
  //     navigate("/view_order_details", {
  //       state: {
  //         datatosend: data,
  //       },
  //     });
  //   };

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
  //             getAllProducts(setProductsList);
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
              src={AdminProductEditIcon}
              alt=""
              className="product_table_data_edit_action_img"
              onClick={(event) => {
                editReturn(data);
              }}
            />
            {/* <img
              src={AdminProductViewIcon}
              alt=""
              className="product_table_data_edit_action_img"
              onClick={(event) => {
                // viewOrder(data);
              }}
            /> */}
          </div>
        </td>
      </tr>
    </>
  );
};

export default function ReturnsTable() {
  const [ReturnsList, setReturnsList] = useState(null);
  const [SearchType, setSearchType] = useState(1); // 1 for name, 2 for id
  let [SearchName, setSearchName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllReturns(setReturnsList);
  }, []);

  return (
    <>
      {/* Product Header */}
      <Fade top>
        <div className="prod_head_box">
          <div className="prod_head_title_container">
            <div className="prod_head_title">Manage Returns</div>

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
                Manage Returns
              </div>
            </div>

            {/* <button
                className="prod_head_add_product_btn"
                onClick={() => {
                  navigate("/product_details");
                }}
              >
                + Add Product
              </button> */}
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
                placeholder="Search Returns..."
                className="prod_head_search"
                value={SearchName}
                onChange={(event) => {
                  setSearchName((SearchName = event.target.value));

                  SearchType === 1
                    ? getReturnsyName(setReturnsList, SearchName)
                    : getReturnsById(setReturnsList, SearchName);
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
              {ReturnsList
                ? ReturnsList.map((item, index) => (
                    <ReturnsTableRow
                      data={item}
                      setReturnsList={setReturnsList}
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

export const getAllReturns = (setReturnsList) => {
  getallreturns()
    .then((res) => {
      console.log("Updated returns list retrieved", res.data);
      setReturnsList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching returns:", err);
    });
};

export const getReturnsyName = (setReturnsList, SearchName) => {
  let reqObj = {
    name: SearchName,
  };
  console.log("reqObj", reqObj);
  getreturnsbyname(SearchName)
    .then((res) => {
      console.log("Searched Returns list retrieved");
      setReturnsList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching Returns:", err);
    });
};

export const getReturnsById = (setReturnsList, SearchName) => {
  let reqObj = {
    id: SearchName,
  };
  console.log("reqObj", reqObj);
  getreturnsbyid(SearchName)
    .then((res) => {
      console.log("Searched Returns list retrieved");
      console.log("res", res);
      setReturnsList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching Returns:", err);
    });
};

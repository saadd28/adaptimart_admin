import { useNavigate } from "react-router-dom";
import "./CouponsTable.css";

import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import {
  AdaptiMartLogoCart,
  AdminDirectoryPathArrow,
  AdminProductEditIcon,
  AdminProductTrashIcon,
  AdminProfilePic,
  AdminSearchIcon,
} from "../../../Assets";
import moment from "moment";

const CouponsTableRow = ({ data, setCouponsList, index }) => {
  const navigate = useNavigate();

  // const deleteCoupon = (data) => {
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
  //           getAllProducts(setCouponsList);
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //       alert("Please check your connection");
  //     });
  // };

  const editCoupon = (data) => {
    navigate("/coupon_details", {
      state: {
        datatosend: data,
      },
    });
  };

  return (
    <>
      <tr className="product_table_row">
        <td className="product_table_data">{index + 1}</td>
        <td className="product_table_data">
          <div>{data.description}</div>
        </td>
        <td
          className="product_table_data"
          style={{
            color: "#52C1C5",
          }}
        >
          {data.code}
        </td>
        <td className="product_table_data">{data.discount_percentage}</td>
        <td className="product_table_data">
          {/* {moment(data.created_on.split(".")[0]).format("D MMM YY")} */}
          {data.created_on}
        </td>
        <td className="product_table_data">
          <div className="product_table_data_actions_container">
            <img
              src={AdminProductEditIcon}
              alt=""
              className="product_table_data_edit_action_img"
              onClick={(event) => {
                  editCoupon(data);
              }}
            />
            <img
              src={AdminProductTrashIcon}
              alt=""
              className="product_table_data_edit_action_img"
              onClick={(event) => {
                  // deleteCoupon(data);
              }}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default function CouponsTable() {
  const [CouponsList, setCouponsList] = useState(null);
  const [SearchType, setSearchType] = useState(1); // 1 for name, 2 for id
  let [SearchName, setSearchName] = useState("");
  const navigate = useNavigate();

  let data = [
    {
      id: 1,
      description: "25% Discount",
      code: "DIS25",
      discount_percentage: 25.0,
      created_on: "12-10-2023",
    },
    {
      id: 2,
      description: "25% Discount",
      code: "DIS25",
      discount_percentage: 25.0,
      created_on: "12-10-2023",
    },
    {
      id: 3,
      description: "25% Discount",
      code: "DIS25",
      discount_percentage: 25.0,
      created_on: "12-10-2023",
    },
    {
      id: 4,
      description: "25% Discount",
      code: "DIS25",
      discount_percentage: 25.0,
      created_on: "12-10-2023",
    },
  ];

  //   useEffect(() => {
  //     getAllProducts(setCouponsList);
  //   }, []);

  return (
    <>
      {/* Product Header */}
      <Fade top>
        <div className="prod_head_box">
          <div className="prod_head_title_container">
            <div className="prod_head_title">Manage Coupons</div>

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
                Manage Coupons
              </div>
            </div>

            <button
              className="prod_head_add_product_btn"
              onClick={() => {
                navigate("/coupon_details");
              }}
            >
              + Add Coupon
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
                placeholder="Search Coupons..."
                className="prod_head_search"
                value={SearchName}
                onChange={(event) => {
                  setSearchName((SearchName = event.target.value));

                  // SearchType === 1
                  //   ? getCouponsByName(setCouponsList, SearchName)
                  //   : getCouponsById(setCouponsList, SearchName);
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
                <th className="table_heading">Coupon Description</th>
                <th className="table_heading">Coupon Code</th>
                <th className="table_heading">Discount (%)</th>
                <th className="table_heading">Date Added</th>
                <th className="table_heading">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* {CouponsList
                ? CouponsList.map((item, index) => (
                    <CouponsTableRow
                      data={item}
                      setCouponsList={setCouponsList}
                      index={index}
                    />
                  ))
                : ""} */}
              {data
                ? data.map((item, index) => (
                    <CouponsTableRow
                      data={item}
                      setCouponsList={setCouponsList}
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

//   export const getAllProducts = (setCouponsList) => {
//     getallproducts()
//       .then((res) => {
//         console.log("Updated products list retrieved");
//         setCouponsList(res.data);
//       })
//       .catch((err) => {
//         console.log("Error fetching products:", err);
//       });
//   };
//   export const getCouponsByName = (setCouponsList, SearchName) => {
//     let reqObj = {
//       name: SearchName,
//     };
//     console.log("reqObj", reqObj);
//     getcouponsbyname(SearchName)
//       .then((res) => {
//         console.log("Searched Coupons list retrieved");
//         setCouponsList(res.data);
//       })
//       .catch((err) => {
//         console.log("Error fetching products:", err);
//       });
//   };

//   export const getCouponsById = (setCouponsList, SearchName) => {
//     let reqObj = {
//       id: SearchName,
//     };
//     console.log("reqObj", reqObj);
//     getproductsbyid(SearchName)
//       .then((res) => {
//         console.log("Searched products list retrieved");
//         console.log("res", res);
//         setCouponsList(res.data);
//       })
//       .catch((err) => {
//         console.log("Error fetching products:", err);
//       });
//   };

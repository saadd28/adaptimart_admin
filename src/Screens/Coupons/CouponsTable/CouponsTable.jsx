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
import { deletecoupon, getallcoupons, getcouponsbycode, getcouponsbyid } from "../../../api/apis";

const CouponsTableRow = ({ data, setCouponsList, index }) => {
  const navigate = useNavigate();

  const deleteCoupon = (data) => {
    console.log("delete coupon called");

    let delObj = {
      id: data ? data.id : 0,
    };
    deletecoupon(delObj)
      .then((res) => {
        console.log("resp", res);

        if (res.status === 200) {
          if (res.data.affectedRows === 1) {
            console.log("resp", res);
            alert("Coupon Deleted Successfully");
            getAllCoupons(setCouponsList);
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert("Please check your connection");
      });
  };

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
        <td className="product_table_data">{data.id}</td>
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
          {moment(data.created_on.split(".")[0]).format("D MMM YY")}
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
                deleteCoupon(data);
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


  useEffect(() => {
    getAllCoupons(setCouponsList);
    console.log("Coupons List:", CouponsList);
  }, []);
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

                  SearchType === 1
                    ? getCouponsByCode(setCouponsList, SearchName)
                    : getCouponsById(setCouponsList, SearchName);
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
                <th className="table_heading">Coupon ID</th>
                <th className="table_heading">Coupon Code</th>
                <th className="table_heading">Discount (%)</th>
                <th className="table_heading">Date Added</th>
                <th className="table_heading">Action</th>
              </tr>
            </thead>

            <tbody>
              {CouponsList
                ? CouponsList.map((item, index) => (
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

export const getAllCoupons = (setCouponsList) => {
  getallcoupons()
    .then((res) => {
      console.log("Updated coupons list retrieved");
      setCouponsList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching coupons:", err);
    });
};


export const getCouponsByCode = (setCouponsList, SearchName) => {
  let reqObj = {
    name: SearchName,
  };
  console.log("reqObj", reqObj);
  getcouponsbycode(SearchName)
    .then((res) => {
      console.log("Searched Coupons list retrieved");
      setCouponsList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching coupons:", err);
    });
};

export const getCouponsById = (setCouponsList, SearchName) => {
  let reqObj = {
    id: SearchName,
  };
  console.log("reqObj", reqObj);
  getcouponsbyid(SearchName)
    .then((res) => {
      console.log("Searched Coupons list retrieved");
      console.log("res", res);
      setCouponsList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching coupons:", err);
    });
};

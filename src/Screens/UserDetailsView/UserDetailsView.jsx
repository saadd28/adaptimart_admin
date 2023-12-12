import { Fade } from "react-reveal";
import Navbar from "../../Compnents/Navbar/Navbar";
import "./UserDetailsView.css";

import React from "react";
import {
  AdaptiMartLogoCart,
  AdminDirectoryPathArrow,
  AdminProfilePic,
  UserDetailsBG,
  UserProfilePic,
  ViewOrderCustomerIcon,
  ViewOrderEmailIcon,
  ViewOrderLocationIcon,
  ViewOrderPhoneIcon,
  ViewOrderProcessedIcon,
  ViewUserOrderCountIcon,
} from "../../Assets";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const ViewUserTableRow = ({ data, index }) => {
  const navigate = useNavigate();

  return (
    <>
      <tr className="product_table_row">
        <td className="product_table_data">{data.order_id}</td>
        <td className="product_table_data">
          <div className="product_table_data_name_container">
            <img
              src={
                data.products
                  ? data.products[0].product_image
                    ? "http://localhost:4000/" + data.products[0].product_image
                    : AdaptiMartLogoCart
                  : AdaptiMartLogoCart
              }
              alt=""
              className="product_table_data_img"
            />
            <div>{data.products ? data.products[0].product_name : ""}</div>
          </div>
        </td>
        <td className="product_table_data">${data.total_price}</td>
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
        <td className="product_table_data">
          {moment(data.date_placed.split(".")[0]).format("D MMM YY")}
        </td>
      </tr>
    </>
  );
};

export default function UserDetailsView() {
  const navigate = useNavigate();
  const location = useLocation();
  let data = location.state ? location.state.datatosend : null;
  const orders_count = location.state ? location.state.orders_count : 0;


  console.log("data in user", data);

  return (
    <>
      <div className="dashboard_box">
        {/* MANAGE PRODUCTS IS NOT BEING HIGHLIGHTED */}
        <Navbar />

        <div className="product_details_main_container">
          {/* <ProductDetailsHeader /> */}
          <Fade top>
            {/* Product Details Header */}
            <div className="prod_head_title_container">
              <div className="prod_head_title">User Details</div>

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

                <div className="prod_head_dir_path_content">Manage Users</div>
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
                  View User Details
                </div>
              </div>

              <div className="product_details_header_buttons_container">
                <button
                  className="product_details_header_cancel_btn"
                  onClick={() => {
                    navigate("/manage_users");
                  }}
                >
                  Go Back
                </button>
              </div>
            </div>
            {/* End Product Details Header */}
          </Fade>

          <Fade right>
            <div className="user_details_main_container">
              <div className="user_details_user_infocard">
                {/* <div className="user_details_user_infocard_bg"></div> */}
                {/* <img
                  src={UserDetailsBG}
                  alt=""
                  className="user_details_user_infocard_bg"
                /> */}
                <div className="user_details_user_infocard_header">
                  <img
                    src={
                      data.profile_pic
                        ? "http://localhost:4000/" + data.profile_pic
                        : AdaptiMartLogoCart
                    }
                    alt=""
                    className="user_details_user_infocard_header_img"
                  />

                  <div className="user_details_user_infocard_header_username">
                    {data.first_name + " " + data.last_name}
                  </div>
                </div>

                <hr className="user_details_user_infocard_seperation_line" />

                <div className="user_details_user_infocard_details_container">
                  <div className="user_details_user_infocard_detailscard">
                    <img
                      src={ViewOrderCustomerIcon}
                      alt=""
                      className="user_details_user_infocard_detailscard_img"
                    />

                    <div className="user_details_user_infocard_detailscard_content_container">
                      <div className="user_details_user_infocard_detailscard_content_title">
                        User ID
                      </div>
                      <div className="user_details_user_infocard_detailscard_content">
                        {data.user_id}
                      </div>
                    </div>
                  </div>
                  <div className="user_details_user_infocard_detailscard">
                    <img
                      src={ViewOrderEmailIcon}
                      alt=""
                      className="user_details_user_infocard_detailscard_img"
                    />

                    <div className="user_details_user_infocard_detailscard_content_container">
                      <div className="user_details_user_infocard_detailscard_content_title">
                        Email
                      </div>
                      <div className="user_details_user_infocard_detailscard_content">
                        {data.email}
                      </div>
                    </div>
                  </div>
                  <div className="user_details_user_infocard_detailscard">
                    <img
                      src={ViewOrderPhoneIcon}
                      alt=""
                      className="user_details_user_infocard_detailscard_img"
                    />

                    <div className="user_details_user_infocard_detailscard_content_container">
                      <div className="user_details_user_infocard_detailscard_content_title">
                        Phone Number
                      </div>
                      <div className="user_details_user_infocard_detailscard_content">
                        {data.phone}
                      </div>
                    </div>
                  </div>
                  <div className="user_details_user_infocard_detailscard">
                    <img
                      src={ViewOrderLocationIcon}
                      alt=""
                      className="user_details_user_infocard_detailscard_img"
                    />

                    <div className="user_details_user_infocard_detailscard_content_container">
                      <div className="user_details_user_infocard_detailscard_content_title">
                        Address
                      </div>
                      <div className="user_details_user_infocard_detailscard_content">
                        {data.address + " " + data.city}
                      </div>
                    </div>
                  </div>
                  <div className="user_details_user_infocard_detailscard">
                    <img
                      src={ViewUserOrderCountIcon}
                      alt=""
                      className="user_details_user_infocard_detailscard_img"
                    />

                    <div className="user_details_user_infocard_detailscard_content_container">
                      <div className="user_details_user_infocard_detailscard_content_title">
                        Total Orders
                      </div>
                      <div className="user_details_user_infocard_detailscard_content">
                        {orders_count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="user_details_transaction_history_container">
                <div className="user_details_transaction_history_title">
                  Transaction History
                </div>

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
                        <th className="table_heading">Order ID</th>
                        <th className="table_heading">Product</th>
                        <th className="table_heading">Total</th>
                        <th className="table_heading">Status</th>
                        <th className="table_heading">Date</th>
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
                      {data.orders
                        ? data.orders.map((item, index) => (
                            <ViewUserTableRow data={item} index={index} />
                          ))
                        : ""}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
}

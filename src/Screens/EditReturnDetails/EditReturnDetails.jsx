import "./EditReturnDetails.css";

import { Fade } from "react-reveal";
import Navbar from "../../Compnents/Navbar/Navbar";

import React, { useEffect, useState } from "react";
import {
  AdaptiMartLogoCart,
  AdminDirectoryPathArrow,
  AdminProfilePic,
  DamagedIcon,
  NonDamagedIcon,
  ViewOrderCustomerIcon,
  ViewOrderDateIcon,
  ViewOrderDeliveredIcon,
  ViewOrderEmailIcon,
  ViewOrderLocationIcon,
  ViewOrderPaymentIcon,
  ViewOrderPhoneIcon,
  ViewOrderPlacedIcon,
  ViewOrderProcessedIcon,
  ViewOrderShippedIcon,
  ViewOrderShippingIcon,
} from "../../Assets";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  getordersbyid,
  markasdamaged,
  markasnondamaged,
  updateorderstatus,
} from "../../api/apis";

const ReturnsViewTableRow = ({ data, setProductList }) => {
  const NonDamagedProduct = (data) => {
    console.log("non damage product called");

    let formData = {
      product_id: data.product_id,
      quantity: data.quantity,
    };
    console.log("formData", formData);
    markasnondamaged(formData)
      .then((res) => {
        console.log("resp", res);

        if (res.status === 200) {
          console.log("resp", res);
          alert("Product Marked as Non Damaged Successfully");
          // getAllProducts(setProductsList);
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert("Please check your connection");
      });
  };

  const DamagedProduct = (data) => {
    console.log("damage product called");

    let formData = {
      product_id: data.product_id,
      quantity: data.quantity,
    };
    console.log("formData", formData);
    markasdamaged(formData)
      .then((res) => {
        console.log("resp", res);

        if (res.status === 200) {
          console.log("resp", res);
          alert("Product Marked as Damaged Successfully");
          // getAllProducts(setProductsList);
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert("Please check your connection");
      });
  };

  let [marked, setmarked] = useState(0);
  return (
    <>
      <tr className="product_table_row">
        <td className="product_table_data">
          <div className="product_table_data_name_container">
            <img
              src={
                data.product_image
                  ? "http://localhost:4000/" + data.product_image
                  : AdaptiMartLogoCart
              }
              alt=""
              className="product_table_data_img"
            />
            <div>{data.product_name}</div>
          </div>
        </td>
        <td
          className="product_table_data"
          style={{
            color: "#52C1C5",
          }}
        >
          {data.product_id}
        </td>
        <td className="product_table_data">{data.quantity}</td>
        <td className="product_table_data">${data.product_price}</td>
        <td className="product_table_data">
          ${data.quantity * data.product_price}
        </td>
        <td className="product_table_data">
          {marked === 0 ? (
            <div className="product_table_data_actions_container">
              <img
                src={NonDamagedIcon}
                alt=""
                className="product_table_data_edit_action_img svg_color"
                onClick={(event) => {
                  NonDamagedProduct(data);
                  setmarked((marked = 2));
                }}
              />
              <img
                src={DamagedIcon}
                alt=""
                className="product_table_data_edit_action_img svg_color"
                onClick={(event) => {
                  // deleteProduct(data);
                  DamagedProduct(data);
                  setmarked((marked = 1));
                }}
              />
            </div>
          ) : marked == 1 ? (
            <div
              style={{
                color: "Red",
              }}
            >
              Damaged
            </div>
          ) : marked == 2 ? (
            <div
              style={{
                color: "Green",
              }}
            >
              Not Damaged
            </div>
          ) : (
            ""
          )}
        </td>
      </tr>
    </>
  );
};

export default function EditReturnDetails() {
  const [ProductList, setProductList] = useState(null);
  const ShippingRate = 5.0;
  const navigate = useNavigate();
  const location = useLocation();
  let data = location.state ? location.state.datatosend : null;
  let order_id = data.order_id;
  let order_status = data.order_status;
  const products_count = Object.keys(data.products).length;

  const updateOrder = (data) => {
    console.log("update order called");

    let formData = {
      order_id: order_id,
      status: order_status,
    };
    console.log("form data", formData);
    updateorderstatus(formData)
      .then((res) => {
        if (res.status === 200) {
          console.log("resp", res);
          alert("Order Status Updated Successfully");
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert("Failed to Update Order Status");
      });
  };

  useEffect(() => {
    getAllProductsOfOrder(setProductList, ProductList);
  }, []);

  return (
    <>
      <div className="dashboard_box">
        <Navbar />

        <div className="products_main_container">
          {/* Order Details Header */}
          <Fade top>
            <div className="prod_head_box">
              <div className="prod_head_title_container">
                <div className="prod_head_title">Return Details</div>

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
                    Edit Return
                  </div>
                </div>
                <div className="product_details_header_buttons_container">
                  <button
                    className="product_details_header_cancel_btn"
                    onClick={() => {
                      navigate("/manage_returns");
                    }}
                  >
                    Cancel
                  </button>
                  {data.order_status !== 10 ? (
                    <button
                      className="prod_head_add_product_btn"
                      style={{
                        marginRight: "1em",
                      }}
                      onClick={() => {
                        updateOrder();
                        navigate("/manage_returns");
                      }}
                    >
                      {data.order_status === 5
                        ? "Process Order"
                        : data.order_status === 6
                        ? "Ship Order"
                        : data.order_status === 7
                        ? "Mark Delivered"
                        : data.order_status === 8
                        ? "Mark Returned"
                        : data.order_status === 9
                        ? "Mark Catered"
                        : ""}
                    </button>
                  ) : (
                    ""
                  )}

                  {/* <button
                    className="prod_head_add_product_btn"
                    onClick={() => {
                      //   saveproduct();

                      navigate("/manage_returns");
                    }}
                  >
                    Save Return
                  </button> */}
                </div>
              </div>
            </div>
          </Fade>

          {/* End Product Header */}
          <Fade right>
            <div className="order_view_first_row_container">
              <div className="order_view_info_card">
                <div className="order_view_info_card_title_container">
                  <div>Order #{data.order_id}</div>
                  <div className="order_view_info_card_status">
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
                  </div>
                </div>

                <div className="order_view_content_row_container">
                  <div className="order_view_content_row_title_container">
                    <img
                      src={ViewOrderDateIcon}
                      alt=""
                      className="order_view_content_icon_img"
                    />
                    <div>Added</div>
                  </div>

                  <div>
                    {moment(data.created_on.split(".")[0]).format("D MMM YY")}
                  </div>
                </div>
                <div className="order_view_content_row_container">
                  <div className="order_view_content_row_title_container">
                    <img
                      src={ViewOrderPaymentIcon}
                      alt=""
                      className="order_view_content_icon_img"
                    />
                    <div>Payment Method</div>
                  </div>

                  <div>Cash On Delivery</div>
                </div>
                <div className="order_view_content_row_container">
                  <div className="order_view_content_row_title_container">
                    <img
                      src={ViewOrderShippingIcon}
                      alt=""
                      className="order_view_content_icon_img"
                    />
                    <div>Shipping ID</div>
                  </div>

                  <div>{data.order_id}</div>
                </div>
              </div>
              <div className="order_view_info_card">
                <div className="order_view_info_card_title_container">
                  <div>Customer</div>
                  {/* <div>Processing</div> */}
                </div>

                <div className="order_view_content_row_container">
                  <div className="order_view_content_row_title_container">
                    <img
                      src={ViewOrderCustomerIcon}
                      alt=""
                      className="order_view_content_icon_img"
                    />
                    <div>Customer</div>
                  </div>

                  <div>{data.first_name + " " + data.last_name}</div>
                </div>
                <div className="order_view_content_row_container">
                  <div className="order_view_content_row_title_container">
                    <img
                      src={ViewOrderEmailIcon}
                      alt=""
                      className="order_view_content_icon_img"
                    />
                    <div>Email</div>
                  </div>

                  <div>{data.email}</div>
                </div>
                <div className="order_view_content_row_container">
                  <div className="order_view_content_row_title_container">
                    <img
                      src={ViewOrderPhoneIcon}
                      alt=""
                      className="order_view_content_icon_img"
                    />
                    <div>Phone</div>
                  </div>

                  <div>{data.user_phone}</div>
                </div>
              </div>

              <div className="order_view_info_card">
                <div className="order_view_info_card_title_container">
                  <div>Address</div>
                  {/* <div>Processing</div> */}
                </div>

                <div className="order_view_address_row_container">
                  <div className="order_view_address_row_title_container">
                    <img
                      src={ViewOrderLocationIcon}
                      alt=""
                      className="order_view_content_icon_img"
                    />
                    <div className="order_view_address_container">
                      <div className="order_view_address_title">Billing</div>
                      <div className="order_view_address_content">
                        {data.user_address + ", " + data.user_city}
                      </div>
                    </div>
                  </div>
                  <div className="order_view_content_row_title_container">
                    <img
                      src={ViewOrderLocationIcon}
                      alt=""
                      className="order_view_content_icon_img"
                    />
                    <div className="order_view_address_container">
                      <div className="order_view_address_title">Shipping</div>
                      <div className="order_view_address_content">
                        {data.user_address + ", " + data.user_city}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order_view_second_row_container">
              <div className="order_view_table_container">
                <div className="order_view_title_container">
                  <div className="order_view_title">Products List</div>
                  <div className="order_view_product_count">
                    {products_count} Products
                  </div>
                </div>

                <div className="order_view_container">
                  <table
                    className="order_view_table"
                    style={{
                      // borderSpacing: "0 10px",
                      borderCollapse: "separate",
                    }}
                  >
                    <thead>
                      <tr className="table_heading_row">
                        {/* <th className="order_view_table_heading">No.</th> */}
                        <th className="table_heading">Product Name</th>
                        <th className="table_heading">SKU</th>
                        <th className="table_heading">Quantity</th>
                        <th className="table_heading">Price</th>
                        <th className="table_heading">Total Price</th>
                        <th className="table_heading">Damaged</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.products
                        ? data.products.map((item) => (
                            <ReturnsViewTableRow
                              data={item}
                              setProductList={setProductList}
                            />
                          ))
                        : ""}
                    </tbody>
                  </table>
                </div>
                <div className="order_view_bill_summary_container">
                  <div className="order_view_total_price_container">
                    <div className="order_view_price_title">Sub Total</div>
                    <div className="order_view_price">${data.total_price}</div>
                  </div>
                  <div className="order_view_total_price_container">
                    <div className="order_view_price_title">Shipping Rate</div>
                    <div className="order_view_price">${ShippingRate}</div>
                  </div>
                  <div className="order_view_total_price_container">
                    <div className="order_view_price_title">Grand Total</div>
                    <div className="order_view_price">
                      <b>${data.total_price + ShippingRate}</b>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order_view_timeline_container">
                <div className="order_view_timeline_title">Order Status</div>

                <div className="order_view_timeline_status_infocards_container">
                  {data.date_placed ? (
                    <div className="order_view_timeline_infocard">
                      <img
                        src={ViewOrderPlacedIcon}
                        alt=""
                        className="order_view_timeline_status_img"
                      />

                      <div className="order_view_timeline_infocard_content_container">
                        <div className="order_view_timeline_infocard_title">
                          Order Placed
                        </div>
                        <div className="order_view_timeline_infocard_content">
                          An order has been placed.
                        </div>

                        <div className="order_view_timeline_infocard_date">
                          {moment(data.date_placed.split(".")[0]).format(
                            "D MMM YY"
                          )}
                          , {moment(data.date_placed).format("HH:mm")}
                          {/* {data.date_placed} */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data.date_processed ? (
                    <div className="order_view_timeline_infocard">
                      <img
                        src={ViewOrderProcessedIcon}
                        alt=""
                        className="order_view_timeline_status_img"
                      />

                      <div className="order_view_timeline_infocard_content_container">
                        <div className="order_view_timeline_infocard_title">
                          Processing
                        </div>
                        <div className="order_view_timeline_infocard_content">
                          Seller has proccessed your order.
                        </div>

                        <div className="order_view_timeline_infocard_date">
                          {moment(data.date_processed.split(".")[0]).format(
                            "D MMM YY"
                          )}
                          , {moment(data.date_processed).format("HH:mm")}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {data.date_shipped ? (
                    <div className="order_view_timeline_infocard">
                      <img
                        src={ViewOrderShippedIcon}
                        alt=""
                        className="order_view_timeline_status_img"
                      />

                      <div className="order_view_timeline_infocard_content_container">
                        <div className="order_view_timeline_infocard_title">
                          Shipping
                        </div>
                        <div className="order_view_timeline_infocard_content">
                          The order has been shipped.
                        </div>

                        <div className="order_view_timeline_infocard_date">
                          {moment(data.date_shipped.split(".")[0]).format(
                            "D MMM YY"
                          )}
                          , {moment(data.date_shipped).format("HH:mm")}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {data.date_delivered ? (
                    <div className="order_view_timeline_infocard">
                      <img
                        src={ViewOrderDeliveredIcon}
                        alt=""
                        className="order_view_timeline_status_img"
                      />

                      <div className="order_view_timeline_infocard_content_container">
                        <div className="order_view_timeline_infocard_title">
                          Delivered
                        </div>
                        <div className="order_view_timeline_infocard_content">
                          The order has been delivered.
                        </div>

                        <div className="order_view_timeline_infocard_date">
                          {moment(data.date_delivered.split(".")[0]).format(
                            "D MMM YY"
                          )}
                          , {moment(data.date_delivered).format("HH:mm")}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
}

export const getAllProductsOfOrder = (setProductList, ProductList) => {
  getordersbyid()
    .then((res) => {
      console.log("Updated orders list retrieved", res.data);
      setProductList((ProductList = res.data));
    })
    .catch((err) => {
      console.log("Error fetching orders:", err);
    });
};

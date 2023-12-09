import "./EditReturnDetails.css"

import { Fade } from "react-reveal";
import Navbar from "../../Compnents/Navbar/Navbar";

import React, { useState } from "react";
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

const ReturnsViewTableRow = ({ data, setProductList, index }) => {
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
            <div>{data.name}</div>
          </div>
        </td>
        <td
          className="product_table_data"
          style={{
            color: "#52C1C5",
          }}
        >
          {data.sku_id}
        </td>
        <td className="product_table_data">{data.quantity}</td>
        <td className="product_table_data">${data.price}</td>
        <td className="product_table_data">${data.quantity * data.price}</td>
        <td className="product_table_data">
        <div className="product_table_data_actions_container">
            <img
              src={NonDamagedIcon}
              alt=""
              className="product_table_data_edit_action_img svg_color"
              onClick={(event) => {
                // editProduct(data);
              }}
            />
            <img
              src={DamagedIcon}
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

export default function EditReturnDetails() {
  const [ProductList, setProductList] = useState(null);
  const navigate = useNavigate();
//   const location = useLocation();

//   let data = location.state ? location.state.datatosend : null;


  let data = [
    {
      id: 1,
      name: "Smartwatch E2",
      sku_id: 1,
      quantity: 1,
      price: 100,
      date: "12-03-23",
      time: "4:00",
    },
    {
      id: 2,
      name: "Smartwatch E2",
      sku_id: 1,
      quantity: 1,
      price: 100,
      date: "12-03-23",
      time: "4:00",
    },
    {
      id: 3,
      name: "Smartwatch E2",
      sku_id: 1,
      quantity: 1,
      price: 100,
      date: "12-03-23",
      time: "4:00",
    },
  ];
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

                  <button
                    className="prod_head_add_product_btn"
                    onClick={() => {
                    //   saveproduct();

                      navigate("/manage_returns");
                    }}
                  >
                    Save Return
                  </button>
                </div>
              </div>
            </div>
          </Fade>

          {/* End Product Header */}
          <Fade right>
            <div className="order_view_first_row_container">
              <div className="order_view_info_card">
                <div className="order_view_info_card_title_container">
                  <div>Order #302011</div>
                  <div className="order_view_info_card_status">Processing</div>
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

                  <div>12 Dec 2022</div>
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

                  <div>Visa</div>
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

                  <div>1</div>
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

                  <div>John Adam</div>
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

                  <div>josh_adam@mail.com</div>
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

                  <div>909 427 2910</div>
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
                        1833 Bel Meadow Drive, Fontana, California 92335, USA
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
                        1833 Bel Meadow Drive, Fontana, California 92335, USA
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
                  <div className="order_view_product_count">3 Products</div>
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
                      {/* {ProductsList
                  ? ProductsList.map((item, index) => (
                      <ProductTableRow
                        data={item}
                        setProductsList={setProductsList}
                        index={index}
                      />
                    ))
                  : ""} */}
                      {data
                        ? data.map((item, index) => (
                            <ReturnsViewTableRow
                              data={item}
                              setProductList={setProductList}
                              index={index}
                            />
                          ))
                        : ""}
                    </tbody>
                  </table>
                </div>
                <div className="order_view_bill_summary_container">
                  <div className="order_view_total_price_container">
                    <div className="order_view_price_title">Sub Total</div>
                    <div className="order_view_price">$300.00</div>
                  </div>
                  <div className="order_view_total_price_container">
                    <div className="order_view_price_title">Shipping Rate</div>
                    <div className="order_view_price">$5.00</div>
                  </div>
                  <div className="order_view_total_price_container">
                    <div className="order_view_price_title">Grand Total</div>
                    <div className="order_view_price">
                      <b>$305.00</b>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order_view_timeline_container">
                <div className="order_view_timeline_title">Order Status</div>

                <div className="order_view_timeline_status_infocards_container">
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
                        12-03-23, 01:00
                      </div>
                    </div>
                  </div>

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
                        12-03-23, 01:00
                      </div>
                    </div>
                  </div>
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
                        12-03-23, 01:00
                      </div>
                    </div>
                  </div>
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
                        12-03-23, 01:00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
}


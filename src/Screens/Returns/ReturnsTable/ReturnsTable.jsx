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
        <td className="product_table_data">{data.status}</td>
        <td className="product_table_data">$ {data.total_price}</td>
        <td className="product_table_data">{data.payment_status}</td>
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

  let data = [
    {
      id: 1,
      name: "XYZ",
      status: "Returned",
      total_price: 1234,
      payment_status: "Paid",
      created_on: "20-10-2023",
    },
    {
      id: 2,
      name: "XYZ",
      status: "Returned",
      total_price: 1234,
      payment_status: "Paid",
      created_on: "20-10-2023",
    },
    {
      id: 3,
      name: "XYZ",
      status: "Returned",
      total_price: 1234,
      payment_status: "Paid",
      created_on: "20-10-2023",
    },
    {
      id: 4,
      name: "XYZ",
      status: "Returned",
      total_price: 1234,
      payment_status: "Paid",
      created_on: "20-10-2023",
    },
  ];

  // useEffect(() => {
  //   getAllProducts(setReturnsList);
  // }, []);

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

                  // SearchType === 1
                  //   ? getProductsByName(setReturnsList, SearchName)
                  //   : getProductsById(setReturnsList, SearchName);
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
              {/* {ReturnsList
                  ? ReturnsList.map((item, index) => (
                      <ProductTableRow
                        data={item}
                        setReturnsList={setReturnsList}
                        index={index}
                      />
                    ))
                  : ""} */}
              {data
                ? data.map((item, index) => (
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
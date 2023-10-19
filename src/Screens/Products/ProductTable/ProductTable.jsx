import moment from "moment/moment";
import {
  AdaptiMartLogoCart,
  AdminProductEditIcon,
  AdminProductTrashIcon,
} from "../../../Assets";
import { deleteproduct, getallproducts } from "../../../api/apis";
import "./ProductTable.css";

import React, { useEffect, useState } from "react";

const ProductTableRow = ({ data, setProductsList }) => {
  const deleteProduct = (data) => {
    console.log("delete product called");

    let delObj = {
      id: data ? data.id : 0,
    };
    debugger;
    deleteproduct(delObj)
      .then((res) => {
        console.log("resp", res);

        if (res.status === 200) {
          if (res.data.affectedRows === 1) {
            console.log("resp", res);
            alert("Product Deleted Successfully");
            getAllProducts(setProductsList);
            // navigate("/manage_products");
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert("Please check your connection");
      });
  };

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
              style={{
                width: "20px",
              }}
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
          {data.id}
        </td>
        <td className="product_table_data">{data.category}</td>
        <td className="product_table_data">{data.stock}</td>
        <td className="product_table_data">{data.price}</td>
        <td className="product_table_data">
          {moment(data.created_on.split(".")[0]).format("D MMM YY")}
        </td>
        <td className="product_table_data">
          <div className="product_table_data_actions_container">
            <img
              src={AdminProductEditIcon}
              alt=""
              className="product_table_data_edit_action_img"
            />
            <img
              src={AdminProductTrashIcon}
              alt=""
              className="product_table_data_edit_action_img"
              onClick={(event) => {
                deleteProduct(data);
              }}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default function ProductTable() {
  const [ProductsList, setProductsList] = useState(null);

  // let data = [
  //   {
  //     name: "Iphone X",
  //     sku_id: "1",
  //     category: "Electronics",
  //     stock: 100,
  //     price: 100,
  //     created_on: "12-10-2023",
  //   },
  //   {
  //     name: "Iphone X",
  //     sku_id: "1",
  //     category: "Electronics",
  //     stock: 100,
  //     price: 100,
  //     created_on: "12-10-2023",
  //   },
  //   {
  //     name: "Iphone X",
  //     sku_id: "1",
  //     category: "Electronics",
  //     stock: 100,
  //     price: 100,
  //     created_on: "12-10-2023",
  //   },
  //   {
  //     name: "Iphone X",
  //     sku_id: "1",
  //     category: "Electronics",
  //     stock: 100,
  //     price: 100,
  //     created_on: "12-10-2023",
  //   },
  // ];

  useEffect(() => {
    getAllProducts(setProductsList);
  }, []);

  return (
    <>
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
              <th className="table_heading">Product Name</th>
              <th className="table_heading">SKU_ID</th>
              <th className="table_heading">Category</th>
              <th className="table_heading">Stock</th>
              <th className="table_heading">Price</th>
              <th className="table_heading">Date Added</th>
              <th className="table_heading">Action</th>
            </tr>
          </thead>

          <tbody>
            {ProductsList
              ? ProductsList.map((item) => (
                  <ProductTableRow
                    data={item}
                    setProductsList={setProductsList}
                  />
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </>
  );
}

export const getAllProducts = (setProductsList) => {
  getallproducts()
    .then((res) => {
      console.log("Uodated products list retrieved");
      setProductsList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching products:", err);
    });
};

import axios from "axios";

export const addproduct = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/product/add", data);
};

export const getallproducts = () => {
  return axios.get("https://adaptimart-backend.vercel.app/api/product/getall");
  // return axios.get("http://saad.finfac.pk/api/product/getall");
};

// export const editname = (data) =>{
//     return axios.put("https://aidapro.dsmeglobal.com/api/Country/Put", data)
// }

export const deleteproduct = (data) => {
  console.log("data", data);
  return axios.put("https://adaptimart-backend.vercel.app/api/product/delete", data);
};

export const getproductsbyname = (ProductName) => {
  //   console.log("data", data);
  //   return axios.get(
  //     "https://adaptimart-backend.vercel.app/api/product/getbyname?name=${ProductName}"
  //   );
  const url = `https://adaptimart-backend.vercel.app/api/product/getbyname?name=${ProductName}`;

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const updateproduct = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/product/update", data);
};

export const getproductsbyid = (ProductId) => {
  //   console.log("data", data);
  //   return axios.get(
  //     "https://adaptimart-backend.vercel.app/api/product/getbyname?name=${ProductName}"
  //   );
  const url = `https://adaptimart-backend.vercel.app/api/product/getbyid?id=${ProductId}`;

  // Make a GET request with the constructed URL
  return axios.get(url);
};

// Shipments API

export const getallshipments = () => {
  return axios.get("https://adaptimart-backend.vercel.app/api/shipment/getall");
};

export const deleteshipment = (data) => {
  console.log("data", data);
  return axios.put("https://adaptimart-backend.vercel.app/api/shipment/delete", data);
};

export const getshipmentsbyname = (ShipmentName) => {
  const url = `https://adaptimart-backend.vercel.app/api/shipment/getbyname?name=${ShipmentName}`;

  return axios.get(url);
};

export const getshipmentsbyid = (ShipmentId) => {
  const url = `https://adaptimart-backend.vercel.app/api/shipment/getbyid?id=${ShipmentId}`;

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const addshipment = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/shipment/add", data);
};

export const getshipmentstatuslist = (ParentId) => {
  return axios.get(
    `https://adaptimart-backend.vercel.app/api/lookup/getbyparentid?id=${ParentId}`
  );
};

export const updateshipment = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/shipment/update", data);
};

// Coupons API

export const getallcoupons = () => {
  return axios.get("https://adaptimart-backend.vercel.app/api/coupon/getall");
};

export const deletecoupon = (data) => {
  console.log("data", data);
  return axios.put("https://adaptimart-backend.vercel.app/api/coupon/delete", data);
};

export const getcouponsbycode = (CouponCode) => {
  const url = `https://adaptimart-backend.vercel.app/api/coupon/getbycode?code=${CouponCode}`;

  return axios.get(url);
};

export const getcouponsbyid = (CouponId) => {
  const url = `https://adaptimart-backend.vercel.app/api/coupon/getbyid?id=${CouponId}`;

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const addcoupon = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/coupon/add", data);
};

export const updatecoupon = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/coupon/update", data);
};

// Suppliers API

export const getallsuppliers = () => {
  return axios.get("https://adaptimart-backend.vercel.app/api/supplier/getall");
};

export const deletesupplier = (data) => {
  console.log("data", data);
  return axios.put("https://adaptimart-backend.vercel.app/api/supplier/delete", data);
};

export const getsupplierbyname = (SupplierName) => {
  const url = `https://adaptimart-backend.vercel.app/api/supplier/getbyname?name=${SupplierName}`;

  return axios.get(url);
};

export const getsupplierbyid = (SupplierId) => {
  const url = `https://adaptimart-backend.vercel.app/api/supplier/getbyid?id=${SupplierId}`;

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const addsupplier = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/supplier/add", data);
};

export const updatesupplier = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/supplier/update", data);
};

// Category APIs

export const getallcategorys = () => {
  return axios.get("https://adaptimart-backend.vercel.app/api/category/getall");
};

// Users APIs

export const getallusers = () => {
  return axios.get("https://adaptimart-backend.vercel.app/api/account/getall");
};

export const getusersbyname = (UserName) => {
  const url = `https://adaptimart-backend.vercel.app/api/account/getbyname?name=${UserName}`;

  return axios.get(url);
};

export const getusersbyid = (UserID) => {
  const url = `https://adaptimart-backend.vercel.app/api/account/getbyid?id=${UserID}`;

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const blockuser = (UserID) => {
  const url = `https://adaptimart-backend.vercel.app/api/account/blockUser?id=${UserID}`;

  // Make a GET request with the constructed URL
  return axios.post(url);
};

export const unblockuser = (UserID) => {
  const url = `https://adaptimart-backend.vercel.app/api/account/unblockUser?id=${UserID}`;

  // Make a GET request with the constructed URL
  return axios.post(url);
};

export const addadmin = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/account/adduseradmin", data);
};

// Product Stock APIs

export const getallproductstock = () => {
  return axios.get("https://adaptimart-backend.vercel.app/api/productStock/getall");
};

export const getproductstockbyname = (UserName) => {
  const url = `https://adaptimart-backend.vercel.app/api/productStock/getbyname?name=${UserName}`;

  return axios.get(url);
};

export const getproductstockbyid = (UserID) => {
  const url = `https://adaptimart-backend.vercel.app/api/productStock/getbyid?id=${UserID}`;

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const updateproductstock = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/productStock/update", data);
};

// Orders APIs

export const getallorders = () => {
  return axios.get("https://adaptimart-backend.vercel.app/api/order/getall");
};

export const getordersbyname = (UserName) => {
  const url = `https://adaptimart-backend.vercel.app/api/order/getbyname?name=${UserName}`;

  return axios.get(url);
};

export const getordersbyid = (UserID) => {
  const url = `https://adaptimart-backend.vercel.app/api/order/getbyid?id=${UserID}`;

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const updateorderstatus = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/order/update", data);
};

// Returns APIs
export const getallreturns = () => {
  return axios.get("https://adaptimart-backend.vercel.app/api/return/getall");
};

export const getreturnsbyname = (UserName) => {
  const url = `https://adaptimart-backend.vercel.app/api/return/getbyname?name=${UserName}`;

  return axios.get(url);
};

export const getreturnsbyid = (OrderID) => {
  const url = `https://adaptimart-backend.vercel.app/api/return/getbyid?id=${OrderID}`;

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const markasnondamaged = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/return/markasunDamaged", data);
};

export const markasdamaged = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/return/markasDamaged", data);
};

// Dashboard APIs
export const gettotalrevenue = () => {
  const url = "https://adaptimart-backend.vercel.app/api/dashboard/gettotalrevenue";

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const gettotalsales = () => {
  const url = "https://adaptimart-backend.vercel.app/api/dashboard/gettotalsales";

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const gettotalproductskus = () => {
  const url = "https://adaptimart-backend.vercel.app/api/dashboard/gettotalskus";

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const gettotalusers = () => {
  const url = "https://adaptimart-backend.vercel.app/api/dashboard/gettotalusers";

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const gettopproducts = () => {
  const url = "https://adaptimart-backend.vercel.app/api/dashboard/gettopsellingskus";

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const getperdictions = (sku_id) => {
  const url = "http://localhost:8000/predict/";

  // Make a GET request with the constructed URL
  return axios.post(url, sku_id);
};

export const getpriceoptimization = (data) => {
  const url = "http://localhost:8001/fetch_data/";

  // Make a GET request with the constructed URL
  return axios.post(url, data);
};

export const updateprice = (Id, Price) => {
  const url = `https://adaptimart-backend.vercel.app/api/product/updateprice?id=${Id}&price=${Price}`;

  // Make a GET request with the constructed URL
  return axios.get(url);
};

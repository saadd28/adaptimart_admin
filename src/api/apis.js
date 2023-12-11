import axios from "axios";

export const addproduct = (data) => {
  return axios.post("http://localhost:4000/api/product/add", data);
};

export const getallproducts = () => {
  return axios.get("http://localhost:4000/api/product/getall");
};

// export const editname = (data) =>{
//     return axios.put("https://aidapro.dsmeglobal.com/api/Country/Put", data)
// }

export const deleteproduct = (data) => {
  console.log("data", data);
  return axios.put("http://localhost:4000/api/product/delete", data);
};

export const getproductsbyname = (ProductName) => {
  //   console.log("data", data);
  //   return axios.get(
  //     "http://localhost:4000/api/product/getbyname?name=${ProductName}"
  //   );
  const url = `http://localhost:4000/api/product/getbyname?name=${ProductName}`;

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const updateproduct = (data) => {
    return axios.post("http://localhost:4000/api/product/update", data);
};

export const getproductsbyid = (ProductId) => {
  //   console.log("data", data);
  //   return axios.get(
  //     "http://localhost:4000/api/product/getbyname?name=${ProductName}"
  //   );
  const url = `http://localhost:4000/api/product/getbyid?id=${ProductId}`;

  // Make a GET request with the constructed URL
  return axios.get(url);
};


// Shipments API

export const getallshipments = () => {
  return axios.get("http://localhost:4000/api/shipment/getall");
};

export const deleteshipment = (data) => {
  console.log("data", data);
  return axios.put("http://localhost:4000/api/shipment/delete", data);
};

export const getshipmentsbyname = (ShipmentName) => {

  const url = `http://localhost:4000/api/shipment/getbyname?name=${ShipmentName}`;

  return axios.get(url);
};

export const getshipmentsbyid = (ShipmentId) => {

  const url = `http://localhost:4000/api/shipment/getbyid?id=${ShipmentId}`;

  // Make a GET request with the constructed URL
  return axios.get(url);
};

export const addshipment = (data) => {
  return axios.post("http://localhost:4000/api/shipment/add", data);
};

export const getshipmentstatuslist = (ParentId) => {
  return axios.get(`http://localhost:4000/api/lookup/getbyparentid?id=${ParentId}`);
};

export const updateshipment = (data) => {
  return axios.post("http://localhost:4000/api/shipment/update", data);
};



// Suppliers API

export const getallsuppliers = () => {
  return axios.get("http://localhost:4000/api/supplier/getall");
};

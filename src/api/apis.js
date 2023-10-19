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

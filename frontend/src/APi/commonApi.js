import axios from "axios";
export const url = 'http://localhost:8000/';
const localData = JSON.parse(localStorage.getItem("Data"))||'';
export const http= axios.create({
  baseURL: `${url}api`,
  headers: {
    "content-type": "application/json",
  },
});
export const cart= axios.create({
  baseURL: `${url}api/`,
  headers: {
    "content-type": "application/json",
    "Authorization": `Bearer ${localData.token}`,
  },
});
export const auth= axios.create({
    baseURL: `${url}api`,
    headers: {
      "content-type": "multipart/form-data",
    },
  });
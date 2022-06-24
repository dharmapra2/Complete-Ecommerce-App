import axios from "axios";
export const url = 'http://localhost:8000/';
export const http= axios.create({
  baseURL: `${url}api`,
  headers: {
    "content-type": "application/json",
  },
});
export const auth= axios.create({
    baseURL: `${url}api`,
    headers: {
      "content-type": "multipart/form-data",
    },
  });
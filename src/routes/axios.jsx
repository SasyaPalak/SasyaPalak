import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.137.70:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

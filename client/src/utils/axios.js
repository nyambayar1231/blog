import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

instance.defaults.withCredentials = true;
instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;

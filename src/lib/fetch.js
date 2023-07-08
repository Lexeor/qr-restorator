import axios from "axios";

const instance = axios.create({
  baseURL: "http://62.84.125.174:81/api",
});

export const get = async (url, params = {}) => {
  const response = await instance({
    url: url,
    method: "GET",
    params: params,
  });
  return response.data;
};

export default instance;

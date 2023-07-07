import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
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

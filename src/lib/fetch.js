import axios from "axios";

const instance = axios.create({
  baseURL: "http://62.84.125.174:81/api",
  headers: {
    Accept: "application/json",
  },
});

export const get = async (url, params = {}) => {
  const config = {};

  // Fill config with params if they exists
  if (Object.keys(params).length > 0) {
    config["params"] = params;
  }

  try {
    const response = await instance.get(url, config);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const post = async (url, payload = {}) => {
  const response = await instance.post({
    url: url,
    method: "POST",
    data: payload,
  });
  return response.data;
};

export default instance;

import axios from "axios";

const instance = axios.create({
  baseURL: "http://62.84.125.174:81/api",
  headers: {
    Accept: "application/json",
  },
});

// GET

export const get = async (url, params = {}) => {
  const config = {};

  // Fill config with params if they exists
  if (Object.keys(params).length > 0) {
    config["params"] = params;
  }

  try {
    const response = await instance.get(url, config);
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      return { status: error.response.status, data: error.response.data };
    } else {
      errorLogger(error);
    }
  }
};

// POST

export const post = async (url, payload = {}) => {
  try {
    const response = await instance.post(url, payload);
    return response;
  } catch (error) {
    errorLogger(error);
  }
};

function errorLogger(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
}

export default instance;

import axios from "axios";

const BASE_URL = "http://43.202.231.124:8080/api";

const instanceConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
};

export const noCookieinstance = axios.create({ baseURL: BASE_URL });
export const instance = axios.create(instanceConfig);

export const acceptInstance = axios.create({
  ...instanceConfig,
  headers: {
    Accept: "*/*",
  },
});

export const jsonInstance = axios.create({
  ...instanceConfig,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

export const multiInstance = axios.create({
  ...instanceConfig,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

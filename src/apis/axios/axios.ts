import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:8080/api";

const instanceConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
};

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

const jwtInterceptor = (response: AxiosResponse) => {
  console.log(response);
  const accessToken = response.headers["authorization"];
  console.log(accessToken);
  localStorage.setItem("accessToken", accessToken);
  return response;
};

instance.interceptors.response.use(jwtInterceptor);
acceptInstance.interceptors.response.use(jwtInterceptor);
jsonInstance.interceptors.response.use(jwtInterceptor);
multiInstance.interceptors.response.use(jwtInterceptor);

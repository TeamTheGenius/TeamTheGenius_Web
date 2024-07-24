import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:8080/api";

const instanceConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
  Authrization: localStorage.getItem("accessToken"),
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

const jwtResponseInterceptor = (response: AxiosResponse) => {
  const isTokenReissued = response.headers["token-reissued"];
  if (isTokenReissued === "False") return response;

  const accessToken = response.headers["authorization"];
  if (accessToken) localStorage.setItem("accessToken", accessToken);
  return response;
};

const jwtRequestInterceptor = (request: any) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) request.headers.Authorization = accessToken;
  return request;
};

instance.interceptors.response.use(jwtResponseInterceptor);
acceptInstance.interceptors.response.use(jwtResponseInterceptor);
jsonInstance.interceptors.response.use(jwtResponseInterceptor);
multiInstance.interceptors.response.use(jwtResponseInterceptor);

instance.interceptors.request.use(jwtRequestInterceptor);
acceptInstance.interceptors.request.use(jwtRequestInterceptor);
jsonInstance.interceptors.request.use(jwtRequestInterceptor);
multiInstance.interceptors.request.use(jwtRequestInterceptor);

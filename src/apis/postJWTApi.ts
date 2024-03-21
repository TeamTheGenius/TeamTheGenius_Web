import { IDENTIFIER } from "@/constants/localStorageKey";
import { instance } from "./axios/axios";
import requests from "./axios/request";

const postJWTApi = async () => {
  const identifier = window.localStorage.getItem(IDENTIFIER);
  if (!identifier) return;

  const body = {
    identifier: identifier,
  };
  const data = await instance
    .post(`${requests.fetchAuth}`, body)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default postJWTApi;

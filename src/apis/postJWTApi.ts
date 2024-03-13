import { IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { NavigateFunction } from "react-router-dom";
import { instance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  navigate: NavigateFunction;
}

const postJWTApi = async ({ navigate }: Params) => {
  const identifier = window.localStorage.getItem(IDENTIFIER);
  if (!identifier) return;

  const body = {
    identifier: identifier,
  };
  const data = await instance
    .post(`${requests.fetchAuth}`, body)
    .then((res) => {
      console.log("로그인 요청", res);
      navigate(PATH.HOME);
    })
    .catch((err) => {
      window.localStorage.removeItem(IDENTIFIER);
      navigate(PATH.LOGIN);
      console.log("err", err);
    });
  return data;
};

export default postJWTApi;

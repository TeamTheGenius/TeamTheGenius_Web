import { IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";

import axios from "axios";
import { NavigateFunction } from "react-router-dom";

interface Params {
  navigate: NavigateFunction;
}

const postJWTApi = async ({ navigate }: Params) => {
  const identifier = window.localStorage.getItem(IDENTIFIER);
  if (!identifier) return;

  const body = {
    identifier: identifier,
  };
  const data = await axios
    .post("http://localhost:8080/api/auth", body, { withCredentials: true })
    .then((res) => {
      console.log("로그인 요청", res);
      navigate(PATH.HOME);
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data;
};

export default postJWTApi;

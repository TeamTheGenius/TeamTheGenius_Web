import { IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";

import axios from "axios";

function postJWTApi() {
  const identifier = window.localStorage.getItem(IDENTIFIER);
  if (!identifier) return;

  const body = {
    identifier: identifier,
  };
  axios
    .post("http://localhost:8080/api/auth", body, { withCredentials: true })
    .then((res: any) => {
      console.log("로그인 요청", res);
    })
    .catch((err: any) => {
      console.log("err", err);
    });
}

export default postJWTApi;

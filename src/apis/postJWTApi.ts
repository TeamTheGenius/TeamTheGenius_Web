import { IDENTIFIER } from "@/constants/localStorageKey";

import axios from "axios";

const postJWTApi = async () => {
  const identifier = window.localStorage.getItem(IDENTIFIER);
  if (!identifier) return;

  const body = {
    identifier: identifier,
  };
  const data = await axios
    .post("http://localhost:8080/api/auth", body, { withCredentials: true })
    .then((res) => {
      console.log("로그인 요청", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data;
};

export default postJWTApi;

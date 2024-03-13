import { PATH } from "@/constants/path";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { IDENTIFIER } from "@/constants/localStorageKey";
import requests from "./axios/request";
import axios from "axios";
import { instance, noCookieinstance } from "./axios/axios";
type SignUpApiParams = {
  identifier: string;
  nickname: string;
  information: string;
  interest: CheckboxValueType[];
  navigate: (path: string) => void;
};

const signUpApi = async ({
  identifier,
  nickname,
  information,
  interest,
  navigate,
}: SignUpApiParams) => {
  const body = {
    identifier: identifier,
    nickname: nickname,
    information: information,
    interest: interest,
  };
  await noCookieinstance
    .post(`${requests.fetchAuthSignup}`, body)
    .then((res) => {
      console.log("res", res);
      window.localStorage.setItem(IDENTIFIER, res.data.data.identifier);
      console.log(window.localStorage.getItem(IDENTIFIER));
      navigate(PATH.AUTH);
    })
    .catch((err) => {
      alert("오류가 발생했습니다.");
      console.log(err);
    });
};

export default signUpApi;

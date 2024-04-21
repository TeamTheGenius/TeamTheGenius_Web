import { CheckboxValueType } from "antd/es/checkbox/Group";
import requests from "./axios/request";
import { acceptInstance } from "./axios/axios";
type SignUpApiParams = {
  identifier: string;
  nickname: string;
  information: string;
  interest: CheckboxValueType[];
};

const signUpApi = async ({
  identifier,
  nickname,
  information,
  interest,
}: SignUpApiParams) => {
  const body = {
    identifier: identifier,
    nickname: nickname,
    information: information,
    interest: interest,
  };

  const data = await acceptInstance
    .post(`${requests.fetchAuthSignup}`, body)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default signUpApi;

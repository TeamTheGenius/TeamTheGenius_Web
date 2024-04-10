import { AxiosResponse } from "axios";
import { noCookieinstance } from "./axios/axios";
import requests from "./axios/request";

type nickNameCheckApiType = {
  value: string;
};

export const getCheckNicknameApi = async ({ value }: nickNameCheckApiType) => {
  const params = {
    nickname: value,
  };

  const data = await noCookieinstance
    .get(`${requests.fetchCheckNickname}`, { params })
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

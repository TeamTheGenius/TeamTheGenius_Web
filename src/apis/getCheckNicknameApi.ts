import { noCookieinstance } from "./axios/axios";
import requests from "./axios/request";

type nickNameCheckApiType = {
  value: string;
};

export const getCheckNicknameApi = async ({ value }: nickNameCheckApiType) => {
  const params = {
    nickname: value,
  };

  await noCookieinstance
    .get(`${requests.fetchCheckNickname}`, { params })
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

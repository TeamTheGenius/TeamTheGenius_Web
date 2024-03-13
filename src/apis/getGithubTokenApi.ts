import { instance } from "./axios/axios";
import requests from "./axios/request";

const getGithubTokenApi = async () => {
  const data = await instance
    .get(`${requests.fetchCertVerifyToken}`)
    .then((res) => {
      console.log("토큰 정보 요청 성공", res);
      return res.data.code;
    })
    .catch((err) => {
      console.log("토큰 정보 요청 실패", err);
    });
  return data || null;
};

export default getGithubTokenApi;

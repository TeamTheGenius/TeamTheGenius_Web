import { instance } from "./axios/axios";
import requests from "./axios/request";

const getGithubTokenApi = async () => {
  const data = await instance
    .get(`${requests.fetchCertVerifyToken}`)
    .then((res) => {
      return res.data.code;
    })
    .catch((err) => {
      throw err;
    });
  return data || null;
};

export default getGithubTokenApi;

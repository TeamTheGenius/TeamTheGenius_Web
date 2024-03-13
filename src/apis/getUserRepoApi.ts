import { instance } from "./axios/axios";
import requests from "./axios/request";

const getUserRepoApi = async () => {
  const data = await instance
    .get(`${requests.fetchCertRepo}`)
    .then((res) => {
      console.log("repo 리스트", res.data.dataList);
      return res.data.dataList || [];
    })
    .catch((err) => {
      console.log("repo 에러 리스트", err);
    });

  return data || [];
};

export default getUserRepoApi;

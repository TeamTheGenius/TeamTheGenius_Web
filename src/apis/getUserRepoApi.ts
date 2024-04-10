import { instance } from "./axios/axios";
import requests from "./axios/request";

const getUserRepoApi = async () => {
  const data = await instance
    .get(`${requests.fetchCertRepo}`)
    .then((res) => {
      return res.data.dataList || [];
    })
    .catch((err) => {
      throw err;
    });

  return data || [];
};

export default getUserRepoApi;

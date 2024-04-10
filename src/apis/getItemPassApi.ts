import requests from "./axios/request";
import { instance } from "./axios/axios";

const getItemPassApi = async () => {
  const data = await instance
    .get(`${requests.fetchItem}?category=certification-passer`)
    .then((res) => {
      return res.data.dataList || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default getItemPassApi;

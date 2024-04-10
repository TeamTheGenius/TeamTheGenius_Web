import requests from "./axios/request";
import { instance } from "./axios/axios";

const getItemFrameApi = async () => {
  const data = await instance
    .get(`${requests.fetchItem}?category=profile-frame`)
    .then((res) => {
      return res.data.dataList || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default getItemFrameApi;

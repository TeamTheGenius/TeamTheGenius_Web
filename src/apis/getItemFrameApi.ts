import requests from "./axios/request";
import { instance } from "./axios/axios";

const getItemFrameApi = async () => {
  const data = await instance
    .get(`${requests.fetchItem}?category=profile-frame`)
    .then((res) => {
      console.log("resFrame", res.data.dataList);
      return res.data.dataList || {};
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || {};
};

export default getItemFrameApi;

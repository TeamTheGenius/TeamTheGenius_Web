import requests from "./axios/request";
import { instance } from "./axios/axios";

const getItemPointApi = async () => {
  const data = await instance
    .get(`${requests.fetchItem}?category=point-multiplier`)
    .then((res) => {
      console.log(res.data.dataList);
      return res.data.dataList || {};
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || {};
};

export default getItemPointApi;

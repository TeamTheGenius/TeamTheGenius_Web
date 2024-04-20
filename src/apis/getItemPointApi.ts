import requests from "./axios/request";
import { instance } from "./axios/axios";

const getItemPointApi = async () => {
  const data = await instance
    .get(`${requests.fetchItem}?category=point-multiplier`)
    .then((res) => {
      return res.data.dataList || [];
    })
    .catch((err) => {
      throw err;
    });
  return data || [];
};

export default getItemPointApi;

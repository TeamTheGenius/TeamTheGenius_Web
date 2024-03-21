import requests from "./axios/request";
import { instance } from "./axios/axios";

const getItemAllApi = async () => {
  const data = await instance
    .get(`${requests.fetchItem}?category=all`)
    .then((res) => {
      return res.data.data || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default getItemAllApi;

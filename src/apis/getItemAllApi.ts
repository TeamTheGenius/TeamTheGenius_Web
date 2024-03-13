import requests from "./axios/request";
import { instance } from "./axios/axios";

const getItemAllApi = async () => {
  const data = await instance
    .get(`${requests.fetchItem}?category=all`)
    .then((res) => {
      console.log(res.data.data);
      return res.data.data || {};
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || {};
};

export default getItemAllApi;

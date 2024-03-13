import { instance } from "./axios/axios";
import requests from "./axios/request";

const getInterestTags = () => {
  return instance
    .get(`${requests.fetchProfileInterest}`)
    .then((response) => {
      console.log("tags", response.data.data.tags);
      return response.data.data.tags || {};
    })
    .catch((error) => {
      console.log("관심사 조회 err", error);
      return {};
    });
};

export default getInterestTags;

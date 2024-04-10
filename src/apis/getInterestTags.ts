import { instance } from "./axios/axios";
import requests from "./axios/request";

const getInterestTags = () => {
  return instance
    .get(`${requests.fetchProfileInterest}`)
    .then((response) => {
      return response.data.data.tags || {};
    })
    .catch((error) => {
      throw error;
      return {};
    });
};

export default getInterestTags;

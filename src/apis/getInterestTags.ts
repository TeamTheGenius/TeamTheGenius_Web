import { instance } from "./axios/axios";
import requests from "./axios/request";

const getInterestTags = async () => {
  const data = await instance
    .get(`${requests.fetchProfileInterest}`)
    .then((response) => {
      return response.data.data.tags || [];
    })
    .catch((error) => {
      throw error;
    });
  return data || [];
};

export default getInterestTags;

import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const getMyChallengePreActivity = async () => {
  const data = await acceptInstance
    .get(`${requests.fetchChallengesPreActivity}`)
    .then((res) => {
      return res.data.dataList || [];
    })
    .catch((err) => {
      throw err;
    });
  return data || [];
};

export default getMyChallengePreActivity;

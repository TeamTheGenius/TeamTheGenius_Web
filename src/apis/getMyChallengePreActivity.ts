import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const getMyChallengePreActivity = async () => {
  const data = await acceptInstance
    .get(`${requests.fetchChallengesPreActivity}`)
    .then((res) => {
      console.log(res.data.dataList);
      return res.data.dataList || [];
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || [];
};

export default getMyChallengePreActivity;

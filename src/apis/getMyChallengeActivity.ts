import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const getMyChallengeActivity = async () => {
  const data = await acceptInstance
    .get(`${requests.fetchChallengesActivity}`)
    .then((res) => {
      return res.data.dataList || [];
    })
    .catch((err) => {
      throw err;
    });
  return data || [];
};

export default getMyChallengeActivity;

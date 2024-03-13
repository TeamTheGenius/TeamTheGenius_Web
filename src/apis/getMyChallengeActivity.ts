import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const getMyChallengeActivity = async () => {
  const data = await acceptInstance
    .get(`${requests.fetchChallengesActivity}`)
    .then((res) => {
      console.log(res.data.dataList);
      return res.data.dataList || [];
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || [];
};

export default getMyChallengeActivity;

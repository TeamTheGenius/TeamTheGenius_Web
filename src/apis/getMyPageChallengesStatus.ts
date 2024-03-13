import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const getMyPageChallengesStatus = async () => {
  const data = await acceptInstance
    .get(`${requests.fetchProfileChallenges}`)
    .then((res) => {
      console.log(res.data.data);
      return res.data.data || {};
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || {};
};

export default getMyPageChallengesStatus;

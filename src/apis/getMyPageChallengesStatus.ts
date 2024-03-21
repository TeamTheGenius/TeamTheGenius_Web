import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const getMyPageChallengesStatus = async () => {
  const data = await acceptInstance
    .get(`${requests.fetchProfileChallenges}`)
    .then((res) => {
      return res.data.data || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default getMyPageChallengesStatus;

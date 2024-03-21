import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const getMyChallengeDone = async () => {
  const data = await acceptInstance
    .get(`${requests.fetchChallengesDone}`)
    .then((res) => {
      return res.data.dataList || [];
    })
    .catch((err) => {
      throw err;
    });
  return data || [];
};

export default getMyChallengeDone;

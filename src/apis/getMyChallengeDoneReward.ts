import requests from "./axios/request";
import { acceptInstance } from "./axios/axios";

interface Params {
  instanceId: number;
}

const getMyChallengeDoneReward = async ({ instanceId }: Params) => {
  const data = await acceptInstance
    .get(`${requests.fetchChallengesReward}/${instanceId}`)
    .then((res) => {
      return res.data.data || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default getMyChallengeDoneReward;

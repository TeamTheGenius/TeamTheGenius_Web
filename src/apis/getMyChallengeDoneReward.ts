import axios from "axios";
import requests from "./axios/request";

interface Params {
  instanceId: number;
}

const getMyChallengeDoneReward = async ({ instanceId }: Params) => {
  const data = await axios
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

import axios from "axios";
import requests from "./axios/request";

interface Params {
  instanceId: number;
  item: boolean;
}

const getMyChallengeDoneReward = async ({ item, instanceId }: Params) => {
  const data = await axios
    .get(`${requests.fetchChallengesReward}/${instanceId}`, {
      params: {
        item: item,
      },
    })
    .then((res) => {
      console.log(res.data.data);
      return res.data.data || {};
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || {};
};

export default getMyChallengeDoneReward;

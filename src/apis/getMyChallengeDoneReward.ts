import axios from "axios";

interface Params {
  instanceId: number;
  item: boolean;
}

const getMyChallengeDoneReward = async ({ item, instanceId }: Params) => {
  const data = await axios
    .get(`http://localhost:8080/api/challenges/reward/${instanceId}`, {
      withCredentials: true,
      headers: {
        Accept: "*/*",
      },
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

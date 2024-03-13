import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const getMyChallengeDone = async () => {
  const data = await acceptInstance
    .get(`${requests.fetchChallengesDone}`)
    .then((res) => {
      console.log(res.data.dataList);
      return res.data.dataList || [];
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || [];
};

export default getMyChallengeDone;

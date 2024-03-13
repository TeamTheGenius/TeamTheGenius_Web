import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  instanceId: number;
}

const getInstanceDetail = async ({ instanceId }: Params) => {
  const data = await acceptInstance
    .get(`${requests.fetchChallenges}/${instanceId}`)
    .then((res) => {
      console.log(res.data.data);
      return res.data.data || {};
    });
  return data || {};
};

export default getInstanceDetail;

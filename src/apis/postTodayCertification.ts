import { instance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  instanceId: number;
  targetDate: string;
}

const postTodayCertification = async ({ instanceId, targetDate }: Params) => {
  const body = {
    instanceId,
    targetDate,
  };
  const data = await instance
    .post(`${requests.fetchCertToday}`, body)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default postTodayCertification;

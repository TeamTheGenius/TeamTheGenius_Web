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
  await instance
    .post(`${requests.fetchCertToday}`, body)
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default postTodayCertification;

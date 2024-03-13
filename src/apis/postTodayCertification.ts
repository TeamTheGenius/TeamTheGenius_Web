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
    .then((res) => {
      console.log("인증 갱신 성공", res);
    })
    .catch((err) => {
      console.log("인증 실패", err);
    });
};

export default postTodayCertification;

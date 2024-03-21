import { IDENTIFIER } from "@/constants/localStorageKey";
import requests from "./axios/request";
import { instance } from "./axios/axios";

interface Params {
  instanceId: number;
}

const postLikeChallenge = async ({ instanceId }: Params) => {
  const body = {
    identifier: localStorage.getItem(IDENTIFIER),
    instanceId: instanceId,
  };
  await instance
    .post(`${requests.fetchLikeChallenge}`, body)
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default postLikeChallenge;

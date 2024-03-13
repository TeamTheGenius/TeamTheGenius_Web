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
    .then((res) => {
      console.log("좋아요 등록 성공", res);
    })
    .catch((err) => {
      console.log("좋아요 등록 에러", err);
    });
};

export default postLikeChallenge;

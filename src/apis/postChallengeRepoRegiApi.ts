import { PATH } from "@/constants/path";
import { NavigateFunction } from "react-router-dom";
import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

type postChallengeRepoRegiApiType = {
  instanceId?: string;
  repo: string;
  navigate: NavigateFunction;
};

const postChallengeRepoRegiApi = async ({
  instanceId,
  repo,
  navigate,
}: postChallengeRepoRegiApiType) => {
  await acceptInstance
    .post(`${requests.fetchChallenges}/${instanceId}`, " ", {
      params: { repo: repo },
    })
    .then((res) => {
      console.log("챌린지 참여 성공", res);
      navigate(PATH.HOME);
    })
    .catch((err) => {
      console.log("챌린지 참여 에러", err);
    });
};

export default postChallengeRepoRegiApi;

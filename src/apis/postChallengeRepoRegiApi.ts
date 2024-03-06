import { PATH } from "@/constants/path";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

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
  await axios
    .post(`http://localhost:8080/api/challenges/${instanceId}`, " ", {
      withCredentials: true,
      headers: {
        Accept: "*/*",
      },
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

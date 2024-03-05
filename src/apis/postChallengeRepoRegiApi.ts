import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";

type postChallengeRepoRegiApiType = {
  instanceId?: string;
  repo: string;
  setRepoState: Dispatch<SetStateAction<string>>;
};

const postChallengeRepoRegiApi = async ({
  instanceId,
  repo,
  setRepoState,
}: postChallengeRepoRegiApiType) => {
  console.log("df", instanceId, repo);
  await axios
    .post(`http://localhost:8080/api/challenges/${instanceId}?repo=${repo}`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("챌린지 참여 성공", res);
    })
    .catch((err) => {
      console.log("챌린지 참여 에러", err);
    });
};

export default postChallengeRepoRegiApi;

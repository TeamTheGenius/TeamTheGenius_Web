import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

type postChallengeRepoRegiApiType = {
  instanceId: number;
  repo: string;
};

const postChallengeRepoRegiApi = async ({
  instanceId,
  repo,
}: postChallengeRepoRegiApiType) => {
  await acceptInstance
    .post(`${requests.fetchChallenges}/${instanceId}`, " ", {
      params: { repo: repo },
    })
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default postChallengeRepoRegiApi;

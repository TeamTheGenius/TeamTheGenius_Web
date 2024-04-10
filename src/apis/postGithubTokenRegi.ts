import { instance } from "./axios/axios";
import requests from "./axios/request";

type postGithubTokenRegiType = {
  githubToken: string;
};
const postGithubTokenRegi = async ({
  githubToken,
}: postGithubTokenRegiType) => {
  const body = {
    githubToken: githubToken,
  };

  await instance
    .post(`${requests.fetchCertRegisterToken}`, body)
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default postGithubTokenRegi;

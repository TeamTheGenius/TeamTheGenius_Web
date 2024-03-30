import { Dispatch, SetStateAction } from "react";
import { instance } from "./axios/axios";
import requests from "./axios/request";
import { QueryClient } from "react-query";

type postGithubTokenRegiType = {
  githubToken: string;
  setTokenState: Dispatch<SetStateAction<string>>;
  setTokenBoolean: Dispatch<SetStateAction<boolean>>;
  setGithubBoolean: Dispatch<SetStateAction<boolean>>;
  setLoadingState: Dispatch<SetStateAction<boolean>>;
  queryClient: QueryClient;
};
const postGithubTokenRegi = async ({
  githubToken,
  setTokenState,
  setTokenBoolean,
  setGithubBoolean,
  queryClient,
  setLoadingState,
}: postGithubTokenRegiType) => {
  const body = {
    githubToken: githubToken,
  };

  await instance
    .post(`${requests.fetchCertRegisterToken}`, body)
    .then(() => {
      setLoadingState(false);
      setTokenBoolean(true);
      setGithubBoolean(true);
      queryClient.invalidateQueries(["myPageProfile"]);
    })
    .catch((err) => {
      setLoadingState(false);
      setTokenBoolean(false);
      setTokenState(err.response.data.message);
      throw err;
    });
};

export default postGithubTokenRegi;

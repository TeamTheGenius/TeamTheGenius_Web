import { Dispatch, SetStateAction } from "react";
import { instance } from "./axios/axios";
import requests from "./axios/request";

type postGithubTokenRegiType = {
  githubToken: string;
  setTokenState: Dispatch<SetStateAction<string>>;
  setTokenBoolean: Dispatch<SetStateAction<boolean>>;
  setGithubBoolean: Dispatch<SetStateAction<boolean>>;
  queryClient: any;
};
const postGithubTokenRegi = async ({
  githubToken,
  setTokenState,
  setTokenBoolean,
  setGithubBoolean,
  queryClient,
}: postGithubTokenRegiType) => {
  const body = {
    githubToken: githubToken,
  };

  await instance
    .post(`${requests.fetchCertRegisterToken}`, body)
    .then((res) => {
      console.log("등록성공", res);
      setTokenBoolean(true);
      setGithubBoolean(true);
      queryClient.invalidateQueries(["myPageProfile"]);
    })
    .catch((err) => {
      console.log("등록실패", err);
      setTokenBoolean(false);
      setTokenState(err.response.data.message);
    });
};

export default postGithubTokenRegi;

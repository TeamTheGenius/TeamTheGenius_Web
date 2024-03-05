import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

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

  await axios
    .post("http://localhost:8080/api/certification/register/token", body, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("등록성공", res);
      setTokenBoolean(true);
      setGithubBoolean(true);
      queryClient.invalidateQueries(["getGithubToken"]);
    })
    .catch((err) => {
      console.log("등록실패", err);
      setTokenBoolean(false);
      setTokenState(err.response.data.message);
    });
};

export default postGithubTokenRegi;

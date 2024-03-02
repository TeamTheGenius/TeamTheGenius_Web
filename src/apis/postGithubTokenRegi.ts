import axios from "axios";
import { Dispatch, SetStateAction } from "react";

type postGithubTokenRegiType = {
  githubToken: string;
  setTokenCheck: Dispatch<SetStateAction<string>>;
};
const postGithubTokenRegi = async ({
  githubToken,
  setTokenCheck,
}: postGithubTokenRegiType) => {
  const body = {
    githubToken: githubToken,
  };
  console.log("githubToken", githubToken);
  await axios
    .post("http://localhost:8080/api/certification/register/token", body, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("등록성공", res);
      //   setTokenCheck(res);
    })
    .catch((err) => {
      console.log("등록실패", err);
    });
};

export default postGithubTokenRegi;

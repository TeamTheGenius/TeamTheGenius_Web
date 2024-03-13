import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

type getPullRequestVerifyApiType = {
  repo: string;
  setPrBoolean: React.Dispatch<React.SetStateAction<boolean>>;
};
const getPullRequestVerifyApi = async ({
  repo,
  setPrBoolean,
}: getPullRequestVerifyApiType) => {
  console.log("repo", repo);
  await acceptInstance
    .get(`${requests.fetchCertPullReq}`, {
      params: { repo },
    })
    .then((res) => {
      console.log("PR 인증 완료", res);
      setPrBoolean(true);
    })
    .catch((err) => {
      console.log("PR 인증 오류", err);
      alert(err.request.response);
      setPrBoolean(false);
    });
};

export default getPullRequestVerifyApi;

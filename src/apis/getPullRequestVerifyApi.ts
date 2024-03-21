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
  await acceptInstance
    .get(`${requests.fetchCertPullReq}`, {
      params: { repo },
    })
    .then(() => {
      setPrBoolean(true);
    })
    .catch((err) => {
      alert(err.request.response);
      setPrBoolean(false);
    });
};

export default getPullRequestVerifyApi;

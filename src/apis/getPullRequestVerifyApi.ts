import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

type getPullRequestVerifyApiType = {
  repo: string;
};
const getPullRequestVerifyApi = async ({
  repo,
}: getPullRequestVerifyApiType) => {
  const data = await acceptInstance
    .get(`${requests.fetchCertPullReq}`, {
      params: { repo },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default getPullRequestVerifyApi;

import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

type getPullRequestVerifyApiType = {
  repo: string;
  setPrBoolean: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
  setErrState: React.Dispatch<React.SetStateAction<string>>;
  openModal: () => void;
};
const getPullRequestVerifyApi = async ({
  repo,
  setPrBoolean,
  setLoadingState,
  openModal,
  setErrState,
}: getPullRequestVerifyApiType) => {
  await acceptInstance
    .get(`${requests.fetchCertPullReq}`, {
      params: { repo },
    })
    .then(() => {
      setPrBoolean(true);
      setLoadingState(false);
    })
    .catch((err) => {
      throw err;
    });
};

export default getPullRequestVerifyApi;

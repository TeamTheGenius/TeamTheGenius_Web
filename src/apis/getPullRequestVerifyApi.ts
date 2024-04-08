import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

type getPullRequestVerifyApiType = {
  repo: string;
  setPrBoolean: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
  setMesseageState: React.Dispatch<React.SetStateAction<string>>;
  openModal: () => void;
};
const getPullRequestVerifyApi = async ({
  repo,
  setPrBoolean,
  setLoadingState,
  setMesseageState,
}: getPullRequestVerifyApiType) => {
  await acceptInstance
    .get(`${requests.fetchCertPullReq}`, {
      params: { repo },
    })
    .then(() => {
      setPrBoolean(true);
      setLoadingState(false);
      setMesseageState("PR연결이 확인되었습니다.");
    })
    .catch((err) => {
      throw err;
    });
};

export default getPullRequestVerifyApi;

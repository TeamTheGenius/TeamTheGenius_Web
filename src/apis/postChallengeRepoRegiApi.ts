import { PATH } from "@/constants/path";
import { NavigateFunction } from "react-router-dom";
import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";
import { Dispatch, SetStateAction } from "react";

type postChallengeRepoRegiApiType = {
  instanceId?: string;
  repo: string;
  navigate: NavigateFunction;
  setLoadingState: Dispatch<SetStateAction<boolean>>;
  setErrState: Dispatch<SetStateAction<string>>;
  openModal: () => void;
};

const postChallengeRepoRegiApi = async ({
  instanceId,
  repo,
  navigate,
  setLoadingState,
  setErrState,
  openModal,
}: postChallengeRepoRegiApiType) => {
  await acceptInstance
    .post(`${requests.fetchChallenges}/${instanceId}`, " ", {
      params: { repo: repo },
    })
    .then(() => {
      setLoadingState(false);
      navigate(PATH.HOME);
    })
    .catch((err) => {
      openModal();
      setErrState(err.response.data.message);
      setLoadingState(false);
      throw err;
    });
};

export default postChallengeRepoRegiApi;

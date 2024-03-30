import { Dispatch, SetStateAction } from "react";
import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";
import { AxiosResponse } from "axios";

type getRepoVertifyApiType = {
  repo: string;
  setRepoBoolean: Dispatch<SetStateAction<boolean>>;
  setLoadingState: Dispatch<SetStateAction<boolean>>;
  setRepoState: Dispatch<SetStateAction<string>>;
  setErrState: Dispatch<SetStateAction<string>>;
  setRepoOk: Dispatch<SetStateAction<string>>;
  selectedValue: string;
  openModal: () => void;
};
const getRepoVertifyApi = async ({
  repo,
  setRepoOk,
  setRepoBoolean,
  setLoadingState,
  setErrState,
  selectedValue,
  setRepoState,
  openModal,
}: getRepoVertifyApiType) => {
  await acceptInstance
    .get(`${requests.fetchCertVerifyRepo}`, {
      params: { repo },
    })
    .then((res: AxiosResponse<any, any>) => {
      setRepoOk(res.data.code);
      setLoadingState(false);
      setRepoState(selectedValue);
      setRepoBoolean(true);
    })
    .catch((err) => {
      setErrState(err.response.data.message);
      setRepoBoolean(false);
      setLoadingState(false);
      openModal();
      throw err;
    });
};

export default getRepoVertifyApi;

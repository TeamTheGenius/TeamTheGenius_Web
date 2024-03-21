import { Dispatch, SetStateAction } from "react";
import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

type getRepoVertifyApiType = {
  repo: string;
  setRepoBoolean: Dispatch<SetStateAction<boolean>>;
  setRepoState: Dispatch<SetStateAction<string>>;
  selectedValue: string;
};
const getRepoVertifyApi = async ({
  repo,
  setRepoBoolean,
  selectedValue,
  setRepoState,
}: getRepoVertifyApiType) => {
  await acceptInstance
    .get(`${requests.fetchCertVerifyRepo}`, {
      params: { repo },
    })
    .then(() => {
      setRepoState(selectedValue);
      setRepoBoolean(true);
    })
    .catch((err) => {
      setRepoBoolean(false);
      throw err;
    });

  //
};

export default getRepoVertifyApi;

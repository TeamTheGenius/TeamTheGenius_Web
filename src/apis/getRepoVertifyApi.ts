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
    .then((res) => {
      console.log("레포유효성 성공", res);
      setRepoState(selectedValue);
      setRepoBoolean(true);
    })
    .catch((err) => {
      console.log("레포유효성 에러", err);
      setRepoBoolean(false);
    });

  //
};

export default getRepoVertifyApi;

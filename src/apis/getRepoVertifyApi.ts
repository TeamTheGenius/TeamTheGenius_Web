import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";
import { AxiosResponse } from "axios";

type getRepoVertifyApiType = {
  repo: string;
};
const getRepoVertifyApi = async ({ repo }: getRepoVertifyApiType) => {
  const data = await acceptInstance
    .get(`${requests.fetchCertVerifyRepo}`, {
      params: { repo },
    })
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default getRepoVertifyApi;

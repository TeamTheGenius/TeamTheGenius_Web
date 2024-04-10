import { IDENTIFIER } from "@/constants/localStorageKey";
import { instance } from "./axios/axios";
import requests from "./axios/request";
import { decrypt } from "@/hooks/useCrypto";

const postJWTApi = async () => {
  const identifier = localStorage.getItem(IDENTIFIER);
  if (!identifier) return;
  const id = decrypt(identifier);

  const body = {
    identifier: id,
  };
  const data = await instance
    .post(`${requests.fetchAuth}`, body)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default postJWTApi;

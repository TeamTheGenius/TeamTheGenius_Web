import { IDENTIFIER } from "@/constants/localStorageKey";
import requests from "./axios/request";
import { instance } from "./axios/axios";
import { decrypt } from "@/hooks/useCrypto";

interface Params {
  instanceId: number;
}

const postLikeChallenge = async ({ instanceId }: Params) => {
  const identifier = localStorage.getItem(IDENTIFIER);
  const decryptIdentifier = decrypt(identifier);
  const body = {
    identifier: decryptIdentifier,
    instanceId: instanceId,
  };
  await instance
    .post(`${requests.fetchLikeChallenge}`, body)
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default postLikeChallenge;

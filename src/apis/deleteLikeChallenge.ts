import requests from "./axios/request";
import { acceptInstance } from "./axios/axios";

interface Params {
  likesId: number;
}

const deleteLikeChallenge = async ({ likesId }: Params) => {
  await acceptInstance
    .delete(`${requests.fetchLikeChallenge}/${likesId}`)
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default deleteLikeChallenge;

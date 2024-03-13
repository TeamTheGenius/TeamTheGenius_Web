import axios from "axios";
import requests from "./axios/request";

interface Params {
  likesId: number;
}

const deleteLikeChallenge = async ({ likesId }: Params) => {
  await axios
    .delete(`${requests.fetchLikeChallenge}/${likesId}`)
    .then((res) => {
      console.log("삭제", res);
    })
    .catch((err) => {
      console.log("삭제 실패", err);
    });
};

export default deleteLikeChallenge;

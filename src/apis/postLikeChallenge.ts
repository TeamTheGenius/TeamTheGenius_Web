import { IDENTIFIER } from "@/constants/localStorageKey";
import axios from "axios";

interface Params {
  instanceId: number;
}

const postLikeChallenge = async ({ instanceId }: Params) => {
  const body = {
    identifier: localStorage.getItem(IDENTIFIER),
    instanceId: instanceId,
  };
  await axios
    .post(`http://localhost:8080/api/profile/likes`, body, {
      withCredentials: true,
      headers: {
        Accept: "*/*",
      },
    })
    .then((res) => {
      console.log("좋아요 등록 성공", res);
    })
    .catch((err) => {
      console.log("좋아요 등록 에러", err);
    });
};

export default postLikeChallenge;

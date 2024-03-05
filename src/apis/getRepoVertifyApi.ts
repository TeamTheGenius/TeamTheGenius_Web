import axios from "axios";
import { Dispatch, SetStateAction } from "react";

type getRepoVertifyApiType = {
  repo: string;
  setRepoBoolean: Dispatch<SetStateAction<boolean>>;
};
const getRepoVertifyApi = async ({
  repo,
  setRepoBoolean,
}: getRepoVertifyApiType) => {
  await axios
    .get(`http://localhost:8080/api/certification/verify/repository`, {
      withCredentials: true,
      headers: {
        Accept: "*/*",
      },
      params: { repo },
    })
    .then((res) => {
      console.log("레포유효성 성공", res);
      setRepoBoolean(true);
    })
    .catch((err) => {
      console.log("레포유효성 에러", err);
      setRepoBoolean(false);
    });

  //
};

export default getRepoVertifyApi;

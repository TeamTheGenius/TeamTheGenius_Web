import { QueryClient } from "react-query";
import { multiInstance } from "./axios/axios";
import requests from "./axios/request";

type postUserInfoEditType = {
  nickName?: string;
  myInfo?: string;
  files?: any;
  queryClient: QueryClient;
  setInfoShow: React.Dispatch<React.SetStateAction<number>>;
  setNickCheck: React.Dispatch<React.SetStateAction<string>>;
  setNickName: React.Dispatch<React.SetStateAction<string>>;
};

const postUserInfoEdit = async ({
  nickName,
  myInfo,
  files,
  queryClient,
  setInfoShow,
  setNickCheck,
  setNickName,
}: postUserInfoEditType) => {
  const body = {
    nickname: nickName,
    information: myInfo,
  };

  const posFile = files?.file?.originFileObj;
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(body)], { type: "application/json" })
  );
  if (files) {
    formData.append("files", posFile);
  }
  formData.append("type", "profile");

  await multiInstance
    .post(`${requests.fetchProfileInfo}`, formData)
    .then((res) => {
      console.log("응답:", res);
      setNickCheck("");
      setNickName("");
      setInfoShow(0);
      queryClient.invalidateQueries(["myPageProfile"]);
    })
    .catch((err) => {
      alert("생성 실패");
      console.log("err", err);
    });
};

export default postUserInfoEdit;

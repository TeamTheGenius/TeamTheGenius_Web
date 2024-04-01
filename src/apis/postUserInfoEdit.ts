import { QueryClient } from "react-query";
import { multiInstance } from "./axios/axios";
import requests from "./axios/request";
import { NavigateFunction } from "react-router-dom";
import { PATH } from "@/constants/path";

type postUserInfoEditType = {
  nickName?: string;
  myInfo?: string;
  files?: any;
  queryClient: QueryClient;
  setInfoShow: React.Dispatch<React.SetStateAction<number>>;
  setNickNameShow: React.Dispatch<React.SetStateAction<number>>;
  setNickCheck: React.Dispatch<React.SetStateAction<string>>;
  setNickName: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
};

const postUserInfoEdit = async ({
  nickName,
  myInfo,
  files,
  queryClient,
  setInfoShow,
  setNickNameShow,
  setNickCheck,
  setNickName,
  navigate,
  setIsLoading,
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
    .then(() => {
      setNickCheck("");
      setNickName("");
      setInfoShow(0);
      setNickNameShow(0);
      setIsLoading(false);
      queryClient.invalidateQueries(["myPageProfile"]);
      navigate(PATH.MY_PAGE);
    })
    .catch((err) => {
      alert("생성 실패");
      throw err;
    });
};

export default postUserInfoEdit;

import { multiInstance } from "./axios/axios";
import requests from "./axios/request";

type postUserInfoEditType = {
  nickName?: string;
  myInfo?: string;
  files?: any;
};

const postUserInfoEdit = async ({
  nickName,
  myInfo,
  files,
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
    .then(() => {})
    .catch((err) => {
      alert("생성 실패");
      throw err;
    });
};

export default postUserInfoEdit;

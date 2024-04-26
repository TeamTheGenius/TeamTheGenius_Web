import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

type postUserInfoEditType = {
  nickName?: string;
  myInfo?: string;
};

const postUserInfoEdit = async ({ nickName, myInfo }: postUserInfoEditType) => {
  const body = {
    nickname: nickName,
    information: myInfo,
  };
  /*
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
*/
  await acceptInstance
    .post(`${requests.fetchProfileInfo}`, body)
    .then(() => {})
    .catch((err) => {
      alert("생성 실패");
      throw err;
    });
};

export default postUserInfoEdit;

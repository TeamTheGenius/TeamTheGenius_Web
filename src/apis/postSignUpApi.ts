import { CheckboxValueType } from "antd/es/checkbox/Group";
import requests from "./axios/request";
import { multiInstance } from "./axios/axios";
type SignUpApiParams = {
  identifier: string;
  nickname: string;
  information: string;
  interest: CheckboxValueType[];
  files: string;
};

const signUpApi = async ({
  identifier,
  nickname,
  information,
  interest,
  files,
}: SignUpApiParams) => {
  const body = {
    identifier: identifier,
    nickname: nickname,
    information: information,
    interest: interest,
  };

  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(body)], { type: "application/json" })
  );

  const imageFile = await fetch(files).then((res) => res.blob());
  formData.append("files", imageFile, `basic-profile.jpg`);

  const data = await multiInstance
    .post(`${requests.fetchAuthSignup}`, formData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default signUpApi;

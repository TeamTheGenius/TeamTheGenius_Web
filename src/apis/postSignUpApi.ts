import { PATH } from "@/constants/path";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { IDENTIFIER } from "@/constants/localStorageKey";
import requests from "./axios/request";
import { multiInstance } from "./axios/axios";
type SignUpApiParams = {
  identifier: string;
  nickname: string;
  information: string;
  interest: CheckboxValueType[];
  files: string;
  navigate: (path: string) => void;
};

const signUpApi = async ({
  identifier,
  nickname,
  information,
  interest,
  files,
  navigate,
}: SignUpApiParams) => {
  const data = {
    identifier: identifier,
    nickname: nickname,
    information: information,
    interest: interest,
  };

  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );

  const imageFile = await fetch(files).then((res) => res.blob());
  formData.append("files", imageFile, `basic-profile.jpg`);

  await multiInstance
    .post(`${requests.fetchAuthSignup}`, formData)
    .then((res) => {
      console.log("res", res);
      window.localStorage.setItem(IDENTIFIER, res.data.data.identifier);
      console.log(window.localStorage.getItem(IDENTIFIER));
      navigate(PATH.AUTH);
    })
    .catch((err) => {
      alert("오류가 발생했습니다.");
      console.log(err);
    });
};

export default signUpApi;

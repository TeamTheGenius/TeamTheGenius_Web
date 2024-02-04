import axios from "axios";
import { PATH } from "@/constants/path";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { IDENTIFIER } from "@/constants/localStorageKey";
type SignUpApiParams = {
  identifier: string;
  nickname: string;
  information: string;
  interest: CheckboxValueType[];
  navigate: (path: string) => void;
};

const signUpApi = async ({
  identifier,
  nickname,
  information,
  interest,
  navigate,
}: SignUpApiParams) => {
  const body = {
    identifier: identifier,
    nickname: nickname,
    information: information,
    interest: interest,
  };
  await axios
    .post(`http://localhost:8080/api/auth/signup`, body)
    .then((res) => {
      console.log("res", res);
      window.localStorage.setItem(IDENTIFIER, res.data.data.identifier);
      console.log(window.localStorage.getItem(IDENTIFIER));
      navigate(PATH.HOME);
    })
    .catch((err) => {
      alert("오류가 발생했습니다.");
      console.log(err);
    });
};

export default signUpApi;

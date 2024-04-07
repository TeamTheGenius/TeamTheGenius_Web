import { instance, noCookieinstance } from "./axios/axios";
import requests from "./axios/request";

import axios from "axios";
type nickNameCheckApiType = {
  value: string;
  setNickCheck: React.Dispatch<React.SetStateAction<string>>;
  setsignUpBoolean: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const getCheckNicknameApi = async ({
  value,
  setNickCheck,
  setsignUpBoolean,
  setIsLoading,
}: nickNameCheckApiType) => {
  const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
  const params = {
    nickname: value,
  };
  if (specialChars.test(value)) {
    alert("특수문자는 사용할 수 없습니다.");
    setsignUpBoolean(false);
    return;
  }
  await noCookieinstance
    .get(`${requests.fetchCheckNickname}`, { params })
    .then((res) => {
      setIsLoading(false);
      setsignUpBoolean(true);
      setNickCheck("사용 가능한 닉네임입니다.");
    })
    .catch((err) => {
      setIsLoading(false);
      setsignUpBoolean(false);
      setNickCheck(err.response.data.message);
      throw err;
    });
};

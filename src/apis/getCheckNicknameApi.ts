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
    setIsLoading(false);
    return;
  }
  await axios
    .get(`/api${requests.fetchCheckNickname}`, { params })
    .then((res) => {
      console.log("res", res);
      setIsLoading(false);
      setsignUpBoolean(true);
      setNickCheck("사용 가능한 닉네임입니다.");
    })
    .catch((err) => {
      setsignUpBoolean(false);
      setNickCheck("이미 존재하는 닉네임입니다.");
      throw err;
    });
};

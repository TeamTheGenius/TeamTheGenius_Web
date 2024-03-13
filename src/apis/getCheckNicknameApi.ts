import requests from "./axios/request";
import { instance } from "./axios/axios";
type nickNameCheckApiType = {
  value: string;
  setNickCheck: React.Dispatch<React.SetStateAction<string>>;
  setsignUpBoolean: React.Dispatch<React.SetStateAction<boolean>>;
};

export const getCheckNicknameApi = async ({
  value,
  setNickCheck,
  setsignUpBoolean,
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
  await instance
    .get(`${requests.fetchCheckNickname}`, { params })
    .then((res) => {
      console.log("닉네임 체크 성공", res);
      setsignUpBoolean(true);
      setNickCheck("사용 가능한 닉네임입니다.");
    })
    .catch((err) => {
      console.log("닉네임 체크 실패", err);
      setsignUpBoolean(false);
      setNickCheck("이미 존재하는 닉네임입니다.");
    });
};

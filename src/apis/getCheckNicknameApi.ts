import { noCookieinstance } from "./axios/axios";
import requests from "./axios/request";

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
  await noCookieinstance
    .get(`${requests.fetchCheckNickname}`, { params })
    .then((res) => {
      const replaceData = (res.data.message = res.data.message.replace(
        "요청이 정상적으로 처리되었습니다",
        "사용 가능한 닉네임입니다"
      ));
      setIsLoading(false);
      setsignUpBoolean(true);
      setNickCheck(replaceData);
    })
    .catch((err) => {
      setIsLoading(false);
      setsignUpBoolean(false);
      setNickCheck(err.response.data.message);
      throw err;
    });
};

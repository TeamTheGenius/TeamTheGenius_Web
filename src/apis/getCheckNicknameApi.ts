import { noCookieinstance } from "./axios/axios";
import requests from "./axios/request";

type nickNameCheckApiType = {
  value: string;
};

export const getCheckNicknameApi = async ({ value }: nickNameCheckApiType) => {
  const params = {
    nickname: value,
  };

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
      throw err;
    });
};

import axios from "axios";
type nickNameCheckType = {
  value: string;
  setNickCheck: React.Dispatch<React.SetStateAction<string>>;
  setsignUpBoolean: React.Dispatch<React.SetStateAction<boolean>>;
};

export const getCheckNicknameApi = ({
  value,
  setNickCheck,
  setsignUpBoolean,
}: nickNameCheckType) => {
  const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
  const params = {
    nickname: value,
  };
  if (specialChars.test(value)) {
    alert("특수문자는 사용할 수 없습니다.");
    setsignUpBoolean(false);
    return;
  }
  axios
    .get(`/api/auth/signup/check-nickname`, { params })
    .then((res) => {
      setsignUpBoolean(true);
      setNickCheck("사용 가능한 닉네임입니다.");
    })
    .catch((err) => {
      console.log(err);
      setsignUpBoolean(false);
      setNickCheck("이미 존재하는 닉네임입니다.");
    });
};

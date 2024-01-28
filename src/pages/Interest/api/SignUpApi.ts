import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { CheckboxValueType } from "antd/es/checkbox/Group";
type SignUpApiParams = {
  identifier: string;
  nickname: string;
  information: string;
  interest: CheckboxValueType[];
};

const signUpApi = async ({
  identifier,
  nickname,
  information,
  interest,
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
      const navigate = useNavigate();
      navigate(PATH.HOME);
    })
    .catch((err) => {
      alert("오류가 발생했습니다.");
      console.log(err);
    });
};

export default signUpApi;

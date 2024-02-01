import { IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import axios from "axios";

interface Params {
  navigate: (path: string) => void;
}
function postJWTApi({ navigate }: Params) {
  const identifier = window.localStorage.getItem(IDENTIFIER);
  console.log(identifier);
  if (!identifier) return;

  const body = {
    identifier: identifier,
  };

  axios
    .post("http://localhost:8080/api/auth", body)
    .then((res) => {
      console.log("res", res);
      navigate(PATH.HOME);
    })
    .catch((err) => {
      alert("오류가 발생했습니다.");
      console.log(err);
    });
}

export default postJWTApi;

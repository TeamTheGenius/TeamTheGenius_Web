import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const postAuthLogout = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    acceptInstance
      .post(`${requests.fetchLogout}`, " ")
      .then((res) => {
        console.log("로그아웃 성공", res);
        resolve();
      })
      .catch((err) => {
        console.log("로그아웃 에러", err);
        reject(err);
      });
  });
};

export default postAuthLogout;

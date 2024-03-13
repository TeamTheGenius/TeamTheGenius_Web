import { jsonInstance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  reason: string;
}

const deleteServiceWithdraw = async ({ reason }: Params) => {
  const config = {
    data: reason,
  };

  return new Promise<void>((resolve, reject) => {
    jsonInstance
      .delete(`${requests.fetchprofile}`, config)
      .then((res) => {
        console.log("탈퇴 성공", res);
        resolve();
      })
      .catch((err) => {
        console.log("탈퇴 에러", err);
        reject(err);
      });
  });
};

export default deleteServiceWithdraw;

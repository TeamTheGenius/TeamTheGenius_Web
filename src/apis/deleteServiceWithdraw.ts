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
      .delete(`${requests.fetchProfile}`, config)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default deleteServiceWithdraw;

import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const postAuthLogout = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    acceptInstance
      .post(`${requests.fetchLogout}`, " ")
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default postAuthLogout;

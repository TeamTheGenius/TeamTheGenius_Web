import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const postAuthLogout = async () => {
  await acceptInstance
    .post(`${requests.fetchLogout}`, " ")
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default postAuthLogout;

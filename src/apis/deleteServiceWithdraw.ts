import { jsonInstance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  reason: string;
}

const deleteServiceWithdraw = async ({ reason }: Params) => {
  const config = {
    data: reason,
  };

  jsonInstance
    .delete(`${requests.fetchProfile}`, config)
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default deleteServiceWithdraw;

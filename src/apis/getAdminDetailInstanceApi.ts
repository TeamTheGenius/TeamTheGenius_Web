import { instance } from "./axios/axios";
import requests from "./axios/request";

type AdminDetailInstanceApiType = {
  instanceId?: number;
};

const getAdminDetailInstanceApi = async ({
  instanceId,
}: AdminDetailInstanceApiType) => {
  const data = await instance
    .get(`${requests.fetchInstance}/${instanceId}`)
    .then((res) => {
      return res.data.data || {};
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default getAdminDetailInstanceApi;

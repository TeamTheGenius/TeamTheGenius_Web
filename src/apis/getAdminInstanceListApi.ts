import { instance } from "./axios/axios";
import requests from "./axios/request";

type adminInstanceListApiType = {
  pageNumber?: number;
};

const getAdminInstanceListPageApi = async ({
  pageNumber,
}: adminInstanceListApiType) => {
  const data = await instance
    .get(`${requests.fetchInstance}?page=${pageNumber}&size=5`)
    .then((res) => {
      const list = res.data.data;
      return list || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default getAdminInstanceListPageApi;

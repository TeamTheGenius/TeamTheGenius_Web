import { instance } from "./axios/axios";
import requests from "./axios/request";

type adminInstanceListApiType = {
  pageNumber?: number;
  topicId: number;
};

const getAdminInstanceListPageApi = async ({
  pageNumber,
  topicId,
}: adminInstanceListApiType) => {
  const data = await instance
    .get(`${requests.fetchTopicInstnaces}/${topicId}?page=${pageNumber}&size=5`)
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

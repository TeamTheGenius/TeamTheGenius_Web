import { instance } from "./axios/axios";
import requests from "./axios/request";

type adminTopicListApiType = {
  pageNumber?: number;
  setTotalNumber?: React.Dispatch<React.SetStateAction<number>>;
};

const getAdminTopicListPageApi = async ({
  pageNumber,
}: adminTopicListApiType) => {
  const data = await instance
    .get(`${requests.fetchTopic}?page=${pageNumber}&size=5`)
    .then((res) => {
      const list = res.data.data;
      return list || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default getAdminTopicListPageApi;

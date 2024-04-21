import { instance } from "./axios/axios";
import requests from "./axios/request";

type adminTopicListApiType = {
  pageNumber?: number;
  setTotalNumber?: React.Dispatch<React.SetStateAction<number>>;
};

const getAdminTopicListPageApi = async ({
  pageNumber,
  setTotalNumber,
}: adminTopicListApiType) => {
  const data = await instance
    .get(`${requests.fetchTopic}?page=${pageNumber}&size=5`)
    .then((res) => {
      const list = res.data.data.content;
      const listNumber = res.data.data.totalElements;
      if (setTotalNumber) {
        setTotalNumber(listNumber);
      }
      return list || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default getAdminTopicListPageApi;

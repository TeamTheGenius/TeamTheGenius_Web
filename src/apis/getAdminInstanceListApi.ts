import { instance } from "./axios/axios";
import requests from "./axios/request";

type adminInstanceListApiType = {
  setTotalNumber?: React.Dispatch<React.SetStateAction<number>>;

  pageNumber?: number;
};

const getAdminInstanceListPageApi = async ({
  setTotalNumber,
  pageNumber,
}: adminInstanceListApiType) => {
  const data = await instance
    .get(`${requests.fetchInstance}?page=${pageNumber}&size=5`)
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

export default getAdminInstanceListPageApi;

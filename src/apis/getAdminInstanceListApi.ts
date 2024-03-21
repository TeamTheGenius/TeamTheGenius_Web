import { instanceListDataType } from "@/types/adminType";
import { instance } from "./axios/axios";
import requests from "./axios/request";

type adminInstanceListApiType = {
  setInstanceList: React.Dispatch<React.SetStateAction<instanceListDataType[]>>;
  setTotalNumber?: React.Dispatch<React.SetStateAction<number>>;
  pageNumber?: number;
};

const getAdminInstanceListApi = async ({
  setInstanceList,
  setTotalNumber,
  pageNumber,
}: adminInstanceListApiType) => {
  await instance
    .get(`${requests.fetchInstance}?page=${pageNumber}&size=5`)
    .then((res) => {
      const listData = res.data.data;
      setInstanceList(listData.content);
      if (setTotalNumber) {
        setTotalNumber(listData.totalElements);
      }
    })
    .catch((err) => {
      throw err;
    });
};

export default getAdminInstanceListApi;

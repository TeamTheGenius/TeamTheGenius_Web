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
      console.log("인스턴스 리스트", listData);
      setInstanceList(listData.content);
      if (setTotalNumber) {
        setTotalNumber(listData.totalElements);
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export default getAdminInstanceListApi;

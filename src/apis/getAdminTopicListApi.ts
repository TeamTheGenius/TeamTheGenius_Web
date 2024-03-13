import { adminTopicDataType } from "@/types/adminType";
import { instance } from "./axios/axios";
import requests from "./axios/request";

type adminTopicListApiType = {
  setAdminList: React.Dispatch<React.SetStateAction<adminTopicDataType[]>>;
  pageNumber?: number;
  setTotalNumber?: React.Dispatch<React.SetStateAction<number>>;
};

const getAdminTopicListApi = async ({
  setAdminList,
  pageNumber,
  setTotalNumber,
}: adminTopicListApiType) => {
  await instance
    .get(`${requests.fetchTopic}?page=${pageNumber}&size=5`)
    .then((res) => {
      const list = res.data.data;
      console.log("res", res);
      setAdminList(list.content);
      if (setTotalNumber) {
        setTotalNumber(list.totalElements);
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export default getAdminTopicListApi;

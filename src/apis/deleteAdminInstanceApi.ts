import { Dispatch, SetStateAction } from "react";
import getAdminInstanceListApi from "./getAdminInstanceListApi";
import { instanceListDataType } from "@/types/adminType";
import requests from "./axios/request";
import { instance } from "./axios/axios";

type topicDeleteType = {
  instanceId: number;
  setInstanceList: Dispatch<SetStateAction<instanceListDataType[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  pageNumber: number;
};
const deleteAdminInstanceApi = async ({
  instanceId,
  setInstanceList,
  pageNumber,
  setIsLoading,
}: topicDeleteType) => {
  await instance
    .delete(`${requests.fetchInstance}/${instanceId}`)
    .then(() => {
      setIsLoading(false);
      getAdminInstanceListApi({ setInstanceList, pageNumber: pageNumber - 1 });
    })
    .catch((err) => {
      throw err;
    });
};

export default deleteAdminInstanceApi;

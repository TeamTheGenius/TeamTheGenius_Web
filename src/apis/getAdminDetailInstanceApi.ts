import { Dispatch, SetStateAction } from "react";
import getAdminInstanceListApi from "./getAdminInstanceListApi";
import { instanceDeteilType, instanceListDataType } from "@/types/adminType";
import { instance } from "./axios/axios";
import requests from "./axios/request";

type AdminDetailInstanceApiType = {
  instanceId?: number;
  setInstanceDetail?: Dispatch<SetStateAction<instanceDeteilType | undefined>>;
  setInstanceList: Dispatch<SetStateAction<instanceListDataType[]>>;
};

const getAdminDetailInstanceApi = async ({
  instanceId,
  setInstanceDetail,
  setInstanceList,
}: AdminDetailInstanceApiType) => {
  await instance
    .get(`${requests.fetchInstance}/${instanceId}`)
    .then((res) => {
      const data = res.data.data;
      getAdminInstanceListApi({ setInstanceList });
      if (setInstanceDetail) {
        setInstanceDetail(data);
      }
    })
    .catch((err) => {
      throw err;
    });
};

export default getAdminDetailInstanceApi;

import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import getAdminInstanceListApi from "./getAdminInstanceListApi";
import { instanceDeteilType, instanceListDataType } from "@/types/adminType";

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
  await axios
    .get(`http://localhost:8080/api/admin/instance/${instanceId}`, {
      withCredentials: true,
    })
    .then((res) => {
      const data = res.data.data;
      getAdminInstanceListApi({ setInstanceList });
      if (setInstanceDetail) {
        setInstanceDetail(data);
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export default getAdminDetailInstanceApi;

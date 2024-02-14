import { instanceDeteilType } from "@/components/Admin/AdminInstance/InstanceListComponent/InstanceListComponent";
import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";

type AdminDetailInstanceApiType = {
  instanceId?: number;
  setInstanceDetail?: Dispatch<SetStateAction<instanceDeteilType | undefined>>;
};

const getAdminDetailInstanceApi = async ({
  instanceId,
  setInstanceDetail,
}: AdminDetailInstanceApiType) => {
  await axios
    .get(`http://localhost:8080/api/admin/instance/${instanceId}`, {
      withCredentials: true,
    })
    .then((res) => {
      const data = res.data.data;
      if (setInstanceDetail) {
        setInstanceDetail(data);
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export default getAdminDetailInstanceApi;

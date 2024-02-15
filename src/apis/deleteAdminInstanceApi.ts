import { instanceListDataType } from "@/components/Admin/AdminInstance/InstanceListComponent/InstanceListComponent";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import getAdminInstanceListApi from "./getAdminInstanceListApi";

type topicDeleteType = {
  instanceId: number;
  setInstanceList: Dispatch<SetStateAction<instanceListDataType[]>>;
  pageNumber: number;
};
const deleteAdminInstanceApi = async ({
  instanceId,
  setInstanceList,
  pageNumber,
}: topicDeleteType) => {
  await axios
    .delete(`http://localhost:8080/api/admin/instance/${instanceId}`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("삭제", res);
      getAdminInstanceListApi({ setInstanceList, pageNumber: pageNumber - 1 });
    })
    .catch((err) => {
      console.log("삭제 실패", err);
    });
};

export default deleteAdminInstanceApi;

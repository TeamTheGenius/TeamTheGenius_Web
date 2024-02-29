import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import getAdminInstanceListApi from "./getAdminInstanceListApi";
import { instanceListDataType } from "@/pages/Admin/adminType";

type editInstacneType = {
  topicIdId: number;
  instanceId: number;
  instanceDesc: string;
  instanceNotice: string;
  instancePoint: number;
  instanceStartAt: string;
  instanceTitle: string;
  instanceCompletedAt: string;
  instanceImg?: any;
  setinstanceEditModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setInstanceList: Dispatch<SetStateAction<instanceListDataType[]>>;
};

const patchAdminInstanceEditApi = async ({
  topicIdId,
  instanceId,
  instanceTitle,
  instanceDesc,
  instanceNotice,
  instancePoint,
  instanceStartAt,
  instanceCompletedAt,
  instanceImg,
  setinstanceEditModalIsOpen,
  setInstanceList,
}: editInstacneType) => {
  const body = {
    topicIdId: topicIdId,
    title: instanceTitle,
    description: instanceDesc,
    notice: instanceNotice,
    pointPerPerson: instancePoint,
    startedAt: instanceStartAt,
    completedAt: instanceCompletedAt,
  };
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(body)], { type: "application/json" })
  );
  if (instanceImg) {
    formData.append("files", instanceImg);
  }
  formData.append("type", "instance");
  await axios
    .patch(`http://localhost:8080/api/admin/instance/${instanceId}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      setinstanceEditModalIsOpen(false);
      getAdminInstanceListApi({ setInstanceList });
    })
    .catch((err) => {
      alert("수정 실패");
      console.log("err", err);
    });
};

export default patchAdminInstanceEditApi;

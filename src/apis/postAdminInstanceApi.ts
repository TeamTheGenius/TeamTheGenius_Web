import { instanceListDataType } from "@/components/Admin/AdminInstance/InstanceListComponent/InstanceListComponent";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import getAdminInstanceListApi from "./getAdminInstanceListApi";

type instanceCreateApiType = {
  instanceTitle: string;
  instanceDesc: string;
  instanceNotice: string;
  instanceTags: string;
  instancePoint: number;
  instanceRangeStart: string;
  instanceRangeEnd: string;
  topicId: number;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  instanceImg?: any | undefined;
  setInstanceList: Dispatch<SetStateAction<instanceListDataType[]>>;
};

const postAdminInstanceApi = async ({
  instanceTitle,
  instanceDesc,
  instanceNotice,
  instanceTags,
  instancePoint,
  instanceRangeStart,
  instanceRangeEnd,
  topicId,
  setModalIsOpen,
  instanceImg,
  setInstanceList,
}: instanceCreateApiType) => {
  const body = {
    topicId: topicId,
    title: instanceTitle,
    description: instanceDesc,
    pointPerPerson: instancePoint,
    notice: instanceNotice,
    tags: instanceTags,
    startedAt: instanceRangeStart,
    completedAt: instanceRangeEnd,
  };
  console.log("instanceImg", instanceImg);
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
    .post("http://localhost:8080/api/admin/instance", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("응답:", res);
      getAdminInstanceListApi({ setInstanceList });
      setModalIsOpen(false);
    })
    .catch((err) => {
      alert("생성 실패");
      console.log("err", err);
    });
};

export default postAdminInstanceApi;

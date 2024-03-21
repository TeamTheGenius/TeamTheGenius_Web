import { Dispatch, SetStateAction } from "react";
import getAdminInstanceListApi from "./getAdminInstanceListApi";
import { instanceListDataType } from "@/types/adminType";
import { multiInstance } from "./axios/axios";
import requests from "./axios/request";

type instanceCreateApiType = {
  instanceTitle: string;
  instanceDesc: string;
  instanceNotice: string;
  instanceCertMethod: string;
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
  instanceCertMethod,
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
    notice: instanceNotice,
    certificationMethod: instanceCertMethod,
    pointPerPerson: instancePoint,
    tags: instanceTags,
    startedAt: instanceRangeStart,
    completedAt: instanceRangeEnd,
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

  await multiInstance
    .post(`${requests.fetchInstance}`, formData)
    .then(() => {
      getAdminInstanceListApi({ setInstanceList });
      setModalIsOpen(false);
    })
    .catch((err) => {
      alert("생성 실패");
      throw err;
    });
};

export default postAdminInstanceApi;

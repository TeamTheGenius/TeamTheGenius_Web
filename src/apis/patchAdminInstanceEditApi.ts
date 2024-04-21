import { Dispatch, SetStateAction } from "react";
import requests from "./axios/request";
import { multiInstance } from "./axios/axios";

type editInstacneType = {
  topicIdId: number;
  instanceId: number;
  instanceDesc: string;
  instanceNotice: string;
  instancePoint: number;
  instanceCertificationMethod: string;
  instanceStartAt: string;
  instanceTitle: string;
  instanceCompletedAt: string;
  instanceImg?: any;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const patchAdminInstanceEditApi = async ({
  topicIdId,
  instanceId,
  instanceTitle,
  instanceDesc,
  instanceNotice,
  instancePoint,
  instanceCertificationMethod,
  instanceStartAt,
  instanceCompletedAt,
  instanceImg,
  setIsLoading,
}: editInstacneType) => {
  const body = {
    topicIdId: topicIdId,
    title: instanceTitle,
    description: instanceDesc,
    notice: instanceNotice,
    pointPerPerson: instancePoint,
    startedAt: instanceStartAt,
    completedAt: instanceCompletedAt,
    certificationMethod: instanceCertificationMethod,
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
    .patch(`${requests.fetchInstance}/${instanceId}`, formData)
    .then(() => {
      setIsLoading(false);
    })
    .catch((err) => {
      alert("수정 실패");
      throw err;
    });
};

export default patchAdminInstanceEditApi;

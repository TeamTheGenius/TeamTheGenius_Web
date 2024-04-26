import { Dispatch, SetStateAction } from "react";
import { acceptInstance } from "./axios/axios";
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
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const postAdminInstanceApi = async ({
  topicId,
  instanceTitle,
  instanceDesc,
  instanceNotice,
  instanceCertMethod,
  instanceTags,
  instancePoint,
  instanceRangeStart,
  instanceRangeEnd,
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

  const data = await acceptInstance
    .post(`${requests.fetchInstance}`, body)
    .then((res) => {
      return res.data.data.instanceId;
    })
    .catch((err) => {
      alert("생성 실패");
      throw err;
    });
  return data || {};
};

export default postAdminInstanceApi;

import requests from "./axios/request";
import { acceptInstance } from "./axios/axios";

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

  await acceptInstance
    .patch(`${requests.fetchInstance}/${instanceId}`, body)
    .then(() => {})
    .catch((err) => {
      alert("수정 실패");
      throw err;
    });
};

export default patchAdminInstanceEditApi;

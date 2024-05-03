import { adminTopicEditApiType } from "@/types/adminType";
import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const patchAdminTopicEditApi = async ({
  topicId,
  topicTitle,
  topicDesc,
  topicNotice,
  topicTags,
  topicPoint,
}: adminTopicEditApiType) => {
  const body = {
    title: topicTitle,
    description: topicDesc,
    notice: topicNotice,
    tags: topicTags,
    pointPerPerson: topicPoint,
  };

  await acceptInstance
    .patch(`${requests.fetchTopic}/${topicId}`, body)
    .then(() => {})
    .catch((err) => {
      alert("생성 실패");
      throw err;
    });
};

export default patchAdminTopicEditApi;

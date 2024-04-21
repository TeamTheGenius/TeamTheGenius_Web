import { adminTopicEditApiType } from "@/types/adminType";
import { multiInstance } from "./axios/axios";
import requests from "./axios/request";

const patchAdminTopicEditApi = async ({
  topicId,
  topicTitle,
  topicDesc,
  topicNotice,
  topicTags,
  topicPoint,
  topicFile,
  setIsLoading,
}: adminTopicEditApiType) => {
  const body = {
    title: topicTitle,
    description: topicDesc,
    notice: topicNotice,
    tags: topicTags,
    pointPerPerson: topicPoint,
  };
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(body)], { type: "application/json" })
  );
  if (topicFile) {
    formData.append("files", topicFile);
  }
  formData.append("type", "topic");

  await multiInstance
    .patch(`${requests.fetchTopic}/${topicId}`, formData)
    .then(() => {
      setIsLoading(false);
    })
    .catch((err) => {
      alert("생성 실패");
      throw err;
    });
};

export default patchAdminTopicEditApi;

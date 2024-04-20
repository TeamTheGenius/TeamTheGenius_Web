import { topicCreateApiType } from "@/types/adminType";
import { multiInstance } from "./axios/axios";
import requests from "./axios/request";

const postAdminTopicApi = async ({
  topicTitle,
  topicDesc,
  topicNotice,
  topicTags,
  topicPoint,
  topicFile,
}: topicCreateApiType) => {
  const topicImg = topicFile[0].originFileObj;

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
  formData.append("files", topicImg);
  formData.append("type", "topic");

  await multiInstance
    .post(`${requests.fetchTopic}`, formData)
    .then(() => {})
    .catch((err) => {
      alert("생성 실패");
      throw err;
    });
};

export default postAdminTopicApi;

import { topicCreateApiType } from "@/types/adminType";
import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const postAdminTopicApi = async ({
  topicTitle,
  topicDesc,
  topicNotice,
  topicTags,
  topicPoint,
}: topicCreateApiType) => {
  const body = {
    title: topicTitle,
    description: topicDesc,
    notice: topicNotice,
    tags: topicTags,
    pointPerPerson: topicPoint,
  };

  const data = await acceptInstance
    .post(`${requests.fetchTopic}`, body)
    .then((res) => {
      return res.data.data.topicId;
    })
    .catch((err) => {
      alert("생성 실패");
      throw err;
    });
  return data || {};
};

export default postAdminTopicApi;

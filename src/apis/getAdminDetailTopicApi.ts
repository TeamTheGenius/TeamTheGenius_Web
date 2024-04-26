import requests from "./axios/request";
import { instance } from "./axios/axios";

type adminDetailTopicApiType = {
  topicId?: number;
};

const getAdminDetailTopicApi = async ({ topicId }: adminDetailTopicApiType) => {
  if (topicId) {
    const data = await instance
      .get(`${requests.fetchTopic}/${topicId}`)
      .then((res) => {
        return res.data.data || {};
      })
      .catch((err) => {
        throw err;
      });
    return data || {};
  }
};

export default getAdminDetailTopicApi;

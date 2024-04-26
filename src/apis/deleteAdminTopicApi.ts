import { QueryClient } from "react-query";
import { instance } from "./axios/axios";
import requests from "./axios/request";
import { QUERY_KEY } from "@/constants/queryKey";

type topicDeleteType = {
  topicId: number;
  queryClient: QueryClient;
};

const deleteAdminTopicApi = async ({
  topicId,
  queryClient,
}: topicDeleteType) => {
  await instance
    .delete(`${requests.fetchTopic}/${topicId}`)
    .then(() => {
      queryClient.invalidateQueries(QUERY_KEY.ADMIN_TOPIC_PAGE);
    })
    .catch((err) => {
      throw err;
    });
};

export default deleteAdminTopicApi;

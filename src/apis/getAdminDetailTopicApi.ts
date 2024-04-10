import { topicDeteilType } from "@/types/adminType";
import { SetStateAction } from "react";
import requests from "./axios/request";
import { instance } from "./axios/axios";

type adminDetailTopicApiType = {
  topicId?: number;
  setTopicDetail?: React.Dispatch<SetStateAction<topicDeteilType | undefined>>;
  setIsLoading?: React.Dispatch<SetStateAction<boolean>>;
};

const getAdminDetailTopicApi = async ({
  topicId,
  setTopicDetail,
  setIsLoading,
}: adminDetailTopicApiType) => {
  await instance
    .get(`${requests.fetchTopic}/${topicId}`)
    .then((res) => {
      if (setTopicDetail) {
        setTopicDetail(res.data.data);
      }
      if (setIsLoading) {
        setIsLoading(false);
      }
    })
    .catch((err) => {
      throw err;
    });
};

export default getAdminDetailTopicApi;

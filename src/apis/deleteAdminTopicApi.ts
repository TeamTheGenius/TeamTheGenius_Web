import getAdminTopicListApi from "./getAdminTopicListApi";
import { adminTopicDataType } from "@/types/adminType";
import { instance } from "./axios/axios";
import requests from "./axios/request";

type topicDeleteType = {
  topicId: number;
  setAdminList: React.Dispatch<React.SetStateAction<adminTopicDataType[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  pageNumber: number;
};

const deleteAdminTopicApi = async ({
  topicId,
  setAdminList,
  pageNumber,
  setIsLoading,
}: topicDeleteType) => {
  await instance
    .delete(`${requests.fetchTopic}/${topicId}`)
    .then(() => {
      setIsLoading(false);
      getAdminTopicListApi({ setAdminList, pageNumber: pageNumber - 1 });
    })
    .catch((err) => {
      throw err;
    });
};

export default deleteAdminTopicApi;

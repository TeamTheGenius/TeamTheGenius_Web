import getAdminTopicListApi from "./getAdminTopicListApi";
import { adminTopicDataType } from "@/types/adminType";
import { instance } from "./axios/axios";
import requests from "./axios/request";

type topicDeleteType = {
  topicId: number;
  setAdminList: React.Dispatch<React.SetStateAction<adminTopicDataType[]>>;
  pageNumber: number;
};

const deleteAdminTopicApi = async ({
  topicId,
  setAdminList,
  pageNumber,
}: topicDeleteType) => {
  await instance
    .delete(`${requests.fetchTopic}/${topicId}`)
    .then(() => {
      getAdminTopicListApi({ setAdminList, pageNumber: pageNumber - 1 });
    })
    .catch((err) => {
      throw err;
    });
};

export default deleteAdminTopicApi;

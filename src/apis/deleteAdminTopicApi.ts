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
    .then((res) => {
      console.log("삭제", res);
      getAdminTopicListApi({ setAdminList, pageNumber: pageNumber - 1 });
    })
    .catch((err) => {
      console.log("삭제 실패", err);
    });
};

export default deleteAdminTopicApi;

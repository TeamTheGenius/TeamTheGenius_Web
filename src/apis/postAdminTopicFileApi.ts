import requests from "./axios/request";
import { multiInstance } from "./axios/axios";
import { uploadFileTye } from "@/types/adminType";
type postAdminTopicFileApiTpye = {
  topicFile: uploadFileTye[];
  topicId?: number;
};

const postAdminTopicFileApi = async ({
  topicFile,
  topicId,
}: postAdminTopicFileApiTpye) => {
  const formData = new FormData();

  const topicImg = topicFile[0].originFileObj;

  formData.append("files", topicImg, `${topicId}.jpg`);

  const data = await multiInstance
    .post(`${requests.fetchFile}/${topicId}?type=topic`, formData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default postAdminTopicFileApi;

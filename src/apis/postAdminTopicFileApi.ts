import requests from "./axios/request";
import { multiInstance } from "./axios/axios";
type postAdminTopicFileApiTpye = {
  topicFile: any;
  topicId?: number;
};

const postAdminTopicFileApi = async ({
  topicFile,
  topicId,
}: postAdminTopicFileApiTpye) => {
  const formData = new FormData();

  const topicImg = topicFile[0].originFileObj;

  const imageFile = await fetch(topicImg).then((res) => res.blob());
  formData.append("files", imageFile, `${topicId}.jpg`);

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

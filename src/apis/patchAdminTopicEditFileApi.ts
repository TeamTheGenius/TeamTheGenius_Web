import requests from "./axios/request";
import { multiInstance } from "./axios/axios";

type patchAdminTopicEditFileApiType = {
  topicFile: any;
  topicId?: number;
};

const patchAdminTopicEditFileApi = async ({
  topicFile,
  topicId,
}: patchAdminTopicEditFileApiType) => {
  if (!topicFile) {
    return;
  }

  const formData = new FormData();

  formData.append("files", topicFile);

  const data = await multiInstance
    .patch(`${requests.fetchFile}/${topicId}?type=topic`, formData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default patchAdminTopicEditFileApi;

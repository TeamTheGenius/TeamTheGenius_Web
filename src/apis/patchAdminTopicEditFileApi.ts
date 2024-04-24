import requests from "./axios/request";
import { acceptInstance } from "./axios/axios";
type patchAdminTopicEditFileApiType = {
  topicFile: any;
  topicId?: number;
};

const patchAdminTopicEditFileApi = async ({
  topicFile,
  topicId,
}: patchAdminTopicEditFileApiType) => {
  const topicImg = topicFile[0].originFileObj;
  if (!topicImg) {
    return;
  }

  const formData = new FormData();

  try {
    const imageFile = await fetch(topicImg).then((res) => res.blob());
    formData.append("files", imageFile);

    const data = await acceptInstance
      .patch(`${requests.fetchFile}/${topicId}?type=topic`, formData)
      .then((res) => {
        return res;
      });
    return data;
  } catch (err) {
    throw err;
  }
};

export default patchAdminTopicEditFileApi;

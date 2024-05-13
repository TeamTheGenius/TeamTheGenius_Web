import requests from "./axios/request";
import { multiInstance } from "./axios/axios";
type PostSignUpProfileImageParams = {
  instanceImg: File;
  instanceId: number;
};

const postAdminInstanceFileApi = async ({
  instanceImg,
  instanceId,
}: PostSignUpProfileImageParams) => {
  const formData = new FormData();

  if (instanceImg) {
    formData.append("files", instanceImg, `${instanceId}.jpg`);
  }

  const data = await multiInstance
    .post(`${requests.fetchFile}/${instanceId}?type=instance`, formData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default postAdminInstanceFileApi;

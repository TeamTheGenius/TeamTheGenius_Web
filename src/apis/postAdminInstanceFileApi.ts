import requests from "./axios/request";
import { acceptInstance } from "./axios/axios";
type PostSignUpProfileImageParams = {
  files: string;
  instanceId: number;
};

const postAdminInstanceFileApi = async ({
  files,
  instanceId,
}: PostSignUpProfileImageParams) => {
  const formData = new FormData();

  if (files) {
    const imageFile = await fetch(files).then((res) => res.blob());
    formData.append("files", imageFile);
  }

  const data = await acceptInstance
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

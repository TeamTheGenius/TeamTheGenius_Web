import requests from "./axios/request";
import { acceptInstance } from "./axios/axios";

type editInstacneType = {
  instanceId: number;
  instanceImg?: File;
};

const patchAdminInstanceFileEditApi = async ({
  instanceId,
  instanceImg,
}: editInstacneType) => {
  const formData = new FormData();

  if (!instanceImg) {
    return;
  }

  formData.append("files", instanceImg, `${instanceId}.jpg`);

  const data = await acceptInstance
    .patch(`${requests.fetchFile}/${instanceId}?type=instance`, formData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default patchAdminInstanceFileEditApi;

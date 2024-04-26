import requests from "./axios/request";
import { acceptInstance } from "./axios/axios";
type PostSignUpProfileImageParams = {
  files: any;
  userId: number;
};

const patchProfileImage = async ({
  files,
  userId,
}: PostSignUpProfileImageParams) => {
  if (!files) return;
  const formData = new FormData();
  const realFile = files?.file?.originFileObj;
  const blob = new Blob([realFile], { type: files?.file?.type });
  formData.append("files", blob, `profile-image.jpg`);

  const data = await acceptInstance
    .patch(`${requests.fetchFile}/${userId}?type=profile`, formData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default patchProfileImage;

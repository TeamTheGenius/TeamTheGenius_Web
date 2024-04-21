import requests from "./axios/request";
import { acceptInstance } from "./axios/axios";
type PostSignUpProfileImageParams = {
  files: string;
  userId: number;
};

const postProfileImage = async ({
  files,
  userId,
}: PostSignUpProfileImageParams) => {
  const formData = new FormData();

  const imageFile = await fetch(files).then((res) => res.blob());
  formData.append("files", imageFile, `profile-image.jpg`);

  const data = await acceptInstance
    .post(`${requests.fetchFile}/${userId}?type=profile`, formData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default postProfileImage;

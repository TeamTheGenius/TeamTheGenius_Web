import requests from "./axios/request";
import { multiInstance } from "./axios/axios";

type PostSignUpProfileImageParams = {
  files: File | null;
  userId: number;
};

const patchProfileImage = async ({
  files,
  userId,
}: PostSignUpProfileImageParams) => {
  if (!files) return;

  const formData = new FormData();
  formData.append("files", files, `profile-image.jpg`);

  const data = await multiInstance.patch(
    `${requests.fetchFile}/${userId}?type=profile`,
    formData
  );

  return data;
};

export default patchProfileImage;

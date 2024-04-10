import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  userId: number;
}

const postUserProfile = async ({ userId }: Params) => {
  const body = {
    userId,
  };
  const data = await acceptInstance
    .post(`${requests.fetchProfile}`, body)
    .then((res) => {
      return res.data.data || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default postUserProfile;

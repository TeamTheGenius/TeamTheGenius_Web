import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const getMyPageProfile = async () => {
  const data = await acceptInstance
    .get(`${requests.fetchProfile}`)
    .then((res) => {
      return res.data.data || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default getMyPageProfile;

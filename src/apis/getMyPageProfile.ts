import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

const getMyPageProfile = async () => {
  const data = await acceptInstance
    .get(`${requests.fetchProfile}`)
    .then((res) => {
      console.log(res.data.data);
      return res.data.data || {};
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || {};
};

export default getMyPageProfile;

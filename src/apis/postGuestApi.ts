import requests from "./axios/request";
import { acceptInstance } from "./axios/axios";

const postGuestApi = async () => {
  const body = {
    id: "guest",
    password: "1234",
  };

  const data = await acceptInstance
    .post(`${requests.fetchAuthGuest}`, body)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default postGuestApi;

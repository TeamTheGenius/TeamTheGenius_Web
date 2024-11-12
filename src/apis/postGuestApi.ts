import requests from "./axios/request";
import { acceptInstance } from "./axios/axios";

type postGuestApiType = {
  id: string;
  password: string;
};

const postGuestApi = async ({ id, password }: postGuestApiType) => {
  const body = {
    id: id,
    password: password,
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

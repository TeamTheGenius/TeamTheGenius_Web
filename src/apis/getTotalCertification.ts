import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  instanceId: number;
  userId: number;
}

const getTotalCertification = async ({ instanceId, userId }: Params) => {
  const data = await acceptInstance
    .get(`${requests.fetchCertTotal}/${instanceId}`, {
      params: {
        userId,
      },
    })
    .then((res) => {
      return res.data.data || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default getTotalCertification;

import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  instanceId: number;
}

const getMyWeekCertification = async ({ instanceId }: Params) => {
  const data = await acceptInstance
    .get(`${requests.fetchCertWeek}/${instanceId}`)
    .then((res) => {
      return res.data.data || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default getMyWeekCertification;

import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  instanceId: number;
}

const getMyWeekCertification = async ({ instanceId }: Params) => {
  const data = await acceptInstance
    .get(`${requests.fetchCertWeek}/${instanceId}`)
    .then((res) => {
      console.log(res.data);
      return res.data.data || {};
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || {};
};

export default getMyWeekCertification;

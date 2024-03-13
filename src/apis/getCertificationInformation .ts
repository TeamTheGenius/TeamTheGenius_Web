import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  instanceId: number;
}

const getCertificationInformation = async ({ instanceId }: Params) => {
  const data = await acceptInstance
    .get(`${requests.fetchCertInfo}/${instanceId}`)
    .then((res) => {
      console.log(res.data.data);
      return res.data.data || {};
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || {};
};

export default getCertificationInformation;

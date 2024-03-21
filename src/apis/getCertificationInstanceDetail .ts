import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  instanceId: number;
}

const getCertificationInstanceDetail = async ({ instanceId }: Params) => {
  const data = await acceptInstance
    .get(`${requests.fetchCert}/${instanceId}`)
    .then((res) => {
      return res.data.data || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default getCertificationInstanceDetail;

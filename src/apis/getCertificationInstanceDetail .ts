import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  instanceId: number;
}

const getCertificationInstanceDetail = async ({ instanceId }: Params) => {
  const data = await acceptInstance
    .get(`${requests.fetchCert}/${instanceId}`)
    .then((res) => {
      console.log(res.data.data);
      return res.data.data || {};
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || {};
};

export default getCertificationInstanceDetail;

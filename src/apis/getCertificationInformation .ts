import axios from "axios";

interface Params {
  instanceId: number;
}

const getCertificationInformation = async ({ instanceId }: Params) => {
  const data = await axios
    .get(`http://localhost:8080/api/certification/information/${instanceId}`, {
      withCredentials: true,
      headers: {
        Accept: "*/*",
      },
    })
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
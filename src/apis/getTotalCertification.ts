import axios from "axios";

interface Params {
  instanceId: number;
  userId: number;
}

const getTotalCertification = async ({ instanceId, userId }: Params) => {
  const data = await axios
    .get(`http://localhost:8080/api/certification/total/${instanceId}`, {
      withCredentials: true,
      headers: {
        Accept: "*/*",
      },
      params: {
        userId,
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data.data || {};
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || {};
};

export default getTotalCertification;

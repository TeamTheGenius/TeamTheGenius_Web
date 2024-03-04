import axios from "axios";

interface Params {
  instanceId: number;
  identifier: string;
}

const getCertificationWeek = async ({ instanceId, identifier }: Params) => {
  const data = await axios
    .get(`http://localhost:8080/api/certification/week/${instanceId}`, {
      withCredentials: true,
      params: {
        identifier: identifier,
      },
      headers: {
        Accept: "*/*",
      },
    })
    .then((res) => {
      console.log(res.data.dataList);
      return res.data.dataList || [];
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data || [];
};

export default getCertificationWeek;

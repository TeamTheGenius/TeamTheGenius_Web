import axios from "axios";

interface Params {
  instanceId: number;
}

const getInstanceDetail = async ({ instanceId }: Params) => {
  const data = await axios
    .get(`http://localhost:8080/api/challenges/${instanceId}`, {
      withCredentials: true,
      headers: {
        Accept: "*/*",
      },
    })
    .then((res) => {
      console.log(res.data.data);
      return res.data.data || {};
    });
  return data || {};
};

export default getInstanceDetail;

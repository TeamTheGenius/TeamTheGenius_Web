import axios from "axios";

interface Params {
  page: number;
  size: number;
}

const getLatestChallenge = async ({ page, size }: Params) => {
  const data = await axios
    .get("http://localhost:8080/api/challenges/latest", {
      withCredentials: true,
      params: {
        page: page,
        size: size,
      },
      headers: {
        Accept: "*/*",
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data || {};
    });
  return data.content || {};
};

export default getLatestChallenge;

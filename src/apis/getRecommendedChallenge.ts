import axios from "axios";

interface Params {
  pageParams: number;
  size: number;
}

const getRecommendedChallenge = async ({ pageParams, size }: Params) => {
  const data = await axios
    .get("http://localhost:8080/api/challenges/recommend", {
      withCredentials: true,
      params: {
        page: pageParams,
        size: size,
      },
      headers: {
        Accept: "*/*",
      },
    })
    .then((res) => {
      console.log(res.data.data.content);
      const { content } = res.data.data;
      const { last } = res.data.data;
      return { posts: content, isLast: last } || {};
    });
  return data || {};
};

export default getRecommendedChallenge;

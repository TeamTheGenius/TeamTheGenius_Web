import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  pageParams: number;
  size: number;
}

const getPopularChallenge = async ({ pageParams, size }: Params) => {
  const data = await acceptInstance
    .get(`${requests.fetchChallengesPopular}`, {
      params: {
        page: pageParams,
        size: size,
      },
    })
    .then((res) => {
      console.log(res.data.data);
      const { content } = res.data.data;
      const { last } = res.data.data;
      const { pageNumber } = res.data.data.pageable;
      return { posts: content, isLast: last, page: pageNumber } || {};
    });
  return data || {};
};

export default getPopularChallenge;

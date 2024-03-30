import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  pageParams: number;
  size: number;
}

const getLikeChallenges = async ({ pageParams, size }: Params) => {
  const data = await acceptInstance
    .get(`${requests.fetchLikeChallenge}`, {
      params: {
        page: pageParams,
        size: size,
      },
    })
    .then((res) => {
      const { content } = res.data.data;
      const { last } = res.data.data;
      const { pageNumber } = res.data.data.pageable;
      return { posts: content, isLast: last, page: pageNumber } || {};
    })
    .catch((err) => {
      throw err;
    });
  return data || {};
};

export default getLikeChallenges;

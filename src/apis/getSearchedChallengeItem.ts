import { acceptInstance } from "./axios/axios";
import requests from "./axios/request";

interface Params {
  pageParams: number;
  size: number;
  keyword: string;
  progress?: "PREACTIVITY" | "ACTIVITY" | "DONE";
}

interface Data {
  instanceId: number;
  keyword: string;
  participantCount: number;
  pointPerPerson: number;
  fileResponse: {
    encodedFile: string;
  };
}

const getSearchedChallengeItem = async ({
  pageParams,
  size,
  keyword,
  progress,
}: Params) => {
  console.log(progress);
  const body = {
    keyword: keyword,
    progress: progress,
  };
  const data = await acceptInstance
    .post(`${requests.fetchChallengesSearch}`, body, {
      params: {
        page: pageParams,
        size: size,
      },
    })
    .then((res) => {
      console.log(res.data.data.content);
      const transformedContent = res.data.data.content.map((item: Data) => ({
        ...item,
        title: item.keyword,
        participantCnt: item.participantCount,
      }));

      const { last } = res.data.data;
      const { pageNumber } = res.data.data.pageable;
      return (
        { posts: transformedContent, isLast: last, page: pageNumber } || {}
      );
    });
  return data || {};
};

export default getSearchedChallengeItem;

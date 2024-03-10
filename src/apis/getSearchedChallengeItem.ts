import axios from "axios";

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
  const data = await axios
    .post("http://localhost:8080/api/challenges/search", body, {
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

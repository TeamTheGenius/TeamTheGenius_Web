import axios from "axios";

interface Params {
  pageParams: number;
  size: number;
  keyword: string;
  progress?: "PREACTIVITY" | "ACTIVITY" | "DONE";
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
      const { content } = res.data.data;
      const { last } = res.data.data;
      return { posts: content, isLast: last } || {};
    });
  return data || {};
};

export default getSearchedChallengeItem;

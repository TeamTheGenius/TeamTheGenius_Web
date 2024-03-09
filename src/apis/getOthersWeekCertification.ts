import axios from "axios";

interface Params {
  pageParams: number;
  size: number;
  instanceId: number;
}

const getOthersWeekCertification = async ({
  pageParams,
  size,
  instanceId,
}: Params) => {
  const data = await axios
    .get(`http://localhost:8080/api/certification/week/all/${instanceId}`, {
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
      console.log(res.data.data);
      const { content } = res.data.data;
      const { last } = res.data.data;
      const { pageNumber } = res.data.data.pageable;
      return { posts: content, isLast: last, page: pageNumber } || {};
    });
  return data || {};
};

export default getOthersWeekCertification;

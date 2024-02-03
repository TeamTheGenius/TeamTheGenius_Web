import axios, { AxiosResponse } from "axios";

type TopicData = {
  topicTitle: string;
  topicDesc: string;
  topicTags: string[];
  topicPoint: number;
};

const postAdminTopicApi = async ({
  topicTitle,
  topicDesc,
  topicTags,
  topicPoint,
}: TopicData) => {
  const body = {
    title: topicTitle,
    description: topicDesc,
    tags: topicTags,
    pointPerPerson: topicPoint,
  };

  await axios
    .post("http://localhost:8080/api/admin/topic", body)
    .then((res: AxiosResponse) => {
      console.log("res", res);
    })
    .catch((err) => {
      alert("생성 실패");
      console.log("err", err);
    });
};
export default postAdminTopicApi;

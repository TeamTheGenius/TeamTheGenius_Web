import axios from "axios";

type TopicData = {
  topicTitle: string;
  topicDesc: string;
  topicNotice: string;
  topicTags: string;
  topicPoint: number;
  topicFile: any;
};

const postAdminTopicApi = async ({
  topicTitle,
  topicDesc,
  topicNotice,
  topicTags,
  topicPoint,
  topicFile,
}: TopicData) => {
  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      title: topicTitle,
      description: topicDesc,
      notice: topicNotice,
      tags: topicTags,
      pointPerPerson: topicPoint,
    })
  );
  formData.append("file", topicFile.originFileObj);
  formData.append("type", "topic");

  try {
    const response = await axios.post(
      "http://localhost:8080/api/admin/topic",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("응답:", response);
  } catch (error) {
    alert("생성 실패");
    console.log("에러:", error);
  }
};

export default postAdminTopicApi;

import { topicDeteilType } from "@/components/Admin/AdminTopic/TopicListComponent/TopicListComponent";
import axios from "axios";
import { SetStateAction } from "react";

type adminDetailTopicApiType = {
  topicId?: number;
  setTopicDetail?: React.Dispatch<SetStateAction<topicDeteilType | undefined>>;
};

const getAdminDetailTopicApi = async ({
  topicId,
  setTopicDetail,
}: adminDetailTopicApiType) => {
  await axios
    .get(`http://localhost:8080/api/admin/topic/${topicId}`, {
      withCredentials: true,
    })
    .then((res) => {
      if (setTopicDetail) {
        setTopicDetail(res.data.data);
      }
      console.log("상세요청", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export default getAdminDetailTopicApi;

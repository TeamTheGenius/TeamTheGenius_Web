import { adminTopicDataType } from "@/pages/Admin/AdminTopic/AdminTopic";
import axios from "axios";
import getAdminListApi from "./getAdminListApi";

type topicDeleteType = {
  topicId: number;
  setAdminList: React.Dispatch<React.SetStateAction<adminTopicDataType[]>>;
  pageNumber: number;
};

const deleteAdminTopicApi = async ({
  topicId,
  setAdminList,
  pageNumber,
}: topicDeleteType) => {
  await axios
    .delete(`http://localhost:8080/api/admin/topic/${topicId}`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("삭제", res);
      getAdminListApi({ setAdminList, pageNumber: pageNumber - 1 });
    })
    .catch((err) => {
      console.log("삭제 실패", err);
    });
};

export default deleteAdminTopicApi;

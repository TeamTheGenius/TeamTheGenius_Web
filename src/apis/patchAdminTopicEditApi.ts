import axios, { AxiosResponse } from "axios";
import getAdminTopicListApi from "./getAdminTopicListApi";
import { adminTopicEditApiType } from "@/pages/Admin/adminType";

const patchAdminTopicEditApi = async ({
  topicId,
  topicTitle,
  topicDesc,
  topicNotice,
  topicTags,
  topicPoint,
  topicFile,
  setTopicEditModalIsOpen,
  setAdminList,
  pageNumber,
}: adminTopicEditApiType) => {
  const body = {
    title: topicTitle,
    description: topicDesc,
    notice: topicNotice,
    tags: topicTags,
    pointPerPerson: topicPoint,
  };
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(body)], { type: "application/json" })
  );
  if (topicFile) {
    formData.append("files", topicFile);
  }
  formData.append("type", "topic");

  await axios
    .patch(`http://localhost:8080/api/admin/topic/${topicId}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res: AxiosResponse<any, any>) => {
      console.log("수정응답:", res);
      setTopicEditModalIsOpen(false);
      getAdminTopicListApi({ setAdminList, pageNumber: pageNumber - 1 });
    })
    .catch((err) => {
      alert("생성 실패");
      console.log("err", err);
    });
};

export default patchAdminTopicEditApi;

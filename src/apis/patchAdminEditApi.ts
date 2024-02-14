import { uploadDataType } from "@/components/Admin/AdminTopic/TopicEditModal/TopicEditModal";
import axios, { AxiosResponse } from "axios";
import getAdminListApi from "./getAdminListApi";
import { adminTopicDataType } from "@/pages/Admin/AdminTopic/AdminTopic";

type adminEditApiType = {
  topicTitle: string;
  topicDesc: string;
  topicNotice: string;
  topicTags: string;
  topicPoint: number;
  topicFile: uploadDataType;
  topicId?: number;
  setTopicEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAdminList: React.Dispatch<React.SetStateAction<adminTopicDataType[]>>;
  pageNumber: number;
};

const patchAdminEditApi = async ({
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
}: adminEditApiType) => {
  const topicImg: any = topicFile[0].originFileObj;
  console.log("topicDesc", topicDesc);
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
  formData.append("files", topicImg);
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
      getAdminListApi({ setAdminList, pageNumber: pageNumber - 1 });
    })
    .catch((err) => {
      alert("생성 실패");
      console.log("err", err);
    });
};

export default patchAdminEditApi;

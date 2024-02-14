import axios from "axios";
import { Dispatch, SetStateAction } from "react";

type instanceCreateApiType = {
  instanceTitle: string;
  instanceDesc: string;
  instanceNotice: string;
  instanceTags: string;
  instancePoint: number;
  instanceRangeStart: string;
  instanceRangeEnd: string;
  topicId: number;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

const postAdminInstanceApi = async ({
  instanceTitle,
  instanceDesc,
  instanceNotice,
  instanceTags,
  instancePoint,
  instanceRangeStart,
  instanceRangeEnd,
  topicId,
  setModalIsOpen,
}: instanceCreateApiType) => {
  const body = {
    topicId: topicId,
    title: instanceTitle,
    description: instanceDesc,
    pointPerPerson: instancePoint,
    notice: instanceNotice,
    tags: instanceTags,
    startedAt: instanceRangeStart,
    completedAt: instanceRangeEnd,
  };

  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(body)], { type: "application/json" })
  );
  formData.append("type", "instance");

  await axios
    .post("http://localhost:8080/api/admin/instance", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("응답:", res);
      setModalIsOpen(false);
    })
    .catch((err) => {
      alert("생성 실패");
      console.log("err", err);
    });
};

export default postAdminInstanceApi;

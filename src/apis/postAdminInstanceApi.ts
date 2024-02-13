import axios from "axios";
import React from "react";

type InstanceApiType = {
  instanceTitle: string;
  instanceDesc: string;
  instanceNotice: string;
  instanceTags: string;
  instanceFile: string;
  instancePoint: number;
  instanceRangeStart: string;
  instanceRangeEnd: string;
  topicId: number;
};

const postAdminInstanceApi = async ({
  instanceTitle,
  instanceDesc,
  instanceNotice,
  instanceTags,
  instanceFile,
  instancePoint,
  instanceRangeStart,
  instanceRangeEnd,
  topicId,
}: InstanceApiType) => {
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
  console.log("instanceFile", instanceFile);
  const imageData = `data:image/png;base64,${instanceFile}`;
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(body)], { type: "application/json" })
  );
  formData.append("files", imageData);
  formData.append("type", "instance");

  await axios
    .post("http://localhost:8080/api/admin/topic", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("응답:", res);
    })
    .catch((err) => {
      alert("생성 실패");
      console.log("err", err);
    });
};

export default postAdminInstanceApi;

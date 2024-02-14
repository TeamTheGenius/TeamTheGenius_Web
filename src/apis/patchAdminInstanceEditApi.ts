import axios from "axios";

type editInstacneType = {
  topicIdId: number;
  instanceId: number;
  instanceDesc: string;
  instanceNotice: string;
  instancePoint: number;
  instanceStartAt: string;
  instanceTitle: string;
  instanceCompletedAt: string;
};

const patchAdminInstanceEditApi = async ({
  topicIdId,
  instanceId,
  instanceTitle,
  instanceDesc,
  instanceNotice,
  instancePoint,
  instanceStartAt,
  instanceCompletedAt,
}: editInstacneType) => {
  const body = {
    topicIdId: topicIdId,
    title: instanceTitle,
    description: instanceDesc,
    notice: instanceNotice,
    pointPerPerson: instancePoint,
    startedAt: instanceStartAt,
    completedAt: instanceCompletedAt,
  };
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(body)], { type: "application/json" })
  );
  formData.append("type", "instance");
  await axios
    .patch(`http://localhost:8080/api/admin/instance/${instanceId}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("수정응답:", res);
    })
    .catch((err) => {
      alert("수정 실패");
      console.log("err", err);
    });
};

export default patchAdminInstanceEditApi;

import axios from "axios";

type editInstacneType = {
  instanceId: number;
};

const patchAdminInstanceEditApi = async ({ instanceId }: editInstacneType) => {
  const formData = new FormData();
  //   formData.append(
  //     "data",
  //     new Blob([JSON.stringify(body)], { type: "application/json" })
  //   );
  //   formData.append("files", topicImg);
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
      alert("생성 실패");
      console.log("err", err);
    });
};

export default patchAdminInstanceEditApi;

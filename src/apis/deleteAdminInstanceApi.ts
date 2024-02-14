import axios from "axios";
import React from "react";
type topicDeleteType = {
  instanceId: number;
  pageNumber: number;
};
const deleteAdminInstanceApi = async ({
  instanceId,
  pageNumber,
}: topicDeleteType) => {
  await axios
    .delete(`localhost:8080/api/admin/instance/${instanceId};`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("삭제", res);
    })
    .catch((err) => {
      console.log("삭제 실패", err);
    });
};

export default deleteAdminInstanceApi;

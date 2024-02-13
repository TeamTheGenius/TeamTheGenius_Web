import { adminTopicDataType } from "@/pages/Admin/AdminTopic/AdminTopic";
import axios from "axios";

type getAdminListApiType = {
  setAdminList: React.Dispatch<React.SetStateAction<adminTopicDataType[]>>;
  pageNumber?: number;
  setTotalNumber?: React.Dispatch<React.SetStateAction<number>>;
};

const getAdminListApi = async ({
  setAdminList,
  pageNumber,
  setTotalNumber,
}: getAdminListApiType) => {
  await axios
    .get(`http://localhost:8080/api/admin/topic?page=${pageNumber}&size=5`, {
      withCredentials: true,
    })
    .then((res) => {
      const data = res.data.data;
      console.log("res", res);
      setAdminList(data.content);
      if (setTotalNumber) {
        setTotalNumber(data.totalElements);
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export default getAdminListApi;

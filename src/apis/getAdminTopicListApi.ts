import { adminTopicDataType } from "@/types/adminType";
import axios from "axios";

type adminTopicListApiType = {
  setAdminList: React.Dispatch<React.SetStateAction<adminTopicDataType[]>>;
  pageNumber?: number;
  setTotalNumber?: React.Dispatch<React.SetStateAction<number>>;
};

const getAdminTopicListApi = async ({
  setAdminList,
  pageNumber,
  setTotalNumber,
}: adminTopicListApiType) => {
  await axios
    .get(`http://localhost:8080/api/admin/topic?page=${pageNumber}&size=5`, {
      withCredentials: true,
    })
    .then((res) => {
      const list = res.data.data;
      console.log("res", res);
      setAdminList(list.content);
      if (setTotalNumber) {
        setTotalNumber(list.totalElements);
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export default getAdminTopicListApi;

import axios from "axios";

type getInstanceListApiType = {
  setInstanceList: any;
  pageNumber?: number;
  setTotalNumber?: React.Dispatch<React.SetStateAction<number>>;
};

const getInstanceListApi = async ({
  setInstanceList,
  pageNumber,
  setTotalNumber,
}: getInstanceListApiType) => {
  await axios
    .get(`http://localhost:8080/api/instance/topic?page=${pageNumber}&size=5`, {
      withCredentials: true,
    })
    .then((res) => {
      const data = res.data.data;
      console.log("res", res);
      setInstanceList(data.content);
      if (setTotalNumber) {
        setTotalNumber(data.totalElements);
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export default getInstanceListApi;

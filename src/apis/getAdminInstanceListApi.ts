import axios from "axios";

type adminInstanceListApiType = {
  setInstanceList: any;
  setTotalNumber?: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
};

const getAdminInstanceListApi = async ({
  setInstanceList,
  setTotalNumber,
  pageNumber,
}: adminInstanceListApiType) => {
  await axios
    .get(`http://localhost:8080/api/admin/instance?page=${pageNumber}&size=5`, {
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

export default getAdminInstanceListApi;

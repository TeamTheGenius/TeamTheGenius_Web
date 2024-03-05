import axios from "axios";

const getUserRepoApi = async () => {
  const data = await axios
    .get(`http://localhost:8080/api/certification/repositories`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("repo 리스트", res.data.dataList);
      return res.data.dataList || [];
    })
    .catch((err) => {
      console.log("repo 에러 리스트", err);
    });

  return data || [];
};

export default getUserRepoApi;
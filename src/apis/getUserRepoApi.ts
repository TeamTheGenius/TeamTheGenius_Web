import axios from "axios";

const getUserRepoApi = async () => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(`http://localhost:8080/api/certification/repositories`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("repo 리스트", res.data.dataList);
        resolve(res.data.dataList);
      })
      .catch((err) => {
        console.log("repo 에러 리스트", err);
        reject(err);
      });
  });
};

export default getUserRepoApi;

import axios from "axios";

const getGithubTokenApi = async () => {
  const data = await axios
    .get(`http://localhost:8080/api/certification/verify/token`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("토큰 정보 요청 성공", res);
      return res.data.code;
    })
    .catch((err) => {
      console.log("토큰 정보 요청 실패", err);
    });
  return data || [];
};

export default getGithubTokenApi;

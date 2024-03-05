import axios from "axios";

type getRepoVertifyApiType = {
  repo: string;
};
const getRepoVertifyApi = async ({ repo }: getRepoVertifyApiType) => {
  await axios
    .get(`http://localhost:8080/api/certification/verify/repository`, {
      withCredentials: true,
      headers: {
        Accept: "*/*",
      },
      params: { repo },
    })
    .then((res) => {
      console.log("레포유효성 성공", res);
    })
    .catch((err) => {
      console.log("레포유효성 에러", err);
    });

  //
};

export default getRepoVertifyApi;

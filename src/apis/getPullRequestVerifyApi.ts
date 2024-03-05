import axios from "axios";

type getPullRequestVerifyApiType = {
  repo: string;
};
const getPullRequestVerifyApi = async ({
  repo,
}: getPullRequestVerifyApiType) => {
  console.log("repo", repo);
  await axios
    .get(`http://localhost:8080/api/certification/verify/pull-request`, {
      withCredentials: true,
      headers: {
        Accept: "*/*",
      },
      params: { repo },
    })
    .then((res) => {
      console.log("PR 인증 완료", res);
    })
    .catch((err) => {
      console.log("PR 인증 오류", err);
    });
};

export default getPullRequestVerifyApi;

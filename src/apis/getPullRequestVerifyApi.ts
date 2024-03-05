import axios from "axios";

type getPullRequestVerifyApiType = {
  repoState: string;
};
const getPullRequestVerifyApi = async ({
  repoState,
}: getPullRequestVerifyApiType) => {
  await axios
    .get(
      `http://localhost:8080/api/certification/verify/pull-request/?repo=${repoState}`,
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log("PR 인증 완료", res);
    })
    .catch((err) => {
      console.log("PR 인증 오류", err);
    });
};

export default getPullRequestVerifyApi;

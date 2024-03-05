import axios from "axios";

type getPullRequestVerifyApiType = {
  repo: string;
  setPrBoolean: React.Dispatch<React.SetStateAction<boolean>>;
};
const getPullRequestVerifyApi = async ({
  repo,
  setPrBoolean,
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
      setPrBoolean(true);
    })
    .catch((err) => {
      console.log("PR 인증 오류", err);
      setPrBoolean(false);
    });
};

export default getPullRequestVerifyApi;

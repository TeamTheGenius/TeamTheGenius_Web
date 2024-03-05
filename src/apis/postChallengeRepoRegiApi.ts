import axios from "axios";

type postChallengeRepoRegiApiType = {
  instanceId?: string;
  repo: string;
};

const postChallengeRepoRegiApi = async ({
  instanceId,
  repo,
}: postChallengeRepoRegiApiType) => {
  await axios
    .post(`http://localhost:8080/api/challenges/${instanceId}`, {
      withCredentials: true,
      headers: {
        Accept: "*/*",
      },
      params: { repo },
    })
    .then((res) => {
      console.log("챌린지 참여 성공", res);
    })
    .catch((err) => {
      console.log("챌린지 참여 에러", err);
    });
};

export default postChallengeRepoRegiApi;

import axios from "axios";

interface Params {
  instanceId: number;
}

const deleteChallengeParticipation = ({
  instanceId,
}: Params): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    axios
      .delete(`http://localhost:8080/api/challenges/${instanceId}`, {
        withCredentials: true,
        headers: {
          Accept: "*/*",
        },
      })
      .then((res) => {
        console.log("참여 취소 성공", res);
        resolve();
      })
      .catch((err) => {
        console.log("참여취소 실패", err);
        reject(err);
      });
  });
};

export default deleteChallengeParticipation;

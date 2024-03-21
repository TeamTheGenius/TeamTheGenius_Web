import requests from "./axios/request";
import { acceptInstance } from "./axios/axios";

interface Params {
  instanceId: number;
}

const deleteChallengeParticipation = ({
  instanceId,
}: Params): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    acceptInstance
      .delete(`${requests.fetchChallenges}/${instanceId}`)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default deleteChallengeParticipation;

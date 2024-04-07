import requests from "./axios/request";
import { acceptInstance } from "./axios/axios";

interface Params {
  instanceId: number;
}

const deleteChallengeParticipation = async ({ instanceId }: Params) => {
  await acceptInstance
    .delete(`${requests.fetchChallenges}/${instanceId}`)
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default deleteChallengeParticipation;

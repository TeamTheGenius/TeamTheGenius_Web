import axios from "axios";

interface Params {
  instanceId: number;
  targetDate: string;
}

const postTodayCertification = async ({ instanceId, targetDate }: Params) => {
  const body = {
    instanceId,
    targetDate,
  };
  await axios
    .post("http://localhost:8080/api/certification/today", body, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("인증 갱신 성공", res);
    })
    .catch((err) => {
      console.log("인증 실패", err);
    });
};

export default postTodayCertification;

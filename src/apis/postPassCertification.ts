import axios from "axios";

interface Params {
  instanceId: number;
  targetDate: string;
}

const postPassCertification = async ({ instanceId, targetDate }: Params) => {
  const body = {
    instanceId,
    targetDate,
  };
  return new Promise<void>((resolve, reject) => {
    axios
      .post(`http://localhost:8080/api/certification/pass`, body, {
        withCredentials: true,
        headers: {
          Accept: "*/*",
        },
      })
      .then((res) => {
        console.log("인증패스 성공", res);
        resolve();
      })
      .catch((err) => {
        console.log("인증 패스 실패", err);
        reject(err);
      });
  });
};

export default postPassCertification;

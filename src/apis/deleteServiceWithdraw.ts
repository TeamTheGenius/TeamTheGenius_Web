import axios from "axios";

interface Params {
  reason: string;
}

const deleteServiceWithdraw = async ({ reason }: Params) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    data: reason,
  };

  return new Promise<void>((resolve, reject) => {
    axios
      .delete("http://localhost:8080/api/profile", config)
      .then((res) => {
        console.log("탈퇴 성공", res);
        resolve();
      })
      .catch((err) => {
        console.log("탈퇴 에러", err);
        reject(err);
      });
  });
};

export default deleteServiceWithdraw;

import axios from "axios";

const deleteServiceWithdraw = async () => {
  return new Promise<void>((resolve, reject) => {
    axios
      .delete(`http://localhost:8080/api/profile`, {
        withCredentials: true,
        headers: {
          Accept: "*/*",
        },
      })
      .then((res) => {
        console.log("로그아웃 성공", res);
        resolve();
      })
      .catch((err) => {
        console.log("로그아웃 에러", err);
        reject(err);
      });
  });
};

export default deleteServiceWithdraw;

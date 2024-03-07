import axios from "axios";

const postAuthLogout = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    axios
      .post(`http://localhost:8080/api/auth/logout`, " ", {
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

export default postAuthLogout;
